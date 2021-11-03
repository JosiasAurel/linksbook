
import { deta, generateModelKey } from "./index";

const db = deta.Base("reminders");

async function createReminder(owner: string, bookmark: string, remindDate: string, recipients: Array<string>): Promise<any> {

    try {
        db.put({
            remindDate,
            bookmark,
            recipients,
            owner
        }, generateModelKey());

        return "Success";
    } catch(e: any) {
        return "Failed";
    }
}

async function updateReminder(reminderId: string, remindDate: string, recipients: Array<string>): Promise<any> {
    try {
        db.update({
            remindDate,
            recipients
        }, reminderId);

        return "Failed";
    } catch(e) {
        return "Failed";
    }
}