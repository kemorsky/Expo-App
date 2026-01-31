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
    "\n    mutation PreviewChallenge {\n        previewChallenge {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            repeatable\n        }\n    }\n": typeof types.PreviewChallengeDocument,
    "\n    mutation AcceptChallenge($acceptChallengeId: ID!) {\n        acceptChallenge(id: $acceptChallengeId) {\n            id\n            user {\n                id\n                assignmentsToday\n            }\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            notes\n            done\n            currentChallenge\n            createdAt\n            assignedAt\n            updatedAt\n            repeatable\n        }\n    }\n": typeof types.AcceptChallengeDocument,
    "\n    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {\n        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            notes\n            done\n            currentChallenge\n            createdAt\n            updatedAt\n            completedAt\n            repeatable\n        }\n    }\n": typeof types.MarkChallengeAsDoneDocument,
    "\n    mutation CreateChallenge($input: ChallengeInput!) {\n        createChallenge(input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            done\n            createdAt\n            updatedAt\n            repeatable\n        }\n    }\n": typeof types.CreateChallengeDocument,
    "\n    mutation DeleteChallenge($deleteChallengeId: ID!) {\n        deleteChallenge(id: $deleteChallengeId)\n    }\n": typeof types.DeleteChallengeDocument,
    "\n    mutation DeleteChallenges($ids: [ID]!) {\n        deleteChallenges(ids: $ids)\n    }\n": typeof types.DeleteChallengesDocument,
    "\n  mutation Login($input: UserLogin!) {\n    login(input: $input) {\n      id\n      email\n      name\n      token\n      refreshToken\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation CreateUser($input: UserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      name\n      password\n      assignmentsToday\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n": typeof types.RequestPasswordResetDocument,
    "\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword)\n  }\n": typeof types.ResetPasswordDocument,
    "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      id\n      name\n      email\n      token\n      refreshToken\n    }\n  }\n": typeof types.RefreshTokenDocument,
    "\n  mutation UpdateUserSettings($input: SettingsInput!) {\n    updateUserSettings(input: $input) {\n      language\n      numberOfChallengesPerDay\n      theme\n    }\n  }\n": typeof types.UpdateUserSettingsDocument,
    "\n  mutation SaveOnboarding($input: OnboardingInput!) {\n    saveOnboarding(input: $input) {\n      id\n      onboarded\n    }\n  }\n": typeof types.SaveOnboardingDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        createdAt\n        assignedAt\n        updatedAt\n        completedAt\n        notes\n        repeatable\n      }\n      settings {\n        language  \n        numberOfChallengesPerDay\n        theme\n      }\n      challengeResetDate\n      assignmentsToday\n      lastAssignmentDate\n      refreshToken\n      onboarded\n    }\n}": typeof types.MeDocument,
    "\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        createdAt\n        updatedAt\n    }\n  }\n}": typeof types.GetUsersDocument,
};
const documents: Documents = {
    "\n    mutation PreviewChallenge {\n        previewChallenge {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            repeatable\n        }\n    }\n": types.PreviewChallengeDocument,
    "\n    mutation AcceptChallenge($acceptChallengeId: ID!) {\n        acceptChallenge(id: $acceptChallengeId) {\n            id\n            user {\n                id\n                assignmentsToday\n            }\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            notes\n            done\n            currentChallenge\n            createdAt\n            assignedAt\n            updatedAt\n            repeatable\n        }\n    }\n": types.AcceptChallengeDocument,
    "\n    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {\n        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            notes\n            done\n            currentChallenge\n            createdAt\n            updatedAt\n            completedAt\n            repeatable\n        }\n    }\n": types.MarkChallengeAsDoneDocument,
    "\n    mutation CreateChallenge($input: ChallengeInput!) {\n        createChallenge(input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            done\n            createdAt\n            updatedAt\n            repeatable\n        }\n    }\n": types.CreateChallengeDocument,
    "\n    mutation DeleteChallenge($deleteChallengeId: ID!) {\n        deleteChallenge(id: $deleteChallengeId)\n    }\n": types.DeleteChallengeDocument,
    "\n    mutation DeleteChallenges($ids: [ID]!) {\n        deleteChallenges(ids: $ids)\n    }\n": types.DeleteChallengesDocument,
    "\n  mutation Login($input: UserLogin!) {\n    login(input: $input) {\n      id\n      email\n      name\n      token\n      refreshToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateUser($input: UserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      name\n      password\n      assignmentsToday\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n": types.RequestPasswordResetDocument,
    "\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword)\n  }\n": types.ResetPasswordDocument,
    "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      id\n      name\n      email\n      token\n      refreshToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation UpdateUserSettings($input: SettingsInput!) {\n    updateUserSettings(input: $input) {\n      language\n      numberOfChallengesPerDay\n      theme\n    }\n  }\n": types.UpdateUserSettingsDocument,
    "\n  mutation SaveOnboarding($input: OnboardingInput!) {\n    saveOnboarding(input: $input) {\n      id\n      onboarded\n    }\n  }\n": types.SaveOnboardingDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        createdAt\n        assignedAt\n        updatedAt\n        completedAt\n        notes\n        repeatable\n      }\n      settings {\n        language  \n        numberOfChallengesPerDay\n        theme\n      }\n      challengeResetDate\n      assignmentsToday\n      lastAssignmentDate\n      refreshToken\n      onboarded\n    }\n}": types.MeDocument,
    "\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        createdAt\n        updatedAt\n    }\n  }\n}": types.GetUsersDocument,
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
export function gql(source: "\n    mutation PreviewChallenge {\n        previewChallenge {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            repeatable\n        }\n    }\n"): (typeof documents)["\n    mutation PreviewChallenge {\n        previewChallenge {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            repeatable\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AcceptChallenge($acceptChallengeId: ID!) {\n        acceptChallenge(id: $acceptChallengeId) {\n            id\n            user {\n                id\n                assignmentsToday\n            }\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            notes\n            done\n            currentChallenge\n            createdAt\n            assignedAt\n            updatedAt\n            repeatable\n        }\n    }\n"): (typeof documents)["\n    mutation AcceptChallenge($acceptChallengeId: ID!) {\n        acceptChallenge(id: $acceptChallengeId) {\n            id\n            user {\n                id\n                assignmentsToday\n            }\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            notes\n            done\n            currentChallenge\n            createdAt\n            assignedAt\n            updatedAt\n            repeatable\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {\n        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            notes\n            done\n            currentChallenge\n            createdAt\n            updatedAt\n            completedAt\n            repeatable\n        }\n    }\n"): (typeof documents)["\n    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {\n        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            notes\n            done\n            currentChallenge\n            createdAt\n            updatedAt\n            completedAt\n            repeatable\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateChallenge($input: ChallengeInput!) {\n        createChallenge(input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            done\n            createdAt\n            updatedAt\n            repeatable\n        }\n    }\n"): (typeof documents)["\n    mutation CreateChallenge($input: ChallengeInput!) {\n        createChallenge(input: $input) {\n            id\n            challenge {\n                id\n                title\n                isPredefined\n            }\n            done\n            createdAt\n            updatedAt\n            repeatable\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteChallenge($deleteChallengeId: ID!) {\n        deleteChallenge(id: $deleteChallengeId)\n    }\n"): (typeof documents)["\n    mutation DeleteChallenge($deleteChallengeId: ID!) {\n        deleteChallenge(id: $deleteChallengeId)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteChallenges($ids: [ID]!) {\n        deleteChallenges(ids: $ids)\n    }\n"): (typeof documents)["\n    mutation DeleteChallenges($ids: [ID]!) {\n        deleteChallenges(ids: $ids)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: UserLogin!) {\n    login(input: $input) {\n      id\n      email\n      name\n      token\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: UserLogin!) {\n    login(input: $input) {\n      id\n      email\n      name\n      token\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: UserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      name\n      password\n      assignmentsToday\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: UserInput!) {\n    createUser(input: $input) {\n      id\n      email\n      name\n      password\n      assignmentsToday\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n"): (typeof documents)["\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword)\n  }\n"): (typeof documents)["\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      id\n      name\n      email\n      token\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      id\n      name\n      email\n      token\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserSettings($input: SettingsInput!) {\n    updateUserSettings(input: $input) {\n      language\n      numberOfChallengesPerDay\n      theme\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserSettings($input: SettingsInput!) {\n    updateUserSettings(input: $input) {\n      language\n      numberOfChallengesPerDay\n      theme\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SaveOnboarding($input: OnboardingInput!) {\n    saveOnboarding(input: $input) {\n      id\n      onboarded\n    }\n  }\n"): (typeof documents)["\n  mutation SaveOnboarding($input: OnboardingInput!) {\n    saveOnboarding(input: $input) {\n      id\n      onboarded\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      name\n      email\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        createdAt\n        assignedAt\n        updatedAt\n        completedAt\n        notes\n        repeatable\n      }\n      settings {\n        language  \n        numberOfChallengesPerDay\n        theme\n      }\n      challengeResetDate\n      assignmentsToday\n      lastAssignmentDate\n      refreshToken\n      onboarded\n    }\n}"): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      email\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        createdAt\n        assignedAt\n        updatedAt\n        completedAt\n        notes\n        repeatable\n      }\n      settings {\n        language  \n        numberOfChallengesPerDay\n        theme\n      }\n      challengeResetDate\n      assignmentsToday\n      lastAssignmentDate\n      refreshToken\n      onboarded\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        createdAt\n        updatedAt\n    }\n  }\n}"): (typeof documents)["\n  query GetUsers {\n    getUsers {\n      id\n      email\n      name\n      challenges {\n        id\n        challenge {\n          id\n          title\n          isPredefined\n        }\n        done\n        currentChallenge\n        createdAt\n        updatedAt\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;