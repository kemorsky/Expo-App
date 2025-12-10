import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { type MarkChallengeAsDoneMutationVariables, type AssignRandomChallengeMutationVariables, AssignRandomChallengeMutation, MarkChallengeAsDoneMutation, CreateChallengeMutation, CreateChallengeMutationVariables, UserChallenge, MeQuery } from '@/__generated__/graphql'
import { GET_USER } from '../user/userQueries'

const ASSIGN_RANDOM_CHALLENGE = gql`
    mutation AssignRandomChallenge {
        assignRandomChallenge {
            id
            challenge {
                id
                title
                isPredefined
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

const MARK_CHALLENGE_AS_DONE = gql`
    mutation MarkChallengeAsDone($markChallengeAsDoneId: ID!, $input: ChallengeDoneInput!) {
        markChallengeAsDone(id: $markChallengeAsDoneId, input: $input) {
            id
            challenge {
                id
                title
                isPredefined
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
        update(cache, { data: assignRandomChallenge }) {
            if (!assignRandomChallenge?.assignRandomChallenge) return;

            const normalizedChallenge: Partial<UserChallenge> = {
                ...assignRandomChallenge.assignRandomChallenge,
                __typename: "UserChallenge",
                challenge: {
                    ...assignRandomChallenge.assignRandomChallenge.challenge,
                    __typename: "Challenge",
                },
                currentChallenge: assignRandomChallenge.assignRandomChallenge.currentChallenge,
                currentChallengeExpiresAt: assignRandomChallenge.assignRandomChallenge.currentChallengeExpiresAt
            };

            const existingData = cache.readQuery<{ me: { challenges: UserChallenge[] } }>({
                query: GET_USER,
            });

            if (existingData?.me?.challenges) {
                cache.writeQuery({
                query: GET_USER,
                data: {
                    me: {
                    ...existingData.me,
                    challenges: existingData.me.challenges.map(ch =>
                        ch.currentChallenge ? normalizedChallenge : ch
                    ),
                    },
                },
                });
            }
        }
    });
    
    const assignRandomChallenge = async () => {
        const response = await assignRandomChallengeMutation()

        return response.data?.assignRandomChallenge
    }

    return { assignRandomChallenge, data, loading, error}
}

export function useMarkChallengeAsDone() {
    const [markChallengeAsDoneMutation, { data, loading, error }] = useMutation<MarkChallengeAsDoneMutation, MarkChallengeAsDoneMutationVariables>(MARK_CHALLENGE_AS_DONE, {
        update(cache, { data: markChallengeAsDone }) {
            if (!markChallengeAsDone?.markChallengeAsDone) return;

            const normalizedChallenge: Partial<UserChallenge> = {
                ...markChallengeAsDone.markChallengeAsDone,
                __typename: "UserChallenge",
                challenge: {
                    ...markChallengeAsDone.markChallengeAsDone.challenge,
                    __typename: "Challenge",
                },
                done: markChallengeAsDone.markChallengeAsDone.done,
                currentChallenge: markChallengeAsDone.markChallengeAsDone.currentChallenge,
            };

            const existingData = cache.readQuery<{ me: { challenges: UserChallenge[] } }>({
                query: GET_USER,
            });

            if (existingData?.me?.challenges) {
                cache.writeQuery({
                query: GET_USER,
                data: {
                    me: {
                    ...existingData.me,
                    challenges: existingData.me.challenges.map(ch =>
                        ch.currentChallenge && ch.done ? normalizedChallenge : ch
                    ),
                    },
                },
                });
            }
        }
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
