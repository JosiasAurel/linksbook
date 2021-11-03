
import { MailService } from "@sendgrid/mail";
import { Deta, app } from "deta";
import { GetResponse } from "deta/dist/types/types/base/response";
import { ObjectType } from "deta/dist/types/types/basic";
import { config } from "dotenv";

// config env vars
config();

const deta = Deta(process.env.a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF);

const reminders = deta.Base("reminders");

const sgMail = new MailService();

sgMail.setApiKey(process.env.SENDGRID_MAIL_API_KEY as string);


app.lib.cron(async (_event: any) => {
    const currentDate = new Date().toUTCString();

    const allReminders = await (await reminders.fetch()).items;

    allReminders.forEach(async (reminder: any) => {
        let remindDate = new Date(reminder.remindDate as string).toUTCString();

        if (currentDate >= remindDate) {
            const bookmark: any = await resolveReminderBookmark(reminder.bookmark as string);

            reminder.recipients?.forEach((recipient: string) => {
                sendReminder(recipient, bookmark.annotation, bookmark.url);
            });
        }
    });
});

/* Sending a reminder */
/*  
Get a reminder
- Get the id of the bookmark to remind
- Resolve the bookmark
- Set annotation in mail subject
- Include bookmark in URL
*/



async function resolveReminderBookmark(linkId: string): Promise<ObjectType|GetResponse> {
    const result = await reminders.get(linkId);
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
