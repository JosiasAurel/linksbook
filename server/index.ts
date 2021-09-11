import express, { Application, Request, Response } from "express";

import cors from "cors";

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



app.listen(port, () => console.log(`Server working on port ${port}`));