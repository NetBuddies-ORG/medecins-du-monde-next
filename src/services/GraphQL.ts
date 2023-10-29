import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  I18NLocaleCode: any;
  JSON: any;
  PageBlocksDynamicZoneInput: any;
  Upload: any;
};

export type BooleanFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains: InputMaybe<Scalars['Boolean']>;
  containsi: InputMaybe<Scalars['Boolean']>;
  endsWith: InputMaybe<Scalars['Boolean']>;
  eq: InputMaybe<Scalars['Boolean']>;
  eqi: InputMaybe<Scalars['Boolean']>;
  gt: InputMaybe<Scalars['Boolean']>;
  gte: InputMaybe<Scalars['Boolean']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt: InputMaybe<Scalars['Boolean']>;
  lte: InputMaybe<Scalars['Boolean']>;
  ne: InputMaybe<Scalars['Boolean']>;
  nei: InputMaybe<Scalars['Boolean']>;
  not: InputMaybe<BooleanFilterInput>;
  notContains: InputMaybe<Scalars['Boolean']>;
  notContainsi: InputMaybe<Scalars['Boolean']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith: InputMaybe<Scalars['Boolean']>;
};

export type Categorie = {
  __typename?: 'Categorie';
  Nom: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  publishedAt: Maybe<Scalars['DateTime']>;
  sous_categories: Maybe<SousCategorieRelationResponseCollection>;
  updatedAt: Maybe<Scalars['DateTime']>;
};


