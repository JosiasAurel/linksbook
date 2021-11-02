
import { Deta } from "deta";
import { NextApiRequest, NextApiResponse } from "next";

const PROJECT_KEY: string = process.env.NEXT_PUBLIC_PROJECT_KEY;

const deta = Deta(PROJECT_KEY);

const remindersDB = deta.Base("reminders");

export default function(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { date, recipients, owner } = req.body;
        try {
            remindersDB.put({
                date,
                recipients,
                owner
            });

            res.send({status: "Success"});
        } catch(error) {
            res.send({status: "Failed"});
        }
    }
    res.send(`
    ${new Date()}
    ${new Date().toUTCString()}
    ${new Date().toISOString()}
    ${new Date().getTimezoneOffset()}
    `);
}