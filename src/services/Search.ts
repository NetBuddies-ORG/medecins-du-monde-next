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

interface OrganizationSchema {
    value: any;
    key: string;
    indexes: { slug: string; };
}

interface IndexDBchema {
    value: any;
    key: string;
    indexes: { Nom: string; };
}

interface MdmDB extends DBSchema {
    organismes: OrganizationSchema,
    publics: IndexDBchema,
    categories: IndexDBchema,
    services: IndexDBchema,
    revision:
        {
            value: string;
            key: 'REVISION_ORGANISME' | 'REVISION_PUBLICS' | 'REVISION_CATEGORIES' | 'REVISION_SERVICE';
        }
}

let indexLanguage: string;
let db: Promise<IDBPDatabase<MdmDB>>;
let indexOrganism: Index;
let indexService: Index;

let publicsStoreName: 'publics' = 'publics';
let organismesStoreName: 'organismes' = 'organismes';
let categoriesStoreName: 'categories' = 'categories';
let servicesStoreName: 'services' = 'services';
let revisionStoreName: 'revision' = 'revision';

const NEXT_PUBLIC_REVISION_ORGANISME = process.env.NEXT_PUBLIC_REVISION_ORGANISME;
const NEXT_PUBLIC_REVISION_PUBLICS = process.env.NEXT_PUBLIC_REVISION_PUBLICS;
const NEXT_PUBLIC_REVISION_SERVICES = process.env.NEXT_PUBLIC_REVISION_SERVICES;
const NEXT_PUBLIC_REVISION_CATEGORIES = process.env.NEXT_PUBLIC_REVISION_CATEGORIES;

const getOrganisme = (slug: string) => {
    return db.then(data => data.transaction("organismes").store.index('slug').get(slug))
};
const getOrganismes = () => import(`../../build/static/organismes.json`).then(({default: p}) => p);
const getPublics = () => import('../../build/static/publics.json').then(({default: p}) => p);
const getCategories = () => import('../../build/static/categories.json').then(({default: p}) => p);
const getServices = () => import('../../build/static/services.json').then(({default: p}) => p);


