import { deta, generateModelKey } from "./index";

// collections database table
const collections = deta.Base("collections");

async function createCollection(name: string, type: string, owner: string, parent?: string): Promise<any> {
    try {
        const newCollection = collections.put({
            name,
            type: (!parent && type === "Parent") ? "Parent" : "Child",
            owner
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