import React from "react";

import { Card, Badge, Tooltip, Button, Spacer, Divider } from "@geist-ui/react";

import { FETCH_ALL, DELETE_REMINDER } from "../graphql/actions";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

interface ReminderProps {
    recipients: Array<string>
    date: string
    id: string
    getUpdatedData?: Function
    linkId: string
}

function ReminderTooltipBody({ date, recipients, reminder, getUpdatedData, linkId }): JSX.Element {

    const [deleteReminder, { data, loading, error }] = useMutation(DELETE_REMINDER);

    function handleDeleteReminder(): void {
        toast.promise(deleteReminder({ variables: { linkId, reminderId: reminder }, refetchQueries: [{ query: FETCH_ALL }] }), {
            loading: "Removing Reminder",
            success: "Reminder Removed",
            error: "Could not remove reminder"
        }).then(_ => getUpdatedData(data));
    }

    return (
        <>
            <p> {date}  </p>
            <div>
                {recipients.slice(0, 3).map(r => {
                    return (
                        <>
                            <Badge>
                                {r}
                            </Badge>
                        </>
                    )
                })}
                {recipients.length > 3 ? <Badge> ... </Badge> : ""}
            </div>
            <Divider />

            <div style={{ display: "flex", flexDirection: "row" }}>
                <Button ghost type="success">
                    Update
                </Button>
                <Spacer />
                <Button ghost type="success" onClick={_ => handleDeleteReminder()}>
                    Delete
                </Button>
            </div>
        </>
    )
}

const Reminder: React.FC<ReminderProps> = ({ recipients, date, id, getUpdatedData, linkId }): JSX.Element => {
    return (
        <Tooltip text={<ReminderTooltipBody linkId={linkId} getUpdatedData={d => getUpdatedData(d)} reminder={id} recipients={recipients} date={date} />} placement="bottom">
            <Card shadow>
                <Badge>
                    {recipients.length}
                </Badge>
            </Card>
        </Tooltip>
    )
}

export default Reminder;