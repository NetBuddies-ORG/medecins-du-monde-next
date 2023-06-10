import context from 'server-only-context';

import type { GetPageQuery } from '@/services/GraphQL';

export const [getNavigation, setNavigation] = context<GetPageQuery["navigation"]>(null!)
export const [getHeader, setHeader] = context<GetPageQuery["header"]>(null!)
export const [getPage, setPage] = context<GetPageQuery["page"]>(null!)
export const [getUrl, setUrl] = context<string>(null!)
