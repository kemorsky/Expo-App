import { GraphQLError } from "graphql";

export default function gqlError(message: string, code: string, status?: number) {
    return new GraphQLError(message, { 
        extensions: { 
            code, 
            http: status ? { status } : undefined
        }
    })
};