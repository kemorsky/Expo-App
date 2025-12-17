import { gql } from '@apollo/client'
import { useQuery } from "@apollo/client/react";
import type { MeQuery } from '@/__generated__/graphql';
import { MeDocument } from '@/__generated__/graphql';

export const GET_USER = gql`
  query Me {
    me {
      id
      name
      email
      challenges {
        id
        challenge {
          id
          title
          isPredefined
        }
        done
        currentChallenge
        createdAt
        assignedAt
        updatedAt
        completedAt
        notes
      }
      settings {
        language
        numberOfChallengesPerDay
        theme
      }
      challengeResetDate
      assignmentsToday
      lastAssignmentDate
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
        challenge {
          id
          title
          isPredefined
        }
        done
        currentChallenge
        createdAt
        updatedAt
    }
  }
}`

export function useMe() {
  const { data, loading, error, refetch } = useQuery<MeQuery>(MeDocument);

  return {
    user: data?.me,
    loading,
    error,
    refetch
  }
}