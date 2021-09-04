
import { deta, generateModelKey } from "./index";

const db = deta.Base("links");

async function createLink(annotation: string, url: string, tags: Array<string>): Promise<string> {
    
    try {
        const newLink = await db.put({
            annotation,
            url,
            tags
        }, generateModelKey());

        return "Success";
    } catch (err: any) {
        return "Failed";
    }

}

async function updateLink(linkId: string, annotation: string, url: string, tags: Array<string>): Promise<any> {
    try {
        await db.update({
            annotation,
            url,
            tags
        }, linkId);
        return "Success";
    } catch(error: any) {
        return "Failed";
    }
}