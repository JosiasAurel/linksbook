import express, { Application, Request, Response } from "express";

const port: number = 5000;

// init express server app
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("LinksBook server working");
});

app.listen(port, () => console.log(`Server working on port ${port}`));