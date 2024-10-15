import context from 'server-only-context'
import {
  GetCategoriesQuery,
  GetFooterQuery,
  GetHeaderQuery,
  GetPageQuery,
  GetPublicsQuery,
  GetServicesQuery,
} from '@/services/GraphQL'

export const [getPage, setPage] = context<GetPageQuery['pages']>(null!)
export const [getCategories, setCategories] = context<GetCategoriesQuery>(null!)
export const [getPublics, setPublics] = context<GetPublicsQuery>(null!)
export const [getLanguage, setLanguage] = context<string>(null!)
export const [getHeader, setHeader] = context<GetHeaderQuery>(null!)
export const [getFooter, setFooter] = context<GetFooterQuery>(null!)
export const [getServices, setServices] = context<GetServicesQuery>(null!)
