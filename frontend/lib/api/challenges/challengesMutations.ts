import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { type MarkChallengeAsDoneMutationVariables, MarkChallengeAsDoneMutation } from '@/__generated__/graphql'

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
