import { deta, generateModelKey } from "./index";

const db = deta.Base("reminders");
const bookmarks = deta.Base("links");

async function createReminder(
  owner: string,
  bookmark: string,
  remindDate: string,
  recipients: Array<string>
): Promise<any> {
  try {
    const newReminder: any = await db.put(
      {
        remindDate,
        bookmark,
        recipients,
        owner,
      },
      generateModelKey()
    );

    try {
      await bookmarks.update(
        {
          reminders: db.util.append(newReminder.key),
        },
        bookmark
      );

      return "Success";
    } catch (e) {
      return "Failed";
    }
  } catch (e: any) {
    return "Failed";
  }
}

async function getReminder(reminderId: string): Promise<any> {
  try {
    const result = await db.get(reminderId);
    return result;
  } catch (e) {
    return false;
  }
}

async function updateReminder(
  reminderId: string,
  remindDate: string,
  recipients: Array<string>
): Promise<any> {
  try {
    try {
      const oldReminder: any = await db.get(reminderId);

      await db.update(
        {
          remindDate:
            remindDate.trim() !== "" ? remindDate : oldReminder.remindDate,
          recipients:
            recipients.length !== 0 ? recipients : oldReminder.recipients,
        },
        reminderId
      );

      return "Success";
    } catch (e) {
      return "Failed";
    }
  } catch (e) {
    return "Failed";
  }
}

async function deleteReminder(reminderId: string): Promise<any> {
  await db.delete(reminderId);
  return "Done";
}

export { createReminder, updateReminder, deleteReminder, getReminder };
