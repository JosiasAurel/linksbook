
import { Deta } from "deta";
import { ObjectType } from "deta/dist/types/types/basic";
import { nanoid } from "nanoid";
import { createCollection, collectionWithName, dropLinkToCollection, dropCollectionToCollection } from "./collection";
import { createLink, linkWithUrl } from "./links";

interface bookmarkStructure {
    title: string
    id: string
    dateAdded: number
    parentId: string
    index: number
    dateGroupModified?: number
    url?: string
    children?: Array<bookmarkStructure>
}

const deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF");

function generateModelKey(): string {
    const modelKey: string = nanoid(12);
    return modelKey;
}

async function syncBookmarks(data: any, parent: string = "NONE", owner: string): Promise<void> {

    for (let item in data) {
        if (data[item].hasOwnProperty("children")) {
            let exists: boolean|ObjectType|any = await collectionWithName(data[item].title, owner, true);

            // if the bookmark already exist ?
            if (exists) {
                // recursively go through it and pass its id
                syncBookmarks(data[item], exists.id, owner)
            }

            const newFolder: any = await createCollection(data[item].title, "", owner, true);

            await dropCollectionToCollection(parent, newFolder.key);
        } else {
            let bookmarkExists: boolean = await linkWithUrl(data[item].url, owner);

            if (!bookmarkExists) {
                const newLink: any = await createLink(data[item].title, data[item].url, [], owner, true);

                dropLinkToCollection(parent, newLink?.key);
            }
        }
    }

}

export { deta, generateModelKey };