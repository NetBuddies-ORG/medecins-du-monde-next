import {DBSchema, IDBPDatabase, openDB} from "idb";
import type {Index} from 'lunr';
import {Deferred} from "@/helpers";
import {Organisme} from "@/services/GraphQL";
import {useAsync} from "react-use";

interface OrganismeSchema {
    value: any;
    key: string;
    indexes:
        {
            name: string;
        };
}

interface MdmDB extends DBSchema {
    'organismes': OrganismeSchema,
    revision:
        {
            value: string;
            key: 'REVISION_ORGANISME';
        }
}

let indexLanguage: string;
let db: Promise<IDBPDatabase<MdmDB>>;
let index: Index;
let organismesStoreName: 'organismes' = 'organismes';
let revisionStoreName: 'revision' = 'revision';

const NEXT_PUBLIC_REVISION_ORGANISME = process.env.NEXT_PUBLIC_REVISION_ORGANISME;

const getOrganisme = (id: string) => db.then(data => data.get(organismesStoreName, id));
const getOrganismes = () => import(`../../build/static/organismes.json`).then(({default: p}) => p);


async function setupDB(language: string): Promise<IDBPDatabase<MdmDB>> {

    let data = await (db ?? openDB<MdmDB>('Mdm', 1, {
        upgrade(db, oldVersion, _, transaction) {
            if (oldVersion < 1) {
                db.createObjectStore(revisionStoreName);
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
    organismesStoreName = `organismes`;
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
    getOrganisme(id: string): Promise<Organisme>;
    getOrganismes(): Promise<Organisme[]>;
}

export function useSearch(language: string): SearchInterface {
    const {loading} = useAsync(() => initialize(language), [language]);

    return {
        isReady: !loading,
        search: !loading ? search : () => Promise.reject(new Error('Search engine is not ready')),
        getOrganisme: !loading ? getOrganisme : () => Promise.reject(new Error('DB is not ready')),
        getOrganismes(): Promise<any[]> {
            return db.then(data => data.getAll(organismesStoreName));
        }
    };
}