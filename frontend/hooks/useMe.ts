import { useQuery } from "@apollo/client/react";
import type { MeQuery } from "@/__generated__/graphql";
import { MeDocument } from "@/__generated__/graphql";

export function useMe() {
  const { data, loading, error, refetch } = useQuery<MeQuery>(MeDocument, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  })

  return {
    user: data?.me,
    loading,
    error,
    refetch
  }
}