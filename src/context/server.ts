import context from 'server-only-context';
import {
    Categorie,
    CategorieEntity,
    GetCategoriesQuery,
    GetHeaderQuery,
    GetPageQuery,
    GetPublicsQuery
} from "@/services/GraphQL";

// @ts-ignore
export const [getPage, setPage] = context<GetPageQuery["pages"]>(null!)
export const [getCategories, setCategories] = context<GetCategoriesQuery>(null!)
export const [getPublics, setPublics] = context<GetPublicsQuery>(null!)
export const [getLanguage, setLanguage] = context<string>(null!)
export const [getHeader, setHeader] = context<GetHeaderQuery>(null!)

