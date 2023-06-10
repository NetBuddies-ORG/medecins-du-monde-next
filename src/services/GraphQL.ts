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
  Any: any;
  DateTime: string;
  UUID: any;
};

/** Represents a block list item. */
export type BasicBlockListItem = {
  __typename?: 'BasicBlockListItem';
  /** Gets the alias of the content block list item. */
  contentAlias: Maybe<Scalars['String']>;
  /** Gets the content properties of the block list item. */
  contentProperties: Array<Maybe<BasicProperty>>;
  /** Gets the alias of the settings block list item. */
  settingsAlias: Maybe<Scalars['String']>;
  /** Gets the setting properties of the block list item. */
  settingsProperties: Array<Maybe<BasicProperty>>;
};

/** Represents a block list model. */
export type BasicBlockListModel = PropertyValue & {
  __typename?: 'BasicBlockListModel';
  alias: Scalars['String'];
  /** Gets the blocks of a block list model. */
  blocks: Maybe<Array<BasicBlockListItem>>;
};

/** Represents a content item. */
export type BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect = {
  __typename?: 'BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect';
  /** Gets the absolute url of the content item. */
  absoluteUrl: Maybe<Scalars['String']>;
  /** Gets the children of the content item that are available for the current culture. */
  children: Maybe<Array<Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>>>;
  /** Gets all the children of the content item, regardless of whether they are available for the current culture. */
  childrenForAllCultures: Maybe<Array<Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>>>;
  /** Gets the content type. */
  contentType: Maybe<BasicContentType>;
  /** Gets the date that the content was created. */
  createDate: Maybe<Scalars['DateTime']>;
  /** Gets the identifier of the user who created the content item. */
  creatorId: Maybe<Scalars['Int']>;
  /** Gets available culture infos. */
  cultures: Maybe<Array<KeyValuePairOfStringAndPublishedCultureInfo>>;
  /** Gets the unique identifier of the content item. */
  id: Maybe<Scalars['Int']>;
  /** Gets the type of the content item (document, media...). */
  itemType: Maybe<PublishedItemType>;
  /** Gets the unique key of the element. */
  key: Maybe<Scalars['UUID']>;
  /** Gets the tree level of the content item. */
  level: Maybe<Scalars['Int']>;
  /** Gets the name of the content item for the current culture. */
  name: Maybe<Scalars['String']>;
  /** Gets the parent of the content item. */
  parent: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
  /** Gets the tree path of the content item. */
  path: Maybe<Scalars['String']>;
  /** Gets the properties of the element. */
  properties: Maybe<Array<Maybe<BasicProperty>>>;
  /** Gets the redirect information. */
  redirect: Maybe<BasicContentRedirect>;
  /** Gets the sort order of the content item. */
  sortOrder: Maybe<Scalars['Int']>;
  /** Gets the identifier of the template to use to render the content item. */
  templateId: Maybe<Scalars['Int']>;
  /** Gets the date the content item was last updated. */
  updateDate: Maybe<Scalars['DateTime']>;
  /** Gets the url of the content item. */
  url: Maybe<Scalars['String']>;
  /** Gets the URL segment of the content item for the current culture. */
  urlSegment: Maybe<Scalars['String']>;
  /** Gets the identifier of the user who last updated the content item. */
  writerId: Maybe<Scalars['Int']>;
};


