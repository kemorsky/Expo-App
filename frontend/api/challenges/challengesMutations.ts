import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { MarkChallengeAsDoneMutationVariables, MarkChallengeAsDoneMutation, 
        CreateChallengeMutation, CreateChallengeMutationVariables, 
        UserChallenge, 
        PreviewChallengeMutation, PreviewChallengeMutationVariables,
        AcceptChallengeMutation, AcceptChallengeMutationVariables,
        DeleteChallengesMutation,
        DeleteChallengesMutationVariables} from '@/__generated__/graphql'
import { GET_USER } from '../user/userQueries'

const PREVIEW_CHALLENGE = gql`
    mutation PreviewChallenge {
        previewChallenge {
            id
            challenge {
                id
                title
                isPredefined
            }
            repeatable
        }
    }
`

const ACCEPT_CHALLENGE = gql`
    mutation AcceptChallenge($acceptChallengeId: ID!) {
        acceptChallenge(id: $acceptChallengeId) {
            id
            user {
                id
                assignmentsToday
            }
            challenge {
                id
                title
                isPredefined
            }
            notes
            done
            currentChallenge
            createdAt
            assignedAt
            updatedAt
            repeatable
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
            createdAt
            updatedAt
            completedAt
            repeatable
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
            repeatable
        }
    }
`

const DELETE_CHALLENGES = gql`
    mutation DeleteChallenges($ids: [ID]!) {
        deleteChallenges(ids: $ids)
    }
`

export function usePreviewChallenge() {
    const [previewChallengeMutation, { data, loading, error }] = useMutation<PreviewChallengeMutation, PreviewChallengeMutationVariables>(PREVIEW_CHALLENGE, {
        errorPolicy: "all"
    })

    const previewChallenge = async () => {
        try {
            const response = await previewChallengeMutation();
            return response.data?.previewChallenge;
        } catch (error: any) {
            throw new Error(error.message || "Cannot preview challenge");
        }
    } 

    return { previewChallenge, data, loading, error}
    
}

export function useAcceptChallenge() {
    const [acceptChallengeMutation, { data, loading, error }] = useMutation<AcceptChallengeMutation, AcceptChallengeMutationVariables>(ACCEPT_CHALLENGE, {
        errorPolicy: "all",
        refetchQueries: ["Me"]
    });
    
    const acceptChallenge = async (id: string) => {
        try {
            const response = await acceptChallengeMutation({
                variables: {
                    acceptChallengeId: id
                }
            });
            
            return response.data?.acceptChallenge;
        } catch (error: any) {
            throw new Error(error.message || "Cannot assign challenge today");
        }
    }

    return { acceptChallenge, data, loading, error}
}

export function useMarkChallengeAsDone() {
    const [markChallengeAsDoneMutation, { data, loading, error }] = useMutation<MarkChallengeAsDoneMutation, MarkChallengeAsDoneMutationVariables>(MARK_CHALLENGE_AS_DONE, {
        update(cache, { data }) {
            const updated = data?.markChallengeAsDone;
            if (!updated) return;

            const normalizedChallenge = {
                ...updated,
                __typename: "UserChallenge",
                challenge: {
                    ...updated.challenge,
                    __typename: "Challenge",
                },
                done: updated.done,
                currentChallenge: updated.currentChallenge,
                completedAt: updated.completedAt
            };
            
            const existing = cache.readQuery<{ me: { id: string, challenges: UserChallenge[] } }>({
                query: GET_USER,
            });
            
            if (!existing?.me?.id) return;
    
            cache.modify({
                id: cache.identify({ __typename: "User", id: existing?.me.id }),
                fields: {
                    // me(existingMe = {}) {
                    //     if (updated.user?.assignmentsToday === null) { return existingMe };

                    //     return {
                    //     ...existingMe,
                    //     assignmentsToday: updated.user?.assignmentsToday,
                    //     };
                    // },
                    challenges: (existingChallenges = []) => {
                        return existingChallenges.map((ch: UserChallenge) =>
                            ch.currentChallenge && ch.done ? normalizedChallenge : ch
                        );
                    },
                },
            });
        }
    });

    const markChallengeAsDone = async (id: string, notes: string, repeatable: boolean) => {
        const response = await markChallengeAsDoneMutation({
            variables: {
                markChallengeAsDoneId: id,
                input: { notes, repeatable }
            }
        })

        return response.data?.markChallengeAsDone
    }

    return { markChallengeAsDone, data, loading, error}
}

export function useCreateChallenge() {
    const [createChallengeMutation, { data, loading, error }] = useMutation<CreateChallengeMutation, CreateChallengeMutationVariables>(CREATE_CHALLENGE, {
        refetchQueries: ["Me"],
        errorPolicy: "all"
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

export function useDeleteChallenges() {
    const [deleteChallengesMutation, { data, loading, error }] = useMutation<DeleteChallengesMutation, DeleteChallengesMutationVariables>(DELETE_CHALLENGES, {
        errorPolicy: "all",
        refetchQueries: ["Me"]
    });

    const deleteChallenges = async (ids: string[]) => {
        const response = await deleteChallengesMutation({
            variables: {
                ids
            }
        })

        return response.data?.deleteChallenges
    }

    return { deleteChallenges, data, loading, error }
}
