import React, { useState } from "react";

import styles from "../styles/components.module.css";

import { Input, Button as GButton, Tree, Spacer, Divider } from "vercel-style";
import { MoreHorizontal } from "@geist-ui/react-icons";
import { Tooltip } from "@nextui-org/react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import { handleChange } from "../utils/string";
import {
  DROP_LINK_IN_COLLECTION,
  FETCH_ALL,
  ADD_COLLECTION_CHILD,
  DELETE_COLLECTION,
  RENAME_COLLECTION,
} from "../graphql/actions";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

interface FolderProps {
  readonly type?: string; // Parent or Child
  readonly label: string;
  readonly id: string;
  readonly index: number;
  readonly folder: any;
  // thirdPartyAction?: Function
  getUpdatedData?: Function;
  setLinks?: Function;
}

/* Folder Edit Options */

function RenameFolder({ collectionId, getUpdatedData }): JSX.Element {
  const [name, setName] = useState<string>("");

  const [renameCollection, { data, loading, error }] =
    useMutation(RENAME_COLLECTION);

  function handleRenameCollection(event: any): void {
    event.preventDefault();

    toast.promise(
      renameCollection({
        variables: { collectionId, name },
        refetchQueries: [{ query: FETCH_ALL }],
      }).then((_) => getUpdatedData(data)),
      {
        success: "Renamed",
        loading: "Renaming...",
        error: "Could not rename folder",
      }
    );
  }
  return (
    <form
      onSubmit={(e) => handleRenameCollection(e)}
      style={{ display: "flex" }}
    >
      <Input
        value={name}
        onChange={(e) => handleChange(e, setName)}
        label="name"
        placeholder="Sports"
      />
      <GButton
        htmlType="submit"
        style={{ margin: "0 5px" }}
        auto
        scale={0.8}
        type="success"
      >
        Save
      </GButton>
    </form>
  );
}

function AddChild({ collectionId, getUpdatedData }): JSX.Element {
  const [name, setName] = useState<string>("");

  const [addFolderChild, { data, loading, error }] =
    useMutation(ADD_COLLECTION_CHILD);

  function handleAddFolderChild(event: any): void {
    event.preventDefault();

    toast.promise(
      addFolderChild({
        variables: { collectionId, childName: name },
        refetchQueries: [{ query: FETCH_ALL }],
      }).then((_) => getUpdatedData(data)),
      {
        success: `Created ${name}`,
        loading: "Creating...",
        error: "Could not create folder",
      }
    );
  }
  return (
    <form onSubmit={(e) => handleAddFolderChild(e)} style={{ display: "flex" }}>
      <Input
        value={name}
        onChange={(e) => handleChange(e, setName)}
        label="name"
        placeholder="SubFolder"
      />
      <GButton
        htmlType="submit"
        style={{ margin: "0 5px" }}
        auto
        scale={0.8}
        type="success"
      >
        Save
      </GButton>
    </form>
  );
}

function FolerOptions({ collectionId, getUpdatedData }): JSX.Element {
  const [deleteCollection, { data, loading, error }] =
    useMutation(DELETE_COLLECTION);

  function handleDeleteFolder(): void {
    toast.promise(
      deleteCollection({
        variables: { collectionId },
        refetchQueries: [{ query: FETCH_ALL }],
      }).then((_) => getUpdatedData(data)),
      {
        success: "Deleted",
        loading: "Deleting...",
        error: "Failed to delete folder",
      }
    );
  }

  function copyToClipboard(link): void {
    // copy the link to the clipboard
    navigator.clipboard.writeText(link);

    toast("Copied Link to Clipboard", { icon: "🔗" });
  }

  return (
    <div>
      <Tooltip
        trigger="click"
        text={
          <RenameFolder
            getUpdatedData={getUpdatedData}
            collectionId={collectionId}
          />
        }
      >
        <GButton>Rename</GButton>
      </Tooltip>
      <Spacer />
      <Tooltip
        trigger="click"
        text={
          <AddChild
            getUpdatedData={getUpdatedData}
            collectionId={collectionId}
          />
        }
      >
        <GButton>Add Child</GButton>
      </Tooltip>
      <Spacer />
      <Tooltip trigger="click" text={<div className={styles.shareFolderCard}>
        <a href={`https://app.linksbook.me/p/${collectionId}`}>
          {`https://app.linksbook.me/p/${collectionId}`}
        </a>
        <GButton onClick={() => copyToClipboard(`https://app.linksbook.me/p/${collectionId}`)} auto scale={0.75} type="success">
          Share
        </GButton>
      </div>}>
        <GButton>
          Share Folder
        </GButton>
      </Tooltip>
      <Spacer />
      <GButton color="error" onClick={(_) => handleDeleteFolder()}>
        Delete Folder
      </GButton>
    </div>
  );
}
/* End Folder Edit Option */

const Folder: React.FC<FolderProps> = ({
  id,
  label,
  getUpdatedData,
  index,
  folder,
  setLinks,
}): JSX.Element => {
  const [dropLink, { data, loading, error }] = useMutation(
    DROP_LINK_IN_COLLECTION
  );

  const [{ isOver }, drop] = useDrop(
    () => (
      console.log(drop),
      {
        accept: ItemTypes.BOOKMARK,
        drop: (item: any, _) =>
          toast.promise(
            dropLink({
              variables: { collectionId: id, linkId: item?.id },
              refetchQueries: [{ query: FETCH_ALL }],
            }).then((_) => getUpdatedData(data)),
            {
              loading: "Adding bookmark",
              success: `Bookmark added to ${label}`,
              error: "Failed",
            }
          ),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }
    )
  );

  function handleFolderClick(): void {
    // thirdPartyAction();
    setLinks(
      folder.links,
      folder.parent === "NONE" ? folder.id : folder.parent
    );
  }

  // possible structure
  return (
    <div
      style={{
        display: "flex",
        padding: "0.5em 0",
        alignItems: "center",
      }} /* ref={drop} */
    >
      <Tree.Folder
        name={
          <div
            className={styles.folderHead}
            onClick={() => handleFolderClick()}
            ref={drop}
          >
            {label}{" "}
            <Tooltip
              text={
                <FolerOptions
                  collectionId={id}
                  getUpdatedData={getUpdatedData}
                />
              }
              trigger="click"
              position="right"
            >
              <div>
                <MoreHorizontal />
              </div>
            </Tooltip>
          </div>
        }
        style={{
          width: "100%",
          backgroundColor: isOver ? "aquamarine" : "transparent",
        }}
      >
        {folder?.children?.map((f: any, i: any) => {
          return (
            <Folder
              key={i}
              label={f.name}
              index={i}
              id={f.id}
              folder={f}
              /* thirdPartyAction={(links: any, fId: any) => thirdPartyAction(links, fId)} */
              getUpdatedData={(data: any) => getUpdatedData(data)}
              setLinks={(links: any, fId: any) => setLinks(links, f.id)}
            />
          );
        })}
      </Tree.Folder>
    </div>
  );
};

export default Folder;
