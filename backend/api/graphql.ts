import express from "express";
import cors from "cors";
import serverless from "serverless-http";
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


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers
});

await server.start();

app.use("/graphql", 
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        console.log(token)

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

app.use(express.json());

export default serverless(app);