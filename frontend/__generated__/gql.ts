/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    mutation AssignRandomChallenge {\n        assignRandomChallenge {\n            id\n            challenge {\n                id\n                title\n            }\n            currentChallenge\n            currentChallengeExpiresAt\n            done\n        }\n    }\n": typeof types.AssignRandomChallengeDocument,
    "\n    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {\n        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {\n            id\n            challenge {\n                id\n                title\n            }\n            notes\n            done\n            currentChallenge\n            currentChallengeExpiresAt\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.MarkChallengeAsDoneDocument,
    "\n    mutation CreateChallenge($input: ChallengeInput!) {\n        createChallenge(input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            done\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.CreateChallengeDocument,
    "\n  mutation Login($input: UserLogin!) {\n    login(input: $input) {\n      id\n      email\n      name\n      token\n      refreshToken\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation CreateUser($input: UserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      name\n      password\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      id\n      name\n      email\n      token\n      refreshToken\n    }\n  }\n": typeof types.RefreshTokenDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        currentChallengeExpiresAt\n        createdAt\n        updatedAt\n        notes\n      }\n      settings {\n        language\n        numberOfChallengesPerDay\n        theme\n      }\n      refreshToken\n    }\n}": typeof types.MeDocument,
    "\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        currentChallengeExpiresAt\n        createdAt\n        updatedAt\n    }\n  }\n}": typeof types.GetUsersDocument,
};
const documents: Documents = {
    "\n    mutation AssignRandomChallenge {\n        assignRandomChallenge {\n            id\n            challenge {\n                id\n                title\n            }\n            currentChallenge\n            currentChallengeExpiresAt\n            done\n        }\n    }\n": types.AssignRandomChallengeDocument,
    "\n    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {\n        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {\n            id\n            challenge {\n                id\n                title\n            }\n            notes\n            done\n            currentChallenge\n            currentChallengeExpiresAt\n            createdAt\n            updatedAt\n        }\n    }\n": types.MarkChallengeAsDoneDocument,
    "\n    mutation CreateChallenge($input: ChallengeInput!) {\n        createChallenge(input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            done\n            createdAt\n            updatedAt\n        }\n    }\n": types.CreateChallengeDocument,
    "\n  mutation Login($input: UserLogin!) {\n    login(input: $input) {\n      id\n      email\n      name\n      token\n      refreshToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateUser($input: UserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      name\n      password\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      id\n      name\n      email\n      token\n      refreshToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        currentChallengeExpiresAt\n        createdAt\n        updatedAt\n        notes\n      }\n      settings {\n        language\n        numberOfChallengesPerDay\n        theme\n      }\n      refreshToken\n    }\n}": types.MeDocument,
    "\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        currentChallengeExpiresAt\n        createdAt\n        updatedAt\n    }\n  }\n}": types.GetUsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AssignRandomChallenge {\n        assignRandomChallenge {\n            id\n            challenge {\n                id\n                title\n            }\n            currentChallenge\n            currentChallengeExpiresAt\n            done\n        }\n    }\n"): (typeof documents)["\n    mutation AssignRandomChallenge {\n        assignRandomChallenge {\n            id\n            challenge {\n                id\n                title\n            }\n            currentChallenge\n            currentChallengeExpiresAt\n            done\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {\n        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {\n            id\n            challenge {\n                id\n                title\n            }\n            notes\n            done\n            currentChallenge\n            currentChallengeExpiresAt\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {\n        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {\n            id\n            challenge {\n                id\n                title\n            }\n            notes\n            done\n            currentChallenge\n            currentChallengeExpiresAt\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateChallenge($input: ChallengeInput!) {\n        createChallenge(input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            done\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    mutation CreateChallenge($input: ChallengeInput!) {\n        createChallenge(input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            done\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: UserLogin!) {\n    login(input: $input) {\n      id\n      email\n      name\n      token\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: UserLogin!) {\n    login(input: $input) {\n      id\n      email\n      name\n      token\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: UserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      name\n      password\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: UserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      name\n      password\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      id\n      name\n      email\n      token\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      id\n      name\n      email\n      token\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      name\n      email\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        currentChallengeExpiresAt\n        createdAt\n        updatedAt\n        notes\n      }\n      settings {\n        language\n        numberOfChallengesPerDay\n        theme\n      }\n      refreshToken\n    }\n}"): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      email\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        currentChallengeExpiresAt\n        createdAt\n        updatedAt\n        notes\n      }\n      settings {\n        language\n        numberOfChallengesPerDay\n        theme\n      }\n      refreshToken\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        currentChallengeExpiresAt\n        createdAt\n        updatedAt\n    }\n  }\n}"): (typeof documents)["\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        currentChallengeExpiresAt\n        createdAt\n        updatedAt\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;