async function setupDB(language: string): Promise<IDBPDatabase<MdmDB>> {
    let data = await (db ?? openDB<MdmDB>('Mdm', 2, {
        upgrade(db, oldVersion, _, transaction) {
            if (oldVersion < 1) {
                db.createObjectStore(revisionStoreName);
                db.createObjectStore(publicsStoreName, {keyPath: 'id'});
                db.createObjectStore(categoriesStoreName, {keyPath: 'id'});
                db.createObjectStore(organismesStoreName, {keyPath: 'id'});

                const organismesStore = transaction.objectStore(organismesStoreName);
                organismesStore.createIndex("slug", "slug", {multiEntry: true, unique: true});
            }

            if (oldVersion < 2) {
                db.createObjectStore(servicesStoreName, {keyPath: 'id'});
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

    const servicesRevisionIndexDb = await data.get('revision', 'REVISION_SERVICE');
    const servicesRevisionBuilt = NEXT_PUBLIC_REVISION_SERVICES;

    if (!servicesRevisionIndexDb || servicesRevisionBuilt !== servicesRevisionIndexDb) {
        const services = await getServices();
        const transaction = data.transaction([revisionStoreName, servicesStoreName], 'readwrite');
        const revisionStore = transaction.objectStore(revisionStoreName);
        const servicesStore = transaction.objectStore(servicesStoreName);

        await revisionStore.put(servicesRevisionBuilt!, 'REVISION_SERVICE');
        await servicesStore.clear();
        await Promise.all(services.map(t => servicesStore.put(t)));
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
    indexOrganism = lunr.Index.load(await import('../../build/static/index.json'));
    indexService = lunr.Index.load(await import('../../build/static/indexService.json'));

    deferred.resolve();
}

async function search(params: SearchAccurateOrganizationParams): Promise<Organisme[]> {

    // Get params
    const {categoriesIds, subCategoriesIds, publicsId} = params;
    const subCategoriesIdsToSearch = subCategoriesIds ?? [];

    // Get IndexedDBData
    const organismesFromIndexedDb: (Organisme & {id: string})[] = await db.then(data => data.getAll(organismesStoreName));
    const categoriesFromIndexedDb: (Categorie & {id: string})[] = await db.then(data => data.getAll(categoriesStoreName));

    // Get All subCategories from params categoriesIds
    const subCategoriesFromParamsCategoriesIds = categoriesFromIndexedDb.filter((categorie) => {
        return categoriesIds.includes(categorie.id);
    }).flatMap((categorie: Categorie) => {
        return categorie.sous_categories.data;
    });

    //Add subCategoriesIdsToSearch to subCategoriesFromParamsCategoriesIds
    for(let sub of subCategoriesFromParamsCategoriesIds){
        if(!subCategoriesIdsToSearch.includes(sub.id)){
            subCategoriesIdsToSearch.push(sub.id);
        }
    }

    // Get All organismes from subCategoriesIds
    const organismesFromSubCategoriesIds = organismesFromIndexedDb.filter((organisme) => {
        for(let sub of organisme.sous_categories.data){
            if (subCategoriesIdsToSearch.includes(sub.id)) {
                return true;
            }
        }
    });

    // Get All organismes from publicsId
    if(publicsId != '0'){
        return organismesFromIndexedDb.filter((organisme) => {
            return organisme.public_specifiques.data.map((publics) => publics.id).includes(publicsId!);
        });
    }


    return organismesFromSubCategoriesIds;
}

async function searchOrganismes(params: SearchOrganizationsParams): Promise<string[]> {
    let newKeyword = params.keyword;
    let terms = newKeyword.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s*]/g, "")
        .split(' ');
    let finalQuery = '';
    terms.forEach((t, i) => {
        if (t !== '') {
            finalQuery += `${t}^${100 - i} ${t}* `;
        }
    });
    let results: Set<string> = new Set(indexOrganism.search(finalQuery).map(({ref}) => ref));
    return Array.from(results);
}

async function searchServices(params: SearchServicesParams): Promise<string[]> {
    let newKeyword = params.keyword;
    let terms = newKeyword.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s*]/g, "")
        .split(' ');
    let finalQuery = '';
    terms.forEach((t, i) => {
        if (t !== '') {
            finalQuery += `${t}^${100 - i} ${t}* `;
        }
    });
    let results: Set<string> = new Set(indexService.search(finalQuery).map(({ref}) => ref));
    return Array.from(results);
}

export interface SearchOrganizationsParams {
    keyword: string;
}

export interface SearchServicesParams {
    keyword: string;
}

export interface SearchAccurateOrganizationParams {
    categoriesIds: string[],
    subCategoriesIds?: string[];
    publicsId?: string;
}

interface SearchInterface {
    isReady: boolean;
    search(params: SearchAccurateOrganizationParams): Promise<Organisme[]>;
    getOrganisme(id: string): Promise<Organisme>;
    getOrganismes(params: SearchOrganizationsParams): Promise<string[]>;
    getPublics(): Promise<PublicSpecifique[]>;
    getCategories(): Promise<Categorie[]>;
    getServices(params: SearchServicesParams): Promise<string[]>;
}

export function useDBIndex(language: string): SearchInterface {
    const {loading} = useAsync(() => initialize(language), [language]);

    return <SearchInterface>{
        isReady: !loading,
        search: !loading ? search : () => Promise.reject(new Error('Search engine is not ready')),
        getOrganisme: !loading ? getOrganisme : () => Promise.reject(new Error('DB is not ready')),
        getOrganismes: !loading ? searchOrganismes : () => Promise.reject(new Error('Search engine is not ready')),
        getPublics(): Promise<any[]> {
            return db.then(data => data.getAll(publicsStoreName));
        },
        getCategories(): Promise<any[]> {
            return db.then(data => data.getAll(categoriesStoreName));
        },
        getServices: !loading ? searchServices : () => Promise.reject(new Error('Search engine is not ready')),
    };
}