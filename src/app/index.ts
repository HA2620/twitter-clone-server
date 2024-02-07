import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { User } from './user';
import cors from "cors";

import express from 'express';

export async function initServer() {

    const app = express();
    app.use(cors());


    const graphqlServer = new ApolloServer({
        typeDefs: `

            ${User.types}

            type Query {
                ${User.queries}
            }
        `,
        resolvers: {

            Query: {
                ...User.resolvers.queries
            },
        },
    }); 

    await graphqlServer.start();

    app.use('/graphql',express.json(), expressMiddleware(graphqlServer));

    return app;
}


