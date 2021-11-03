import React from "react";

import { useMutation } from "@apollo/client";

import { Textarea, Divider } from "@geist-ui/react";
import { Button, Spacer } from "@nextui-org/react";

import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { handleChange } from "../utils/string";
import { CREATE_REMINDER, FETCH_ALL } from "../graphql/actions";

import toast from "react-hot-toast";

interface CreateReminderProps {
    bookmarkId: string
    getUpdatedData?: Function
}

const CreateReminder: React.FC<CreateReminderProps> = ({ bookmarkId, getUpdatedData }): JSX.Element => {

    const [createReminder, { data, loading, error }] = useMutation(CREATE_REMINDER);

    /* Reminder settings */

    // set reminder form
    const [remindDate, setRemindDate] = React.useState(new Date());

    function prepareUTCRemindDate(): string {
        const gmtTime = remindDate.toUTCString();

        return gmtTime;
    }

    const [recipients, setRecipients] = React.useState<Array<string>>([]);
    function recipientsHandler(v: any): void {
        setRecipients(v.split(" "));
    }

    function handleCreateReminder(): void {
        toast.promise(createReminder({ variables: { linkId: bookmarkId, remindDate: prepareUTCRemindDate(), recipients: recipients.join(" ").trim().split(" ") }, refetchQueries: [{ query: FETCH_ALL }] }), {
            success: "Reminder Added",
            error: "Something went wrong",
            loading: "Saving Reminder"
        }).then(_ => getUpdatedData(data));
    }

    return (
        <>

            <h2>Create New Reminder</h2>
            <div>
                <DateTimePicker
                    value={remindDate}
                    onChange={setRemindDate}
                />
                <Spacer />
                <Textarea value={recipients.join(" ")} onChange={e => handleChange(e, recipientsHandler)} width="100%" h="100px" placeholder="Enter receivers email separated by spaces. Leave blank so you're email is used" />
                <Spacer />
                <Button onClick={e_ => handleCreateReminder()}>
                    Save Reminder
                </Button>
            </div>
        </>
    )
}

export default CreateReminder;