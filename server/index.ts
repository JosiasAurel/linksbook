import express, { Application, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";

// load type definitions and resolvers
import { typeDefinitions } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";

import cors from "cors";
import { authenticateUser } from "./utils/auth";

// models...


const port: number = 5000;

// init express server app
const app: Application = express();

// Plugins
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("LinksBook server working");
});

/* Routes to handle operations by the browser extension */
app.post("/save-link", (req: Request, res: Response) => {

    /* Requirements include which user ? */

    const { name, email, id: key } = getUserInfo(req);

    /*
    --- Steps ---
    Check if links with same URL exist
    if yes ? respond with "existing" message link : otherwise 
    create the link and responed with success message 
    */

});
/* Routes for browser extension */

function getUserInfo(req: Request): any {
    const requestHeaders: any = req.headers;

    const authorization: any = requestHeaders?.authorization;

    // get the JWT from the request headers
    const authToken: string = authorization?.split(" ")[1]; 

    const userInfo = authenticateUser(authToken);

    return userInfo;
}

// Create apollo server
const apolloServer = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers,
    context: ({ req }) => {
        // handle request context
        const userInfo = getUserInfo(req);

        return userInfo;
    }
})

// mount apollo server on express
apolloServer.start().then(_ => apolloServer.applyMiddleware({ app }));

app.listen(port, () => console.log(`Server working on port ${port}`));

module.exports = app;