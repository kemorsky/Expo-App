const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        password: String
        challenges: [UserChallenge]
        settings: Settings
        refreshToken: String
    }

    type Me {
        me: User!
    }

    type AuthPayload {
        id: ID
        name: String
        email: String
        token: String
        refreshToken: String
    }

    input UserInput {
        name: String!
        password: String!
        email: String!
    }

    type Challenge {
        id: ID!
        title: String!
        author: User!
        isPredefined: Boolean!
        createdAt: String
        updatedAt: String
    }

    type UserChallenge {
        id: ID!
        challenge: Challenge!
        notes: String
        done: Boolean!
        currentChallenge: Boolean!
        currentChallengeExpiresAt: String
        createdAt: String
        updatedAt: String
    }

    input ChallengeInput {
        title: String!
    }

    input ChallengeCurrentInput {
        currentChallenge: Boolean!
        currentChallengeExpiresAt: String!
    }

    input ChallengeDoneInput {
        done: Boolean!
        currentChallenge: Boolean!
    }

   type Settings {
        numberOfChallengesPerDay: Int
        language: String
        theme: String
    }

    input SettingsInput {
        numberOfChallengesPerDay: Int
        language: String
        theme: String
    }

    input UserLogin {
        email: String!
        password: String!
    }

    type Query {
        user(id: ID!): User
        me: User
        challenge(id: ID!): UserChallenge
        userChallenge(id: ID!): UserChallenge
        getChallenges(isPredefined: Boolean = true): [UserChallenge!]!
        getUsers: [User!]
    }

    type Mutation {
        createUser(input: UserInput!): User!
        login(input: UserLogin!): AuthPayload!
        refreshToken(refreshToken: String!): AuthPayload!
        createChallenge(input: ChallengeInput!): UserChallenge!
        assignRandomChallenge: Challenge!
        markChallengeAsDone(id: ID!, input: ChallengeDoneInput!): Challenge!
        updateChallenge(id: ID!, input: ChallengeInput!): Challenge!
        deleteChallenge(id: ID!): Boolean!
        updateUserSettings(input: SettingsInput!): Settings!
    }
`;

export default typeDefs;