export type CategorieSous_CategoriesArgs = {
  filters: InputMaybe<SousCategorieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CategorieEntity = {
  __typename?: 'CategorieEntity';
  attributes: Maybe<Categorie>;
  id: Maybe<Scalars['ID']>;
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
  Nom: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<CategorieFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  not: InputMaybe<CategorieFiltersInput>;
  or: InputMaybe<Array<InputMaybe<CategorieFiltersInput>>>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  sous_categories: InputMaybe<SousCategorieFiltersInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type CategorieInput = {
  Nom: InputMaybe<Scalars['String']>;
  publishedAt: InputMaybe<Scalars['DateTime']>;
  sous_categories: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ComponentComponentsSeo = {
  __typename?: 'ComponentComponentsSeo';
  Titre: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentComponentsTitre = {
  __typename?: 'ComponentComponentsTitre';
  Titre: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DateTimeFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains: InputMaybe<Scalars['DateTime']>;
  containsi: InputMaybe<Scalars['DateTime']>;
  endsWith: InputMaybe<Scalars['DateTime']>;
  eq: InputMaybe<Scalars['DateTime']>;
  eqi: InputMaybe<Scalars['DateTime']>;
  gt: InputMaybe<Scalars['DateTime']>;
  gte: InputMaybe<Scalars['DateTime']>;
  in: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt: InputMaybe<Scalars['DateTime']>;
  lte: InputMaybe<Scalars['DateTime']>;
  ne: InputMaybe<Scalars['DateTime']>;
  nei: InputMaybe<Scalars['DateTime']>;
  not: InputMaybe<DateTimeFilterInput>;
  notContains: InputMaybe<Scalars['DateTime']>;
  notContainsi: InputMaybe<Scalars['DateTime']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith: InputMaybe<Scalars['DateTime']>;
};

export type Error = {
  __typename?: 'Error';
  code: Scalars['String'];
  message: Maybe<Scalars['String']>;
};

export type FileInfoInput = {
  alternativeText: InputMaybe<Scalars['String']>;
  caption: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains: InputMaybe<Scalars['Float']>;
  containsi: InputMaybe<Scalars['Float']>;
  endsWith: InputMaybe<Scalars['Float']>;
  eq: InputMaybe<Scalars['Float']>;
  eqi: InputMaybe<Scalars['Float']>;
  gt: InputMaybe<Scalars['Float']>;
  gte: InputMaybe<Scalars['Float']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt: InputMaybe<Scalars['Float']>;
  lte: InputMaybe<Scalars['Float']>;
  ne: InputMaybe<Scalars['Float']>;
  nei: InputMaybe<Scalars['Float']>;
  not: InputMaybe<FloatFilterInput>;
  notContains: InputMaybe<Scalars['Float']>;
  notContainsi: InputMaybe<Scalars['Float']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith: InputMaybe<Scalars['Float']>;
};

export type GenericMorph = Categorie | ComponentComponentsSeo | ComponentComponentsTitre | I18NLocale | Langue | Organisme | Page | PublicSpecifique | Service | SousCategorie | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  name: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes: Maybe<I18NLocale>;
  id: Maybe<Scalars['ID']>;
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
  and: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains: InputMaybe<Scalars['ID']>;
  containsi: InputMaybe<Scalars['ID']>;
  endsWith: InputMaybe<Scalars['ID']>;
  eq: InputMaybe<Scalars['ID']>;
  eqi: InputMaybe<Scalars['ID']>;
  gt: InputMaybe<Scalars['ID']>;
  gte: InputMaybe<Scalars['ID']>;
  in: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt: InputMaybe<Scalars['ID']>;
  lte: InputMaybe<Scalars['ID']>;
  ne: InputMaybe<Scalars['ID']>;
  nei: InputMaybe<Scalars['ID']>;
  not: InputMaybe<IdFilterInput>;
  notContains: InputMaybe<Scalars['ID']>;
  notContainsi: InputMaybe<Scalars['ID']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains: InputMaybe<Scalars['Int']>;
  containsi: InputMaybe<Scalars['Int']>;
  endsWith: InputMaybe<Scalars['Int']>;
  eq: InputMaybe<Scalars['Int']>;
  eqi: InputMaybe<Scalars['Int']>;
  gt: InputMaybe<Scalars['Int']>;
  gte: InputMaybe<Scalars['Int']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt: InputMaybe<Scalars['Int']>;
  lte: InputMaybe<Scalars['Int']>;
  ne: InputMaybe<Scalars['Int']>;
  nei: InputMaybe<Scalars['Int']>;
  not: InputMaybe<IntFilterInput>;
  notContains: InputMaybe<Scalars['Int']>;
  notContainsi: InputMaybe<Scalars['Int']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains: InputMaybe<Scalars['JSON']>;
  containsi: InputMaybe<Scalars['JSON']>;
  endsWith: InputMaybe<Scalars['JSON']>;
  eq: InputMaybe<Scalars['JSON']>;
  eqi: InputMaybe<Scalars['JSON']>;
  gt: InputMaybe<Scalars['JSON']>;
  gte: InputMaybe<Scalars['JSON']>;
  in: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt: InputMaybe<Scalars['JSON']>;
  lte: InputMaybe<Scalars['JSON']>;
  ne: InputMaybe<Scalars['JSON']>;
  nei: InputMaybe<Scalars['JSON']>;
  not: InputMaybe<JsonFilterInput>;
  notContains: InputMaybe<Scalars['JSON']>;
  notContainsi: InputMaybe<Scalars['JSON']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith: InputMaybe<Scalars['JSON']>;
};

export type Langue = {
  __typename?: 'Langue';
  Drapeau: Maybe<UploadFileEntityResponse>;
  Nom: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  organismes: Maybe<OrganismeRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
};


export type LangueOrganismesArgs = {
  filters: InputMaybe<OrganismeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type LangueEntity = {
  __typename?: 'LangueEntity';
  attributes: Maybe<Langue>;
  id: Maybe<Scalars['ID']>;
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
  not: InputMaybe<LangueFiltersInput>;
  or: InputMaybe<Array<InputMaybe<LangueFiltersInput>>>;
  organismes: InputMaybe<OrganismeFiltersInput>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type LangueInput = {
  Drapeau: InputMaybe<Scalars['ID']>;
  Nom: InputMaybe<Scalars['String']>;
  organismes: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  publishedAt: InputMaybe<Scalars['DateTime']>;
};

export type LangueRelationResponseCollection = {
  __typename?: 'LangueRelationResponseCollection';
  data: Array<LangueEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword: Maybe<UsersPermissionsLoginPayload>;
  createCategorie: Maybe<CategorieEntityResponse>;
  createLangue: Maybe<LangueEntityResponse>;
  createOrganisme: Maybe<OrganismeEntityResponse>;
  createPage: Maybe<PageEntityResponse>;
  createPageLocalization: Maybe<PageEntityResponse>;
  createPublicSpecifique: Maybe<PublicSpecifiqueEntityResponse>;
  createService: Maybe<ServiceEntityResponse>;
  createServiceLocalization: Maybe<ServiceEntityResponse>;
  createSousCategorie: Maybe<SousCategorieEntityResponse>;
  createUploadFile: Maybe<UploadFileEntityResponse>;
  createUploadFolder: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCategorie: Maybe<CategorieEntityResponse>;
  deleteLangue: Maybe<LangueEntityResponse>;
  deleteOrganisme: Maybe<OrganismeEntityResponse>;
  deletePage: Maybe<PageEntityResponse>;
  deletePublicSpecifique: Maybe<PublicSpecifiqueEntityResponse>;
  deleteService: Maybe<ServiceEntityResponse>;
  deleteSousCategorie: Maybe<SousCategorieEntityResponse>;
  deleteUploadFile: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder: Maybe<UploadFolderEntityResponse>;
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
  updateCategorie: Maybe<CategorieEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateLangue: Maybe<LangueEntityResponse>;
  updateOrganisme: Maybe<OrganismeEntityResponse>;
  updatePage: Maybe<PageEntityResponse>;
  updatePublicSpecifique: Maybe<PublicSpecifiqueEntityResponse>;
  updateService: Maybe<ServiceEntityResponse>;
  updateSousCategorie: Maybe<SousCategorieEntityResponse>;
  updateUploadFile: Maybe<UploadFileEntityResponse>;
  updateUploadFolder: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationCreateCategorieArgs = {
  data: CategorieInput;
};


export type MutationCreateLangueArgs = {
  data: LangueInput;
};


export type MutationCreateOrganismeArgs = {
  data: OrganismeInput;
};


export type MutationCreatePageArgs = {
  data: PageInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageLocalizationArgs = {
  data: InputMaybe<PageInput>;
  id: InputMaybe<Scalars['ID']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePublicSpecifiqueArgs = {
  data: PublicSpecifiqueInput;
};


export type MutationCreateServiceArgs = {
  data: ServiceInput;
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateServiceLocalizationArgs = {
  data: InputMaybe<ServiceInput>;
  id: InputMaybe<Scalars['ID']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateSousCategorieArgs = {
  data: SousCategorieInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteCategorieArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteLangueArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteOrganismeArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePageArgs = {
  id: Scalars['ID'];
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePublicSpecifiqueArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteServiceArgs = {
  id: Scalars['ID'];
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteSousCategorieArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref: InputMaybe<Scalars['String']>;
  refId: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateCategorieArgs = {
  data: CategorieInput;
  id: Scalars['ID'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: InputMaybe<FileInfoInput>;
};


export type MutationUpdateLangueArgs = {
  data: LangueInput;
  id: Scalars['ID'];
};


export type MutationUpdateOrganismeArgs = {
  data: OrganismeInput;
  id: Scalars['ID'];
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  id: Scalars['ID'];
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePublicSpecifiqueArgs = {
  data: PublicSpecifiqueInput;
  id: Scalars['ID'];
};


export type MutationUpdateServiceArgs = {
  data: ServiceInput;
  id: Scalars['ID'];
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateSousCategorieArgs = {
  data: SousCategorieInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info: InputMaybe<FileInfoInput>;
  ref: InputMaybe<Scalars['String']>;
  refId: InputMaybe<Scalars['ID']>;
};

export type Organisme = {
  __typename?: 'Organisme';
  Adresse: Maybe<Scalars['String']>;
  Conditions: Maybe<Scalars['String']>;
  Departement: Maybe<Scalars['String']>;
  Description: Maybe<Scalars['String']>;
  Email: Maybe<Scalars['String']>;
  Horaires: Maybe<Scalars['String']>;
  Logo: Maybe<UploadFileEntityResponse>;
  Nom: Maybe<Scalars['String']>;
  Telephone: Maybe<Scalars['String']>;
  Website: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  langues: Maybe<LangueRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']>;
  services: Maybe<ServiceRelationResponseCollection>;
  sous_categories: Maybe<SousCategorieRelationResponseCollection>;
  updatedAt: Maybe<Scalars['DateTime']>;
};


export type OrganismeLanguesArgs = {
  filters: InputMaybe<LangueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type OrganismeServicesArgs = {
  filters: InputMaybe<ServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type OrganismeSous_CategoriesArgs = {
  filters: InputMaybe<SousCategorieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type OrganismeEntity = {
  __typename?: 'OrganismeEntity';
  attributes: Maybe<Organisme>;
  id: Maybe<Scalars['ID']>;
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
  Nom: InputMaybe<StringFilterInput>;
  Telephone: InputMaybe<StringFilterInput>;
  Website: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<OrganismeFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  langues: InputMaybe<LangueFiltersInput>;
  not: InputMaybe<OrganismeFiltersInput>;
  or: InputMaybe<Array<InputMaybe<OrganismeFiltersInput>>>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  services: InputMaybe<ServiceFiltersInput>;
  sous_categories: InputMaybe<SousCategorieFiltersInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type OrganismeInput = {
  Adresse: InputMaybe<Scalars['String']>;
  Conditions: InputMaybe<Scalars['String']>;
  Departement: InputMaybe<Scalars['String']>;
  Description: InputMaybe<Scalars['String']>;
  Email: InputMaybe<Scalars['String']>;
  Horaires: InputMaybe<Scalars['String']>;
  Logo: InputMaybe<Scalars['ID']>;
  Nom: InputMaybe<Scalars['String']>;
  Telephone: InputMaybe<Scalars['String']>;
  Website: InputMaybe<Scalars['String']>;
  langues: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  publishedAt: InputMaybe<Scalars['DateTime']>;
  services: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  sous_categories: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type OrganismeRelationResponseCollection = {
  __typename?: 'OrganismeRelationResponseCollection';
  data: Array<OrganismeEntity>;
};

export type Page = {
  __typename?: 'Page';
  ContentType: Scalars['String'];
  Titre: Maybe<Scalars['String']>;
  Url: Maybe<Scalars['String']>;
  blocks: Maybe<Array<Maybe<PageBlocksDynamicZone>>>;
  createdAt: Maybe<Scalars['DateTime']>;
  locale: Maybe<Scalars['String']>;
  localizations: Maybe<PageRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
};


export type PageLocalizationsArgs = {
  filters: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PageBlocksDynamicZone = ComponentComponentsSeo | ComponentComponentsTitre | Error;

export type PageEntity = {
  __typename?: 'PageEntity';
  attributes: Maybe<Page>;
  id: Maybe<Scalars['ID']>;
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
  ContentType: InputMaybe<Scalars['String']>;
  Titre: InputMaybe<Scalars['String']>;
  Url: InputMaybe<Scalars['String']>;
  blocks: InputMaybe<Array<Scalars['PageBlocksDynamicZoneInput']>>;
  publishedAt: InputMaybe<Scalars['DateTime']>;
};

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection';
  data: Array<PageEntity>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit: InputMaybe<Scalars['Int']>;
  page: InputMaybe<Scalars['Int']>;
  pageSize: InputMaybe<Scalars['Int']>;
  start: InputMaybe<Scalars['Int']>;
};

export type PublicSpecifique = {
  __typename?: 'PublicSpecifique';
  Nom: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  publishedAt: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
};

export type PublicSpecifiqueEntity = {
  __typename?: 'PublicSpecifiqueEntity';
  attributes: Maybe<PublicSpecifique>;
  id: Maybe<Scalars['ID']>;
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
  not: InputMaybe<PublicSpecifiqueFiltersInput>;
  or: InputMaybe<Array<InputMaybe<PublicSpecifiqueFiltersInput>>>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type PublicSpecifiqueInput = {
  Nom: InputMaybe<Scalars['String']>;
  publishedAt: InputMaybe<Scalars['DateTime']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  categorie: Maybe<CategorieEntityResponse>;
  categories: Maybe<CategorieEntityResponseCollection>;
  i18NLocale: Maybe<I18NLocaleEntityResponse>;
  i18NLocales: Maybe<I18NLocaleEntityResponseCollection>;
  langue: Maybe<LangueEntityResponse>;
  langues: Maybe<LangueEntityResponseCollection>;
  me: Maybe<UsersPermissionsMe>;
  organisme: Maybe<OrganismeEntityResponse>;
  organismes: Maybe<OrganismeEntityResponseCollection>;
  page: Maybe<PageEntityResponse>;
  pages: Maybe<PageEntityResponseCollection>;
  publicSpecifique: Maybe<PublicSpecifiqueEntityResponse>;
  publicSpecifiques: Maybe<PublicSpecifiqueEntityResponseCollection>;
  service: Maybe<ServiceEntityResponse>;
  services: Maybe<ServiceEntityResponseCollection>;
  sousCategorie: Maybe<SousCategorieEntityResponse>;
  sousCategories: Maybe<SousCategorieEntityResponseCollection>;
  uploadFile: Maybe<UploadFileEntityResponse>;
  uploadFiles: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder: Maybe<UploadFolderEntityResponse>;
  uploadFolders: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryCategorieArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryCategoriesArgs = {
  filters: InputMaybe<CategorieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryI18NLocaleArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryLangueArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryLanguesArgs = {
  filters: InputMaybe<LangueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryOrganismeArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryOrganismesArgs = {
  filters: InputMaybe<OrganismeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPageArgs = {
  id: InputMaybe<Scalars['ID']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPagesArgs = {
  filters: InputMaybe<PageFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPublicSpecifiqueArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryPublicSpecifiquesArgs = {
  filters: InputMaybe<PublicSpecifiqueFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryServiceArgs = {
  id: InputMaybe<Scalars['ID']>;
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryServicesArgs = {
  filters: InputMaybe<ServiceFiltersInput>;
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuerySousCategorieArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QuerySousCategoriesArgs = {
  filters: InputMaybe<SousCategorieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type Service = {
  __typename?: 'Service';
  Nom: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  locale: Maybe<Scalars['String']>;
  localizations: Maybe<ServiceRelationResponseCollection>;
  organismes: Maybe<OrganismeRelationResponseCollection>;
  publishedAt: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
};


export type ServiceLocalizationsArgs = {
  filters: InputMaybe<ServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ServiceOrganismesArgs = {
  filters: InputMaybe<OrganismeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ServiceEntity = {
  __typename?: 'ServiceEntity';
  attributes: Maybe<Service>;
  id: Maybe<Scalars['ID']>;
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
  Nom: InputMaybe<Scalars['String']>;
  organismes: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  publishedAt: InputMaybe<Scalars['DateTime']>;
};

export type ServiceRelationResponseCollection = {
  __typename?: 'ServiceRelationResponseCollection';
  data: Array<ServiceEntity>;
};

export type SousCategorie = {
  __typename?: 'SousCategorie';
  Nom: Maybe<Scalars['String']>;
  category: Maybe<CategorieEntityResponse>;
  createdAt: Maybe<Scalars['DateTime']>;
  organisme: Maybe<OrganismeEntityResponse>;
  publishedAt: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
};

export type SousCategorieEntity = {
  __typename?: 'SousCategorieEntity';
  attributes: Maybe<SousCategorie>;
  id: Maybe<Scalars['ID']>;
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
  and: InputMaybe<Array<InputMaybe<SousCategorieFiltersInput>>>;
  category: InputMaybe<CategorieFiltersInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  not: InputMaybe<SousCategorieFiltersInput>;
  or: InputMaybe<Array<InputMaybe<SousCategorieFiltersInput>>>;
  organisme: InputMaybe<OrganismeFiltersInput>;
  publishedAt: InputMaybe<DateTimeFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type SousCategorieInput = {
  Nom: InputMaybe<Scalars['String']>;
  category: InputMaybe<Scalars['ID']>;
  organisme: InputMaybe<Scalars['ID']>;
  publishedAt: InputMaybe<Scalars['DateTime']>;
};

export type SousCategorieRelationResponseCollection = {
  __typename?: 'SousCategorieRelationResponseCollection';
  data: Array<SousCategorieEntity>;
};

export type StringFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains: InputMaybe<Scalars['String']>;
  containsi: InputMaybe<Scalars['String']>;
  endsWith: InputMaybe<Scalars['String']>;
  eq: InputMaybe<Scalars['String']>;
  eqi: InputMaybe<Scalars['String']>;
  gt: InputMaybe<Scalars['String']>;
  gte: InputMaybe<Scalars['String']>;
  in: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt: InputMaybe<Scalars['String']>;
  lte: InputMaybe<Scalars['String']>;
  ne: InputMaybe<Scalars['String']>;
  nei: InputMaybe<Scalars['String']>;
  not: InputMaybe<StringFilterInput>;
  notContains: InputMaybe<Scalars['String']>;
  notContainsi: InputMaybe<Scalars['String']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText: Maybe<Scalars['String']>;
  caption: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  ext: Maybe<Scalars['String']>;
  formats: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata: Maybe<Scalars['JSON']>;
  related: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes: Maybe<UploadFile>;
  id: Maybe<Scalars['ID']>;
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
  alternativeText: InputMaybe<Scalars['String']>;
  caption: InputMaybe<Scalars['String']>;
  ext: InputMaybe<Scalars['String']>;
  folder: InputMaybe<Scalars['ID']>;
  folderPath: InputMaybe<Scalars['String']>;
  formats: InputMaybe<Scalars['JSON']>;
  hash: InputMaybe<Scalars['String']>;
  height: InputMaybe<Scalars['Int']>;
  mime: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  previewUrl: InputMaybe<Scalars['String']>;
  provider: InputMaybe<Scalars['String']>;
  provider_metadata: InputMaybe<Scalars['JSON']>;
  size: InputMaybe<Scalars['Float']>;
  url: InputMaybe<Scalars['String']>;
  width: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children: Maybe<UploadFolderRelationResponseCollection>;
  createdAt: Maybe<Scalars['DateTime']>;
  files: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes: Maybe<UploadFolder>;
  id: Maybe<Scalars['ID']>;
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
  children: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name: InputMaybe<Scalars['String']>;
  parent: InputMaybe<Scalars['ID']>;
  path: InputMaybe<Scalars['String']>;
  pathId: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked: Maybe<Scalars['Boolean']>;
  confirmed: Maybe<Scalars['Boolean']>;
  email: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt: Maybe<Scalars['DateTime']>;
  role: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes: Maybe<UsersPermissionsPermission>;
  id: Maybe<Scalars['ID']>;
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
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt: Maybe<Scalars['DateTime']>;
  description: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  users: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes: Maybe<UsersPermissionsRole>;
  id: Maybe<Scalars['ID']>;
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
  description: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  permissions: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type: InputMaybe<Scalars['String']>;
  users: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked: Maybe<Scalars['Boolean']>;
  confirmed: Maybe<Scalars['Boolean']>;
  createdAt: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider: Maybe<Scalars['String']>;
  role: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes: Maybe<UsersPermissionsUser>;
  id: Maybe<Scalars['ID']>;
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
  blocked: InputMaybe<Scalars['Boolean']>;
  confirmationToken: InputMaybe<Scalars['String']>;
  confirmed: InputMaybe<Scalars['Boolean']>;
  email: InputMaybe<Scalars['String']>;
  password: InputMaybe<Scalars['String']>;
  provider: InputMaybe<Scalars['String']>;
  resetPasswordToken: InputMaybe<Scalars['String']>;
  role: InputMaybe<Scalars['ID']>;
  username: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type GetOrganismesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganismesQuery = { __typename?: 'Query', organismes: { __typename?: 'OrganismeEntityResponseCollection', data: Array<{ __typename?: 'OrganismeEntity', id: string, attributes: { __typename?: 'Organisme', Nom: string, Departement: string, Description: string, Telephone: string, Adresse: string, Email: string, Website: string, Horaires: string, Conditions: string, Logo: { __typename?: 'UploadFileEntityResponse', data: { __typename?: 'UploadFileEntity', attributes: { __typename?: 'UploadFile', url: string } } }, langues: { __typename?: 'LangueRelationResponseCollection', data: Array<{ __typename?: 'LangueEntity', attributes: { __typename?: 'Langue', Nom: string, Drapeau: { __typename?: 'UploadFileEntityResponse', data: { __typename?: 'UploadFileEntity', attributes: { __typename?: 'UploadFile', url: string } } } } }> }, services: { __typename?: 'ServiceRelationResponseCollection', data: Array<{ __typename?: 'ServiceEntity', attributes: { __typename?: 'Service', Nom: string } }> }, sous_categories: { __typename?: 'SousCategorieRelationResponseCollection', data: Array<{ __typename?: 'SousCategorieEntity', attributes: { __typename?: 'SousCategorie', Nom: string, category: { __typename?: 'CategorieEntityResponse', data: { __typename?: 'CategorieEntity', attributes: { __typename?: 'Categorie', Nom: string } } } } }> } } }> } };

export type GetPageQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
  filters: InputMaybe<PageFiltersInput>;
}>;


export type GetPageQuery = { __typename?: 'Query', pages: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', attributes: { __typename?: 'Page', Titre: string, ContentType: string } }> } };

export type GetPagesQueryVariables = Exact<{
  locale: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type GetPagesQuery = { __typename?: 'Query', pages: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', attributes: { __typename?: 'Page', Titre: string } }> } };

export type GetPublicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicsQuery = { __typename?: 'Query', publicSpecifiques: { __typename?: 'PublicSpecifiqueEntityResponseCollection', data: Array<{ __typename?: 'PublicSpecifiqueEntity', attributes: { __typename?: 'PublicSpecifique', Nom: string } }> } };


export const GetOrganismesDocument = gql`
    query getOrganismes {
  organismes {
    data {
      id
      attributes {
        Nom
        Departement
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
        services {
          data {
            attributes {
              Nom
            }
          }
        }
        Conditions
        sous_categories {
          data {
            attributes {
              Nom
              category {
                data {
                  attributes {
                    Nom
                  }
                }
              }
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
  pages(locale: $locale, filters: $filters) {
    data {
      attributes {
        Titre
        ContentType
      }
    }
  }
}
    `;
export const GetPagesDocument = gql`
    query getPages($locale: I18NLocaleCode) {
  pages(locale: $locale) {
    data {
      attributes {
        Titre
      }
    }
  }
}
    `;
export const GetPublicsDocument = gql`
    query getPublics {
  publicSpecifiques {
    data {
      attributes {
        Nom
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getOrganismes(variables?: GetOrganismesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrganismesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganismesQuery>(GetOrganismesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrganismes', 'query');
    },
    getPage(variables?: GetPageQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPageQuery>(GetPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPage', 'query');
    },
    getPages(variables?: GetPagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPagesQuery>(GetPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPages', 'query');
    },
    getPublics(variables?: GetPublicsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPublicsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPublicsQuery>(GetPublicsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPublics', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;