import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { CreateUserMutation, CreateUserMutationVariables, RefreshTokenMutation, MarkChallengeAsCurrentMutation,
   type RefreshTokenMutationVariables, type LoginMutation, type LoginMutationVariables, type MarkChallengeAsCurrentMutationVariables } from "@/__generated__/graphql";

const LOGIN = gql`
  mutation Login($input: UserLogin!) {
    login(input: $input) {
      id
      email
      name
      token
      refreshToken
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      email
      name
      password
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      id
      name
      email
      token
      refreshToken
    }
  }
`

const MARK_CHALLENGE_AS_CURRENT = gql`
  mutation MarkChallengeAsCurrent($markChallengeAsCurrentId: ID!, $input: ChallengeCurrentInput!) {
    markChallengeAsCurrent(id: $markChallengeAsCurrentId, input: $input) {
      id
      title
      currentChallenge
      currentChallengeExpiresAt
    }
  }
`

export function useRefreshToken() {
  const [refreshTokenMutation, { data, error, loading }] = useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(REFRESH_TOKEN)
  const refreshToken = async (refreshToken: string) => {
    const response = await refreshTokenMutation({
      variables: {
        refreshToken
      }
    })

    return response.data?.refreshToken
  }

  return { refreshToken, data, error, loading }
}

export function useLogin() {
    const [loginMutation, { data, error, loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN)
        const login = async (email: string, password: string) => {
            const response = await loginMutation({
                variables: {
                    input: {email, password}
                }
            })

            return response.data?.login
        }

        return { login, data, error, loading }
}

export function useSignIn() {
  const [signInMutation, { data, error, loading }] = useMutation<CreateUserMutation, CreateUserMutationVariables>(CREATE_USER)

  const createUser = async (email: string, name: string, password: string) => {
    const response = await signInMutation({
      variables: {
        input: {email, name, password}
      }
    })

    return response.data?.createUser
  }

  return { createUser, data, error, loading }
}

export function useMarkChallengeAsCurrent() {
  const [markChallengeAsCurrentMutation, { data, error, loading }] = useMutation<MarkChallengeAsCurrentMutation, MarkChallengeAsCurrentMutationVariables>(MARK_CHALLENGE_AS_CURRENT)

  const markChallengeAsCurrent = async (id: string, currentChallenge: boolean, currentChallengeExpiresAt: string) => {
    const response = await markChallengeAsCurrentMutation({
      variables: {
        markChallengeAsCurrentId: id,
        input: { currentChallenge, currentChallengeExpiresAt }
      }
    })

    return response.data?.markChallengeAsCurrent
  }

  return { markChallengeAsCurrent, data, error, loading }
}