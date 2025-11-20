import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { SetContextLink } from "@apollo/client/link/context";
import { getToken } from "@/utils/token";

const httpLink = new HttpLink({ uri: "https://expo-app-pied.vercel.app/api/graphql" });

const authLink = new SetContextLink(async (prevContext, operation) => {
    const token = await getToken();

    return {
        headers: {
            ...prevContext.headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});