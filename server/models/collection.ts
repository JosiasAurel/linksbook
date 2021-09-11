import { deta, generateModelKey } from "./index";

// collections database table
const collections = deta.Base("collections");

async function createCollection(name: string): Promise<any> {

    try {
        const newCollection = collections.put({
            name,

        }, generateModelKey());

        return {status: "Success"};
    } catch (error: any) {
        return {status: "Failed"};
    }
}