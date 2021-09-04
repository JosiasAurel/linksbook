import express, { Application, Request, Response } from "express";

// models...
import { saveUser } from "./models/user";

const port: number = 5000;

// init express server app
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("LinksBook server working");
});

app.post("/complete-account", async (req: Request, res: Response) => {
    const { name, email, userId } = req.body;

    const completeAccountResult = await saveUser(name, email, userId);

    res.send(completeAccountResult);
});

app.listen(port, () => console.log(`Server working on port ${port}`));