// import app from '../api/graphql';
// import serverless from 'serverless-http';

// export default serverless(app);

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express from "express";
import http from 'http';
import cors from "cors";
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express4';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolver.js';
import { dbConnect } from "./config/dbConnect.js";
import { verifyToken } from "./utils/jwt.js";

await dbConnect();

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  includeStacktraceInErrorResponses: false,
  formatError: (formattedError) => {
    return {
      message: formattedError.message,
      extensions: {
        code: formattedError.extensions?.code,
      },
    };
  },
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

app.use("/graphql", 
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        let user = null;
        if (token) {
            user = getCachedUser(token);
            console.log("Context user keys:", user ? Object.keys(user) : null);
            if (!user) {
                try {
                    user = verifyToken(token);
                    cacheUser(token, user);
                    console.log("Decoded user:", user);
                } catch (error) {
                    console.error("Invalid token", error);
                }
            }
        }

        return { user };
      }
    })
);

app.use(express.json());

await new Promise<void>((resolve) => {
  httpServer.listen({ port: 4000 }, resolve);
  console.log("🚀 Server running at http://localhost:4000/graphql");
});