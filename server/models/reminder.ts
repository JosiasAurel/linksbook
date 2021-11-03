
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

async function getReminder(reminderId: string): Promise<any> {
    try {
        const result = await db.get(reminderId);
        return result;

    } catch(e) {
        return false;
    }
}

async function updateReminder(reminderId: string, remindDate: string, recipients: Array<string>): Promise<any> {
    try {

        try {
            const oldReminder: any = await db.get(reminderId);

            db.update({
                remindDate: remindDate.trim() !== "" ? remindDate : oldReminder.remindDate,
                recipients: recipients.length !== 0 ? recipients : oldReminder.recipients
            }, reminderId);

        return "Success";
        } catch(e) {
            return "Failed";
        }
    } catch(e) {
        return "Failed";
    }
}

async function deleteReminder(reminderId: string): Promise<any> {
    db.delete(reminderId);
    return "Done";
}

export {
    createReminder,
    updateReminder,
    deleteReminder,
    getReminder
}