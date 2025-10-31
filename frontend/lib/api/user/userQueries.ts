import { gql } from '@apollo/client'
import { useQuery } from "@apollo/client/react";
import type { MeQuery, User } from '@/__generated__/graphql';
import { MeDocument } from '@/__generated__/graphql';

const GET_USER = gql`
  query Me {
    me {
      id
      name
      email
      challenges {
        id
        title
        done
        currentChallenge
        currentChallengeExpiresAt
        createdAt
        updatedAt
        isPredefined
        notes
      }
      settings {
        language
        numberOfChallengesPerDay
        theme
      }
      refreshToken
    }
}`

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      email
      name
      challenges {
        id
        title
        done
        currentChallenge
        currentChallengeExpiresAt
        createdAt
        updatedAt
    }
  }
}`

export function useMe() {
  const { data, loading, error, refetch } = useQuery<MeQuery>(MeDocument, {
    fetchPolicy: 'network-only'
  })

  return {
    user: data?.me,
    loading,
    error,
    refetch
  }
}