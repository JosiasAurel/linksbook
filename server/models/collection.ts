import { deta, generateModelKey } from "./index";

// collections database table
const collections = deta.Base("collections");

// Collection __ Types
interface CollectionData {
    name: string
    links: Array<string>
    children: Array<string>
    id: string
}

async function createCollection(name: string, type: string, owner: string, parent?: string): Promise<any> {
    try {
        const newCollection = collections.put({
            name,
            type: (!parent && type === "Parent") ? "Parent" : "Child",
            owner,
            links: [],
            children: [],
            parent: parent ? parent : false
        }, generateModelKey());

            return {status: "Success"};
    } catch (error: any) {
        return {status: "Failed"};
    }
    
}

async function getCollection(collectionId: string): Promise<any> {
    // get collection with ID collectionId
    const collection = await collections.get(collectionId);
    return collection;
}

async function getAllCollections(owner: string): Promise<any> {
    // returns collections in nested format

    try {
        const fetchedCollectionsRes = await collections.fetch({"owner": owner});
        const fetchedCollectionsItems = await fetchedCollectionsRes.items;
        const fetchedCollectionsCount = await fetchedCollectionsRes.count;

        return {status: "Success", objectCount: fetchedCollectionsCount, objects: fetchedCollectionsItems};
    } catch(error: any) {
        return {status: "Failed"};
    }
    
}

async function updateCollection({name, links, children, id}: CollectionData): Promise<any> {

    // first get the collection
    const thisCollection = await getCollection(id);

    try {
        collections.update({
            name: name && name !== "" ? name : thisCollection.name,
            links: links && (links.length > 0) ? links : thisCollection.links,
            children: children && (children.length > 0) ? children : thisCollection.children
        }, id);
        return "Success";
    } catch(error: any) {
        return "Failed";
    }
}

async function deleteCollection(collectionId: string): Promise<string> {
    await collections.delete(collectionId);
    return "Done";
}

async function dropLinkToCollection(collectionId: string, linkId: string): Promise<string> {
    const currentCollection = await getCollection(collectionId);

    if (linkId in currentCollection.links) {
        return "Success";
    }

    try {
        // Update only the list of links
        collections.update({
            links: collections.util.append(linkId)
        }, collectionId);

        return "Success";
    } catch {
        return "Failed";
    }
}

async function removeLink(collectionId: string, linkId: string): Promise<string> {
    const currentCollection = await getCollection(collectionId);

    let newLinksList: Array<string> = currentCollection.links.filter((link: string) => link !== linkId);

    try {
        // Update only the list of links
        await updateCollection({
            name: "",
            children: [],
            id: collectionId,
            links: newLinksList
        });

        return "Success";
    } catch {
        return "Failed";
    }
}

export { createCollection, getCollection, getAllCollections, updateCollection, deleteCollection };