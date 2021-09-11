import { deta, generateModelKey } from "./index";

// collections database table
const collections = deta.Base("collections");

async function createCollection(name: string, type: string, parent?: string): Promise<any> {

    if (!parent && type === "Parent") {
        try {
            const newCollection = collections.put({
                name,
                type: "Parent",
                parent
            }, generateModelKey());

            return {status: "Success"};
        } catch (error: any) {
            return {status: "Failed"};
        }
    } else {
        try {
            const newCollection = collections.put({
                name,
                type: "Child"
            }, generateModelKey());

            return {status: "Success"};
        } catch (error: any) {
            return {status: "Failed"};
        }
    }
    
}

async function getAllCollections(): Promise<any> {
    // returns collections in nested format

    
}