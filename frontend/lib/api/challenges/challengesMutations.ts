import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { type MarkChallengeAsDoneMutationVariables, MarkChallengeAsCurrentMutation, type MarkChallengeAsCurrentMutationVariables, MarkChallengeAsDoneMutation } from '@/__generated__/graphql'

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

const MARK_CHALLENGE_AS_DONE = gql`
    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {
        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {
            id
            title
            notes
            done
            isPredefined
            currentChallenge
            currentChallengeExpiresAt
            createdAt
            updatedAt
        }
    }
`
export function useMarkChallengeAsCurrent() {
    const [markChallengeAsCurrentMutation, { data, loading, error }] = useMutation<MarkChallengeAsCurrentMutation, MarkChallengeAsCurrentMutationVariables>(MARK_CHALLENGE_AS_CURRENT)
        const markChallengeAsCurrent = async (id: string, currentChallenge: boolean, currentChallengeExpiresAt: string) => {
            const response = await markChallengeAsCurrentMutation({
                variables: {
                    markChallengeAsCurrentId: id,
                    input: { currentChallenge, currentChallengeExpiresAt }
                }
            })

            return response.data?.markChallengeAsCurrent
        }

        return { markChallengeAsCurrent, data, loading, error}
    }

export function useMarkChallengeAsDone() {
    const [markChallengeAsDoneMutation, { data, loading, error }] = useMutation<MarkChallengeAsDoneMutation, MarkChallengeAsDoneMutationVariables>(MARK_CHALLENGE_AS_DONE)
        const markChallengeAsDone = async (id: string, done: boolean) => {
            const response = await markChallengeAsDoneMutation({
                variables: {
                    markChallengeAsDoneId: id,
                    input: { done }
                }
            })

            return response.data?.markChallengeAsDone
        }

        return { markChallengeAsDone, data, loading, error}
    }
