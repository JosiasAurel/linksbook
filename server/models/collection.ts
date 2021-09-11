import { deta, generateModelKey } from "./index";

// collections database table
const collections = deta.Base("collections");

async function createCollection(name: string, type: string, parent?: string): Promise<any> {
    try {
        const newCollection = collections.put({
            name,
            type: (!parent && type === "Parent") ? "Parent" : "Child"
        }, generateModelKey());

            return {status: "Success"};
    } catch (error: any) {
        return {status: "Failed"};
    }
    
}

async function getAllCollections(): Promise<any> {
    // returns collections in nested format

    
}