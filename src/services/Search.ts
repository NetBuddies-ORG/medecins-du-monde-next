import {DBSchema, IDBPDatabase, openDB} from "idb";
import type {Index} from 'lunr';
import {Deferred} from "@/helpers";
import {
    Categorie,
    CategorieEntity,
    Organisme,
    OrganismeEntity,
    PublicSpecifique,
    PublicSpecifiqueEntity
} from "@/services/GraphQL";
import {useAsync} from "react-use";

interface IndexDBchema {
    value: any;
    key: string;
    indexes:
        {
            name: string;
        };
}

interface MdmDB extends DBSchema {
    'organismes': IndexDBchema,
    'publics': IndexDBchema,
    'categories': IndexDBchema,
    revision:
        {
            value: string;
            key: 'REVISION_ORGANISME' | 'REVISION_PUBLICS' | 'REVISION_CATEGORIES';
        }
}

let indexLanguage: string;
let db: Promise<IDBPDatabase<MdmDB>>;
let index: Index;

let publicsStoreName: 'publics' = 'publics';
let organismesStoreName: 'organismes' = 'organismes';
let categoriesStoreName: 'categories' = 'categories';
let revisionStoreName: 'revision' = 'revision';

const NEXT_PUBLIC_REVISION_ORGANISME = process.env.NEXT_PUBLIC_REVISION_ORGANISME;
const NEXT_PUBLIC_REVISION_PUBLICS = process.env.NEXT_PUBLIC_REVISION_PUBLICS;
const NEXT_PUBLIC_REVISION_CATEGORIES = process.env.NEXT_PUBLIC_REVISION_CATEGORIES;

const getOrganisme = (id: string) => db.then(data => data.get(organismesStoreName, id));
const getOrganismes = () => import(`../../build/static/organismes.json`).then(({default: p}) => p);
const getPublics = () => import('../../build/static/publics.json').then(({default: p}) => p)
const getCategories = () => import('../../build/static/categories.json').then(({default: p}) => p)


async function setupDB(language: string): Promise<IDBPDatabase<MdmDB>> {
    let data = await (db ?? openDB<MdmDB>('Mdm', 1, {
        upgrade(db, oldVersion, _, transaction) {
            if (oldVersion < 1) {
                db.createObjectStore(revisionStoreName);
                db.createObjectStore(publicsStoreName, {keyPath: 'id'});
                db.createObjectStore(categoriesStoreName, {keyPath: 'id'});
                db.createObjectStore(organismesStoreName, {keyPath: 'id'});
            }
        }
    }));

    const organismesRevisionIndexDb = await data.get('revision', 'REVISION_ORGANISME');
    const organismesRevisionBuilt = NEXT_PUBLIC_REVISION_ORGANISME;

    if (!organismesRevisionIndexDb || organismesRevisionBuilt !== organismesRevisionIndexDb) {
        const organismes = await getOrganismes();
        const transaction = data.transaction([revisionStoreName, organismesStoreName], 'readwrite');
        const revisionStore = transaction.objectStore(revisionStoreName);
        const organismesStore = transaction.objectStore(organismesStoreName);


        await revisionStore.put(organismesRevisionBuilt!, 'REVISION_ORGANISME');
        await organismesStore.clear();
        await Promise.all(organismes.map(t => organismesStore.put(t)));
        await transaction.done;
    }

    const publicsRevisionIndexDb = await data.get('revision', 'REVISION_PUBLICS');
    const publicsRevisionBuilt = NEXT_PUBLIC_REVISION_PUBLICS;

    if (!publicsRevisionIndexDb || publicsRevisionBuilt !== publicsRevisionIndexDb) {
        const publics = await getPublics();
        const transaction = data.transaction([revisionStoreName, publicsStoreName], 'readwrite');
        const revisionStore = transaction.objectStore(revisionStoreName);
        const publicsStore = transaction.objectStore(publicsStoreName);

        await revisionStore.put(publicsRevisionBuilt!, 'REVISION_PUBLICS');
        await publicsStore.clear();
        await Promise.all(publics.map(t => publicsStore.put(t)));
        await transaction.done;
    }

    const categoriesRevisionIndexDb = await data.get('revision', 'REVISION_CATEGORIES');
    const categoriesRevisionBuilt = NEXT_PUBLIC_REVISION_CATEGORIES;

    if (!categoriesRevisionIndexDb || categoriesRevisionBuilt !== categoriesRevisionIndexDb) {
        const categories = await getCategories();
        const transaction = data.transaction([revisionStoreName, categoriesStoreName], 'readwrite');
        const revisionStore = transaction.objectStore(revisionStoreName);
        const categoriesStore = transaction.objectStore(categoriesStoreName);

        await revisionStore.put(categoriesRevisionBuilt!, 'REVISION_CATEGORIES');
        await categoriesStore.clear();
        await Promise.all(categories.map(t => categoriesStore.put(t)));
        await transaction.done;
    }

    return data;
}

let initialization = new Map<string, Promise<void>>();

async function initialize(language: string = 'fr') {
    if (typeof window === 'undefined' || indexLanguage === language) {
        await initialization.get(language);
        return;
    }
    const deferred = new Deferred();
    initialization.set(language, deferred.promise);
    indexLanguage = language;
    db = setupDB(language);
    const [
        {default: lunr},
        {default: stemmer}
    ] = await Promise.all([
        import('lunr'),
        import('lunr-languages/lunr.stemmer.support'),
        import('../helpers/removeDiacriticsSpelling')]);
    stemmer(lunr);

    const {default: fr} = await import('lunr-languages/lunr.fr');
    fr(lunr);
    index = lunr.Index.load(await import('../../build/static/index.json'));

    deferred.resolve();
}

async function search(params: SearchParams): Promise<string[]> {
    return [];
}

export interface SearchParams {
    keyword: string;
}

interface SearchInterface {
    isReady: boolean;
    search(params: SearchParams): Promise<string[]>;
    getOrganisme(id: string): Promise<OrganismeEntity>;
    getOrganismes(): Promise<OrganismeEntity[]>;
    getPublics(): Promise<PublicSpecifiqueEntity[]>;
    getCategories(): Promise<CategorieEntity[]>;
}

export function useDBIndex(language: string): SearchInterface {
    const {loading} = useAsync(() => initialize(language), [language]);

    return <SearchInterface>{
        isReady: !loading,
        search: !loading ? search : () => Promise.reject(new Error('Search engine is not ready')),
        getOrganisme: !loading ? getOrganisme : () => Promise.reject(new Error('DB is not ready')),
        getOrganismes(): Promise<any[]> {
            return db.then(data => data.getAll(organismesStoreName));
        },
        getPublics(): Promise<any[]> {
            return db.then(data => data.getAll(publicsStoreName));
        },
        getCategories(): Promise<any[]> {
            return db.then(data => data.getAll(categoriesStoreName));
        }
    };
}