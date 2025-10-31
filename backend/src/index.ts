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
  origin: "*", // 👈 allow any origin (for dev only)
  credentials: true,
}));

const httpServer = http.createServer(app);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

app.use("/graphql", 
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        let user = null;
        if (token) {
          try {
            user = verifyToken(token); // decode user from JWT
          } catch (error) {
            console.error("Invalid token", error);
          }
        }

        return { user }; // 👈 available in all resolvers as context.user
        // const decoded = token ? verifyToken(token) : null;
        // return {
        //   user: decoded,
        // }
        // const session = await auth.api.getSession({
        //   headers: fromNodeHeaders(req.headers)
        // });
        // return {
        //   user: session?.user ?? null,
        //   token: session?.session.token ?? null,
        // }
      }
    })
);

app.use(express.json());

await new Promise<void>((resolve) => {
  httpServer.listen({ port: 4000 }, resolve);
  console.log("🚀 Server running at http://localhost:4000/graphql");
});