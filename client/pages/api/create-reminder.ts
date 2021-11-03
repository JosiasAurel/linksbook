
import { Deta } from "deta";
import { NextApiRequest, NextApiResponse } from "next";

const PROJECT_KEY: string = process.env.NEXT_PUBLIC_PROJECT_KEY;

const deta = Deta(PROJECT_KEY);

const remindersDB = deta.Base("reminders");
const bookmarksDB = deta.Base("links");

export default async function(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { date, recipients, owner, bookmark } = req.body;
        try {
            const newReminder: any =  remindersDB.put({
                date,
                recipients,
                bookmark,
                owner // user email
            });

            try {
                bookmarksDB.update({
                    reminders: bookmarksDB.util.append(newReminder.key)
                }, bookmark);
                res.send({status: "Success"});
            } catch(e) {
                res.send({status: "Failed"});
            }
        } catch(error) {
            res.send({status: "Failed"});
        }
    }
}