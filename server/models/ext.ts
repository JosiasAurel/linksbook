
/* Extension */
import { ObjectType } from "deta/dist/types/types/basic";
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


async function syncBookmarks(data: any, parent: string = "NONE", owner: string): Promise<string> {

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
            syncBookmarks(data[item], newFolder.key, owner);
        } else {
            let bookmarkExists: boolean = await linkWithUrl(data[item].url, owner);

            if (!bookmarkExists) {
                const newLink: any = await createLink(data[item].title, data[item].url, [], owner, true);

                dropLinkToCollection(parent, newLink?.key);
            }

            // otherwise
            // it already exists in a place the user has kept it
            // no need to add it to a collection once more
        }
    }

    return "Done";

}

export { syncBookmarks };