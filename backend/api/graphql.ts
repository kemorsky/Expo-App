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

app.use("/api/graphql", 
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        let user = null;
        if (token) {
          try {
            user = verifyToken(token);
            console.log("Decoded user:", user);
          } catch (error) {
            console.error("Invalid token", error);
          }
        }
        return { user };
      }
    })
);

// app.use(express.json());

export default app;