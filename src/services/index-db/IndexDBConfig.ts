import {IDBPDatabase, openDB} from "idb";
import {
    categoriesStoreName,
    MdmDB, organismesStoreName,
    publicsStoreName,
    revisionStoreName,
    servicesStoreName
} from "@/services/index-db/IndexDBTypes";

const NEXT_PUBLIC_REVISION_ORGANISME = process.env.NEXT_PUBLIC_REVISION_ORGANISME;
const NEXT_PUBLIC_REVISION_PUBLICS = process.env.NEXT_PUBLIC_REVISION_PUBLICS;
const NEXT_PUBLIC_REVISION_SERVICES = process.env.NEXT_PUBLIC_REVISION_SERVICES;
const NEXT_PUBLIC_REVISION_CATEGORIES = process.env.NEXT_PUBLIC_REVISION_CATEGORIES;

const getOrganismes = () => import(`../../../build/static/organismes.json`).then(({default: p}) => p);
const getPublics = () => import('../../../build/static/publics.json').then(({default: p}) => p);
const getCategories = () => import('../../../build/static/categories.json').then(({default: p}) => p);
const getServices = () => import('../../../build/static/services.json').then(({default: p}) => p);


// Fonction de configuration et d'initialisation de la base de données IndexedDB
export async function setupDB(language: string, db?: Promise<IDBPDatabase<MdmDB>>): Promise<IDBPDatabase<MdmDB>> {
    const data = await (db ?? openDB<MdmDB>('Mdm', 2, {
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

