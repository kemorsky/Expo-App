import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type Challenge = {
  __typename?: 'Challenge';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPredefined: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ChallengeCurrentInput = {
  currentChallenge: Scalars['Boolean']['input'];
  currentChallengeExpiresAt: Scalars['String']['input'];
};

export type ChallengeDoneInput = {
  currentChallenge: Scalars['Boolean']['input'];
  done: Scalars['Boolean']['input'];
};

export type ChallengeInput = {
  title: Scalars['String']['input'];
};

export type Me = {
  __typename?: 'Me';
  me: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignRandomChallenge: UserChallenge;
  createChallenge: UserChallenge;
  createUser: User;
  deleteChallenge: Scalars['Boolean']['output'];
  login: AuthPayload;
  markChallengeAsDone: UserChallenge;
  refreshToken: AuthPayload;
  updateChallenge: UserChallenge;
  updateUserSettings: Settings;
};


export type MutationCreateChallengeArgs = {
  input: ChallengeInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteChallengeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: UserLogin;
};


export type MutationMarkChallengeAsDoneArgs = {
  id: Scalars['ID']['input'];
  input: ChallengeDoneInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationUpdateChallengeArgs = {
  id: Scalars['ID']['input'];
  input: ChallengeInput;
};


export type MutationUpdateUserSettingsArgs = {
  input: SettingsInput;
};

export type Query = {
  __typename?: 'Query';
  challenge?: Maybe<UserChallenge>;
  getChallenges: Array<UserChallenge>;
  getUsers?: Maybe<Array<User>>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  userChallenge?: Maybe<UserChallenge>;
};


export type QueryChallengeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetChallengesArgs = {
  isPredefined?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserChallengeArgs = {
  id: Scalars['ID']['input'];
};

export type Settings = {
  __typename?: 'Settings';
  language?: Maybe<Scalars['String']['output']>;
  numberOfChallengesPerDay?: Maybe<Scalars['Int']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
};

export type SettingsInput = {
  language?: InputMaybe<Scalars['String']['input']>;
  numberOfChallengesPerDay?: InputMaybe<Scalars['Int']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  challenges?: Maybe<Array<Maybe<UserChallenge>>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  settings?: Maybe<Settings>;
};

export type UserChallenge = {
  __typename?: 'UserChallenge';
  challenge: Challenge;
  createdAt?: Maybe<Scalars['String']['output']>;
  currentChallenge: Scalars['Boolean']['output'];
  currentChallengeExpiresAt?: Maybe<Scalars['String']['output']>;
  done: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Challenge: ResolverTypeWrapper<Challenge>;
  ChallengeCurrentInput: ChallengeCurrentInput;
  ChallengeDoneInput: ChallengeDoneInput;
  ChallengeInput: ChallengeInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Me: ResolverTypeWrapper<Me>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Settings: ResolverTypeWrapper<Settings>;
  SettingsInput: SettingsInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserChallenge: ResolverTypeWrapper<UserChallenge>;
  UserInput: UserInput;
  UserLogin: UserLogin;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  Challenge: Challenge;
  ChallengeCurrentInput: ChallengeCurrentInput;
  ChallengeDoneInput: ChallengeDoneInput;
  ChallengeInput: ChallengeInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Me: Me;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  Settings: Settings;
  SettingsInput: SettingsInput;
  String: Scalars['String']['output'];
  User: User;
  UserChallenge: UserChallenge;
  UserInput: UserInput;
  UserLogin: UserLogin;
};

export type AuthPayloadResolvers<ContextType = any, ParentType = ResolversParentTypes['AuthPayload']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ChallengeResolvers<ContextType = any, ParentType = ResolversParentTypes['Challenge']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPredefined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type MeResolvers<ContextType = any, ParentType = ResolversParentTypes['Me']> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType = ResolversParentTypes['Mutation']> = {
  assignRandomChallenge?: Resolver<ResolversTypes['UserChallenge'], ParentType, ContextType>;
  createChallenge?: Resolver<ResolversTypes['UserChallenge'], ParentType, ContextType, RequireFields<MutationCreateChallengeArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteChallenge?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteChallengeArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  markChallengeAsDone?: Resolver<ResolversTypes['UserChallenge'], ParentType, ContextType, RequireFields<MutationMarkChallengeAsDoneArgs, 'id' | 'input'>>;
  refreshToken?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'refreshToken'>>;
  updateChallenge?: Resolver<ResolversTypes['UserChallenge'], ParentType, ContextType, RequireFields<MutationUpdateChallengeArgs, 'id' | 'input'>>;
  updateUserSettings?: Resolver<ResolversTypes['Settings'], ParentType, ContextType, RequireFields<MutationUpdateUserSettingsArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType = ResolversParentTypes['Query']> = {
  challenge?: Resolver<Maybe<ResolversTypes['UserChallenge']>, ParentType, ContextType, RequireFields<QueryChallengeArgs, 'id'>>;
  getChallenges?: Resolver<Array<ResolversTypes['UserChallenge']>, ParentType, ContextType, RequireFields<QueryGetChallengesArgs, 'isPredefined'>>;
  getUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userChallenge?: Resolver<Maybe<ResolversTypes['UserChallenge']>, ParentType, ContextType, RequireFields<QueryUserChallengeArgs, 'id'>>;
};

export type SettingsResolvers<ContextType = any, ParentType = ResolversParentTypes['Settings']> = {
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numberOfChallengesPerDay?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  theme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType = ResolversParentTypes['User']> = {
  challenges?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserChallenge']>>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>;
};

export type UserChallengeResolvers<ContextType = any, ParentType = ResolversParentTypes['UserChallenge']> = {
  challenge?: Resolver<ResolversTypes['Challenge'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentChallenge?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  currentChallengeExpiresAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  done?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Challenge?: ChallengeResolvers<ContextType>;
  Me?: MeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Settings?: SettingsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserChallenge?: UserChallengeResolvers<ContextType>;
};

