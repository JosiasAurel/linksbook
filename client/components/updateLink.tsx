import React, { useState } from "react";

import styles from "../styles/index.module.css";

import { handleChange } from "../utils/string";
import { UPDATE_LINK, FETCH_ALL } from "../graphql/actions";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { Input, Textarea } from "vercel-style";
import { Button, Spacer } from "@nextui-org/react";

interface UpdateLinkProps {
  title: string;
  url: string;
  tags: string;
  note: string;
  currentLink: string;
  plan?: any;
  handleFormSubmit?: Function;
  getUpdatedData?: Function;
}

const UpdateLink: React.FC<UpdateLinkProps> = ({
  title,
  url,
  tags,
  note,
  handleFormSubmit,
  currentLink,
  getUpdatedData,
  plan
}): JSX.Element => {
  const [updateLink, { data, loading, error }] = useMutation(UPDATE_LINK);

  /* edit link modal form fields props */
  const [eTitle, setETitle] = useState<string>(title);
  const [eLink, setELink] = useState<string>(url);
  const [eTags, setETags] = useState<string>(tags);
  const [eNote, setENote] = useState<string>(note);
  /* edit link modal form fields props - end */

  /* update link handler */

  function handleUpdateLink(event: any): void {
    event.preventDefault();

    // the magic takes place here
    // below is update link mutation handler

    toast.promise(
      updateLink({
        variables: {
          linkId: currentLink,
          annotation: eTitle.trim(),
          url: eLink.trim(),
          tags: eTags.trim().split(" "),
          note: eNote.trim(),
        },
        refetchQueries: [{ query: FETCH_ALL }],
      })
        .then(() => handleFormSubmit(false))
        .then(() => getUpdatedData(data)),
      {
        loading: "Updating...",
        success: "Bookmark Updated",
        error: "Could not update bookmark",
      }
    );
  }
  /* update link handler - end*/

  return (
    <form
      onSubmit={(e) => handleUpdateLink(e)}
      className={styles.editLinkModalForm}
    >
      <Input
        label="Annotation"
        width="100%"
        value={eTitle}
        onChange={(e) => handleChange(e, setETitle)}
        placeholder="Note title/annotation"
      />
      <Spacer />
      <Input
        label="URL"
        width="100%"
        value={eLink}
        onChange={(e) => handleChange(e, setELink)}
        placeholder="some-url.example.com"
      />
      <Spacer />
      <Input
        label="Tags"
        width="100%"
        value={eTags}
        onChange={(e) => handleChange(e, setETags)}
        placeholder="Tags separated by spaces"
      />
      <Spacer />
      <div>
        {plan === "PRO" ?
          <Textarea
            width="100%"
            h="100px"
            value={eNote}
            onChange={(e) => handleChange(e, setENote)}
          /> :
          <>
            <p>You need to be on PRO plan to add notes</p>
            <Textarea disabled
              width="100%"
              h="100px"
              value={eNote}
              onChange={(e) => handleChange(e, setENote)}
            />
          </>}
      </div>
      <Spacer />
      <Button htmlType="submit">Save</Button>
    </form>
  );
};

export default UpdateLink;
