import {DBSchema, IDBPDatabase, openDB} from "idb";
import type {Index} from 'lunr';
import {Deferred} from "@/helpers";
import {Thematique} from "@/services/GraphQL";
import {useAsync} from "react-use";

interface ThematiqueSchema {
    value: any;
    key: string;
    indexes:
        {
            name: string;
        };
}

interface MdmDB extends DBSchema {
    'thematiques': ThematiqueSchema,
    revision:
        {
            value: string;
            key: 'REVISION_THEMATIQUE';
        }
}

let indexLanguage: string;
let db: Promise<IDBPDatabase<MdmDB>>;
let index: Index;
let thematiquesStoreName: 'thematiques' = 'thematiques';
let revisionStoreName: 'revision' = 'revision';

const NEXT_PUBLIC_REVISION_THEMATIQUE = process.env.NEXT_PUBLIC_REVISION_THEMATIQUE;

const getThematique = (id: string) => db.then(data => data.get(thematiquesStoreName, id));
const getThematiques = () => import(`../../build/static/thematiques.json`).then(({default: p}) => p);

async function setupDB(language: string): Promise<IDBPDatabase<MdmDB>> {

    let data = await (db ?? openDB<MdmDB>('Mdm', 1, {
        upgrade(db, oldVersion, _, transaction) {
            if (oldVersion < 1) {
                db.createObjectStore(revisionStoreName);
                db.createObjectStore(thematiquesStoreName, {keyPath: 'id'});
            }
        }
    }));

    const thematiquesRevisionIndexDb = await data.get('revision', 'REVISION_THEMATIQUE');
    const thematiquesRevisionBuilt = NEXT_PUBLIC_REVISION_THEMATIQUE;

    if (!thematiquesRevisionIndexDb || thematiquesRevisionBuilt !== thematiquesRevisionIndexDb) {
        const thematiques = await getThematiques();
        const transaction = data.transaction([revisionStoreName, thematiquesStoreName], 'readwrite');
        const revisionStore = transaction.objectStore(revisionStoreName);
        const thematiquesStore = transaction.objectStore(thematiquesStoreName);


        await revisionStore.put(thematiquesRevisionBuilt!, 'REVISION_THEMATIQUE');
        await thematiquesStore.clear();
        await Promise.all(thematiques.map(t => thematiquesStore.put(t)));
        await transaction.done;
    }

    return data;
}

let initialization = new Map<string, Promise<void>>();

async function initialize(language: string = 'fr') {
    // @ts-ignore
    if (typeof window === 'undefined' || indexLanguage === language) {
        await initialization.get(language);
        return;
    }

    const deferred = new Deferred();
    initialization.set(language, deferred.promise);
    indexLanguage = language;
    thematiquesStoreName = `thematiques`;
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
    getThematique(id: string): Promise<Thematique>;
    getThematiques(): Promise<Thematique[]>;
}

export function useSearch(language: string): SearchInterface {
    const {loading} = useAsync(() => initialize(language), [language]);

    return {
        isReady: !loading,
        search: !loading ? search : () => Promise.reject(new Error('Search engine is not ready')),
        getThematique: !loading ? getThematique : () => Promise.reject(new Error('DB is not ready')),
        getThematiques(): Promise<any[]> {
            return db.then(data => data.getAll(thematiquesStoreName));
        }
    };
}