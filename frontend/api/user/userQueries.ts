import { gql, NetworkStatus } from '@apollo/client'
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
        repeatable
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
      onboarded
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
  const { data, loading, error, refetch, networkStatus } = useQuery<MeQuery>(MeDocument, {
    notifyOnNetworkStatusChange: true,
  });

  const isInitialLoad = loading && networkStatus === NetworkStatus.loading;

  return {
    user: data?.me,
    loading: isInitialLoad,
    error,
    refetch
  }
}