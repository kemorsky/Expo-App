export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
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

export type ChallengeDoneInput = {
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  currentChallenge: Scalars['Boolean']['input'];
  done: Scalars['Boolean']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
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
  challengeResetDate?: Maybe<Scalars['DateTime']['output']>;
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
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  challenge: Challenge;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  currentChallenge: Scalars['Boolean']['output'];
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

export type AssignRandomChallengeMutationVariables = Exact<{ [key: string]: never; }>;


export type AssignRandomChallengeMutation = { __typename?: 'Mutation', assignRandomChallenge: { __typename?: 'UserChallenge', id: string, notes?: string | null, done: boolean, currentChallenge: boolean, createdAt?: string | null, assignedAt?: any | null, updatedAt?: string | null, challenge: { __typename?: 'Challenge', id: string, title: string, isPredefined: boolean } } };

export type MarkChallengeAsDoneMutationVariables = Exact<{
  markChallengeAsDoneId: Scalars['ID']['input'];
  input: ChallengeDoneInput;
}>;


export type MarkChallengeAsDoneMutation = { __typename?: 'Mutation', markChallengeAsDone: { __typename?: 'UserChallenge', id: string, notes?: string | null, done: boolean, currentChallenge: boolean, createdAt?: string | null, updatedAt?: string | null, completedAt?: any | null, challenge: { __typename?: 'Challenge', id: string, title: string, isPredefined: boolean } } };

export type CreateChallengeMutationVariables = Exact<{
  input: ChallengeInput;
}>;


export type CreateChallengeMutation = { __typename?: 'Mutation', createChallenge: { __typename?: 'UserChallenge', id: string, done: boolean, createdAt?: string | null, updatedAt?: string | null, challenge: { __typename?: 'Challenge', id: string, title: string, isPredefined: boolean } } };

export type LoginMutationVariables = Exact<{
  input: UserLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', id?: string | null, email?: string | null, name?: string | null, token?: string | null, refreshToken?: string | null } };

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, name: string, password?: string | null } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthPayload', id?: string | null, name?: string | null, email?: string | null, token?: string | null, refreshToken?: string | null } };

export type UpdateUserSettingsMutationVariables = Exact<{
  input: SettingsInput;
}>;


export type UpdateUserSettingsMutation = { __typename?: 'Mutation', updateUserSettings: { __typename?: 'Settings', language?: string | null, numberOfChallengesPerDay?: number | null, theme?: string | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, email: string, refreshToken?: string | null, challenges?: Array<{ __typename?: 'UserChallenge', id: string, done: boolean, currentChallenge: boolean, createdAt?: string | null, assignedAt?: any | null, updatedAt?: string | null, completedAt?: any | null, notes?: string | null, challenge: { __typename?: 'Challenge', id: string, title: string, isPredefined: boolean } } | null> | null, settings?: { __typename?: 'Settings', language?: string | null, numberOfChallengesPerDay?: number | null, theme?: string | null } | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id: string, email: string, name: string, challenges?: Array<{ __typename?: 'UserChallenge', id: string, done: boolean, currentChallenge: boolean, createdAt?: string | null, updatedAt?: string | null, challenge: { __typename?: 'Challenge', id: string, title: string, isPredefined: boolean } } | null> | null }> | null };
