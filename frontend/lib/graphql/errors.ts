import { CombinedGraphQLErrors } from "@apollo/client";
import type { ErrorLike } from "@apollo/client";

export type AppError = {
  message: string;
  code?: string;
  fields?: Record<string, string>;
};

export function extractGraphQLErrors(error?: ErrorLike): AppError[] {
  if (!error) return [];

  // GraphQL resolver errors
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.map((err) => ({
      message: err.message,
      code: err.extensions?.code as string | undefined,
      fields: err.extensions?.fields as Record<string, string> | undefined,
    }));
  }

  // Network / unknown error
  return [
    {
      message: error.message || "Unknown error",
      code: "NETWORK_ERROR",
    },
  ];
}