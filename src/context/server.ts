import context from 'server-only-context';
import {GetPageQuery} from "@/services/GraphQL";

// @ts-ignore
export const [getPage, setPage] = context<GetPageQuery["pages"]>(null!)
export const [getLanguage, setLanguage] = context<string>(null!)

