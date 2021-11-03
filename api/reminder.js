
/*  
    # Reminder
    There is the need to be able to set reminders
    for bookmarks in the app. 
    For that we need to be able to set times at which reminders are triggered

    # Reminder;
        - RemindDate: Date
        - Recipients: Array<Email>
        - Owner: UserID

    A cron job is set to trigger the Reminder Function every 5 minutes
    Steps;
    - Get current date
    - Look up all the reminders in the db
    - If current date > ReminderDate or diff(current date & ReminderDate) < 2mins
        - send bookmark reminder to each email in Recipients
        - Delete Reminder from Reminders
    - End Proc && sleep() ;)

    * Creating a Reminder;
        - Get the time offset required by the individual
            - The time offset is in terms of minutes or days or even a Date
        - Convert to Date format if not in Date format already
        - Get all recipients
        - Save Reminder to Reminders

    * Removing a Reminder;
        - DELETE ReminderID

*/
const date = new Date();

const oldDate = new Date("2021-10-31T15:41:36.319Z");

console.log(date);
console.log(oldDate);

console.log("New Date > Old Date");
console.log(date > oldDate);
console.log("Old Date > New Date");
console.log(oldDate > date);