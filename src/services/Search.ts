import { Deferred } from "@/helpers";
import {
    Categorie,
    Organisme,
} from "@/services/GraphQL";
import { useAsync } from "react-use";
import {
    categoriesStoreName, MdmDB, organismesStoreName,
    publicsStoreName, SearchAccurateOrganizationParams,
    SearchCategories,
    SearchInterface, SearchOrganizationsParams, SearchServicesParams
} from "@/services/index-db/IndexDBTypes";
import {setupDB} from "@/services/index-db/IndexDBConfig";
import {IDBPDatabase} from "idb";
import {Index} from "lunr";

const getOrganisme = (slug: string) => {
    return db?.then(data => data.transaction("organismes").store.index('slug').get(slug))
};
let db: Promise<IDBPDatabase<MdmDB>> | undefined = undefined;
let indexLanguage: string;
let indexOrganism: Index;
let indexService: Index;
let indexCategorie: Index;
let indexSubCategorie: Index;

let initialization = new Map<string, Promise<void>>();

async function initialize(language: string = 'fr') {
    if (typeof window === 'undefined' || indexLanguage === language) {
        await initialization.get(language);
        return;
    }
    const deferred = new Deferred();
    initialization.set(language, deferred.promise);
    indexLanguage = language;
    db = setupDB(language, db);
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
    indexCategorie = lunr.Index.load(await import('../../build/static/indexCategorie.json'));
    indexSubCategorie = lunr.Index.load(await import('../../build/static/indexSubCategorie.json'));

    deferred.resolve();
}

async function search(params: SearchAccurateOrganizationParams): Promise<Organisme[]> {

    // Get params
    const {subCategoriesIds, publicsId} = params;

    // Get IndexedDBData
    const organismesFromIndexedDb: (Organisme & {id: string})[] = await db!.then(data => data.getAll(organismesStoreName));
    const categoriesFromIndexedDb: (Categorie & {id: string})[] = await db!.then(data => data.getAll(categoriesStoreName));

    // Recompose the params categories and subCategories as a tree
    const recomposedParamCategories: {[key: string]: {isComplete: boolean, subcat: string[]}} = {};
    if(subCategoriesIds && subCategoriesIds.length > 0) {
        categoriesFromIndexedDb.map((categorie) => {
            for (let subcat of categorie.sous_categories.data) {
                if (subCategoriesIds.includes(subcat.id)) {
                    if(!recomposedParamCategories[categorie.id]) {
                        recomposedParamCategories[categorie.id] = {isComplete: false, subcat: []};
                    }
                    recomposedParamCategories[categorie.id].subcat.push(subcat.id) ;
                }
            }
            if(recomposedParamCategories[categorie.id] && recomposedParamCategories[categorie.id].subcat.length === categorie.sous_categories.data.length) {
                recomposedParamCategories[categorie.id].isComplete = true;
            }
        })
    }

    // Iterate over the organismes and filter them
    // If a category is not complete, we need to check if the organism has all the subcategories
    // If a category is complete, we need to check if the organism has at least one of the subcategories
    // If a public is selected, we need to check if the organism has this public
    // then we merge the results
    const filteredOrga = organismesFromIndexedDb.filter((organisme) => {
        let isPublicsOk = true;
        let isSubCategoriesOk = true;

        if(publicsId && publicsId !== '0') {
            isPublicsOk = organisme.public_specifiques.data.map((publicSpe) => publicSpe.id).includes(publicsId);
        }

        const categoriesOk: {[key: string]: boolean} = {};

        for(let catId in recomposedParamCategories) {
            if(recomposedParamCategories[catId].isComplete) {
                categoriesOk[catId] = organisme.sous_categories.data.map((cat) => cat.id).some((subCatId) => recomposedParamCategories[catId].subcat.includes(subCatId));
            } else {
                categoriesOk[catId] = recomposedParamCategories[catId].subcat.every((subCatId) => organisme.sous_categories.data.map((cat) => cat.id).includes(subCatId));
            }
        }

        isSubCategoriesOk = Object.values(categoriesOk).every((val) => val);
        return isPublicsOk && isSubCategoriesOk;
    })

    return filteredOrga
}

async function searchOrganismes(params: SearchOrganizationsParams): Promise<string[]> {
    let newKeyword = params.keyword;
    let terms = newKeyword.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s*]/g, "")
        .split(' ');
    let finalQuery = '';
    terms.forEach((t, i) => {
        if (t !== '' && i === 0) {
            finalQuery += `${t}^${100 - i} ${t}*^10 ${t}~2 `;
        } else {
            finalQuery += `${t}^${100 - i} `;
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
        if (t !== '' && i === 0) {
            finalQuery += `${t}^${100 - i} ${t}*^10 ${t}~2 `;
        } else {
            finalQuery += `${t}^${100 - i} `;
        }
    });
    let results: Set<string> = new Set(indexService.search(finalQuery).map(({ref}) => ref));
    return Array.from(results);
}

async function searchCategories(params: SearchCategories): Promise<string[]> {
    let newKeyword = params.keyword;
    let terms = newKeyword.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s*]/g, "")
        .split(' ');
    let finalQuery = '';
    terms.forEach((t, i) => {
        if (t !== '') {
            finalQuery += `${t}~3^${100 - i} `;
        }
    });
    let results: Set<string> = new Set(indexCategorie.search(finalQuery).filter(i => i.score > 4).map(({ref}) => ref));
    return Array.from(results);
}

async function searchSubCategories(params: SearchCategories): Promise<string[]> {
    let terms = params.keyword.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s*]/g, "")
        .split(' ');
    let finalQuery = '';
    terms.forEach((t, i) => {
        if (t !== '' && i === 0) {
            finalQuery += `${t}^${100 - i} ${t}*^10 ${t}~2 `;
        } else {
            finalQuery += `${t}^${100 - i} `;
        }
    });

    return Array.from(indexSubCategorie.search(finalQuery).filter(s => s.score > 1.45).map(({ ref }) => ref))
}

export function useDBIndex(language: string): SearchInterface {
    const {loading} = useAsync(() => initialize(language), [language]);

    return <SearchInterface>{
        isReady: !loading,
        search: !loading ? search : () => Promise.reject(new Error('Search engine is not ready')),
        getOrganisme: !loading ? getOrganisme : () => Promise.reject(new Error('DB is not ready')),
        getOrganismes: !loading ? searchOrganismes : () => Promise.reject(new Error('Search engine is not ready')),
        getPublics(): Promise<any[]> {
            return db!.then(data => data.getAll(publicsStoreName));
        },
        searchCategories: !loading ? searchCategories : () => Promise.reject(new Error('Search engine is not ready')),
        searchSubCategories: !loading ? searchSubCategories : () => Promise.reject(new Error('Search engine is not ready')),
        getCategories(): Promise<any[]> {
            return db!.then(data => data.getAll(categoriesStoreName));
        },
        getServices: !loading ? searchServices : () => Promise.reject(new Error('Search engine is not ready')),
    };
}