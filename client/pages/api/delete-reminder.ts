
import { Deta } from "deta";
import { NextApiRequest, NextApiResponse } from "next";

const PROJECT_KEY: string = process.env.NEXT_PUBLIC_PROJECT_KEY;

const deta = Deta(PROJECT_KEY);

const remindersDB = deta.Base("reminders");

export default function(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { reminder } = req.body;

        remindersDB.delete(reminder);

        res.send("Done");
    }
}