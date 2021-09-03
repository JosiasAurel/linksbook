import express, { Application, Request, Response } from "express";

// create new express applciation
const app: Application = express();

// host port
const port: number = 4000;

app.get("/", (req: Request, res: Response) => {
    res.send("All Done");
});

app.listen(port, () => console.log(`Server Listening on Port ${port}`));