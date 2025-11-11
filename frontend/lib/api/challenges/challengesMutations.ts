import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { type MarkChallengeAsDoneMutationVariables, type AssignRandomChallengeMutationVariables, AssignRandomChallengeMutation, MarkChallengeAsDoneMutation } from '@/__generated__/graphql'


const ASSIGN_RANDOM_CHALLENGE = gql`
    mutation AssignRandomChallenge {
        assignRandomChallenge {
            id
            challenge {
                id
                title
            }
            currentChallenge
            currentChallengeExpiresAt
            done
        }
    }
`

const MARK_CHALLENGE_AS_DONE = gql`
    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {
        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {
            id
            challenge {
                id
                title
            }
            notes
            done
            currentChallenge
            currentChallengeExpiresAt
            createdAt
            updatedAt
        }
    }
`

export function useAssignRandomChallenge() {
    const [assignRandomChallengeMutation, { data, loading, error }] = useMutation<AssignRandomChallengeMutation, AssignRandomChallengeMutationVariables>(ASSIGN_RANDOM_CHALLENGE)
        const assignRandomChallenge = async () => {
            const response = await assignRandomChallengeMutation()

            return response.data?.assignRandomChallenge
        }

        return { assignRandomChallenge, data, loading, error}
    }

export function useMarkChallengeAsDone() {
    const [markChallengeAsDoneMutation, { data, loading, error }] = useMutation<MarkChallengeAsDoneMutation, MarkChallengeAsDoneMutationVariables>(MARK_CHALLENGE_AS_DONE)
        const markChallengeAsDone = async (id: string, done: boolean, currentChallenge: boolean) => {
            const response = await markChallengeAsDoneMutation({
                variables: {
                    markChallengeAsDoneId: id,
                    input: { done, currentChallenge }
                }
            })

            return response.data?.markChallengeAsDone
        }

        return { markChallengeAsDone, data, loading, error}
    }
