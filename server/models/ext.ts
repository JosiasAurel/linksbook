
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
            // console.log(exists);
            // if the bookmark already exist ?
            if (exists !== false) {
                // recursively go through it and pass its id
                syncBookmarks(data[item].children, exists.key, owner)
            } else {
                if (parent !== "NONE") {
                    // console.log(data[item].title, "parent none")
                    const newFolder: any = await createCollection(data[item].title, owner, true, parent);
                    await dropCollectionToCollection(parent, newFolder.key);
                    syncBookmarks(data[item].children, newFolder.key, owner);
                } else {
                    // console.log(data[item].title, "parent")
                    const newFolder: any = await createCollection(data[item].title, owner, true, "NONE");
                    syncBookmarks(data[item].children, newFolder.key, owner);
                }
            }

            
        } else {
            // console.log(data[item])
            let bookmarkExists: boolean = await linkWithUrl(data[item].url, owner);
            // console.log("link exists ?", bookmarkExists)
            if (!bookmarkExists) {
                // console.log("not exist", !bookmarkExists)
                const newLink: any = await createLink(data[item].title, data[item].url, ["new"], owner, true);
                // console.log(newLink);
                if (parent !== "NONE") {
                    await dropLinkToCollection(parent, newLink?.key);
                    // console.log(droppedLink);
                }
            }

            // otherwise
            // it already exists in a place the user has kept it
            // no need to add it to a collection once more
        }
    }

    return "Done";

}

export { syncBookmarks };