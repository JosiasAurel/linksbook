
import { MailService } from "@sendgrid/mail";
import { Deta, app } from "deta";
import { GetResponse } from "deta/dist/types/types/base/response";
import { ObjectType } from "deta/dist/types/types/basic";
import { config } from "dotenv";

import express, { Application, Request, Response } from "express";

// config env vars
config();

const deta = Deta(process.env.DETA_PROJECT_KEY);

const reminders = deta.Base("reminders");
const bookmarks = deta.Base("links");

const sgMail = new MailService();

sgMail.setApiKey(process.env.SENDGRID_MAIL_API_KEY as string);


/* Sending a reminder */
/*  
Get a reminder
- Get the id of the bookmark to remind
- Resolve the bookmark
- Set annotation in mail subject
- Include bookmark in URL
*/



async function resolveReminderBookmark(linkId: string): Promise<ObjectType|GetResponse> {
    const result = await bookmarks.get(linkId);
    // console.log(result);
    return result;
}

async function sendReminder(recipient: string, bookmarkAnnotation: string, bookmarkURL: string): Promise<any> {
    const message = {
    to: recipient,
    from: "linksbook00@gmail.com",
    subject: `Reminder : ${bookmarkAnnotation}`,
    text: `Reminding you to check out this link -> ${bookmarkURL}
    Title: ${bookmarkAnnotation}`
    };


    try {
        await sgMail.send(message);
        return "Success";
    } catch(e) {
        return "Failed";
    }
}
/* 
app.lib.cron(async (event: any) => {
    const currentDate = new Date().toUTCString();

    const allReminders = await (await reminders.fetch()).items;

    allReminders.forEach(async (reminder: any) => {
        let remindDate = new Date(reminder.remindDate as string).toUTCString();
        if (currentDate >= remindDate) {
            const bookmark: any = await resolveReminderBookmark(reminder.bookmark as string);

            reminder.recipients?.forEach(async (recipient: string) => {
                // console.log(recipient)
                const sendResult = await sendReminder(recipient, bookmark.annotation, bookmark.url);

                if (sendResult === "Success") {
                    reminders.delete(reminder.key);
                    bookmarks.update({
                        reminders: bookmark.reminders.filter((re: any) => re !== reminder.key)
                    }, bookmark.key);
                }

            });
        }
    });
}); */


const expressApp: Application = express();

expressApp.get("/api/", async (req: Request, res: Response) => {

    const currentDate = new Date().toUTCString();

    const allReminders = await (await reminders.fetch()).items;

    allReminders.forEach(async (reminder: any) => {
        let remindDate = new Date(reminder.remindDate as string).toUTCString();
        if (currentDate >= remindDate) {
            const bookmark: any = await resolveReminderBookmark(reminder.bookmark as string);

            reminder.recipients?.forEach(async (recipient: string) => {
                // console.log(recipient)
                const sendResult = await sendReminder(recipient, bookmark.annotation, bookmark.url);

                if (sendResult === "Success") {
                    reminders.delete(reminder.key);
                    bookmarks.update({
                        reminders: bookmark.reminders.filter((re: any) => re !== reminder.key)
                    }, bookmark.key);
                }

            });
        }
    });

    res.send("Hello World");
});

module.exports = expressApp;

expressApp.listen(4000, () => console.log("Listening on 4000"));

// module.exports = app;
