
import { deta, generateModelKey } from "./index";

const db = deta.Base("links");

async function getAllLinks(owner: string): Promise<any> {
    try {
        const fetchLinks = await db.fetch({owner});
        return fetchLinks;
    } catch (error: any) {
        return "Error";
    }
}

async function createLink(annotation: string, url: string, tags: Array<string>, owner: string): Promise<string> {
    
    try {
        const newLink = await db.put({
            annotation,
            url,
            tags, 
            owner
        }, generateModelKey());

        return "Success";
    } catch (err: any) {
        return "Failed";
    }

}

async function updateLink(linkId: string, annotation: string, url: string, tags: Array<string>): Promise<string> {
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

async function deleteLink(linkId: string): Promise<string> {
    try {
        await db.delete(linkId);

        return "Success";
    } catch(error: any) {
        return "Failed"
    }
}