/** Represents a content item. */
export type BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectChildrenArgs = {
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


/** Represents a content item. */
export type BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectChildrenForAllCulturesArgs = {
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


/** Represents a content item. */
export type BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectPropertiesArgs = {
  where: InputMaybe<BasicPropertyFilterInput>;
};

/** Represents a content item. */
export type BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput = {
  /** Gets the absolute url of the content item. */
  absoluteUrl: InputMaybe<StringOperationFilterInput>;
  and: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>>;
  /** Gets the children of the content item that are available for the current culture. */
  children: InputMaybe<ListFilterInputTypeOfBasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
  /** Gets all the children of the content item, regardless of whether they are available for the current culture. */
  childrenForAllCultures: InputMaybe<ListFilterInputTypeOfBasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
  /** Gets the content type. */
  contentType: InputMaybe<BasicContentTypeFilterInput>;
  /** Gets the date that the content was created. */
  createDate: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  /** Gets the identifier of the user who created the content item. */
  creatorId: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Gets available culture infos. */
  cultures: InputMaybe<IReadOnlyDictionaryOfStringAndPublishedCultureInfoFilterInput>;
  /** Gets the unique identifier of the content item. */
  id: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Gets the type of the content item (document, media...). */
  itemType: InputMaybe<NullableOfPublishedItemTypeOperationFilterInput>;
  /** Gets the unique key of the element. */
  key: InputMaybe<ComparableNullableOfGuidOperationFilterInput>;
  /** Gets the tree level of the content item. */
  level: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Gets the name of the content item for the current culture. */
  name: InputMaybe<StringOperationFilterInput>;
  or: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>>;
  /** Gets the parent of the content item. */
  parent: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
  /** Gets the tree path of the content item. */
  path: InputMaybe<StringOperationFilterInput>;
  /** Gets the properties of the element. */
  properties: InputMaybe<ListFilterInputTypeOfBasicPropertyFilterInput>;
  /** Gets the redirect information. */
  redirect: InputMaybe<BasicContentRedirectFilterInput>;
  /** Gets the sort order of the content item. */
  sortOrder: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Gets the identifier of the template to use to render the content item. */
  templateId: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Gets the date the content item was last updated. */
  updateDate: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  /** Gets the url of the content item. */
  url: InputMaybe<StringOperationFilterInput>;
  /** Gets the URL segment of the content item for the current culture. */
  urlSegment: InputMaybe<StringOperationFilterInput>;
  /** Gets the identifier of the user who last updated the content item. */
  writerId: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
};

/** Represents a content item. */
export type BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput = {
  /** Gets the absolute url of the content item. */
  absoluteUrl: InputMaybe<SortEnumType>;
  /** Gets the content type. */
  contentType: InputMaybe<BasicContentTypeSortInput>;
  /** Gets the date that the content was created. */
  createDate: InputMaybe<SortEnumType>;
  /** Gets the identifier of the user who created the content item. */
  creatorId: InputMaybe<SortEnumType>;
  /** Gets the unique identifier of the content item. */
  id: InputMaybe<SortEnumType>;
  /** Gets the type of the content item (document, media...). */
  itemType: InputMaybe<SortEnumType>;
  /** Gets the unique key of the element. */
  key: InputMaybe<SortEnumType>;
  /** Gets the tree level of the content item. */
  level: InputMaybe<SortEnumType>;
  /** Gets the name of the content item for the current culture. */
  name: InputMaybe<SortEnumType>;
  /** Gets the parent of the content item. */
  parent: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>;
  /** Gets the tree path of the content item. */
  path: InputMaybe<SortEnumType>;
  /** Gets the redirect information. */
  redirect: InputMaybe<BasicContentRedirectSortInput>;
  /** Gets the sort order of the content item. */
  sortOrder: InputMaybe<SortEnumType>;
  /** Gets the identifier of the template to use to render the content item. */
  templateId: InputMaybe<SortEnumType>;
  /** Gets the date the content item was last updated. */
  updateDate: InputMaybe<SortEnumType>;
  /** Gets the url of the content item. */
  url: InputMaybe<SortEnumType>;
  /** Gets the URL segment of the content item for the current culture. */
  urlSegment: InputMaybe<SortEnumType>;
  /** Gets the identifier of the user who last updated the content item. */
  writerId: InputMaybe<SortEnumType>;
};

/** Represents a content picker value. */
export type BasicContentPicker = PropertyValue & {
  __typename?: 'BasicContentPicker';
  alias: Scalars['String'];
  /** Gets the list of content. */
  contentList: Array<BasicContentPickerItem>;
};

/** Represents a content picker item. */
export type BasicContentPickerItem = {
  __typename?: 'BasicContentPickerItem';
  /** Gets the absolute url of a content item. */
  absoluteUrl: Scalars['String'];
  /** Gets the id of a content item. */
  id: Scalars['Int'];
  /** Gets the key of a content item. */
  key: Scalars['UUID'];
  /** Gets the name of a content item. */
  name: Maybe<Scalars['String']>;
  /** Gets the url of a content item. */
  url: Scalars['String'];
  /** Gets the url segment of the content item. */
  urlSegment: Maybe<Scalars['String']>;
};

/** Represents a content redirect */
export type BasicContentRedirect = {
  __typename?: 'BasicContentRedirect';
  /** Is the redirect permanent */
  isPermanent: Scalars['Boolean'];
  /** The url to redirect to */
  redirectUrl: Scalars['String'];
};

/** Represents a content redirect */
export type BasicContentRedirectFilterInput = {
  and: InputMaybe<Array<BasicContentRedirectFilterInput>>;
  /** Is the redirect permanent */
  isPermanent: InputMaybe<BooleanOperationFilterInput>;
  or: InputMaybe<Array<BasicContentRedirectFilterInput>>;
  /** The url to redirect to */
  redirectUrl: InputMaybe<StringOperationFilterInput>;
};

/** Represents a content redirect */
export type BasicContentRedirectSortInput = {
  /** Is the redirect permanent */
  isPermanent: InputMaybe<SortEnumType>;
  /** The url to redirect to */
  redirectUrl: InputMaybe<SortEnumType>;
};

/** Represents a content type. */
export type BasicContentType = {
  __typename?: 'BasicContentType';
  /** Gets the content type alias. */
  alias: Maybe<Scalars['String']>;
  /** Gets the aliases of the content types participating in the composition. */
  compositionAliases: Maybe<Array<Scalars['String']>>;
  /** Gets the content type identifier. */
  id: Scalars['Int'];
  /** Gets a value indicating whether this content type is for an element. */
  isElement: Scalars['Boolean'];
  /** Gets the content item type. */
  itemType: PublishedItemType;
  /** Gets the unique key for the content type. */
  key: Scalars['UUID'];
  /** Gets the content variations of the content type. */
  variations: ContentVariation;
};

/** Represents a content type. */
export type BasicContentTypeFilterInput = {
  /** Gets the content type alias. */
  alias: InputMaybe<StringOperationFilterInput>;
  and: InputMaybe<Array<BasicContentTypeFilterInput>>;
  /** Gets the aliases of the content types participating in the composition. */
  compositionAliases: InputMaybe<ListStringOperationFilterInput>;
  /** Gets the content type identifier. */
  id: InputMaybe<ComparableInt32OperationFilterInput>;
  /** Gets a value indicating whether this content type is for an element. */
  isElement: InputMaybe<BooleanOperationFilterInput>;
  /** Gets the content item type. */
  itemType: InputMaybe<PublishedItemTypeOperationFilterInput>;
  /** Gets the unique key for the content type. */
  key: InputMaybe<ComparableGuidOperationFilterInput>;
  or: InputMaybe<Array<BasicContentTypeFilterInput>>;
  /** Gets the content variations of the content type. */
  variations: InputMaybe<ContentVariationOperationFilterInput>;
};

/** Represents a content type. */
export type BasicContentTypeSortInput = {
  /** Gets the content type alias. */
  alias: InputMaybe<SortEnumType>;
  /** Gets the content type identifier. */
  id: InputMaybe<SortEnumType>;
  /** Gets a value indicating whether this content type is for an element. */
  isElement: InputMaybe<SortEnumType>;
  /** Gets the content item type. */
  itemType: InputMaybe<SortEnumType>;
  /** Gets the unique key for the content type. */
  key: InputMaybe<SortEnumType>;
  /** Gets the content variations of the content type. */
  variations: InputMaybe<SortEnumType>;
};

/** Represents a date time property value. */
export type BasicDateTimePicker = PropertyValue & {
  __typename?: 'BasicDateTimePicker';
  alias: Scalars['String'];
  /** Gets the value of the property. */
  value: Maybe<Scalars['DateTime']>;
};

/** Represents a date time property value. */
export type BasicLabel = PropertyValue & {
  __typename?: 'BasicLabel';
  alias: Scalars['String'];
  /** Gets the value of the property. */
  value: Maybe<Scalars['Any']>;
};

/** Represents a Media item. */
export type BasicMediaOfBasicPropertyAndBasicContentType = {
  __typename?: 'BasicMediaOfBasicPropertyAndBasicContentType';
  /** Gets the absolute url of the Media item. */
  absoluteUrl: Maybe<Scalars['String']>;
  /** Gets the children of the Media item that are available for the current culture. */
  children: Maybe<Array<Maybe<BasicMediaOfBasicPropertyAndBasicContentType>>>;
  /** Gets all the children of the Media item, regardless of whether they are available for the current culture. */
  childrenForAllCultures: Maybe<Array<Maybe<BasicMediaOfBasicPropertyAndBasicContentType>>>;
  /** Gets the content type. */
  contentType: Maybe<BasicContentType>;
  /** Gets the date that the Media was created. */
  createDate: Maybe<Scalars['DateTime']>;
  /** Gets the identifier of the user who created the Media item. */
  creatorId: Maybe<Scalars['Int']>;
  /** Gets available culture infos. */
  cultures: Maybe<Array<KeyValuePairOfStringAndPublishedCultureInfo>>;
  /** Gets the unique identifier of the Media item. */
  id: Maybe<Scalars['Int']>;
  /** Gets the type of the Media item (document, media...). */
  itemType: Maybe<PublishedItemType>;
  /** Gets the unique key of the element. */
  key: Maybe<Scalars['UUID']>;
  /** Gets the tree level of the Media item. */
  level: Maybe<Scalars['Int']>;
  /** Gets the name of the Media item for the current culture. */
  name: Maybe<Scalars['String']>;
  /** Gets the parent of the Media item. */
  parent: Maybe<BasicMediaOfBasicPropertyAndBasicContentType>;
  /** Gets the tree path of the Media item. */
  path: Maybe<Scalars['String']>;
  /** Gets the properties of the element. */
  properties: Maybe<Array<Maybe<BasicProperty>>>;
  /** Gets the sort order of the Media item. */
  sortOrder: Maybe<Scalars['Int']>;
  /** Gets the identifier of the template to use to render the Media item. */
  templateId: Maybe<Scalars['Int']>;
  /** Gets the date the Media item was last updated. */
  updateDate: Maybe<Scalars['DateTime']>;
  /** Gets the url of the Media item. */
  url: Maybe<Scalars['String']>;
  /** Gets the URL segment of the Media item for the current culture. */
  urlSegment: Maybe<Scalars['String']>;
  /** Gets the identifier of the user who last updated the Media item. */
  writerId: Maybe<Scalars['Int']>;
};


/** Represents a Media item. */
export type BasicMediaOfBasicPropertyAndBasicContentTypePropertiesArgs = {
  where: InputMaybe<BasicPropertyFilterInput>;
};

/** Represents a Media item. */
export type BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput = {
  /** Gets the absolute url of the Media item. */
  absoluteUrl: InputMaybe<StringOperationFilterInput>;
  and: InputMaybe<Array<BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>>;
  /** Gets the children of the Media item that are available for the current culture. */
  children: InputMaybe<ListFilterInputTypeOfBasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>;
  /** Gets all the children of the Media item, regardless of whether they are available for the current culture. */
  childrenForAllCultures: InputMaybe<ListFilterInputTypeOfBasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>;
  /** Gets the content type. */
  contentType: InputMaybe<BasicContentTypeFilterInput>;
  /** Gets the date that the Media was created. */
  createDate: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  /** Gets the identifier of the user who created the Media item. */
  creatorId: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Gets available culture infos. */
  cultures: InputMaybe<IReadOnlyDictionaryOfStringAndPublishedCultureInfoFilterInput>;
  /** Gets the unique identifier of the Media item. */
  id: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Gets the type of the Media item (document, media...). */
  itemType: InputMaybe<NullableOfPublishedItemTypeOperationFilterInput>;
  /** Gets the unique key of the element. */
  key: InputMaybe<ComparableNullableOfGuidOperationFilterInput>;
  /** Gets the tree level of the Media item. */
  level: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Gets the name of the Media item for the current culture. */
  name: InputMaybe<StringOperationFilterInput>;
  or: InputMaybe<Array<BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>>;
  /** Gets the parent of the Media item. */
  parent: InputMaybe<BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>;
  /** Gets the tree path of the Media item. */
  path: InputMaybe<StringOperationFilterInput>;
  /** Gets the properties of the element. */
  properties: InputMaybe<ListFilterInputTypeOfBasicPropertyFilterInput>;
  /** Gets the sort order of the Media item. */
  sortOrder: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Gets the identifier of the template to use to render the Media item. */
  templateId: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Gets the date the Media item was last updated. */
  updateDate: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  /** Gets the url of the Media item. */
  url: InputMaybe<StringOperationFilterInput>;
  /** Gets the URL segment of the Media item for the current culture. */
  urlSegment: InputMaybe<StringOperationFilterInput>;
  /** Gets the identifier of the user who last updated the Media item. */
  writerId: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
};

/** Represents a Media item. */
export type BasicMediaOfBasicPropertyAndBasicContentTypeSortInput = {
  /** Gets the absolute url of the Media item. */
  absoluteUrl: InputMaybe<SortEnumType>;
  /** Gets the content type. */
  contentType: InputMaybe<BasicContentTypeSortInput>;
  /** Gets the date that the Media was created. */
  createDate: InputMaybe<SortEnumType>;
  /** Gets the identifier of the user who created the Media item. */
  creatorId: InputMaybe<SortEnumType>;
  /** Gets the unique identifier of the Media item. */
  id: InputMaybe<SortEnumType>;
  /** Gets the type of the Media item (document, media...). */
  itemType: InputMaybe<SortEnumType>;
  /** Gets the unique key of the element. */
  key: InputMaybe<SortEnumType>;
  /** Gets the tree level of the Media item. */
  level: InputMaybe<SortEnumType>;
  /** Gets the name of the Media item for the current culture. */
  name: InputMaybe<SortEnumType>;
  /** Gets the parent of the Media item. */
  parent: InputMaybe<BasicMediaOfBasicPropertyAndBasicContentTypeSortInput>;
  /** Gets the tree path of the Media item. */
  path: InputMaybe<SortEnumType>;
  /** Gets the sort order of the Media item. */
  sortOrder: InputMaybe<SortEnumType>;
  /** Gets the identifier of the template to use to render the Media item. */
  templateId: InputMaybe<SortEnumType>;
  /** Gets the date the Media item was last updated. */
  updateDate: InputMaybe<SortEnumType>;
  /** Gets the url of the Media item. */
  url: InputMaybe<SortEnumType>;
  /** Gets the URL segment of the Media item for the current culture. */
  urlSegment: InputMaybe<SortEnumType>;
  /** Gets the identifier of the user who last updated the Media item. */
  writerId: InputMaybe<SortEnumType>;
};

/** Represents a media picker item. */
export type BasicMediaPicker = PropertyValue & {
  __typename?: 'BasicMediaPicker';
  alias: Scalars['String'];
  /** Gets the media items of a picker. */
  mediaItems: Array<BasicMediaPickerItem>;
};

/** Represents a media item. */
export type BasicMediaPickerItem = {
  __typename?: 'BasicMediaPickerItem';
  /** Gets the id of a media item. */
  id: Scalars['Int'];
  /** Gets the absolute url of a media item. */
  url: Scalars['String'];
};

/** Represents a member picker. */
export type BasicMemberPicker = PropertyValue & {
  __typename?: 'BasicMemberPicker';
  alias: Scalars['String'];
  /** Gets the members. */
  members: Array<BasicMemberPickerItem>;
};

/** Represents a member item. */
export type BasicMemberPickerItem = {
  __typename?: 'BasicMemberPickerItem';
  /** Gets the id of the member. */
  id: Maybe<Scalars['Int']>;
  /** Gets the name of a member. */
  name: Maybe<Scalars['String']>;
  /** Gets the properties of a member. */
  properties: Array<Maybe<BasicProperty>>;
};

/** Represents a multi url picker. */
export type BasicMultiUrlPicker = PropertyValue & {
  __typename?: 'BasicMultiUrlPicker';
  alias: Scalars['String'];
  /** Gets the links. */
  links: Array<BasicMultiUrlPickerItem>;
};

/** Represents a link item. */
export type BasicMultiUrlPickerItem = {
  __typename?: 'BasicMultiUrlPickerItem';
  /** Gets the name of the link. */
  name: Maybe<Scalars['String']>;
  /** Gets the target of the link. */
  target: Maybe<Scalars['String']>;
  /** Gets the type of the link. */
  type: LinkType;
  /** Gets the url of a link. */
  url: Maybe<Scalars['String']>;
};

/** Represents nested content. */
export type BasicNestedContent = PropertyValue & {
  __typename?: 'BasicNestedContent';
  alias: Scalars['String'];
  /** Gets the elements of a nested content. */
  elements: Maybe<Array<BasicNestedContentElement>>;
};

/** Represents nested content. */
export type BasicNestedContentElement = {
  __typename?: 'BasicNestedContentElement';
  /** Gets the properties of the nested content. */
  properties: Array<Maybe<BasicProperty>>;
};

/** Represents a property. */
export type BasicProperty = {
  __typename?: 'BasicProperty';
  /** Gets the alias of a property. */
  alias: Maybe<Scalars['String']>;
  /** Gets the editor alias of a property. */
  editorAlias: Maybe<Scalars['String']>;
  /** Gets the value of a property. */
  value: Maybe<PropertyValue>;
};

/** Represents a property. */
export type BasicPropertyFilterInput = {
  /** Gets the alias of a property. */
  alias: InputMaybe<StringOperationFilterInput>;
  and: InputMaybe<Array<BasicPropertyFilterInput>>;
  /** Gets the editor alias of a property. */
  editorAlias: InputMaybe<StringOperationFilterInput>;
  or: InputMaybe<Array<BasicPropertyFilterInput>>;
  /** Gets the value of a property. */
  value: InputMaybe<PropertyValueFilterInput>;
};

/** Represents a basic property value. */
export type BasicPropertyValue = PropertyValue & {
  __typename?: 'BasicPropertyValue';
  alias: Scalars['String'];
  /** Gets the value of the property. */
  value: Maybe<Scalars['Any']>;
};

/** Represents a rich text editor. */
export type BasicRichText = PropertyValue & {
  __typename?: 'BasicRichText';
  alias: Scalars['String'];
  /** Gets the original value of the rich text editor or markdown editor. */
  sourceValue: Maybe<Scalars['String']>;
  /** Gets the HTML value of the rich text editor or markdown editor. */
  value: Maybe<Scalars['String']>;
};

/** Represents an unsupported property value. */
export type BasicUnsupportedPropertyValue = PropertyValue & {
  __typename?: 'BasicUnsupportedPropertyValue';
  alias: Scalars['String'];
  /** Gets the message of the property. */
  message: Scalars['String'];
};

export type BooleanOperationFilterInput = {
  eq: InputMaybe<Scalars['Boolean']>;
  neq: InputMaybe<Scalars['Boolean']>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq: InputMaybe<Scalars['DateTime']>;
  gt: InputMaybe<Scalars['DateTime']>;
  gte: InputMaybe<Scalars['DateTime']>;
  in: InputMaybe<Array<Scalars['DateTime']>>;
  lt: InputMaybe<Scalars['DateTime']>;
  lte: InputMaybe<Scalars['DateTime']>;
  neq: InputMaybe<Scalars['DateTime']>;
  ngt: InputMaybe<Scalars['DateTime']>;
  ngte: InputMaybe<Scalars['DateTime']>;
  nin: InputMaybe<Array<Scalars['DateTime']>>;
  nlt: InputMaybe<Scalars['DateTime']>;
  nlte: InputMaybe<Scalars['DateTime']>;
};

export type ComparableGuidOperationFilterInput = {
  eq: InputMaybe<Scalars['UUID']>;
  gt: InputMaybe<Scalars['UUID']>;
  gte: InputMaybe<Scalars['UUID']>;
  in: InputMaybe<Array<Scalars['UUID']>>;
  lt: InputMaybe<Scalars['UUID']>;
  lte: InputMaybe<Scalars['UUID']>;
  neq: InputMaybe<Scalars['UUID']>;
  ngt: InputMaybe<Scalars['UUID']>;
  ngte: InputMaybe<Scalars['UUID']>;
  nin: InputMaybe<Array<Scalars['UUID']>>;
  nlt: InputMaybe<Scalars['UUID']>;
  nlte: InputMaybe<Scalars['UUID']>;
};

export type ComparableInt32OperationFilterInput = {
  eq: InputMaybe<Scalars['Int']>;
  gt: InputMaybe<Scalars['Int']>;
  gte: InputMaybe<Scalars['Int']>;
  in: InputMaybe<Array<Scalars['Int']>>;
  lt: InputMaybe<Scalars['Int']>;
  lte: InputMaybe<Scalars['Int']>;
  neq: InputMaybe<Scalars['Int']>;
  ngt: InputMaybe<Scalars['Int']>;
  ngte: InputMaybe<Scalars['Int']>;
  nin: InputMaybe<Array<Scalars['Int']>>;
  nlt: InputMaybe<Scalars['Int']>;
  nlte: InputMaybe<Scalars['Int']>;
};

export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq: InputMaybe<Scalars['DateTime']>;
  gt: InputMaybe<Scalars['DateTime']>;
  gte: InputMaybe<Scalars['DateTime']>;
  in: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt: InputMaybe<Scalars['DateTime']>;
  lte: InputMaybe<Scalars['DateTime']>;
  neq: InputMaybe<Scalars['DateTime']>;
  ngt: InputMaybe<Scalars['DateTime']>;
  ngte: InputMaybe<Scalars['DateTime']>;
  nin: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt: InputMaybe<Scalars['DateTime']>;
  nlte: InputMaybe<Scalars['DateTime']>;
};

export type ComparableNullableOfGuidOperationFilterInput = {
  eq: InputMaybe<Scalars['UUID']>;
  gt: InputMaybe<Scalars['UUID']>;
  gte: InputMaybe<Scalars['UUID']>;
  in: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  lt: InputMaybe<Scalars['UUID']>;
  lte: InputMaybe<Scalars['UUID']>;
  neq: InputMaybe<Scalars['UUID']>;
  ngt: InputMaybe<Scalars['UUID']>;
  ngte: InputMaybe<Scalars['UUID']>;
  nin: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  nlt: InputMaybe<Scalars['UUID']>;
  nlte: InputMaybe<Scalars['UUID']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq: InputMaybe<Scalars['Int']>;
  gt: InputMaybe<Scalars['Int']>;
  gte: InputMaybe<Scalars['Int']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt: InputMaybe<Scalars['Int']>;
  lte: InputMaybe<Scalars['Int']>;
  neq: InputMaybe<Scalars['Int']>;
  ngt: InputMaybe<Scalars['Int']>;
  ngte: InputMaybe<Scalars['Int']>;
  nin: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt: InputMaybe<Scalars['Int']>;
  nlte: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type ContentAllConnection = {
  __typename?: 'ContentAllConnection';
  /** A list of edges. */
  edges: Maybe<Array<ContentAllEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ContentAllEdge = {
  __typename?: 'ContentAllEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
};

/** A connection to a list of items. */
export type ContentAtRootConnection = {
  __typename?: 'ContentAtRootConnection';
  /** A list of edges. */
  edges: Maybe<Array<ContentAtRootEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ContentAtRootEdge = {
  __typename?: 'ContentAtRootEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
};

/** A connection to a list of items. */
export type ContentByContentTypeConnection = {
  __typename?: 'ContentByContentTypeConnection';
  /** A list of edges. */
  edges: Maybe<Array<ContentByContentTypeEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ContentByContentTypeEdge = {
  __typename?: 'ContentByContentTypeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
};

/** A connection to a list of items. */
export type ContentByTagConnection = {
  __typename?: 'ContentByTagConnection';
  /** A list of edges. */
  edges: Maybe<Array<ContentByTagEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ContentByTagEdge = {
  __typename?: 'ContentByTagEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
};

/** A connection to a list of items. */
export type ContentDescendantsByAbsoluteRouteConnection = {
  __typename?: 'ContentDescendantsByAbsoluteRouteConnection';
  /** A list of edges. */
  edges: Maybe<Array<ContentDescendantsByAbsoluteRouteEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ContentDescendantsByAbsoluteRouteEdge = {
  __typename?: 'ContentDescendantsByAbsoluteRouteEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
};

/** A connection to a list of items. */
export type ContentDescendantsByContentTypeConnection = {
  __typename?: 'ContentDescendantsByContentTypeConnection';
  /** A list of edges. */
  edges: Maybe<Array<ContentDescendantsByContentTypeEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ContentDescendantsByContentTypeEdge = {
  __typename?: 'ContentDescendantsByContentTypeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
};

/** A connection to a list of items. */
export type ContentDescendantsByGuidConnection = {
  __typename?: 'ContentDescendantsByGuidConnection';
  /** A list of edges. */
  edges: Maybe<Array<ContentDescendantsByGuidEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ContentDescendantsByGuidEdge = {
  __typename?: 'ContentDescendantsByGuidEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
};

/** A connection to a list of items. */
export type ContentDescendantsByIdConnection = {
  __typename?: 'ContentDescendantsByIdConnection';
  /** A list of edges. */
  edges: Maybe<Array<ContentDescendantsByIdEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ContentDescendantsByIdEdge = {
  __typename?: 'ContentDescendantsByIdEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
};

export enum ContentVariation {
  Culture = 'CULTURE',
  CultureAndSegment = 'CULTURE_AND_SEGMENT',
  Nothing = 'NOTHING',
  Segment = 'SEGMENT'
}

export type ContentVariationOperationFilterInput = {
  eq: InputMaybe<ContentVariation>;
  in: InputMaybe<Array<ContentVariation>>;
  neq: InputMaybe<ContentVariation>;
  nin: InputMaybe<Array<ContentVariation>>;
};

export type IReadOnlyDictionaryOfStringAndPublishedCultureInfoFilterInput = {
  and: InputMaybe<Array<IReadOnlyDictionaryOfStringAndPublishedCultureInfoFilterInput>>;
  keys: InputMaybe<ListStringOperationFilterInput>;
  or: InputMaybe<Array<IReadOnlyDictionaryOfStringAndPublishedCultureInfoFilterInput>>;
  values: InputMaybe<ListFilterInputTypeOfPublishedCultureInfoFilterInput>;
};

export type KeyValuePairOfStringAndPublishedCultureInfo = {
  __typename?: 'KeyValuePairOfStringAndPublishedCultureInfo';
  key: Scalars['String'];
  value: PublishedCultureInfo;
};

export enum LinkType {
  Content = 'CONTENT',
  External = 'EXTERNAL',
  Media = 'MEDIA'
}

export type ListFilterInputTypeOfBasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput = {
  all: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
  any: InputMaybe<Scalars['Boolean']>;
  none: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
  some: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};

export type ListFilterInputTypeOfBasicMediaOfBasicPropertyAndBasicContentTypeFilterInput = {
  all: InputMaybe<BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>;
  any: InputMaybe<Scalars['Boolean']>;
  none: InputMaybe<BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>;
  some: InputMaybe<BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>;
};

export type ListFilterInputTypeOfBasicPropertyFilterInput = {
  all: InputMaybe<BasicPropertyFilterInput>;
  any: InputMaybe<Scalars['Boolean']>;
  none: InputMaybe<BasicPropertyFilterInput>;
  some: InputMaybe<BasicPropertyFilterInput>;
};

export type ListFilterInputTypeOfPublishedCultureInfoFilterInput = {
  all: InputMaybe<PublishedCultureInfoFilterInput>;
  any: InputMaybe<Scalars['Boolean']>;
  none: InputMaybe<PublishedCultureInfoFilterInput>;
  some: InputMaybe<PublishedCultureInfoFilterInput>;
};

export type ListStringOperationFilterInput = {
  all: InputMaybe<StringOperationFilterInput>;
  any: InputMaybe<Scalars['Boolean']>;
  none: InputMaybe<StringOperationFilterInput>;
  some: InputMaybe<StringOperationFilterInput>;
};

/** A connection to a list of items. */
export type MediaAtRootConnection = {
  __typename?: 'MediaAtRootConnection';
  /** A list of edges. */
  edges: Maybe<Array<MediaAtRootEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<Maybe<BasicMediaOfBasicPropertyAndBasicContentType>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MediaAtRootEdge = {
  __typename?: 'MediaAtRootEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Maybe<BasicMediaOfBasicPropertyAndBasicContentType>;
};

/** A connection to a list of items. */
export type MediaByContentTypeConnection = {
  __typename?: 'MediaByContentTypeConnection';
  /** A list of edges. */
  edges: Maybe<Array<MediaByContentTypeEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<Maybe<BasicMediaOfBasicPropertyAndBasicContentType>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MediaByContentTypeEdge = {
  __typename?: 'MediaByContentTypeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Maybe<BasicMediaOfBasicPropertyAndBasicContentType>;
};

export type NullableOfPublishedItemTypeOperationFilterInput = {
  eq: InputMaybe<PublishedItemType>;
  in: InputMaybe<Array<InputMaybe<PublishedItemType>>>;
  neq: InputMaybe<PublishedItemType>;
  nin: InputMaybe<Array<InputMaybe<PublishedItemType>>>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']>;
};

export type PropertyValue = {
  alias: Scalars['String'];
};

export type PropertyValueFilterInput = {
  alias: InputMaybe<StringOperationFilterInput>;
  and: InputMaybe<Array<PropertyValueFilterInput>>;
  or: InputMaybe<Array<PropertyValueFilterInput>>;
};

export type PublishedCultureInfo = {
  __typename?: 'PublishedCultureInfo';
  culture: Scalars['String'];
  date: Scalars['DateTime'];
  name: Scalars['String'];
  urlSegment: Maybe<Scalars['String']>;
};

export type PublishedCultureInfoFilterInput = {
  and: InputMaybe<Array<PublishedCultureInfoFilterInput>>;
  culture: InputMaybe<StringOperationFilterInput>;
  date: InputMaybe<ComparableDateTimeOperationFilterInput>;
  name: InputMaybe<StringOperationFilterInput>;
  or: InputMaybe<Array<PublishedCultureInfoFilterInput>>;
  urlSegment: InputMaybe<StringOperationFilterInput>;
};

export enum PublishedItemType {
  Content = 'CONTENT',
  Element = 'ELEMENT',
  Media = 'MEDIA',
  Member = 'MEMBER',
  Unknown = 'UNKNOWN'
}

export type PublishedItemTypeOperationFilterInput = {
  eq: InputMaybe<PublishedItemType>;
  in: InputMaybe<Array<PublishedItemType>>;
  neq: InputMaybe<PublishedItemType>;
  nin: InputMaybe<Array<PublishedItemType>>;
};

export type Query = {
  __typename?: 'Query';
  /** Gets all the content items available. */
  contentAll: Maybe<ContentAllConnection>;
  /** Gets all the content items at root level. */
  contentAtRoot: Maybe<ContentAtRootConnection>;
  /** Gets a content item by an absolute route. */
  contentByAbsoluteRoute: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
  /** Gets all the content items by content type. */
  contentByContentType: Maybe<ContentByContentTypeConnection>;
  /** Gets a content item by guid. */
  contentByGuid: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
  /** Gets a content item by id. */
  contentById: Maybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect>;
  /** Gets content items by tag. */
  contentByTag: Maybe<ContentByTagConnection>;
  /** Gets content item descendants by an absolute route. */
  contentDescendantsByAbsoluteRoute: Maybe<ContentDescendantsByAbsoluteRouteConnection>;
  /** Gets all descendants of content items with a specific content type. */
  contentDescendantsByContentType: Maybe<ContentDescendantsByContentTypeConnection>;
  /** Gets descendants on a content item selected by guid. */
  contentDescendantsByGuid: Maybe<ContentDescendantsByGuidConnection>;
  /** Gets descendants on a content item selected by id. */
  contentDescendantsById: Maybe<ContentDescendantsByIdConnection>;
  /** Gets all the Media items at root level. */
  mediaAtRoot: Maybe<MediaAtRootConnection>;
  /** Gets all the media items by content type. */
  mediaByContentType: Maybe<MediaByContentTypeConnection>;
  /** Gets a Media item by guid. */
  mediaByGuid: Maybe<BasicMediaOfBasicPropertyAndBasicContentType>;
  /** Gets a Media item by id. */
  mediaById: Maybe<BasicMediaOfBasicPropertyAndBasicContentType>;
};


export type QueryContentAllArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  culture: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  last: InputMaybe<Scalars['Int']>;
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  preview?: Scalars['Boolean'];
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryContentAtRootArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  culture: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  last: InputMaybe<Scalars['Int']>;
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  preview?: Scalars['Boolean'];
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryContentByAbsoluteRouteArgs = {
  baseUrl?: Scalars['String'];
  culture: InputMaybe<Scalars['String']>;
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  preview?: Scalars['Boolean'];
  route: Scalars['String'];
  routeMode?: RouteMode;
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryContentByContentTypeArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  contentType: Scalars['String'];
  culture: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  last: InputMaybe<Scalars['Int']>;
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryContentByGuidArgs = {
  culture: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  preview?: Scalars['Boolean'];
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryContentByIdArgs = {
  culture: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  preview?: Scalars['Boolean'];
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryContentByTagArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  culture: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  last: InputMaybe<Scalars['Int']>;
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  tag: Scalars['String'];
  tagGroup: InputMaybe<Scalars['String']>;
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryContentDescendantsByAbsoluteRouteArgs = {
  after: InputMaybe<Scalars['String']>;
  baseUrl?: Scalars['String'];
  before: InputMaybe<Scalars['String']>;
  culture: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  last: InputMaybe<Scalars['Int']>;
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  preview?: Scalars['Boolean'];
  route: Scalars['String'];
  routeMode?: RouteMode;
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryContentDescendantsByContentTypeArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  contentType: Scalars['String'];
  culture: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  last: InputMaybe<Scalars['Int']>;
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryContentDescendantsByGuidArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  culture: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  id: Scalars['UUID'];
  last: InputMaybe<Scalars['Int']>;
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  preview?: Scalars['Boolean'];
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryContentDescendantsByIdArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  culture: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  last: InputMaybe<Scalars['Int']>;
  order: InputMaybe<Array<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectSortInput>>;
  preview?: Scalars['Boolean'];
  where: InputMaybe<BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirectFilterInput>;
};


export type QueryMediaAtRootArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  culture: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  last: InputMaybe<Scalars['Int']>;
  order: InputMaybe<Array<BasicMediaOfBasicPropertyAndBasicContentTypeSortInput>>;
  preview?: Scalars['Boolean'];
  where: InputMaybe<BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>;
};


export type QueryMediaByContentTypeArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  contentType: Scalars['String'];
  culture: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  last: InputMaybe<Scalars['Int']>;
  order: InputMaybe<Array<BasicMediaOfBasicPropertyAndBasicContentTypeSortInput>>;
  where: InputMaybe<BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>;
};


export type QueryMediaByGuidArgs = {
  culture: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  order: InputMaybe<Array<BasicMediaOfBasicPropertyAndBasicContentTypeSortInput>>;
  preview?: Scalars['Boolean'];
  where: InputMaybe<BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>;
};


export type QueryMediaByIdArgs = {
  culture: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  order: InputMaybe<Array<BasicMediaOfBasicPropertyAndBasicContentTypeSortInput>>;
  preview?: Scalars['Boolean'];
  where: InputMaybe<BasicMediaOfBasicPropertyAndBasicContentTypeFilterInput>;
};

/** Modes for requesting by route */
export enum RouteMode {
  /** Cache only will only look in the content cache for the url */
  CacheOnly = 'CACHE_ONLY',
  /** Cache or routing will first use the content cache to find content and then use routing. This will only find redirects if no content is found in the content cache */
  CacheOrRouting = 'CACHE_OR_ROUTING',
  /** Routing will use routing to determine a route. This will also show redirects */
  Routing = 'ROUTING',
  /** Routing or cache will first use routing to find content and then use the cache if none is found. This also shows redirects */
  RoutingOrCache = 'ROUTING_OR_CACHE'
}

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and: InputMaybe<Array<StringOperationFilterInput>>;
  contains: InputMaybe<Scalars['String']>;
  endsWith: InputMaybe<Scalars['String']>;
  eq: InputMaybe<Scalars['String']>;
  in: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains: InputMaybe<Scalars['String']>;
  nendsWith: InputMaybe<Scalars['String']>;
  neq: InputMaybe<Scalars['String']>;
  nin: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith: InputMaybe<Scalars['String']>;
};

export type GetPageQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type GetPageQuery = { __typename?: 'Query', contentByAbsoluteRoute: { __typename?: 'BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect', properties: Array<{ __typename?: 'BasicProperty', value: { __typename?: 'BasicBlockListModel' } | { __typename?: 'BasicContentPicker' } | { __typename?: 'BasicDateTimePicker' } | { __typename?: 'BasicLabel' } | { __typename?: 'BasicMediaPicker' } | { __typename?: 'BasicMemberPicker' } | { __typename?: 'BasicMultiUrlPicker' } | { __typename?: 'BasicNestedContent' } | { __typename?: 'BasicPropertyValue', alias: string, value: any } | { __typename?: 'BasicRichText' } | { __typename?: 'BasicUnsupportedPropertyValue' } }> } };

export type GetPagesQueryVariables = Exact<{
  culture: Scalars['String'];
}>;


export type GetPagesQuery = { __typename?: 'Query', contentByAbsoluteRoute: { __typename?: 'BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect', children: Array<{ __typename?: 'BasicContentOfBasicPropertyAndBasicContentTypeAndBasicContentRedirect', properties: Array<{ __typename?: 'BasicProperty', value: { __typename?: 'BasicBlockListModel' } | { __typename?: 'BasicContentPicker' } | { __typename?: 'BasicDateTimePicker' } | { __typename?: 'BasicLabel' } | { __typename?: 'BasicMediaPicker' } | { __typename?: 'BasicMemberPicker' } | { __typename?: 'BasicMultiUrlPicker' } | { __typename?: 'BasicNestedContent' } | { __typename?: 'BasicPropertyValue', alias: string, value: any } | { __typename?: 'BasicRichText' } | { __typename?: 'BasicUnsupportedPropertyValue' } }> }> } };


export const GetPageDocument = gql`
    query getPage($url: String!) {
  contentByAbsoluteRoute(route: $url) {
    properties {
      value {
        ... on BasicPropertyValue {
          alias
          value
        }
      }
    }
  }
}
    `;
export const GetPagesDocument = gql`
    query getPages($culture: String!) {
  contentByAbsoluteRoute(route: "/", culture: $culture) {
    children {
      properties {
        value {
          ... on BasicPropertyValue {
            alias
            value
          }
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getPage(variables: GetPageQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPageQuery>(GetPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPage', 'query');
    },
    getPages(variables: GetPagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPagesQuery>(GetPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPages', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;