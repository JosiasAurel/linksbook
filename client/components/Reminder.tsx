import React from "react";

import { Card, Badge, Tooltip } from "@geist-ui/react";

interface ReminderProps {
    recipients: Array<string>
    date: string,
    id: string
}

function ReminderTooltipBody({ date, recipients }): JSX.Element {
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
        </>
    )
}

const Reminder: React.FC<ReminderProps> = ({ recipients, date, id }): JSX.Element => {
    return (
        <Tooltip text={<ReminderTooltipBody recipients={recipients} date={date} />} placement="bottom">
            <Card shadow>
                <Badge>
                    {recipients.length}
                </Badge>
            </Card>
        </Tooltip>
    )
}

export default Reminder;