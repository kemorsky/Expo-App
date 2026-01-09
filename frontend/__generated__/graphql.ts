/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
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
  acceptChallenge: UserChallenge;
  createChallenge: UserChallenge;
  createUser: User;
  deleteChallenge: Scalars['Boolean']['output'];
  login: AuthPayload;
  markChallengeAsDone: UserChallenge;
  previewChallenge?: Maybe<UserChallenge>;
  refreshToken: AuthPayload;
  requestPasswordReset: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  saveOnboarding: User;
  updateChallenge: UserChallenge;
  updateUserSettings: Settings;
};


export type MutationAcceptChallengeArgs = {
  id: Scalars['ID']['input'];
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


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSaveOnboardingArgs = {
  input: OnboardingInput;
};


export type MutationUpdateChallengeArgs = {
  id: Scalars['ID']['input'];
  input: ChallengeInput;
};


export type MutationUpdateUserSettingsArgs = {
  input: SettingsInput;
};

export type OnboardingInput = {
  onboarded: Scalars['Boolean']['input'];
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
  assignmentsToday: Scalars['Int']['output'];
  challengeResetDate?: Maybe<Scalars['DateTime']['output']>;
  challenges?: Maybe<Array<Maybe<UserChallenge>>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastAssignmentDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  onboarded?: Maybe<Scalars['Boolean']['output']>;
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

export type PreviewChallengeMutationVariables = Exact<{ [key: string]: never; }>;


export type PreviewChallengeMutation = { __typename?: 'Mutation', previewChallenge?: { __typename?: 'UserChallenge', id: string, challenge: { __typename?: 'Challenge', id: string, title: string, isPredefined: boolean } } | null };

export type AcceptChallengeMutationVariables = Exact<{
  acceptChallengeId: Scalars['ID']['input'];
}>;


export type AcceptChallengeMutation = { __typename?: 'Mutation', acceptChallenge: { __typename?: 'UserChallenge', id: string, notes?: string | null, done: boolean, currentChallenge: boolean, createdAt?: string | null, assignedAt?: any | null, updatedAt?: string | null, user?: { __typename?: 'User', id: string, assignmentsToday: number } | null, challenge: { __typename?: 'Challenge', id: string, title: string, isPredefined: boolean } } };

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


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, name: string, password?: string | null, assignmentsToday: number } };

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthPayload', id?: string | null, name?: string | null, email?: string | null, token?: string | null, refreshToken?: string | null } };

export type UpdateUserSettingsMutationVariables = Exact<{
  input: SettingsInput;
}>;


export type UpdateUserSettingsMutation = { __typename?: 'Mutation', updateUserSettings: { __typename?: 'Settings', language?: string | null, numberOfChallengesPerDay?: number | null, theme?: string | null } };

export type SaveOnboardingMutationVariables = Exact<{
  input: OnboardingInput;
}>;


export type SaveOnboardingMutation = { __typename?: 'Mutation', saveOnboarding: { __typename?: 'User', id: string, onboarded?: boolean | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, email: string, challengeResetDate?: any | null, assignmentsToday: number, lastAssignmentDate?: any | null, refreshToken?: string | null, onboarded?: boolean | null, challenges?: Array<{ __typename?: 'UserChallenge', id: string, done: boolean, currentChallenge: boolean, createdAt?: string | null, assignedAt?: any | null, updatedAt?: string | null, completedAt?: any | null, notes?: string | null, challenge: { __typename?: 'Challenge', id: string, title: string, isPredefined: boolean } } | null> | null, settings?: { __typename?: 'Settings', language?: string | null, numberOfChallengesPerDay?: number | null, theme?: string | null } | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id: string, email: string, name: string, challenges?: Array<{ __typename?: 'UserChallenge', id: string, done: boolean, currentChallenge: boolean, createdAt?: string | null, updatedAt?: string | null, challenge: { __typename?: 'Challenge', id: string, title: string, isPredefined: boolean } } | null> | null }> | null };


export const PreviewChallengeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PreviewChallenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"previewChallenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"challenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPredefined"}}]}}]}}]}}]} as unknown as DocumentNode<PreviewChallengeMutation, PreviewChallengeMutationVariables>;
export const AcceptChallengeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptChallenge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acceptChallengeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptChallenge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acceptChallengeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignmentsToday"}}]}},{"kind":"Field","name":{"kind":"Name","value":"challenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPredefined"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"currentChallenge"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AcceptChallengeMutation, AcceptChallengeMutationVariables>;
export const MarkChallengeAsDoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkChallengeAsDone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markChallengeAsDoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChallengeDoneInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markChallengeAsDone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markChallengeAsDoneId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"challenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPredefined"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"currentChallenge"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]} as unknown as DocumentNode<MarkChallengeAsDoneMutation, MarkChallengeAsDoneMutationVariables>;
export const CreateChallengeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChallenge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChallengeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChallenge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"challenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPredefined"}}]}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateChallengeMutation, CreateChallengeMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserLogin"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"assignmentsToday"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const RequestPasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPasswordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const UpdateUserSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfChallengesPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}}]}}]}}]} as unknown as DocumentNode<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;
export const SaveOnboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveOnboarding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveOnboarding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}}]}}]}}]} as unknown as DocumentNode<SaveOnboardingMutation, SaveOnboardingMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"challenges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"challenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPredefined"}}]}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"currentChallenge"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfChallengesPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}}]}},{"kind":"Field","name":{"kind":"Name","value":"challengeResetDate"}},{"kind":"Field","name":{"kind":"Name","value":"assignmentsToday"}},{"kind":"Field","name":{"kind":"Name","value":"lastAssignmentDate"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"onboarded"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"challenges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"challenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPredefined"}}]}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"currentChallenge"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;