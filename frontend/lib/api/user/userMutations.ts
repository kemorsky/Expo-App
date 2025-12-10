import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { CreateUserMutation, CreateUserMutationVariables, RefreshTokenMutation, 
  type RefreshTokenMutationVariables, type LoginMutation, type LoginMutationVariables,
  UpdateUserSettingsMutation, SettingsInput, 
  UpdateUserSettingsMutationVariables} from "@/__generated__/graphql";

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

const UPDATE_USER_SETTINGS = gql`
  mutation UpdateUserSettings($input: SettingsInput!) {
    updateUserSettings(input: $input) {
      language
      numberOfChallengesPerDay
      theme
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

export function useUpdateUserSettings() {
  const [updateUserSettingsMutation, { data, error, loading }] = useMutation<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>(UPDATE_USER_SETTINGS, {
    refetchQueries: ["Me"]
  });

  const updateUserSettings = async (input: Partial<SettingsInput>) => {
    const response = await updateUserSettingsMutation({
      variables: {
        input
      }
    })
    return response.data?.updateUserSettings
  }
  
  return { updateUserSettings, data, error, loading }
}