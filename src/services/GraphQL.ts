import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  I18NLocaleCode: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type About = {
  __typename?: 'About';
  Description: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<AboutRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type AboutLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type AboutEntity = {
  __typename?: 'AboutEntity';
  attributes: Maybe<About>;
  id: Maybe<Scalars['ID']['output']>;
};

export type AboutEntityResponse = {
  __typename?: 'AboutEntityResponse';
  data: Maybe<AboutEntity>;
};

export type AboutInput = {
  Description: InputMaybe<Scalars['String']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type AboutRelationResponseCollection = {
  __typename?: 'AboutRelationResponseCollection';
  data: Array<AboutEntity>;
};

export type BooleanFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains: InputMaybe<Scalars['Boolean']['input']>;
  containsi: InputMaybe<Scalars['Boolean']['input']>;
  endsWith: InputMaybe<Scalars['Boolean']['input']>;
  eq: InputMaybe<Scalars['Boolean']['input']>;
  eqi: InputMaybe<Scalars['Boolean']['input']>;
  gt: InputMaybe<Scalars['Boolean']['input']>;
  gte: InputMaybe<Scalars['Boolean']['input']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt: InputMaybe<Scalars['Boolean']['input']>;
  lte: InputMaybe<Scalars['Boolean']['input']>;
  ne: InputMaybe<Scalars['Boolean']['input']>;
  nei: InputMaybe<Scalars['Boolean']['input']>;
  not: InputMaybe<BooleanFilterInput>;
  notContains: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi: InputMaybe<Scalars['Boolean']['input']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull: InputMaybe<Scalars['Boolean']['input']>;
  null: InputMaybe<Scalars['Boolean']['input']>;
  or: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith: InputMaybe<Scalars['Boolean']['input']>;
};

export type Categorie = {
  __typename?: 'Categorie';
  Icone: Scalars['String']['output'];
  Nom: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<CategorieRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  sous_categories: Maybe<SousCategorieRelationResponseCollection>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type CategorieLocalizationsArgs = {
  filters: InputMaybe<CategorieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategorieSous_CategoriesArgs = {
  filters: InputMaybe<SousCategorieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CategorieEntity = {
  __typename?: 'CategorieEntity';
  attributes: Maybe<Categorie>;
  id: Maybe<Scalars['ID']['output']>;
};

export type CategorieEntityResponse = {
  __typename?: 'CategorieEntityResponse';
  data: Maybe<CategorieEntity>;
};

export type CategorieEntityResponseCollection = {
  __typename?: 'CategorieEntityResponseCollection';
  data: Array<CategorieEntity>;
  meta: ResponseCollectionMeta;
};

export type CategorieFiltersInput = {
  Icone: InputMaybe<StringFilterInput>;
  Nom: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<CategorieFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  locale: InputMaybe<StringFilterInput>;
  localizations: InputMaybe<CategorieFiltersInput>;
  not: InputMaybe<CategorieFiltersInput>;
  or: InputMaybe<Array<InputMaybe<CategorieFiltersInput>>>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  sous_categories: InputMaybe<SousCategorieFiltersInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type CategorieInput = {
  Icone: InputMaybe<Scalars['String']['input']>;
  Nom: InputMaybe<Scalars['String']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  sous_categories: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type CategorieRelationResponseCollection = {
  __typename?: 'CategorieRelationResponseCollection';
  data: Array<CategorieEntity>;
};

export type CategoriesOrientationUrgence = {
  __typename?: 'CategoriesOrientationUrgence';
  Nom: Scalars['String']['output'];
  Poids: Scalars['Int']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<CategoriesOrientationUrgenceRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type CategoriesOrientationUrgenceLocalizationsArgs = {
  filters: InputMaybe<CategoriesOrientationUrgenceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CategoriesOrientationUrgenceEntity = {
  __typename?: 'CategoriesOrientationUrgenceEntity';
  attributes: Maybe<CategoriesOrientationUrgence>;
  id: Maybe<Scalars['ID']['output']>;
};

export type CategoriesOrientationUrgenceEntityResponse = {
  __typename?: 'CategoriesOrientationUrgenceEntityResponse';
  data: Maybe<CategoriesOrientationUrgenceEntity>;
};

export type CategoriesOrientationUrgenceEntityResponseCollection = {
  __typename?: 'CategoriesOrientationUrgenceEntityResponseCollection';
  data: Array<CategoriesOrientationUrgenceEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoriesOrientationUrgenceFiltersInput = {
  Nom: InputMaybe<StringFilterInput>;
  Poids: InputMaybe<IntFilterInput>;
  and: InputMaybe<Array<InputMaybe<CategoriesOrientationUrgenceFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  locale: InputMaybe<StringFilterInput>;
  localizations: InputMaybe<CategoriesOrientationUrgenceFiltersInput>;
  not: InputMaybe<CategoriesOrientationUrgenceFiltersInput>;
  or: InputMaybe<Array<InputMaybe<CategoriesOrientationUrgenceFiltersInput>>>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type CategoriesOrientationUrgenceInput = {
  Nom: InputMaybe<Scalars['String']['input']>;
  Poids: InputMaybe<Scalars['Int']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoriesOrientationUrgenceRelationResponseCollection = {
  __typename?: 'CategoriesOrientationUrgenceRelationResponseCollection';
  data: Array<CategoriesOrientationUrgenceEntity>;
};

export type ComponentFooterLiensRapides = {
  __typename?: 'ComponentFooterLiensRapides';
  Nom: Maybe<Scalars['String']['output']>;
  Url: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentFooterLiensRapidesFiltersInput = {
  Nom: InputMaybe<StringFilterInput>;
  Url: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<ComponentFooterLiensRapidesFiltersInput>>>;
  not: InputMaybe<ComponentFooterLiensRapidesFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentFooterLiensRapidesFiltersInput>>>;
};

export type ComponentFooterLiensRapidesInput = {
  Nom: InputMaybe<Scalars['String']['input']>;
  Url: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentFooterServices = {
  __typename?: 'ComponentFooterServices';
  Nom: Maybe<Scalars['String']['output']>;
  Url: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentFooterServicesFiltersInput = {
  Nom: InputMaybe<StringFilterInput>;
  Url: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<ComponentFooterServicesFiltersInput>>>;
  not: InputMaybe<ComponentFooterServicesFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentFooterServicesFiltersInput>>>;
};

export type ComponentFooterServicesInput = {
  Nom: InputMaybe<Scalars['String']['input']>;
  Url: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentFooterSocial = {
  __typename?: 'ComponentFooterSocial';
  Icone: Maybe<Scalars['String']['output']>;
  Nom: Maybe<Scalars['String']['output']>;
  Url: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentFooterSocialFiltersInput = {
  Icone: InputMaybe<StringFilterInput>;
  Nom: InputMaybe<StringFilterInput>;
  Url: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<ComponentFooterSocialFiltersInput>>>;
  not: InputMaybe<ComponentFooterSocialFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentFooterSocialFiltersInput>>>;
};

export type ComponentFooterSocialInput = {
  Icone: InputMaybe<Scalars['String']['input']>;
  Nom: InputMaybe<Scalars['String']['input']>;
  Url: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentGeneraleFooter = {
  __typename?: 'ComponentGeneraleFooter';
  Copyright: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentGeneraleFooterInput = {
  Copyright: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentGeneraleHeader = {
  __typename?: 'ComponentGeneraleHeader';
  SousTitre: Maybe<Scalars['String']['output']>;
  Titre: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  pages: Maybe<PageRelationResponseCollection>;
};


export type ComponentGeneraleHeaderPagesArgs = {
  filters: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentGeneraleHeaderInput = {
  SousTitre: InputMaybe<Scalars['String']['input']>;
  Titre: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  pages: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ComponentGeneraleSeo = {
  __typename?: 'ComponentGeneraleSeo';
  Description: Maybe<Scalars['String']['output']>;
  Enabled: Maybe<Scalars['Boolean']['output']>;
  Title: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentGeneraleSeoFiltersInput = {
  Description: InputMaybe<StringFilterInput>;
  Enabled: InputMaybe<BooleanFilterInput>;
  Title: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<ComponentGeneraleSeoFiltersInput>>>;
  not: InputMaybe<ComponentGeneraleSeoFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentGeneraleSeoFiltersInput>>>;
};

export type ComponentGeneraleSeoInput = {
  Description: InputMaybe<Scalars['String']['input']>;
  Enabled: InputMaybe<Scalars['Boolean']['input']>;
  Title: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentHelpPage = {
  __typename?: 'ComponentHelpPage';
  Contenu: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ComponentHelpPageFiltersInput = {
  Contenu: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<ComponentHelpPageFiltersInput>>>;
  not: InputMaybe<ComponentHelpPageFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentHelpPageFiltersInput>>>;
};

export type ComponentHelpPageInput = {
  Contenu: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentLinksLinks = {
  __typename?: 'ComponentLinksLinks';
  Link: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentOrientationsOrientations = {
  __typename?: 'ComponentOrientationsOrientations';
  Adresse: Maybe<Scalars['String']['output']>;
  Email: Maybe<Scalars['String']['output']>;
  Nom: Scalars['String']['output'];
  Telephone: Maybe<Scalars['String']['output']>;
  c_a_o: Maybe<CategoriesOrientationUrgenceEntityResponse>;
  id: Scalars['ID']['output'];
};

export type ComponentOrientationsOrientationsFiltersInput = {
  Adresse: InputMaybe<StringFilterInput>;
  Email: InputMaybe<StringFilterInput>;
  Nom: InputMaybe<StringFilterInput>;
  Telephone: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<ComponentOrientationsOrientationsFiltersInput>>>;
  c_a_o: InputMaybe<CategoriesOrientationUrgenceFiltersInput>;
  not: InputMaybe<ComponentOrientationsOrientationsFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentOrientationsOrientationsFiltersInput>>>;
};

export type ComponentOrientationsOrientationsInput = {
  Adresse: InputMaybe<Scalars['String']['input']>;
  Email: InputMaybe<Scalars['String']['input']>;
  Nom: InputMaybe<Scalars['String']['input']>;
  Telephone: InputMaybe<Scalars['String']['input']>;
  c_a_o: InputMaybe<Scalars['ID']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentUrgencesUrgences = {
  __typename?: 'ComponentUrgencesUrgences';
  Adresse: Maybe<Scalars['String']['output']>;
  Nom: Maybe<Scalars['String']['output']>;
  Telephone: Maybe<Scalars['String']['output']>;
  c_o_u: Maybe<CategoriesOrientationUrgenceEntityResponse>;
  id: Scalars['ID']['output'];
};

export type ComponentUrgencesUrgencesFiltersInput = {
  Adresse: InputMaybe<StringFilterInput>;
  Nom: InputMaybe<StringFilterInput>;
  Telephone: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<ComponentUrgencesUrgencesFiltersInput>>>;
  c_o_u: InputMaybe<CategoriesOrientationUrgenceFiltersInput>;
  not: InputMaybe<ComponentUrgencesUrgencesFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentUrgencesUrgencesFiltersInput>>>;
};

export type ComponentUrgencesUrgencesInput = {
  Adresse: InputMaybe<Scalars['String']['input']>;
  Nom: InputMaybe<Scalars['String']['input']>;
  Telephone: InputMaybe<Scalars['String']['input']>;
  c_o_u: InputMaybe<Scalars['ID']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentUtilsLink = {
  __typename?: 'ComponentUtilsLink';
  id: Scalars['ID']['output'];
  page: Maybe<PageEntityResponse>;
};

export type ComponentUtilsLinkInput = {
  id: InputMaybe<Scalars['ID']['input']>;
  page: InputMaybe<Scalars['ID']['input']>;
};

export type DateTimeFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains: InputMaybe<Scalars['DateTime']['input']>;
  containsi: InputMaybe<Scalars['DateTime']['input']>;
  endsWith: InputMaybe<Scalars['DateTime']['input']>;
  eq: InputMaybe<Scalars['DateTime']['input']>;
  eqi: InputMaybe<Scalars['DateTime']['input']>;
  gt: InputMaybe<Scalars['DateTime']['input']>;
  gte: InputMaybe<Scalars['DateTime']['input']>;
  in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt: InputMaybe<Scalars['DateTime']['input']>;
  lte: InputMaybe<Scalars['DateTime']['input']>;
  ne: InputMaybe<Scalars['DateTime']['input']>;
  nei: InputMaybe<Scalars['DateTime']['input']>;
  not: InputMaybe<DateTimeFilterInput>;
  notContains: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi: InputMaybe<Scalars['DateTime']['input']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull: InputMaybe<Scalars['Boolean']['input']>;
  null: InputMaybe<Scalars['Boolean']['input']>;
  or: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith: InputMaybe<Scalars['DateTime']['input']>;
};

export type FileInfoInput = {
  alternativeText: InputMaybe<Scalars['String']['input']>;
  caption: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains: InputMaybe<Scalars['Float']['input']>;
  containsi: InputMaybe<Scalars['Float']['input']>;
  endsWith: InputMaybe<Scalars['Float']['input']>;
  eq: InputMaybe<Scalars['Float']['input']>;
  eqi: InputMaybe<Scalars['Float']['input']>;
  gt: InputMaybe<Scalars['Float']['input']>;
  gte: InputMaybe<Scalars['Float']['input']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt: InputMaybe<Scalars['Float']['input']>;
  lte: InputMaybe<Scalars['Float']['input']>;
  ne: InputMaybe<Scalars['Float']['input']>;
  nei: InputMaybe<Scalars['Float']['input']>;
  not: InputMaybe<FloatFilterInput>;
  notContains: InputMaybe<Scalars['Float']['input']>;
  notContainsi: InputMaybe<Scalars['Float']['input']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull: InputMaybe<Scalars['Boolean']['input']>;
  null: InputMaybe<Scalars['Boolean']['input']>;
  or: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith: InputMaybe<Scalars['Float']['input']>;
};

export type Footer = {
  __typename?: 'Footer';
  Adresse: Maybe<Scalars['String']['output']>;
  Email: Maybe<Scalars['String']['output']>;
  Footer: Maybe<ComponentGeneraleFooter>;
  LiensRapides: Maybe<Array<Maybe<ComponentFooterLiensRapides>>>;
  Services: Maybe<Array<Maybe<ComponentFooterServices>>>;
  Social: Maybe<Array<Maybe<ComponentFooterSocial>>>;
  Telephone: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<FooterRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type FooterLiensRapidesArgs = {
  filters: InputMaybe<ComponentFooterLiensRapidesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type FooterServicesArgs = {
  filters: InputMaybe<ComponentFooterServicesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type FooterSocialArgs = {
  filters: InputMaybe<ComponentFooterSocialFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type FooterLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type FooterEntity = {
  __typename?: 'FooterEntity';
  attributes: Maybe<Footer>;
  id: Maybe<Scalars['ID']['output']>;
};

export type FooterEntityResponse = {
  __typename?: 'FooterEntityResponse';
  data: Maybe<FooterEntity>;
};

export type FooterInput = {
  Adresse: InputMaybe<Scalars['String']['input']>;
  Email: InputMaybe<Scalars['String']['input']>;
  Footer: InputMaybe<ComponentGeneraleFooterInput>;
  LiensRapides: InputMaybe<Array<InputMaybe<ComponentFooterLiensRapidesInput>>>;
  Services: InputMaybe<Array<InputMaybe<ComponentFooterServicesInput>>>;
  Social: InputMaybe<Array<InputMaybe<ComponentFooterSocialInput>>>;
  Telephone: InputMaybe<Scalars['String']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type FooterRelationResponseCollection = {
  __typename?: 'FooterRelationResponseCollection';
  data: Array<FooterEntity>;
};

export type GenericMorph = About | Categorie | CategoriesOrientationUrgence | ComponentFooterLiensRapides | ComponentFooterServices | ComponentFooterSocial | ComponentGeneraleFooter | ComponentGeneraleHeader | ComponentGeneraleSeo | ComponentHelpPage | ComponentLinksLinks | ComponentOrientationsOrientations | ComponentUrgencesUrgences | ComponentUtilsLink | Footer | Header | Help | Home | I18NLocale | Langue | Organisme | Orientation | Page | PublicSpecifique | ReactIconsIconlibrary | SearchOrganization | Service | SlugifySlug | SousCategorie | ToolBox | Traduction | UploadFile | UploadFolder | Urgence | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type Header = {
  __typename?: 'Header';
  Header: Maybe<ComponentGeneraleHeader>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<HeaderRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type HeaderLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type HeaderEntity = {
  __typename?: 'HeaderEntity';
  attributes: Maybe<Header>;
  id: Maybe<Scalars['ID']['output']>;
};

export type HeaderEntityResponse = {
  __typename?: 'HeaderEntityResponse';
  data: Maybe<HeaderEntity>;
};

export type HeaderInput = {
  Header: InputMaybe<ComponentGeneraleHeaderInput>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type HeaderRelationResponseCollection = {
  __typename?: 'HeaderRelationResponseCollection';
  data: Array<HeaderEntity>;
};

export type Help = {
  __typename?: 'Help';
  Page: Maybe<Array<Maybe<ComponentHelpPage>>>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<HelpRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type HelpPageArgs = {
  filters: InputMaybe<ComponentHelpPageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type HelpLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type HelpEntity = {
  __typename?: 'HelpEntity';
  attributes: Maybe<Help>;
  id: Maybe<Scalars['ID']['output']>;
};

export type HelpEntityResponse = {
  __typename?: 'HelpEntityResponse';
  data: Maybe<HelpEntity>;
};

export type HelpInput = {
  Page: InputMaybe<Array<InputMaybe<ComponentHelpPageInput>>>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type HelpRelationResponseCollection = {
  __typename?: 'HelpRelationResponseCollection';
  data: Array<HelpEntity>;
};

export type Home = {
  __typename?: 'Home';
  OrientationsLink: Scalars['String']['output'];
  SearchLink: Scalars['String']['output'];
  UrgencesLink: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<HomeRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type HomeLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type HomeEntity = {
  __typename?: 'HomeEntity';
  attributes: Maybe<Home>;
  id: Maybe<Scalars['ID']['output']>;
};

export type HomeEntityResponse = {
  __typename?: 'HomeEntityResponse';
  data: Maybe<HomeEntity>;
};

export type HomeInput = {
  OrientationsLink: InputMaybe<Scalars['String']['input']>;
  SearchLink: InputMaybe<Scalars['String']['input']>;
  UrgencesLink: InputMaybe<Scalars['String']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type HomeRelationResponseCollection = {
  __typename?: 'HomeRelationResponseCollection';
  data: Array<HomeEntity>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  name: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes: Maybe<I18NLocale>;
  id: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code: InputMaybe<StringFilterInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<I18NLocaleFiltersInput>;
  or: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains: InputMaybe<Scalars['ID']['input']>;
  containsi: InputMaybe<Scalars['ID']['input']>;
  endsWith: InputMaybe<Scalars['ID']['input']>;
  eq: InputMaybe<Scalars['ID']['input']>;
  eqi: InputMaybe<Scalars['ID']['input']>;
  gt: InputMaybe<Scalars['ID']['input']>;
  gte: InputMaybe<Scalars['ID']['input']>;
  in: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt: InputMaybe<Scalars['ID']['input']>;
  lte: InputMaybe<Scalars['ID']['input']>;
  ne: InputMaybe<Scalars['ID']['input']>;
  nei: InputMaybe<Scalars['ID']['input']>;
  not: InputMaybe<IdFilterInput>;
  notContains: InputMaybe<Scalars['ID']['input']>;
  notContainsi: InputMaybe<Scalars['ID']['input']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull: InputMaybe<Scalars['Boolean']['input']>;
  null: InputMaybe<Scalars['Boolean']['input']>;
  or: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains: InputMaybe<Scalars['Int']['input']>;
  containsi: InputMaybe<Scalars['Int']['input']>;
  endsWith: InputMaybe<Scalars['Int']['input']>;
  eq: InputMaybe<Scalars['Int']['input']>;
  eqi: InputMaybe<Scalars['Int']['input']>;
  gt: InputMaybe<Scalars['Int']['input']>;
  gte: InputMaybe<Scalars['Int']['input']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt: InputMaybe<Scalars['Int']['input']>;
  lte: InputMaybe<Scalars['Int']['input']>;
  ne: InputMaybe<Scalars['Int']['input']>;
  nei: InputMaybe<Scalars['Int']['input']>;
  not: InputMaybe<IntFilterInput>;
  notContains: InputMaybe<Scalars['Int']['input']>;
  notContainsi: InputMaybe<Scalars['Int']['input']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull: InputMaybe<Scalars['Boolean']['input']>;
  null: InputMaybe<Scalars['Boolean']['input']>;
  or: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains: InputMaybe<Scalars['JSON']['input']>;
  containsi: InputMaybe<Scalars['JSON']['input']>;
  endsWith: InputMaybe<Scalars['JSON']['input']>;
  eq: InputMaybe<Scalars['JSON']['input']>;
  eqi: InputMaybe<Scalars['JSON']['input']>;
  gt: InputMaybe<Scalars['JSON']['input']>;
  gte: InputMaybe<Scalars['JSON']['input']>;
  in: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt: InputMaybe<Scalars['JSON']['input']>;
  lte: InputMaybe<Scalars['JSON']['input']>;
  ne: InputMaybe<Scalars['JSON']['input']>;
  nei: InputMaybe<Scalars['JSON']['input']>;
  not: InputMaybe<JsonFilterInput>;
  notContains: InputMaybe<Scalars['JSON']['input']>;
  notContainsi: InputMaybe<Scalars['JSON']['input']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull: InputMaybe<Scalars['Boolean']['input']>;
  null: InputMaybe<Scalars['Boolean']['input']>;
  or: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith: InputMaybe<Scalars['JSON']['input']>;
};

export type Langue = {
  __typename?: 'Langue';
  Drapeau: Maybe<UploadFileEntityResponse>;
  Nom: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<LangueRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type LangueLocalizationsArgs = {
  filters: InputMaybe<LangueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LangueEntity = {
  __typename?: 'LangueEntity';
  attributes: Maybe<Langue>;
  id: Maybe<Scalars['ID']['output']>;
};

export type LangueEntityResponse = {
  __typename?: 'LangueEntityResponse';
  data: Maybe<LangueEntity>;
};

export type LangueEntityResponseCollection = {
  __typename?: 'LangueEntityResponseCollection';
  data: Array<LangueEntity>;
  meta: ResponseCollectionMeta;
};

export type LangueFiltersInput = {
  Nom: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<LangueFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  locale: InputMaybe<StringFilterInput>;
  localizations: InputMaybe<LangueFiltersInput>;
  not: InputMaybe<LangueFiltersInput>;
  or: InputMaybe<Array<InputMaybe<LangueFiltersInput>>>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type LangueInput = {
  Drapeau: InputMaybe<Scalars['ID']['input']>;
  Nom: InputMaybe<Scalars['String']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type LangueRelationResponseCollection = {
  __typename?: 'LangueRelationResponseCollection';
  data: Array<LangueEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword: Maybe<UsersPermissionsLoginPayload>;
  createAboutLocalization: Maybe<AboutEntityResponse>;
  createCategorie: Maybe<CategorieEntityResponse>;
  createCategorieLocalization: Maybe<CategorieEntityResponse>;
  createCategoriesOrientationUrgence: Maybe<CategoriesOrientationUrgenceEntityResponse>;
  createCategoriesOrientationUrgenceLocalization: Maybe<CategoriesOrientationUrgenceEntityResponse>;
  createFooterLocalization: Maybe<FooterEntityResponse>;
  createHeaderLocalization: Maybe<HeaderEntityResponse>;
  createHelpLocalization: Maybe<HelpEntityResponse>;
  createHomeLocalization: Maybe<HomeEntityResponse>;
  createLangue: Maybe<LangueEntityResponse>;
  createLangueLocalization: Maybe<LangueEntityResponse>;
  createOrganisme: Maybe<OrganismeEntityResponse>;
  createOrganismeLocalization: Maybe<OrganismeEntityResponse>;
  createOrientationLocalization: Maybe<OrientationEntityResponse>;
  createPage: Maybe<PageEntityResponse>;
  createPageLocalization: Maybe<PageEntityResponse>;
  createPublicSpecifique: Maybe<PublicSpecifiqueEntityResponse>;
  createPublicSpecifiqueLocalization: Maybe<PublicSpecifiqueEntityResponse>;
  createReactIconsIconlibrary: Maybe<ReactIconsIconlibraryEntityResponse>;
  createSearchOrganizationLocalization: Maybe<SearchOrganizationEntityResponse>;
  createService: Maybe<ServiceEntityResponse>;
  createServiceLocalization: Maybe<ServiceEntityResponse>;
  createSlugifySlug: Maybe<SlugifySlugEntityResponse>;
  createSousCategorie: Maybe<SousCategorieEntityResponse>;
  createSousCategorieLocalization: Maybe<SousCategorieEntityResponse>;
  createTraduction: Maybe<TraductionEntityResponse>;
  createTraductionLocalization: Maybe<TraductionEntityResponse>;
  createUploadFile: Maybe<UploadFileEntityResponse>;
  createUploadFolder: Maybe<UploadFolderEntityResponse>;
  createUrgenceLocalization: Maybe<UrgenceEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteAbout: Maybe<AboutEntityResponse>;
  deleteCategorie: Maybe<CategorieEntityResponse>;
  deleteCategoriesOrientationUrgence: Maybe<CategoriesOrientationUrgenceEntityResponse>;
  deleteFooter: Maybe<FooterEntityResponse>;
  deleteHeader: Maybe<HeaderEntityResponse>;
  deleteHelp: Maybe<HelpEntityResponse>;
  deleteHome: Maybe<HomeEntityResponse>;
  deleteLangue: Maybe<LangueEntityResponse>;
  deleteOrganisme: Maybe<OrganismeEntityResponse>;
  deleteOrientation: Maybe<OrientationEntityResponse>;
  deletePage: Maybe<PageEntityResponse>;
  deletePublicSpecifique: Maybe<PublicSpecifiqueEntityResponse>;
  deleteReactIconsIconlibrary: Maybe<ReactIconsIconlibraryEntityResponse>;
  deleteSearchOrganization: Maybe<SearchOrganizationEntityResponse>;
  deleteService: Maybe<ServiceEntityResponse>;
  deleteSlugifySlug: Maybe<SlugifySlugEntityResponse>;
  deleteSousCategorie: Maybe<SousCategorieEntityResponse>;
  deleteToolBox: Maybe<ToolBoxEntityResponse>;
  deleteTraduction: Maybe<TraductionEntityResponse>;
  deleteUploadFile: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder: Maybe<UploadFolderEntityResponse>;
  deleteUrgence: Maybe<UrgenceEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword: Maybe<UsersPermissionsLoginPayload>;
  updateAbout: Maybe<AboutEntityResponse>;
  updateCategorie: Maybe<CategorieEntityResponse>;
  updateCategoriesOrientationUrgence: Maybe<CategoriesOrientationUrgenceEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateFooter: Maybe<FooterEntityResponse>;
  updateHeader: Maybe<HeaderEntityResponse>;
  updateHelp: Maybe<HelpEntityResponse>;
  updateHome: Maybe<HomeEntityResponse>;
  updateLangue: Maybe<LangueEntityResponse>;
  updateOrganisme: Maybe<OrganismeEntityResponse>;
  updateOrientation: Maybe<OrientationEntityResponse>;
  updatePage: Maybe<PageEntityResponse>;
  updatePublicSpecifique: Maybe<PublicSpecifiqueEntityResponse>;
  updateReactIconsIconlibrary: Maybe<ReactIconsIconlibraryEntityResponse>;
  updateSearchOrganization: Maybe<SearchOrganizationEntityResponse>;
  updateService: Maybe<ServiceEntityResponse>;
  updateSlugifySlug: Maybe<SlugifySlugEntityResponse>;
  updateSousCategorie: Maybe<SousCategorieEntityResponse>;
  updateToolBox: Maybe<ToolBoxEntityResponse>;
  updateTraduction: Maybe<TraductionEntityResponse>;
  updateUploadFile: Maybe<UploadFileEntityResponse>;
  updateUploadFolder: Maybe<UploadFolderEntityResponse>;
  updateUrgence: Maybe<UrgenceEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateAboutLocalizationArgs = {
  data: InputMaybe<AboutInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateCategorieArgs = {
  data: CategorieInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateCategorieLocalizationArgs = {
  data: InputMaybe<CategorieInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateCategoriesOrientationUrgenceArgs = {
  data: CategoriesOrientationUrgenceInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateCategoriesOrientationUrgenceLocalizationArgs = {
  data: InputMaybe<CategoriesOrientationUrgenceInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateFooterLocalizationArgs = {
  data: InputMaybe<FooterInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateHeaderLocalizationArgs = {
  data: InputMaybe<HeaderInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateHelpLocalizationArgs = {
  data: InputMaybe<HelpInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateHomeLocalizationArgs = {
  data: InputMaybe<HomeInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateLangueArgs = {
  data: LangueInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateLangueLocalizationArgs = {
  data: InputMaybe<LangueInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateOrganismeArgs = {
  data: OrganismeInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateOrganismeLocalizationArgs = {
  data: InputMaybe<OrganismeInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateOrientationLocalizationArgs = {
  data: InputMaybe<OrientationInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreatePageArgs = {
  data: PageInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreatePageLocalizationArgs = {
  data: InputMaybe<PageInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreatePublicSpecifiqueArgs = {
  data: PublicSpecifiqueInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreatePublicSpecifiqueLocalizationArgs = {
  data: InputMaybe<PublicSpecifiqueInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateReactIconsIconlibraryArgs = {
  data: ReactIconsIconlibraryInput;
};


export type MutationCreateSearchOrganizationLocalizationArgs = {
  data: InputMaybe<SearchOrganizationInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateServiceArgs = {
  data: ServiceInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateServiceLocalizationArgs = {
  data: InputMaybe<ServiceInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateSlugifySlugArgs = {
  data: SlugifySlugInput;
};


export type MutationCreateSousCategorieArgs = {
  data: SousCategorieInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateSousCategorieLocalizationArgs = {
  data: InputMaybe<SousCategorieInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateTraductionArgs = {
  data: TraductionInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateTraductionLocalizationArgs = {
  data: InputMaybe<TraductionInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUrgenceLocalizationArgs = {
  data: InputMaybe<UrgenceInput>;
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteAboutArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteCategorieArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteCategoriesOrientationUrgenceArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteFooterArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteHeaderArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteHelpArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteHomeArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteLangueArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteOrganismeArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteOrientationArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeletePageArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeletePublicSpecifiqueArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteReactIconsIconlibraryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSearchOrganizationArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteServiceArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteSlugifySlugArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSousCategorieArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteTraductionArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUrgenceArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field: InputMaybe<Scalars['String']['input']>;
  files: Array<InputMaybe<Scalars['Upload']['input']>>;
  ref: InputMaybe<Scalars['String']['input']>;
  refId: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateAboutArgs = {
  data: AboutInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateCategorieArgs = {
  data: CategorieInput;
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateCategoriesOrientationUrgenceArgs = {
  data: CategoriesOrientationUrgenceInput;
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']['input'];
  info: InputMaybe<FileInfoInput>;
};


export type MutationUpdateFooterArgs = {
  data: FooterInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateHeaderArgs = {
  data: HeaderInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateHelpArgs = {
  data: HelpInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateHomeArgs = {
  data: HomeInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateLangueArgs = {
  data: LangueInput;
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateOrganismeArgs = {
  data: OrganismeInput;
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateOrientationArgs = {
  data: OrientationInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdatePublicSpecifiqueArgs = {
  data: PublicSpecifiqueInput;
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateReactIconsIconlibraryArgs = {
  data: ReactIconsIconlibraryInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateSearchOrganizationArgs = {
  data: SearchOrganizationInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateServiceArgs = {
  data: ServiceInput;
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateSlugifySlugArgs = {
  data: SlugifySlugInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateSousCategorieArgs = {
  data: SousCategorieInput;
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateToolBoxArgs = {
  data: ToolBoxInput;
};


export type MutationUpdateTraductionArgs = {
  data: TraductionInput;
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUrgenceArgs = {
  data: UrgenceInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUploadArgs = {
  field: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  info: InputMaybe<FileInfoInput>;
  ref: InputMaybe<Scalars['String']['input']>;
  refId: InputMaybe<Scalars['ID']['input']>;
};

export type Organisme = {
  __typename?: 'Organisme';
  Adresse: Maybe<Scalars['String']['output']>;
  Conditions: Maybe<Scalars['String']['output']>;
  Departement: Maybe<Scalars['String']['output']>;
  Description: Scalars['String']['output'];
  Email: Maybe<Scalars['String']['output']>;
  Horaires: Maybe<Scalars['String']['output']>;
  Latitude: Maybe<Scalars['Float']['output']>;
  Logo: Maybe<UploadFileEntityResponse>;
  Longitude: Maybe<Scalars['Float']['output']>;
  Nom: Scalars['String']['output'];
  Referencement_internet: Maybe<Scalars['Boolean']['output']>;
  Telephone: Maybe<Scalars['String']['output']>;
  Website: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  generatedUrl: Scalars['String']['output'];
  langues: Maybe<LangueRelationResponseCollection>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<OrganismeRelationResponseCollection>;
  public_specifiques: Maybe<PublicSpecifiqueRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  services: Maybe<ServiceRelationResponseCollection>;
  sous_categories: Maybe<SousCategorieRelationResponseCollection>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type OrganismeLanguesArgs = {
  filters: InputMaybe<LangueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrganismeLocalizationsArgs = {
  filters: InputMaybe<OrganismeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrganismePublic_SpecifiquesArgs = {
  filters: InputMaybe<PublicSpecifiqueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrganismeServicesArgs = {
  filters: InputMaybe<ServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrganismeSous_CategoriesArgs = {
  filters: InputMaybe<SousCategorieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OrganismeEntity = {
  __typename?: 'OrganismeEntity';
  attributes: Maybe<Organisme>;
  id: Maybe<Scalars['ID']['output']>;
};

export type OrganismeEntityResponse = {
  __typename?: 'OrganismeEntityResponse';
  data: Maybe<OrganismeEntity>;
};

export type OrganismeEntityResponseCollection = {
  __typename?: 'OrganismeEntityResponseCollection';
  data: Array<OrganismeEntity>;
  meta: ResponseCollectionMeta;
};

export type OrganismeFiltersInput = {
  Adresse: InputMaybe<StringFilterInput>;
  Conditions: InputMaybe<StringFilterInput>;
  Departement: InputMaybe<StringFilterInput>;
  Description: InputMaybe<StringFilterInput>;
  Email: InputMaybe<StringFilterInput>;
  Horaires: InputMaybe<StringFilterInput>;
  Latitude: InputMaybe<FloatFilterInput>;
  Longitude: InputMaybe<FloatFilterInput>;
  Nom: InputMaybe<StringFilterInput>;
  Referencement_internet: InputMaybe<BooleanFilterInput>;
  Telephone: InputMaybe<StringFilterInput>;
  Website: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<OrganismeFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  generatedUrl: InputMaybe<StringFilterInput>;
  id: InputMaybe<IdFilterInput>;
  langues: InputMaybe<LangueFiltersInput>;
  locale: InputMaybe<StringFilterInput>;
  localizations: InputMaybe<OrganismeFiltersInput>;
  not: InputMaybe<OrganismeFiltersInput>;
  or: InputMaybe<Array<InputMaybe<OrganismeFiltersInput>>>;
  public_specifiques: InputMaybe<PublicSpecifiqueFiltersInput>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  services: InputMaybe<ServiceFiltersInput>;
  sous_categories: InputMaybe<SousCategorieFiltersInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type OrganismeInput = {
  Adresse: InputMaybe<Scalars['String']['input']>;
  Conditions: InputMaybe<Scalars['String']['input']>;
  Departement: InputMaybe<Scalars['String']['input']>;
  Description: InputMaybe<Scalars['String']['input']>;
  Email: InputMaybe<Scalars['String']['input']>;
  Horaires: InputMaybe<Scalars['String']['input']>;
  Latitude: InputMaybe<Scalars['Float']['input']>;
  Logo: InputMaybe<Scalars['ID']['input']>;
  Longitude: InputMaybe<Scalars['Float']['input']>;
  Nom: InputMaybe<Scalars['String']['input']>;
  Referencement_internet: InputMaybe<Scalars['Boolean']['input']>;
  Telephone: InputMaybe<Scalars['String']['input']>;
  Website: InputMaybe<Scalars['String']['input']>;
  generatedUrl: InputMaybe<Scalars['String']['input']>;
  langues: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  public_specifiques: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  services: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sous_categories: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type OrganismeRelationResponseCollection = {
  __typename?: 'OrganismeRelationResponseCollection';
  data: Array<OrganismeEntity>;
};

export type Orientation = {
  __typename?: 'Orientation';
  Orientation: Maybe<Array<Maybe<ComponentOrientationsOrientations>>>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<OrientationRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type OrientationOrientationArgs = {
  filters: InputMaybe<ComponentOrientationsOrientationsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrientationLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type OrientationEntity = {
  __typename?: 'OrientationEntity';
  attributes: Maybe<Orientation>;
  id: Maybe<Scalars['ID']['output']>;
};

export type OrientationEntityResponse = {
  __typename?: 'OrientationEntityResponse';
  data: Maybe<OrientationEntity>;
};

export type OrientationInput = {
  Orientation: InputMaybe<Array<InputMaybe<ComponentOrientationsOrientationsInput>>>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrientationRelationResponseCollection = {
  __typename?: 'OrientationRelationResponseCollection';
  data: Array<OrientationEntity>;
};

export type Page = {
  __typename?: 'Page';
  ContentType: Scalars['String']['output'];
  SEO: ComponentGeneraleSeo;
  Titre: Scalars['String']['output'];
  Url: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<PageRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type PageLocalizationsArgs = {
  filters: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PageEntity = {
  __typename?: 'PageEntity';
  attributes: Maybe<Page>;
  id: Maybe<Scalars['ID']['output']>;
};

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse';
  data: Maybe<PageEntity>;
};

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection';
  data: Array<PageEntity>;
  meta: ResponseCollectionMeta;
};

export type PageFiltersInput = {
  ContentType: InputMaybe<StringFilterInput>;
  SEO: InputMaybe<ComponentGeneraleSeoFiltersInput>;
  Titre: InputMaybe<StringFilterInput>;
  Url: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  locale: InputMaybe<StringFilterInput>;
  localizations: InputMaybe<PageFiltersInput>;
  not: InputMaybe<PageFiltersInput>;
  or: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
  ContentType: InputMaybe<Scalars['String']['input']>;
  SEO: InputMaybe<ComponentGeneraleSeoInput>;
  Titre: InputMaybe<Scalars['String']['input']>;
  Url: InputMaybe<Scalars['String']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection';
  data: Array<PageEntity>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit: InputMaybe<Scalars['Int']['input']>;
  page: InputMaybe<Scalars['Int']['input']>;
  pageSize: InputMaybe<Scalars['Int']['input']>;
  start: InputMaybe<Scalars['Int']['input']>;
};

export type PublicSpecifique = {
  __typename?: 'PublicSpecifique';
  Nom: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<PublicSpecifiqueRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type PublicSpecifiqueLocalizationsArgs = {
  filters: InputMaybe<PublicSpecifiqueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PublicSpecifiqueEntity = {
  __typename?: 'PublicSpecifiqueEntity';
  attributes: Maybe<PublicSpecifique>;
  id: Maybe<Scalars['ID']['output']>;
};

export type PublicSpecifiqueEntityResponse = {
  __typename?: 'PublicSpecifiqueEntityResponse';
  data: Maybe<PublicSpecifiqueEntity>;
};

export type PublicSpecifiqueEntityResponseCollection = {
  __typename?: 'PublicSpecifiqueEntityResponseCollection';
  data: Array<PublicSpecifiqueEntity>;
  meta: ResponseCollectionMeta;
};

export type PublicSpecifiqueFiltersInput = {
  Nom: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<PublicSpecifiqueFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  locale: InputMaybe<StringFilterInput>;
  localizations: InputMaybe<PublicSpecifiqueFiltersInput>;
  not: InputMaybe<PublicSpecifiqueFiltersInput>;
  or: InputMaybe<Array<InputMaybe<PublicSpecifiqueFiltersInput>>>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type PublicSpecifiqueInput = {
  Nom: InputMaybe<Scalars['String']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type PublicSpecifiqueRelationResponseCollection = {
  __typename?: 'PublicSpecifiqueRelationResponseCollection';
  data: Array<PublicSpecifiqueEntity>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  about: Maybe<AboutEntityResponse>;
  categorie: Maybe<CategorieEntityResponse>;
  categories: Maybe<CategorieEntityResponseCollection>;
  categoriesOrientationUrgence: Maybe<CategoriesOrientationUrgenceEntityResponse>;
  categoriesOrientationUrgences: Maybe<CategoriesOrientationUrgenceEntityResponseCollection>;
  footer: Maybe<FooterEntityResponse>;
  header: Maybe<HeaderEntityResponse>;
  help: Maybe<HelpEntityResponse>;
  home: Maybe<HomeEntityResponse>;
  i18NLocale: Maybe<I18NLocaleEntityResponse>;
  i18NLocales: Maybe<I18NLocaleEntityResponseCollection>;
  langue: Maybe<LangueEntityResponse>;
  langues: Maybe<LangueEntityResponseCollection>;
  me: Maybe<UsersPermissionsMe>;
  organisme: Maybe<OrganismeEntityResponse>;
  organismes: Maybe<OrganismeEntityResponseCollection>;
  orientation: Maybe<OrientationEntityResponse>;
  page: Maybe<PageEntityResponse>;
  pages: Maybe<PageEntityResponseCollection>;
  publicSpecifique: Maybe<PublicSpecifiqueEntityResponse>;
  publicSpecifiques: Maybe<PublicSpecifiqueEntityResponseCollection>;
  reactIconsIconlibraries: Maybe<ReactIconsIconlibraryEntityResponseCollection>;
  reactIconsIconlibrary: Maybe<ReactIconsIconlibraryEntityResponse>;
  searchOrganization: Maybe<SearchOrganizationEntityResponse>;
  service: Maybe<ServiceEntityResponse>;
  services: Maybe<ServiceEntityResponseCollection>;
  slugifySlug: Maybe<SlugifySlugEntityResponse>;
  slugifySlugs: Maybe<SlugifySlugEntityResponseCollection>;
  sousCategorie: Maybe<SousCategorieEntityResponse>;
  sousCategories: Maybe<SousCategorieEntityResponseCollection>;
  toolBox: Maybe<ToolBoxEntityResponse>;
  traduction: Maybe<TraductionEntityResponse>;
  traductions: Maybe<TraductionEntityResponseCollection>;
  uploadFile: Maybe<UploadFileEntityResponse>;
  uploadFiles: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder: Maybe<UploadFolderEntityResponse>;
  uploadFolders: Maybe<UploadFolderEntityResponseCollection>;
  urgence: Maybe<UrgenceEntityResponse>;
  usersPermissionsRole: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryAboutArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryCategorieArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryCategoriesArgs = {
  filters: InputMaybe<CategorieFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCategoriesOrientationUrgenceArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryCategoriesOrientationUrgencesArgs = {
  filters: InputMaybe<CategoriesOrientationUrgenceFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryFooterArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryHeaderArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryHelpArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryHomeArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryI18NLocaleArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryI18NLocalesArgs = {
  filters: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryLangueArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryLanguesArgs = {
  filters: InputMaybe<LangueFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryOrganismeArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryOrganismesArgs = {
  filters: InputMaybe<OrganismeFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryOrientationArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryPageArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryPagesArgs = {
  filters: InputMaybe<PageFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPublicSpecifiqueArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryPublicSpecifiquesArgs = {
  filters: InputMaybe<PublicSpecifiqueFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryReactIconsIconlibrariesArgs = {
  filters: InputMaybe<ReactIconsIconlibraryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryReactIconsIconlibraryArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySearchOrganizationArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryServiceArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryServicesArgs = {
  filters: InputMaybe<ServiceFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySlugifySlugArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySlugifySlugsArgs = {
  filters: InputMaybe<SlugifySlugFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySousCategorieArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QuerySousCategoriesArgs = {
  filters: InputMaybe<SousCategorieFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryToolBoxArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryTraductionArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryTraductionsArgs = {
  filters: InputMaybe<TraductionFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFileArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFilesArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFolderArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFoldersArgs = {
  filters: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUrgenceArgs = {
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryUsersPermissionsRoleArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ReactIconsIconlibrary = {
  __typename?: 'ReactIconsIconlibrary';
  abbreviation: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  isEnabled: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type ReactIconsIconlibraryEntity = {
  __typename?: 'ReactIconsIconlibraryEntity';
  attributes: Maybe<ReactIconsIconlibrary>;
  id: Maybe<Scalars['ID']['output']>;
};

export type ReactIconsIconlibraryEntityResponse = {
  __typename?: 'ReactIconsIconlibraryEntityResponse';
  data: Maybe<ReactIconsIconlibraryEntity>;
};

export type ReactIconsIconlibraryEntityResponseCollection = {
  __typename?: 'ReactIconsIconlibraryEntityResponseCollection';
  data: Array<ReactIconsIconlibraryEntity>;
  meta: ResponseCollectionMeta;
};

export type ReactIconsIconlibraryFiltersInput = {
  abbreviation: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<ReactIconsIconlibraryFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  isEnabled: InputMaybe<BooleanFilterInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<ReactIconsIconlibraryFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ReactIconsIconlibraryFiltersInput>>>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type ReactIconsIconlibraryInput = {
  abbreviation: InputMaybe<Scalars['String']['input']>;
  isEnabled: InputMaybe<Scalars['Boolean']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type SearchOrganization = {
  __typename?: 'SearchOrganization';
  OrganismeUrl: Maybe<ComponentUtilsLink>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<SearchOrganizationRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type SearchOrganizationLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type SearchOrganizationEntity = {
  __typename?: 'SearchOrganizationEntity';
  attributes: Maybe<SearchOrganization>;
  id: Maybe<Scalars['ID']['output']>;
};

export type SearchOrganizationEntityResponse = {
  __typename?: 'SearchOrganizationEntityResponse';
  data: Maybe<SearchOrganizationEntity>;
};

export type SearchOrganizationInput = {
  OrganismeUrl: InputMaybe<ComponentUtilsLinkInput>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type SearchOrganizationRelationResponseCollection = {
  __typename?: 'SearchOrganizationRelationResponseCollection';
  data: Array<SearchOrganizationEntity>;
};

export type Service = {
  __typename?: 'Service';
  Icone: Maybe<Scalars['String']['output']>;
  Nom: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<ServiceRelationResponseCollection>;
  organismes: Maybe<OrganismeRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type ServiceLocalizationsArgs = {
  filters: InputMaybe<ServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ServiceOrganismesArgs = {
  filters: InputMaybe<OrganismeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ServiceEntity = {
  __typename?: 'ServiceEntity';
  attributes: Maybe<Service>;
  id: Maybe<Scalars['ID']['output']>;
};

export type ServiceEntityResponse = {
  __typename?: 'ServiceEntityResponse';
  data: Maybe<ServiceEntity>;
};

export type ServiceEntityResponseCollection = {
  __typename?: 'ServiceEntityResponseCollection';
  data: Array<ServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type ServiceFiltersInput = {
  Icone: InputMaybe<StringFilterInput>;
  Nom: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<ServiceFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  locale: InputMaybe<StringFilterInput>;
  localizations: InputMaybe<ServiceFiltersInput>;
  not: InputMaybe<ServiceFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ServiceFiltersInput>>>;
  organismes: InputMaybe<OrganismeFiltersInput>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type ServiceInput = {
  Icone: InputMaybe<Scalars['String']['input']>;
  Nom: InputMaybe<Scalars['String']['input']>;
  organismes: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type ServiceRelationResponseCollection = {
  __typename?: 'ServiceRelationResponseCollection';
  data: Array<ServiceEntity>;
};

export type SlugifySlug = {
  __typename?: 'SlugifySlug';
  count: Maybe<Scalars['Int']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type SlugifySlugEntity = {
  __typename?: 'SlugifySlugEntity';
  attributes: Maybe<SlugifySlug>;
  id: Maybe<Scalars['ID']['output']>;
};

export type SlugifySlugEntityResponse = {
  __typename?: 'SlugifySlugEntityResponse';
  data: Maybe<SlugifySlugEntity>;
};

export type SlugifySlugEntityResponseCollection = {
  __typename?: 'SlugifySlugEntityResponseCollection';
  data: Array<SlugifySlugEntity>;
  meta: ResponseCollectionMeta;
};

export type SlugifySlugFiltersInput = {
  and: InputMaybe<Array<InputMaybe<SlugifySlugFiltersInput>>>;
  count: InputMaybe<IntFilterInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  not: InputMaybe<SlugifySlugFiltersInput>;
  or: InputMaybe<Array<InputMaybe<SlugifySlugFiltersInput>>>;
  slug: InputMaybe<StringFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type SlugifySlugInput = {
  count: InputMaybe<Scalars['Int']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
};

export type SousCategorie = {
  __typename?: 'SousCategorie';
  Nom: Scalars['String']['output'];
  SearchTerms: Maybe<Scalars['JSON']['output']>;
  Toolbox: Maybe<Scalars['String']['output']>;
  category: Maybe<CategorieEntityResponse>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<SousCategorieRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type SousCategorieLocalizationsArgs = {
  filters: InputMaybe<SousCategorieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SousCategorieEntity = {
  __typename?: 'SousCategorieEntity';
  attributes: Maybe<SousCategorie>;
  id: Maybe<Scalars['ID']['output']>;
};

export type SousCategorieEntityResponse = {
  __typename?: 'SousCategorieEntityResponse';
  data: Maybe<SousCategorieEntity>;
};

export type SousCategorieEntityResponseCollection = {
  __typename?: 'SousCategorieEntityResponseCollection';
  data: Array<SousCategorieEntity>;
  meta: ResponseCollectionMeta;
};

export type SousCategorieFiltersInput = {
  Nom: InputMaybe<StringFilterInput>;
  SearchTerms: InputMaybe<JsonFilterInput>;
  Toolbox: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<SousCategorieFiltersInput>>>;
  category: InputMaybe<CategorieFiltersInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  locale: InputMaybe<StringFilterInput>;
  localizations: InputMaybe<SousCategorieFiltersInput>;
  not: InputMaybe<SousCategorieFiltersInput>;
  or: InputMaybe<Array<InputMaybe<SousCategorieFiltersInput>>>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type SousCategorieInput = {
  Nom: InputMaybe<Scalars['String']['input']>;
  SearchTerms: InputMaybe<Scalars['JSON']['input']>;
  Toolbox: InputMaybe<Scalars['String']['input']>;
  category: InputMaybe<Scalars['ID']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type SousCategorieRelationResponseCollection = {
  __typename?: 'SousCategorieRelationResponseCollection';
  data: Array<SousCategorieEntity>;
};

export type StringFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains: InputMaybe<Scalars['String']['input']>;
  containsi: InputMaybe<Scalars['String']['input']>;
  endsWith: InputMaybe<Scalars['String']['input']>;
  eq: InputMaybe<Scalars['String']['input']>;
  eqi: InputMaybe<Scalars['String']['input']>;
  gt: InputMaybe<Scalars['String']['input']>;
  gte: InputMaybe<Scalars['String']['input']>;
  in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt: InputMaybe<Scalars['String']['input']>;
  lte: InputMaybe<Scalars['String']['input']>;
  ne: InputMaybe<Scalars['String']['input']>;
  nei: InputMaybe<Scalars['String']['input']>;
  not: InputMaybe<StringFilterInput>;
  notContains: InputMaybe<Scalars['String']['input']>;
  notContainsi: InputMaybe<Scalars['String']['input']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull: InputMaybe<Scalars['Boolean']['input']>;
  null: InputMaybe<Scalars['Boolean']['input']>;
  or: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith: InputMaybe<Scalars['String']['input']>;
};

export type ToolBox = {
  __typename?: 'ToolBox';
  content: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type ToolBoxEntity = {
  __typename?: 'ToolBoxEntity';
  attributes: Maybe<ToolBox>;
  id: Maybe<Scalars['ID']['output']>;
};

export type ToolBoxEntityResponse = {
  __typename?: 'ToolBoxEntityResponse';
  data: Maybe<ToolBoxEntity>;
};

export type ToolBoxInput = {
  content: InputMaybe<Scalars['String']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type Traduction = {
  __typename?: 'Traduction';
  Key: Maybe<Scalars['String']['output']>;
  Traduction: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<TraductionRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type TraductionLocalizationsArgs = {
  filters: InputMaybe<TraductionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TraductionEntity = {
  __typename?: 'TraductionEntity';
  attributes: Maybe<Traduction>;
  id: Maybe<Scalars['ID']['output']>;
};

export type TraductionEntityResponse = {
  __typename?: 'TraductionEntityResponse';
  data: Maybe<TraductionEntity>;
};

export type TraductionEntityResponseCollection = {
  __typename?: 'TraductionEntityResponseCollection';
  data: Array<TraductionEntity>;
  meta: ResponseCollectionMeta;
};

export type TraductionFiltersInput = {
  Key: InputMaybe<StringFilterInput>;
  Traduction: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<TraductionFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  locale: InputMaybe<StringFilterInput>;
  localizations: InputMaybe<TraductionFiltersInput>;
  not: InputMaybe<TraductionFiltersInput>;
  or: InputMaybe<Array<InputMaybe<TraductionFiltersInput>>>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type TraductionInput = {
  Key: InputMaybe<Scalars['String']['input']>;
  Traduction: InputMaybe<Scalars['String']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type TraductionRelationResponseCollection = {
  __typename?: 'TraductionRelationResponseCollection';
  data: Array<TraductionEntity>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText: Maybe<Scalars['String']['output']>;
  caption: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  ext: Maybe<Scalars['String']['output']>;
  formats: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata: Maybe<Scalars['JSON']['output']>;
  related: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes: Maybe<UploadFile>;
  id: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption: InputMaybe<StringFilterInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  ext: InputMaybe<StringFilterInput>;
  folder: InputMaybe<UploadFolderFiltersInput>;
  folderPath: InputMaybe<StringFilterInput>;
  formats: InputMaybe<JsonFilterInput>;
  hash: InputMaybe<StringFilterInput>;
  height: InputMaybe<IntFilterInput>;
  id: InputMaybe<IdFilterInput>;
  mime: InputMaybe<StringFilterInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<UploadFileFiltersInput>;
  or: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl: InputMaybe<StringFilterInput>;
  provider: InputMaybe<StringFilterInput>;
  provider_metadata: InputMaybe<JsonFilterInput>;
  size: InputMaybe<FloatFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
  url: InputMaybe<StringFilterInput>;
  width: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText: InputMaybe<Scalars['String']['input']>;
  caption: InputMaybe<Scalars['String']['input']>;
  ext: InputMaybe<Scalars['String']['input']>;
  folder: InputMaybe<Scalars['ID']['input']>;
  folderPath: InputMaybe<Scalars['String']['input']>;
  formats: InputMaybe<Scalars['JSON']['input']>;
  hash: InputMaybe<Scalars['String']['input']>;
  height: InputMaybe<Scalars['Int']['input']>;
  mime: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  previewUrl: InputMaybe<Scalars['String']['input']>;
  provider: InputMaybe<Scalars['String']['input']>;
  provider_metadata: InputMaybe<Scalars['JSON']['input']>;
  size: InputMaybe<Scalars['Float']['input']>;
  url: InputMaybe<Scalars['String']['input']>;
  width: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children: Maybe<UploadFolderRelationResponseCollection>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  files: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String']['output'];
  parent: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String']['output'];
  pathId: Scalars['Int']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type UploadFolderChildrenArgs = {
  filters: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UploadFolderFilesArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes: Maybe<UploadFolder>;
  id: Maybe<Scalars['ID']['output']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children: InputMaybe<UploadFolderFiltersInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  files: InputMaybe<UploadFileFiltersInput>;
  id: InputMaybe<IdFilterInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<UploadFolderFiltersInput>;
  or: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent: InputMaybe<UploadFolderFiltersInput>;
  path: InputMaybe<StringFilterInput>;
  pathId: InputMaybe<IntFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  files: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  name: InputMaybe<Scalars['String']['input']>;
  parent: InputMaybe<Scalars['ID']['input']>;
  path: InputMaybe<Scalars['String']['input']>;
  pathId: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type Urgence = {
  __typename?: 'Urgence';
  Element: Maybe<Array<Maybe<ComponentUrgencesUrgences>>>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  locale: Maybe<Scalars['String']['output']>;
  localizations: Maybe<UrgenceRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type UrgenceElementArgs = {
  filters: InputMaybe<ComponentUrgencesUrgencesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UrgenceLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type UrgenceEntity = {
  __typename?: 'UrgenceEntity';
  attributes: Maybe<Urgence>;
  id: Maybe<Scalars['ID']['output']>;
};

export type UrgenceEntityResponse = {
  __typename?: 'UrgenceEntityResponse';
  data: Maybe<UrgenceEntity>;
};

export type UrgenceInput = {
  Element: InputMaybe<Array<InputMaybe<ComponentUrgencesUrgencesInput>>>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type UrgenceRelationResponseCollection = {
  __typename?: 'UrgenceRelationResponseCollection';
  data: Array<UrgenceEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked: Maybe<Scalars['Boolean']['output']>;
  confirmed: Maybe<Scalars['Boolean']['output']>;
  email: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt: Maybe<Scalars['DateTime']['output']>;
  role: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes: Maybe<UsersPermissionsPermission>;
  id: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  not: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  users: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes: Maybe<UsersPermissionsRole>;
  id: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  description: InputMaybe<StringFilterInput>;
  id: InputMaybe<IdFilterInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type: InputMaybe<StringFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
  users: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  permissions: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  type: InputMaybe<Scalars['String']['input']>;
  users: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked: Maybe<Scalars['Boolean']['output']>;
  confirmed: Maybe<Scalars['Boolean']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  provider: Maybe<Scalars['String']['output']>;
  role: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes: Maybe<UsersPermissionsUser>;
  id: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked: InputMaybe<BooleanFilterInput>;
  confirmationToken: InputMaybe<StringFilterInput>;
  confirmed: InputMaybe<BooleanFilterInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  email: InputMaybe<StringFilterInput>;
  id: InputMaybe<IdFilterInput>;
  not: InputMaybe<UsersPermissionsUserFiltersInput>;
  or: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password: InputMaybe<StringFilterInput>;
  provider: InputMaybe<StringFilterInput>;
  resetPasswordToken: InputMaybe<StringFilterInput>;
  role: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
  username: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked: InputMaybe<Scalars['Boolean']['input']>;
  confirmationToken: InputMaybe<Scalars['String']['input']>;
  confirmed: InputMaybe<Scalars['Boolean']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  password: InputMaybe<Scalars['String']['input']>;
  provider: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken: InputMaybe<Scalars['String']['input']>;
  role: InputMaybe<Scalars['ID']['input']>;
  username: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type GetCategoriesQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'CategorieEntityResponseCollection', data: Array<{ __typename?: 'CategorieEntity', id: string, attributes: { __typename?: 'Categorie', Nom: string, Icone: string, sous_categories: { __typename?: 'SousCategorieRelationResponseCollection', data: Array<{ __typename?: 'SousCategorieEntity', id: string, attributes: { __typename?: 'SousCategorie', Nom: string, SearchTerms: any, Toolbox: string } }> } } }> } };

export type GetLocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLocalesQuery = { __typename?: 'Query', i18NLocales: { __typename?: 'I18NLocaleEntityResponseCollection', data: Array<{ __typename?: 'I18NLocaleEntity', attributes: { __typename?: 'I18NLocale', code: string } }> } };

export type GetOrganismesQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  filters: InputMaybe<OrganismeFiltersInput>;
}>;


export type GetOrganismesQuery = { __typename?: 'Query', organismes: { __typename?: 'OrganismeEntityResponseCollection', data: Array<{ __typename?: 'OrganismeEntity', id: string, attributes: { __typename?: 'Organisme', Referencement_internet: boolean, Nom: string, Departement: string, generatedUrl: string, Latitude: number, Longitude: number, Description: string, Telephone: string, Adresse: string, Email: string, Website: string, Horaires: string, Conditions: string, Logo: { __typename?: 'UploadFileEntityResponse', data: { __typename?: 'UploadFileEntity', attributes: { __typename?: 'UploadFile', url: string } } }, langues: { __typename?: 'LangueRelationResponseCollection', data: Array<{ __typename?: 'LangueEntity', attributes: { __typename?: 'Langue', Nom: string, Drapeau: { __typename?: 'UploadFileEntityResponse', data: { __typename?: 'UploadFileEntity', attributes: { __typename?: 'UploadFile', url: string } } } } }> }, public_specifiques: { __typename?: 'PublicSpecifiqueRelationResponseCollection', data: Array<{ __typename?: 'PublicSpecifiqueEntity', id: string, attributes: { __typename?: 'PublicSpecifique', Nom: string } }> }, services: { __typename?: 'ServiceRelationResponseCollection', data: Array<{ __typename?: 'ServiceEntity', id: string, attributes: { __typename?: 'Service', Nom: string, Icone: string } }> }, sous_categories: { __typename?: 'SousCategorieRelationResponseCollection', data: Array<{ __typename?: 'SousCategorieEntity', id: string, attributes: { __typename?: 'SousCategorie', Nom: string } }> } } }> } };

export type GetPageQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  filters: InputMaybe<PageFiltersInput>;
}>;


export type GetPageQuery = { __typename?: 'Query', pages: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', attributes: { __typename?: 'Page', Titre: string, ContentType: string, SEO: { __typename?: 'ComponentGeneraleSeo', Title: string, Description: string, Enabled: boolean } } }> } };

export type GetPagesQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetPagesQuery = { __typename?: 'Query', pages: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', attributes: { __typename?: 'Page', Titre: string, Url: string, ContentType: string } }> } };

export type GetPublicsQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetPublicsQuery = { __typename?: 'Query', publicSpecifiques: { __typename?: 'PublicSpecifiqueEntityResponseCollection', data: Array<{ __typename?: 'PublicSpecifiqueEntity', id: string, attributes: { __typename?: 'PublicSpecifique', Nom: string } }> } };

export type GetServicesQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetServicesQuery = { __typename?: 'Query', services: { __typename?: 'ServiceEntityResponseCollection', data: Array<{ __typename?: 'ServiceEntity', id: string, attributes: { __typename?: 'Service', Nom: string, Icone: string, organismes: { __typename?: 'OrganismeRelationResponseCollection', data: Array<{ __typename?: 'OrganismeEntity', id: string }> } } }> } };

export type GetTranslationsQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetTranslationsQuery = { __typename?: 'Query', traductions: { __typename?: 'TraductionEntityResponseCollection', data: Array<{ __typename?: 'TraductionEntity', attributes: { __typename?: 'Traduction', Traduction: string, Key: string } }> } };

export type GetAboutQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetAboutQuery = { __typename?: 'Query', about: { __typename?: 'AboutEntityResponse', data: { __typename?: 'AboutEntity', attributes: { __typename?: 'About', Description: string } } } };

export type GetFooterQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetFooterQuery = { __typename?: 'Query', footer: { __typename?: 'FooterEntityResponse', data: { __typename?: 'FooterEntity', attributes: { __typename?: 'Footer', Adresse: string, Telephone: string, Email: string, Footer: { __typename?: 'ComponentGeneraleFooter', Copyright: string }, Services: Array<{ __typename?: 'ComponentFooterServices', Nom: string, Url: string }>, Social: Array<{ __typename?: 'ComponentFooterSocial', Nom: string, Url: string, Icone: string }>, LiensRapides: Array<{ __typename?: 'ComponentFooterLiensRapides', Nom: string, Url: string }> } } } };

export type GetHeaderQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetHeaderQuery = { __typename?: 'Query', header: { __typename?: 'HeaderEntityResponse', data: { __typename?: 'HeaderEntity', attributes: { __typename?: 'Header', Header: { __typename?: 'ComponentGeneraleHeader', Titre: string, SousTitre: string, pages: { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', attributes: { __typename?: 'Page', Titre: string, Url: string } }> } } } } } };

export type GetHelpQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetHelpQuery = { __typename?: 'Query', help: { __typename?: 'HelpEntityResponse', data: { __typename?: 'HelpEntity', attributes: { __typename?: 'Help', Page: Array<{ __typename?: 'ComponentHelpPage', Contenu: string }> } } } };

export type GetHomeQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetHomeQuery = { __typename?: 'Query', home: { __typename?: 'HomeEntityResponse', data: { __typename?: 'HomeEntity', attributes: { __typename?: 'Home', UrgencesLink: string, SearchLink: string, OrientationsLink: string } } } };

export type GetOrientationsQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetOrientationsQuery = { __typename?: 'Query', orientation: { __typename?: 'OrientationEntityResponse', data: { __typename?: 'OrientationEntity', attributes: { __typename?: 'Orientation', Orientation: Array<{ __typename?: 'ComponentOrientationsOrientations', id: string, Nom: string, Email: string, Adresse: string, Telephone: string, c_a_o: { __typename?: 'CategoriesOrientationUrgenceEntityResponse', data: { __typename?: 'CategoriesOrientationUrgenceEntity', id: string, attributes: { __typename?: 'CategoriesOrientationUrgence', Nom: string, Poids: number } } } }> } } } };

export type GetSearchOrganizationQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetSearchOrganizationQuery = { __typename?: 'Query', searchOrganization: { __typename?: 'SearchOrganizationEntityResponse', data: { __typename?: 'SearchOrganizationEntity', attributes: { __typename?: 'SearchOrganization', OrganismeUrl: { __typename?: 'ComponentUtilsLink', page: { __typename?: 'PageEntityResponse', data: { __typename?: 'PageEntity', attributes: { __typename?: 'Page', Url: string } } } } } } } };

export type GetToolBoxQueryVariables = Exact<{ [key: string]: never; }>;


export type GetToolBoxQuery = { __typename?: 'Query', toolBox: { __typename?: 'ToolBoxEntityResponse', data: { __typename?: 'ToolBoxEntity', id: string, attributes: { __typename?: 'ToolBox', content: string } } } };

export type GetUrgencesQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetUrgencesQuery = { __typename?: 'Query', urgence: { __typename?: 'UrgenceEntityResponse', data: { __typename?: 'UrgenceEntity', attributes: { __typename?: 'Urgence', Element: Array<{ __typename?: 'ComponentUrgencesUrgences', id: string, Nom: string, Telephone: string, Adresse: string, c_o_u: { __typename?: 'CategoriesOrientationUrgenceEntityResponse', data: { __typename?: 'CategoriesOrientationUrgenceEntity', id: string, attributes: { __typename?: 'CategoriesOrientationUrgence', Nom: string, Poids: number } } } }> } } } };


export const GetCategoriesDocument = gql`
    query getCategories($locale: I18NLocaleCode) {
  categories(locale: $locale, pagination: {limit: 1000}) {
    data {
      id
      attributes {
        Nom
        Icone
        sous_categories(pagination: {limit: 1000}) {
          data {
            id
            attributes {
              Nom
              SearchTerms
              Toolbox
            }
          }
        }
      }
    }
  }
}
    `;
export const GetLocalesDocument = gql`
    query getLocales {
  i18NLocales(pagination: {limit: 1000}) {
    data {
      attributes {
        code
      }
    }
  }
}
    `;
export const GetOrganismesDocument = gql`
    query getOrganismes($locale: I18NLocaleCode, $filters: OrganismeFiltersInput) {
  organismes(locale: $locale, filters: $filters, pagination: {limit: 1000}) {
    data {
      id
      attributes {
        Referencement_internet
        Nom
        Departement
        generatedUrl
        Latitude
        Longitude
        Logo {
          data {
            attributes {
              url
            }
          }
        }
        Description
        Telephone
        Adresse
        Email
        Website
        Horaires
        langues {
          data {
            attributes {
              Nom
              Drapeau {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        public_specifiques(pagination: {limit: 1000}) {
          data {
            id
            attributes {
              Nom
            }
          }
        }
        services(pagination: {limit: 1000}) {
          data {
            id
            attributes {
              Nom
              Icone
            }
          }
        }
        Conditions
        sous_categories(pagination: {limit: 1000}) {
          data {
            id
            attributes {
              Nom
            }
          }
        }
      }
    }
  }
}
    `;
export const GetPageDocument = gql`
    query getPage($locale: I18NLocaleCode, $filters: PageFiltersInput) {
  pages(locale: $locale, filters: $filters, pagination: {limit: 1000}) {
    data {
      attributes {
        Titre
        ContentType
        SEO {
          Title
          Description
          Enabled
        }
      }
    }
  }
}
    `;
export const GetPagesDocument = gql`
    query getPages($locale: I18NLocaleCode) {
  pages(locale: $locale, pagination: {limit: 1000}) {
    data {
      attributes {
        Titre
        Url
        ContentType
      }
    }
  }
}
    `;
export const GetPublicsDocument = gql`
    query getPublics($locale: I18NLocaleCode) {
  publicSpecifiques(locale: $locale, pagination: {limit: 1000}) {
    data {
      id
      attributes {
        Nom
      }
    }
  }
}
    `;
export const GetServicesDocument = gql`
    query getServices($locale: I18NLocaleCode) {
  services(locale: $locale, pagination: {limit: 1000}) {
    data {
      id
      attributes {
        Nom
        organismes {
          data {
            id
          }
        }
        Icone
      }
    }
  }
}
    `;
export const GetTranslationsDocument = gql`
    query getTranslations($locale: I18NLocaleCode) {
  traductions(locale: $locale, pagination: {limit: 1000}) {
    data {
      attributes {
        Traduction
        Key
      }
    }
  }
}
    `;
export const GetAboutDocument = gql`
    query getAbout($locale: I18NLocaleCode) {
  about(locale: $locale) {
    data {
      attributes {
        Description
      }
    }
  }
}
    `;
export const GetFooterDocument = gql`
    query getFooter($locale: I18NLocaleCode) {
  footer(locale: $locale) {
    data {
      attributes {
        Footer {
          Copyright
        }
        Services {
          Nom
          Url
        }
        Social {
          Nom
          Url
          Icone
        }
        LiensRapides {
          Nom
          Url
        }
        Adresse
        Telephone
        Email
      }
    }
  }
}
    `;
export const GetHeaderDocument = gql`
    query getHeader($locale: I18NLocaleCode) {
  header(locale: $locale) {
    data {
      attributes {
        Header {
          Titre
          SousTitre
          pages {
            data {
              attributes {
                Titre
                Url
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const GetHelpDocument = gql`
    query getHelp($locale: I18NLocaleCode) {
  help(locale: $locale) {
    data {
      attributes {
        Page {
          Contenu
        }
      }
    }
  }
}
    `;
export const GetHomeDocument = gql`
    query getHome($locale: I18NLocaleCode) {
  home(locale: $locale) {
    data {
      attributes {
        UrgencesLink
        SearchLink
        OrientationsLink
      }
    }
  }
}
    `;
export const GetOrientationsDocument = gql`
    query getOrientations($locale: I18NLocaleCode) {
  orientation(locale: $locale) {
    data {
      attributes {
        Orientation {
          id
          Nom
          Email
          Adresse
          Telephone
          c_a_o {
            data {
              id
              attributes {
                Nom
                Poids
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const GetSearchOrganizationDocument = gql`
    query getSearchOrganization($locale: I18NLocaleCode) {
  searchOrganization(locale: $locale) {
    data {
      attributes {
        OrganismeUrl {
          page {
            data {
              attributes {
                Url
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const GetToolBoxDocument = gql`
    query getToolBox {
  toolBox {
    data {
      id
      attributes {
        content
      }
    }
  }
}
    `;
export const GetUrgencesDocument = gql`
    query getUrgences($locale: I18NLocaleCode) {
  urgence(locale: $locale) {
    data {
      attributes {
        Element {
          id
          Nom
          Telephone
          Adresse
          c_o_u {
            data {
              id
              attributes {
                Nom
                Poids
              }
            }
          }
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCategories(variables?: GetCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoriesQuery>(GetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategories', 'query', variables);
    },
    getLocales(variables?: GetLocalesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetLocalesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLocalesQuery>(GetLocalesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLocales', 'query', variables);
    },
    getOrganismes(variables?: GetOrganismesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetOrganismesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganismesQuery>(GetOrganismesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrganismes', 'query', variables);
    },
    getPage(variables?: GetPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPageQuery>(GetPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPage', 'query', variables);
    },
    getPages(variables?: GetPagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPagesQuery>(GetPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPages', 'query', variables);
    },
    getPublics(variables?: GetPublicsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPublicsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPublicsQuery>(GetPublicsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPublics', 'query', variables);
    },
    getServices(variables?: GetServicesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetServicesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetServicesQuery>(GetServicesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getServices', 'query', variables);
    },
    getTranslations(variables?: GetTranslationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTranslationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTranslationsQuery>(GetTranslationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTranslations', 'query', variables);
    },
    getAbout(variables?: GetAboutQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAboutQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAboutQuery>(GetAboutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAbout', 'query', variables);
    },
    getFooter(variables?: GetFooterQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetFooterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFooterQuery>(GetFooterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFooter', 'query', variables);
    },
    getHeader(variables?: GetHeaderQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetHeaderQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHeaderQuery>(GetHeaderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHeader', 'query', variables);
    },
    getHelp(variables?: GetHelpQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetHelpQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHelpQuery>(GetHelpDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHelp', 'query', variables);
    },
    getHome(variables?: GetHomeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetHomeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHomeQuery>(GetHomeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHome', 'query', variables);
    },
    getOrientations(variables?: GetOrientationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetOrientationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrientationsQuery>(GetOrientationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrientations', 'query', variables);
    },
    getSearchOrganization(variables?: GetSearchOrganizationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSearchOrganizationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSearchOrganizationQuery>(GetSearchOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSearchOrganization', 'query', variables);
    },
    getToolBox(variables?: GetToolBoxQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetToolBoxQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetToolBoxQuery>(GetToolBoxDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getToolBox', 'query', variables);
    },
    getUrgences(variables?: GetUrgencesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUrgencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUrgencesQuery>(GetUrgencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUrgences', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;