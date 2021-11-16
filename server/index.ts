import express, { Application, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";

// load type definitions and resolvers
import { typeDefinitions } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";

import cors from "cors";
import morgan from "morgan";
import { authenticateUser } from "./utils/auth";
import { getUserByEmail } from "./models/user";

// models...
import { linkWithUrl, createLink } from "./models/links";
import { syncBookmarks } from "./models/ext";

const port: number = 5000;

// init express server app
const app: Application = express();

// Plugins
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("LinksBook server working");
});

/* Routes to handle operations by the browser extension */

// Route for saving a link
app.post("/save-link", async (req: Request, res: Response) => {

    /* Requirements include which user ? */

    const { annotation, url, email } = req.body;

    const { key } = await getUserByEmail(email);

    /*
    --- Steps ---
    Check if links with same URL exist
    if yes ? respond with "existing" message link : otherwise 
    create the link and responed with success message 
    */

    const exists: boolean = await linkWithUrl(url, key);
    if (exists) {
        res.json({ status: "Done", msg: "Bookmark Exists" });
        return;
    }

    // otherwise
    const createdLink = await createLink(annotation, url, ["new"], key);
    // console.log(createdLink);
    if (createdLink === "Success") {
        res.json({status: "Done", msg: "Bookmark Saved"});
    }
});

// route for pushing browser bookmarks
app.post("/sync-bookmarks", async (req: Request, res: Response) => {

    console.log(await getUserByEmail(req.body.email));
    const email = req.body.email;

    const { key } = await getUserByEmail(email);

    const data = req.body.bookmarks;

    const result = await syncBookmarks(data, "NONE", key);

    res.json({msg: result});
    
}); 

/* Routes for browser extension - End */

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
    context: async ({ req }) => {
        // handle request context
        const userInfo = getUserInfo(req);
        return userInfo;
    },
})

// mount apollo server on express
apolloServer.start().then(_ => apolloServer.applyMiddleware({ app }));

app.listen(port, () => console.log(`Server working on port ${port}`));

module.exports = app;