import express from "express";
import cors from "cors";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import typeDefs from '../src/graphql/schema.js';
import resolvers from '../src/graphql/resolver.js';
import { dbConnect } from "../src/config/dbConnect.js";
import { verifyToken } from "../src/utils/jwt.js";

await dbConnect();

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

await server.start();

type CachedUser = { user: any, expires: number };
const tokenCache = new Map<string, CachedUser>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

function getCachedUser(token: string) {
  const cached = tokenCache.get(token);
  if (cached && cached.expires > Date.now()) {
    return cached.user;
  }

  return null;
}

function cacheUser(token: string, user: any) {
  tokenCache.set(token, { user, expires: Date.now() + CACHE_TTL });
}

app.use("/api/graphql", 
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        
        let user = null;
        
        if (token) {
          user = getCachedUser(token);

          if (!user) {
            try {
              user = verifyToken(token);
              cacheUser(token, user);
            } catch (error) {
              console.error("Invalid token", error);
            }
          }
        }

        return { user };
      }
    })
);

export default app;