import { useQuery } from "@apollo/client/react";
import type { MeQuery } from '@/__generated__/graphql';
import { MeDocument } from '@/__generated__/graphql';

// export type UserWithToken = MeQuery['me'] & {
//   token: string
// }

export function useMe() {
  const { data, loading, error, refetch } = useQuery<MeQuery>(MeDocument, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: "cache-first",
  })

  // const user: UserWithToken | null = data?.me ? { ...data.me, token: "" } : null

  return {
    user: data?.me,
    loading,
    error,
    refetch
  }
}