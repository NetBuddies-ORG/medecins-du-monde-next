// Définition des schémas pour les différents stores de la base de données IndexedDB
import {DBSchema} from "idb";
import {Categorie, Organisme} from "@/services/GraphQL";

interface OrganizationSchema {
    value: any;
    key: string;
    indexes: { slug: string; };
}

interface IndexDBSchema {
    value: any;
    key: string;
    indexes: { Nom: string; };
}

// Définition du schéma global de la base de données IndexedDB
export interface MdmDB extends DBSchema {
    organismes: OrganizationSchema;
    publics: IndexDBSchema;
    categories: IndexDBSchema;
    services: IndexDBSchema;
    revision: {
        value: string;
        key: 'REVISION_ORGANISME' | 'REVISION_PUBLICS' | 'REVISION_CATEGORIES' | 'REVISION_SERVICE';
    };
}

export interface SearchOrganizationsParams {
    keyword: string;
}

export interface SearchServicesParams {
    keyword: string;
}

export interface SearchCategories {
    keyword: string;
}

export interface SearchAccurateOrganizationParams {
    categoriesIds: string[],
    subCategoriesIds?: string[];
    publicsId?: string;
}

export interface SearchInterface {
    isReady: boolean;
    search(params: SearchAccurateOrganizationParams): Promise<Organisme[]>;
    getOrganismes(params: SearchOrganizationsParams): Promise<string[]>;
    searchCategories(params: SearchCategories): Promise<string[]>;
    searchSubCategories(params: SearchCategories): Promise<string[]>;
    getCategories(): Promise<(Categorie & {id: string})[]>;
    getServices(params: SearchServicesParams): Promise<string[]>;
}

export const publicsStoreName: 'publics' = 'publics';
export const organismesStoreName: 'organismes' = 'organismes';
export const categoriesStoreName: 'categories' = 'categories';
export const servicesStoreName: 'services' = 'services';
export const revisionStoreName: 'revision' = 'revision';
