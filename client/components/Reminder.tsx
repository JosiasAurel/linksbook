import React from "react";

import {
  Card,
  Badge,
  Tooltip,
  Button,
  Spacer,
  Divider,
  Modal,
  Textarea,
} from "vercel-style";

import {
  FETCH_ALL,
  DELETE_REMINDER,
  UPDATE_REMINDER,
} from "../graphql/actions";
import { handleChange } from "../utils/string";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

interface ReminderProps {
  recipients: Array<string>;
  date: string;
  id: string;
  getUpdatedData?: Function;
  linkId: string;
  data: any;
}

function UpdateReminderComponent({
  getUpdatedData,
  finishAction,
  reminder,
  oldData,
}): JSX.Element {
  const [updateReminder, { data, loading, error }] =
    useMutation(UPDATE_REMINDER);

  // set reminder form
  const [remindDate, setRemindDate] = React.useState(
    new Date(oldData.remindDate)
  );

  function prepareUTCRemindDate(): string {
    const gmtTime = remindDate.toUTCString();

    return gmtTime;
  }

  const [recipients, setRecipients] = React.useState<Array<string>>(
    oldData.recipients
  );
  function recipientsHandler(v: any): void {
    setRecipients(v.split(" "));
  }

  function handleUpdateReminder(): void {
    toast
      .promise(
        updateReminder({
          variables: {
            reminderId: reminder,
            remindDate: prepareUTCRemindDate(),
            recipients: recipients.join(" ").trim().split(" "),
          },
          refetchQueries: [{ query: FETCH_ALL }],
        }),
        {
          success: "Reminder Updated",
          error: "Something went wrong",
          loading: "Updating Reminder...",
        }
      )
      .then((_) => getUpdatedData(data));

    finishAction(false);
  }

  return (
    <div>
      <h2>Update Reminder</h2>
      <div>
        <DateTimePicker value={remindDate} onChange={setRemindDate} />
        <Spacer />
        <Textarea
          value={recipients.join(" ")}
          onChange={(e) => handleChange(e, recipientsHandler)}
          width="100%"
          h="100px"
          placeholder="Enter receivers email separated by spaces. Leave blank so you're email is used"
        />
        <Spacer />
        <Button onClick={(e_) => handleUpdateReminder()}>Save Reminder</Button>
      </div>
    </div>
  );
}

function ReminderTooltipBody({
  data_,
  date,
  recipients,
  reminder,
  getUpdatedData,
  linkId,
}): JSX.Element {
  const [updateModal, setUpdateModal] = React.useState<boolean>(false);

  const [deleteReminder, { data, loading, error }] =
    useMutation(DELETE_REMINDER);

  function handleDeleteReminder(): void {
    toast
      .promise(
        deleteReminder({
          variables: { linkId, reminderId: reminder },
          refetchQueries: [{ query: FETCH_ALL }],
        }),
        {
          loading: "Removing Reminder",
          success: "Reminder Removed",
          error: "Could not remove reminder",
        }
      )
      .then((_) => getUpdatedData(data));
  }

  return (
    <>
      <p> {date} </p>
      <div>
        {recipients.slice(0, 3).map((r) => {
          return (
            <>
              <Badge>{r}</Badge>
            </>
          );
        })}
        {recipients.length > 3 ? <Badge> ... </Badge> : ""}
      </div>
      <Divider />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button
          ghost
          type="success"
          onClick={(_) => setUpdateModal(!updateModal)}
        >
          Update
        </Button>
        <Spacer />
        <Button ghost type="success" onClick={(_) => handleDeleteReminder()}>
          Delete
        </Button>
      </div>

      <Modal visible={updateModal} onClose={() => setUpdateModal(false)}>
        <Modal.Title>Update Reminder</Modal.Title>
        <Modal.Content>
          <UpdateReminderComponent
            getUpdatedData={(d) => getUpdatedData(d)}
            finishAction={(v) => setUpdateModal(v)}
            reminder={reminder}
            oldData={data_}
          />
        </Modal.Content>
      </Modal>
    </>
  );
}

const Reminder: React.FC<ReminderProps> = ({
  data,
  recipients,
  date,
  id,
  getUpdatedData,
  linkId,
}): JSX.Element => {
  return (
    <Tooltip
      text={
        <ReminderTooltipBody
          data_={data}
          linkId={linkId}
          getUpdatedData={(d) => getUpdatedData(d)}
          reminder={id}
          recipients={recipients}
          date={date}
        />
      }
      placement="left"
    >
      <Card shadow>
        <Badge>{recipients.length}</Badge>
      </Card>
    </Tooltip>
  );
};

export default Reminder;
