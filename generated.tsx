import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export enum AgeGroup {
  Ag_0_6 = 'ag_0_6',
  Ag_7_17 = 'ag_7_17',
  Ag_18_24 = 'ag_18_24',
  Ag_25_44 = 'ag_25_44',
  Ag_45Plus = 'ag_45_plus',
  AgAll = 'ag_all'
}

export enum AndEnabledUIfilter {
  Genres = 'genres',
  Languages = 'languages'
}

export type AssetType = {
  __typename?: 'AssetType';
  height?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export enum BooleanVal {
  No = 'No',
  Yes = 'Yes'
}

export type BundleType = {
  __typename?: 'BundleType';
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
};

export type CollectionHit = {
  __typename?: 'CollectionHit';
  bannerImageURL?: Maybe<Scalars['String']>;
  collectionType?: Maybe<Scalars['Int']>;
  condition?: Maybe<Scalars['String']>;
  divOrder?: Maybe<Scalars['Int']>;
  logoBgColor?: Maybe<Scalars['String']>;
  logoCircleCode?: Maybe<Scalars['String']>;
  logoImageURL?: Maybe<Scalars['String']>;
  objectID?: Maybe<Scalars['Int']>;
  replica?: Maybe<Scalars['String']>;
  sortField?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  visible?: Maybe<Scalars['Boolean']>;
};

export type CollectionInput = {
  sorted?: InputMaybe<Array<Scalars['Boolean']>>;
  visible?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type CompanyHit = {
  __typename?: 'CompanyHit';
  company?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  regId?: Maybe<Scalars['String']>;
};

export type CountryInfo = {
  __typename?: 'CountryInfo';
  code: Scalars['String'];
  name: Scalars['String'];
};

export type FacetFilter = {
  name: FacetName;
  op?: InputMaybe<OpType>;
  values: Array<Scalars['String']>;
};

export enum FacetName {
  BestGame = 'bestGame',
  BestGameOrder = 'bestGameOrder',
  Categories = 'categories',
  Company = 'company',
  ExclusiveGame = 'exclusiveGame',
  ExclusiveGameOrder = 'exclusiveGameOrder',
  FeaturedGame = 'featuredGame',
  FeaturedGameOrder = 'featuredGameOrder',
  Flag = 'flag',
  IsSearchable = 'isSearchable',
  Languages = 'languages',
  Md5 = 'md5',
  Mobile = 'mobile',
  Pvisible = 'pvisible',
  SubType = 'subType',
  Tags = 'tags',
  Tier = 'tier',
  TopHypercasualGame = 'topHypercasualGame',
  TopHypercasualGameOrder = 'topHypercasualGameOrder',
  TopPicksGame = 'topPicksGame',
  TopPicksGameOrder = 'topPicksGameOrder',
  Type = 'type',
  Visible = 'visible'
}

export type FacetSearchResult = {
  __typename?: 'FacetSearchResult';
  categories: Array<Scalars['String']>;
  developers: Array<Scalars['String']>;
  languages: Array<Scalars['String']>;
  subTypes: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  tiers: Array<Scalars['String']>;
  types: Array<Scalars['String']>;
};

export type FacetType = {
  __typename?: 'FacetType';
  name: Scalars['String'];
  values?: Maybe<Array<FacetValue>>;
};

export type FacetValue = {
  __typename?: 'FacetValue';
  key: Scalars['String'];
  value: Scalars['Int'];
};

export type Game = {
  __typename?: 'Game';
  Description: Scalars['String'];
  Id: Scalars['Int'];
  Md5: Scalars['String'];
  PartnerUser: PartnerUser;
  Title: Scalars['String'];
  partnerUser: PartnerUser;
};

export type GameFindOneInput = {
  objectId?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type GameInput = {
  Id?: InputMaybe<Scalars['Int']>;
};

export type GameSearchFilters = {
  facets?: InputMaybe<Array<FacetFilter>>;
};

export type GameSearchFiltersFlat = {
  bestGame?: InputMaybe<Scalars['Boolean']>;
  bestGameOrder?: InputMaybe<Array<Scalars['Int']>>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  company?: InputMaybe<Array<Scalars['String']>>;
  exclusiveGame?: InputMaybe<Scalars['Boolean']>;
  exclusiveGameOrder?: InputMaybe<Array<Scalars['Int']>>;
  featuredGame?: InputMaybe<Scalars['Boolean']>;
  featuredGameOrder?: InputMaybe<Array<Scalars['Int']>>;
  flag?: InputMaybe<Array<Scalars['String']>>;
  isSearchable?: InputMaybe<Scalars['Boolean']>;
  languages?: InputMaybe<Array<Scalars['String']>>;
  md5?: InputMaybe<Array<Scalars['String']>>;
  mobile?: InputMaybe<Array<BooleanVal>>;
  pvisible?: InputMaybe<Scalars['Boolean']>;
  subType?: InputMaybe<Array<Scalars['String']>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  tier?: InputMaybe<Array<Scalars['String']>>;
  topHypercasualGame?: InputMaybe<Scalars['Boolean']>;
  topHypercasualGameOrder?: InputMaybe<Array<Scalars['Int']>>;
  topPicksGame?: InputMaybe<Scalars['Boolean']>;
  topPicksGameOrder?: InputMaybe<Array<Scalars['Int']>>;
  type?: InputMaybe<Array<Scalars['String']>>;
  visible?: InputMaybe<Scalars['Boolean']>;
  withAndOperator?: InputMaybe<Array<FacetName>>;
};

export type GameSearchInput = {
  UIfilter?: InputMaybe<UiFilterInput>;
  collectionObjectId?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<GameSearchFiltersFlat>;
  filtersArray?: InputMaybe<GameSearchFilters>;
  hitsPerPage?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<KnownOrder>;
  sortByGeneric?: InputMaybe<Array<Scalars['String']>>;
};

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export enum KnownOrder {
  BestGameOrder = 'bestGameOrder',
  ExclusiveGameOrder = 'exclusiveGameOrder',
  FeaturedGameOrder = 'featuredGameOrder',
  TopPicksGameOrder = 'topPicksGameOrder'
}

export type Mutation = {
  __typename?: 'Mutation';
  createStudent: Student;
};


export type MutationCreateStudentArgs = {
  studentCreate: StudentCreate;
};

export type NewsHit = {
  __typename?: 'NewsHit';
  ID?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export enum OpType {
  And = 'AND',
  Or = 'OR'
}

export type Partner = {
  __typename?: 'Partner';
  Country: Scalars['String'];
  CountryCode: Scalars['String'];
  CreatedAt: Scalars['DateTime'];
  DeletedAt: Scalars['DateTime'];
  Email: Scalars['String'];
  Id: Scalars['Float'];
  Introduction: Scalars['String'];
  IsReadOnboard: Scalars['Boolean'];
  PartnerUsers: Array<PartnerUser>;
  PublisherOnboardingStatus: PublisherOnboardingStatus;
  RemoteId: Scalars['String'];
  Title: Scalars['String'];
  TrafficVolume?: Maybe<Scalars['Int']>;
  Type: PartnerType;
  UpdatedAt: Scalars['DateTime'];
  Website: Scalars['String'];
  partnerUsers: Array<PartnerUser>;
};

export type PartnerInput = {
  Id?: InputMaybe<Scalars['Int']>;
};

export enum PartnerType {
  Developer = 'Developer',
  DeveloperAndPublisher = 'DeveloperAndPublisher',
  Publisher = 'Publisher'
}

export type PartnerUser = {
  __typename?: 'PartnerUser';
  Active: Scalars['Boolean'];
  CreatedAt: Scalars['DateTime'];
  DeletedAt: Scalars['DateTime'];
  Email: Scalars['String'];
  FirstName: Scalars['String'];
  Games: Array<Game>;
  Id: Scalars['Float'];
  LastLoginAt: Scalars['DateTime'];
  LastName: Scalars['String'];
  Partner: Partner;
  UpdatedAt: Scalars['DateTime'];
  UserType: PartnerUserType;
};

export type PartnerUserInput = {
  Id?: InputMaybe<Scalars['Int']>;
};

export enum PartnerUserType {
  AdminUser = 'AdminUser',
  User = 'User'
}

export enum PublisherOnboardingStatus {
  Completed = 'COMPLETED',
  Na = 'NA',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  Game: Game;
  Partner: Partner;
  PartnerUser?: Maybe<PartnerUser>;
  collections: Array<CollectionHit>;
  companies: Array<CompanyHit>;
  countries: Array<CountryInfo>;
  facets: FacetSearchResult;
  gameSearched?: Maybe<SearchHit>;
  gamesSearched: SearchResponse;
  news: Array<NewsHit>;
  publicStudents: Array<Student>;
  students: Array<Student>;
  wizardSearch: WizardSearchResponse;
};


export type QueryGameArgs = {
  input: GameInput;
};


export type QueryPartnerArgs = {
  input: PartnerInput;
};


export type QueryPartnerUserArgs = {
  input: PartnerUserInput;
};


export type QueryCollectionsArgs = {
  input?: InputMaybe<CollectionInput>;
};


export type QueryCountriesArgs = {
  lang?: InputMaybe<Scalars['String']>;
};


export type QueryGameSearchedArgs = {
  input: GameFindOneInput;
};


export type QueryGamesSearchedArgs = {
  input: GameSearchInput;
};


export type QueryWizardSearchArgs = {
  input?: InputMaybe<WizardInput>;
};

export type SearchHit = {
  __typename?: 'SearchHit';
  assets?: Maybe<Array<AssetType>>;
  bestGame?: Maybe<Scalars['Int']>;
  bestGameOrder?: Maybe<Scalars['Int']>;
  bundles?: Maybe<Array<BundleType>>;
  categories?: Maybe<Array<Scalars['String']>>;
  company?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  exclusiveGame?: Maybe<Scalars['Int']>;
  exclusiveGameOrder?: Maybe<Scalars['Int']>;
  featuredGame?: Maybe<Scalars['Int']>;
  featuredGameOrder?: Maybe<Scalars['Int']>;
  flag?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  https?: Maybe<Scalars['Boolean']>;
  instruction?: Maybe<Scalars['String']>;
  isSearchable?: Maybe<Scalars['Boolean']>;
  keyFeatures?: Maybe<Scalars['String']>;
  languages?: Maybe<Array<Scalars['String']>>;
  lastPublishedAt?: Maybe<Scalars['DateTime']>;
  md5?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['Boolean']>;
  mobileMode?: Maybe<Scalars['String']>;
  objectID?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  pvisible?: Maybe<Scalars['Boolean']>;
  regId?: Maybe<Scalars['String']>;
  similarGames: Array<SearchHit>;
  slugs?: Maybe<Array<SlugType>>;
  subType?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  tier?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  topPicksGame?: Maybe<Scalars['Int']>;
  topPicksGameOrder?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  visible?: Maybe<Scalars['Boolean']>;
  width?: Maybe<Scalars['Int']>;
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  facets: Array<FacetType>;
  /** This is what sent to Algolia to query, for debugging purposes */
  filterSent: Scalars['String'];
  filters?: Maybe<Array<UiFilter>>;
  hits?: Maybe<Array<SearchHit>>;
  hitsPerPage: Scalars['Int'];
  nbHits: Scalars['Int'];
  nbPages: Scalars['Int'];
  page: Scalars['Int'];
};

export type SlugType = {
  __typename?: 'SlugType';
  active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type Student = {
  __typename?: 'Student';
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export type StudentCreate = {
  /** Student's firstname to the Student */
  firstName?: InputMaybe<Scalars['String']>;
  /** Student's lastname to the Student */
  lastName?: InputMaybe<Scalars['String']>;
};

export type UiFilter = {
  __typename?: 'UIFilter';
  key: Scalars['String'];
  title: Scalars['String'];
  type: UiFilterType;
  values?: Maybe<Array<Scalars['String']>>;
};

export type UiFilterInput = {
  IAPs?: InputMaybe<Scalars['Boolean']>;
  developers?: InputMaybe<Array<Scalars['String']>>;
  genres?: InputMaybe<Array<Scalars['String']>>;
  kids_friendly?: InputMaybe<Scalars['Boolean']>;
  languages?: InputMaybe<Array<Scalars['String']>>;
  mobile_ready?: InputMaybe<Scalars['Boolean']>;
  no_blood?: InputMaybe<Scalars['Boolean']>;
  no_cruelty?: InputMaybe<Scalars['Boolean']>;
  players?: InputMaybe<Array<Scalars['String']>>;
  presets?: InputMaybe<Array<Scalars['String']>>;
  withAnd?: InputMaybe<Array<AndEnabledUIfilter>>;
};

export enum UiFilterType {
  Array = 'Array',
  Boolean = 'Boolean'
}

export type WizardInput = {
  ageGroups?: InputMaybe<Array<AgeGroup>>;
  countries?: InputMaybe<Array<Scalars['String']>>;
  genders?: InputMaybe<Array<Gender>>;
  interests?: InputMaybe<Array<Scalars['String']>>;
  kids_friendly?: InputMaybe<Array<Scalars['Boolean']>>;
  languages?: InputMaybe<Array<Scalars['String']>>;
  mobile_ready?: InputMaybe<Array<Scalars['Boolean']>>;
  no_blood?: InputMaybe<Array<Scalars['Boolean']>>;
  no_cruelty?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type WizardResponseSegment = {
  __typename?: 'WizardResponseSegment';
  response: SearchResponse;
  title: Scalars['String'];
};

export type WizardSearchResponse = {
  __typename?: 'WizardSearchResponse';
  segments?: Maybe<Array<WizardResponseSegment>>;
};

export type GetCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryQuery = { __typename?: 'Query', facets: { __typename?: 'FacetSearchResult', categories: Array<string> } };

export type GetGameDataQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  hitsPerPage?: InputMaybe<Scalars['Int']>;
  visibleFilter: Array<Scalars['String']> | Scalars['String'];
  categories: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetGameDataQuery = { __typename?: 'Query', gamesSearched: { __typename?: 'SearchResponse', nbPages: number, hits?: Array<{ __typename?: 'SearchHit', objectID?: string | null, title?: string | null, tags?: Array<string> | null, categories?: Array<string> | null, description?: string | null, md5?: string | null, slugs?: Array<{ __typename?: 'SlugType', name?: string | null, active?: boolean | null }> | null, assets?: Array<{ __typename?: 'AssetType', name?: string | null, width?: number | null, height?: number | null }> | null }> | null } };

export type SearchBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type SearchBySlugQuery = { __typename?: 'Query', gameSearched?: { __typename?: 'SearchHit', md5?: string | null, title?: string | null, description?: string | null, instruction?: string | null, company?: string | null, type?: string | null, subType?: string | null, publishedAt?: any | null, categories?: Array<string> | null } | null };

export type GetCategoryGamesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  hitsPerPage?: InputMaybe<Scalars['Int']>;
  visibleFilter: Array<Scalars['String']> | Scalars['String'];
  categories: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetCategoryGamesQuery = { __typename?: 'Query', gamesSearched: { __typename?: 'SearchResponse', nbPages: number, hits?: Array<{ __typename?: 'SearchHit', objectID?: string | null, title?: string | null, tags?: Array<string> | null, md5?: string | null, slugs?: Array<{ __typename?: 'SlugType', name?: string | null, active?: boolean | null }> | null, assets?: Array<{ __typename?: 'AssetType', name?: string | null, width?: number | null, height?: number | null }> | null }> | null } };

export type GetTagGamesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  visibleFilter: Array<Scalars['String']> | Scalars['String'];
  hitsPerPage?: InputMaybe<Scalars['Int']>;
  tags: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetTagGamesQuery = { __typename?: 'Query', gamesSearched: { __typename?: 'SearchResponse', nbPages: number, hits?: Array<{ __typename?: 'SearchHit', objectID?: string | null, title?: string | null, md5?: string | null, slugs?: Array<{ __typename?: 'SlugType', name?: string | null, active?: boolean | null }> | null, assets?: Array<{ __typename?: 'AssetType', name?: string | null, width?: number | null, height?: number | null }> | null }> | null } };

export type GetRandomGameQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  hitsPerPage?: InputMaybe<Scalars['Int']>;
  visibleFilter: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetRandomGameQuery = { __typename?: 'Query', gamesSearched: { __typename?: 'SearchResponse', hitsPerPage: number, nbHits: number, nbPages: number, page: number, hits?: Array<{ __typename?: 'SearchHit', md5?: string | null, slugs?: Array<{ __typename?: 'SlugType', name?: string | null }> | null }> | null } };


export const GetCategoryDocument = gql`
    query GetCategory {
  facets {
    categories
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetGameDataDocument = gql`
    query GetGameData($search: String, $page: Int, $hitsPerPage: Int, $visibleFilter: [String!]!, $categories: [String!]!) {
  gamesSearched(
    input: {search: $search, page: $page, hitsPerPage: $hitsPerPage, filtersArray: {facets: [{name: visible, values: $visibleFilter}, {name: categories, values: $categories}]}}
  ) {
    nbPages
    hits {
      objectID
      title
      tags
      categories
      description
      md5
      slugs {
        name
        active
      }
      assets {
        name
        width
        height
      }
    }
  }
}
    `;

/**
 * __useGetGameDataQuery__
 *
 * To run a query within a React component, call `useGetGameDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameDataQuery({
 *   variables: {
 *      search: // value for 'search'
 *      page: // value for 'page'
 *      hitsPerPage: // value for 'hitsPerPage'
 *      visibleFilter: // value for 'visibleFilter'
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useGetGameDataQuery(baseOptions: Apollo.QueryHookOptions<GetGameDataQuery, GetGameDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameDataQuery, GetGameDataQueryVariables>(GetGameDataDocument, options);
      }
export function useGetGameDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameDataQuery, GetGameDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameDataQuery, GetGameDataQueryVariables>(GetGameDataDocument, options);
        }
export type GetGameDataQueryHookResult = ReturnType<typeof useGetGameDataQuery>;
export type GetGameDataLazyQueryHookResult = ReturnType<typeof useGetGameDataLazyQuery>;
export type GetGameDataQueryResult = Apollo.QueryResult<GetGameDataQuery, GetGameDataQueryVariables>;
export const SearchBySlugDocument = gql`
    query SearchBySlug($slug: String!) {
  gameSearched(input: {slug: $slug}) {
    md5
    title
    description
    instruction
    company
    type
    subType
    company
    publishedAt
    categories
  }
}
    `;

/**
 * __useSearchBySlugQuery__
 *
 * To run a query within a React component, call `useSearchBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSearchBySlugQuery(baseOptions: Apollo.QueryHookOptions<SearchBySlugQuery, SearchBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchBySlugQuery, SearchBySlugQueryVariables>(SearchBySlugDocument, options);
      }
export function useSearchBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchBySlugQuery, SearchBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchBySlugQuery, SearchBySlugQueryVariables>(SearchBySlugDocument, options);
        }
export type SearchBySlugQueryHookResult = ReturnType<typeof useSearchBySlugQuery>;
export type SearchBySlugLazyQueryHookResult = ReturnType<typeof useSearchBySlugLazyQuery>;
export type SearchBySlugQueryResult = Apollo.QueryResult<SearchBySlugQuery, SearchBySlugQueryVariables>;
export const GetCategoryGamesDocument = gql`
    query GetCategoryGames($page: Int, $hitsPerPage: Int, $visibleFilter: [String!]!, $categories: [String!]!) {
  gamesSearched(
    input: {page: $page, hitsPerPage: $hitsPerPage, filtersArray: {facets: [{name: visible, values: $visibleFilter}, {name: categories, values: $categories}]}}
  ) {
    nbPages
    hits {
      objectID
      title
      tags
      md5
      slugs {
        name
        active
      }
      assets {
        name
        width
        height
      }
    }
  }
}
    `;

/**
 * __useGetCategoryGamesQuery__
 *
 * To run a query within a React component, call `useGetCategoryGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryGamesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      hitsPerPage: // value for 'hitsPerPage'
 *      visibleFilter: // value for 'visibleFilter'
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useGetCategoryGamesQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryGamesQuery, GetCategoryGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryGamesQuery, GetCategoryGamesQueryVariables>(GetCategoryGamesDocument, options);
      }
export function useGetCategoryGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryGamesQuery, GetCategoryGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryGamesQuery, GetCategoryGamesQueryVariables>(GetCategoryGamesDocument, options);
        }
export type GetCategoryGamesQueryHookResult = ReturnType<typeof useGetCategoryGamesQuery>;
export type GetCategoryGamesLazyQueryHookResult = ReturnType<typeof useGetCategoryGamesLazyQuery>;
export type GetCategoryGamesQueryResult = Apollo.QueryResult<GetCategoryGamesQuery, GetCategoryGamesQueryVariables>;
export const GetTagGamesDocument = gql`
    query GetTagGames($page: Int, $visibleFilter: [String!]!, $hitsPerPage: Int, $tags: [String!]!) {
  gamesSearched(
    input: {page: $page, hitsPerPage: $hitsPerPage, filtersArray: {facets: [{name: visible, values: $visibleFilter}, {name: tags, values: $tags}]}}
  ) {
    nbPages
    hits {
      objectID
      title
      md5
      slugs {
        name
        active
      }
      assets {
        name
        width
        height
      }
    }
  }
}
    `;

/**
 * __useGetTagGamesQuery__
 *
 * To run a query within a React component, call `useGetTagGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagGamesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      visibleFilter: // value for 'visibleFilter'
 *      hitsPerPage: // value for 'hitsPerPage'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useGetTagGamesQuery(baseOptions: Apollo.QueryHookOptions<GetTagGamesQuery, GetTagGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagGamesQuery, GetTagGamesQueryVariables>(GetTagGamesDocument, options);
      }
export function useGetTagGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagGamesQuery, GetTagGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagGamesQuery, GetTagGamesQueryVariables>(GetTagGamesDocument, options);
        }
export type GetTagGamesQueryHookResult = ReturnType<typeof useGetTagGamesQuery>;
export type GetTagGamesLazyQueryHookResult = ReturnType<typeof useGetTagGamesLazyQuery>;
export type GetTagGamesQueryResult = Apollo.QueryResult<GetTagGamesQuery, GetTagGamesQueryVariables>;
export const GetRandomGameDocument = gql`
    query GetRandomGame($page: Int, $hitsPerPage: Int, $visibleFilter: [String!]!) {
  gamesSearched(
    input: {page: $page, hitsPerPage: $hitsPerPage, filtersArray: {facets: [{name: visible, values: $visibleFilter}]}}
  ) {
    hitsPerPage
    nbHits
    nbPages
    page
    hits {
      md5
      slugs {
        name
      }
    }
  }
}
    `;

/**
 * __useGetRandomGameQuery__
 *
 * To run a query within a React component, call `useGetRandomGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRandomGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRandomGameQuery({
 *   variables: {
 *      page: // value for 'page'
 *      hitsPerPage: // value for 'hitsPerPage'
 *      visibleFilter: // value for 'visibleFilter'
 *   },
 * });
 */
export function useGetRandomGameQuery(baseOptions: Apollo.QueryHookOptions<GetRandomGameQuery, GetRandomGameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRandomGameQuery, GetRandomGameQueryVariables>(GetRandomGameDocument, options);
      }
export function useGetRandomGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRandomGameQuery, GetRandomGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRandomGameQuery, GetRandomGameQueryVariables>(GetRandomGameDocument, options);
        }
export type GetRandomGameQueryHookResult = ReturnType<typeof useGetRandomGameQuery>;
export type GetRandomGameLazyQueryHookResult = ReturnType<typeof useGetRandomGameLazyQuery>;
export type GetRandomGameQueryResult = Apollo.QueryResult<GetRandomGameQuery, GetRandomGameQueryVariables>;