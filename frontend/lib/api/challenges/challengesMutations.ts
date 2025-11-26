import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { type MarkChallengeAsDoneMutationVariables, type AssignRandomChallengeMutationVariables, AssignRandomChallengeMutation, MarkChallengeAsDoneMutation, CreateChallengeMutation, CreateChallengeMutationVariables } from '@/__generated__/graphql'

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

const CREATE_CHALLENGE = gql`
    mutation CreateChallenge($input: ChallengeInput!) {
        createChallenge(input: $input) {
            id
            challenge {
                id
                title
                isPredefined
            }
            done
            createdAt
            updatedAt
        }
    }
`

export function useAssignRandomChallenge() {
    const [assignRandomChallengeMutation, { data, loading, error }] = useMutation<AssignRandomChallengeMutation, AssignRandomChallengeMutationVariables>(ASSIGN_RANDOM_CHALLENGE, {
        refetchQueries: ["Me"]
    });
    
    const assignRandomChallenge = async () => {
        const response = await assignRandomChallengeMutation()

        return response.data?.assignRandomChallenge
    }

    return { assignRandomChallenge, data, loading, error}
}

export function useMarkChallengeAsDone() {
    const [markChallengeAsDoneMutation, { data, loading, error }] = useMutation<MarkChallengeAsDoneMutation, MarkChallengeAsDoneMutationVariables>(MARK_CHALLENGE_AS_DONE, {
        refetchQueries: ["Me"]
    });

    const markChallengeAsDone = async (id: string, notes: string, done: boolean, currentChallenge: boolean) => {
        const response = await markChallengeAsDoneMutation({
            variables: {
                markChallengeAsDoneId: id,
                input: { notes, done, currentChallenge }
            }
        })

        return response.data?.markChallengeAsDone
    }

    return { markChallengeAsDone, data, loading, error}
}

export function useCreateChallenge() {
    const [createChallengeMutation, { data, loading, error }] = useMutation<CreateChallengeMutation, CreateChallengeMutationVariables>(CREATE_CHALLENGE, {
        refetchQueries: ["Me"]
    });

    const createChallenge = async (title: string) => {
        const response = await createChallengeMutation({
            variables: {
                input: { title }
            }
        })

        return response.data?.createChallenge
    }

    return { createChallenge, data, loading, error }
}
