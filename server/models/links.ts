
import { deta, generateModelKey } from "./index";

const db = deta.Base("links");

async function getLink(linkId: string): Promise<any> {
    try {
        const link = await db.get(linkId);
        return link;
    } catch (error: any) {
        return "Failed";
    }
}

async function getAllLinks(owner: string): Promise<any> {
    try {
        const fetchLinks = await db.fetch({owner});
        return fetchLinks;
    } catch (error: any) {
        return "Failed";
    }
}

async function searchLinks(searchParam: string, type: string): Promise<any> {

    switch (type) {
        case "all":
            try {
                const byAnnotation = await (await db.fetch({"annotation?contains": searchParam})).items;
                const byURL = await (await db.fetch({"url?contains": searchParam})).items;
                const byTags = await (await db.fetch({"tags?contains": searchParam})).items;
                const byNote = await (await db.fetch({"note?contains": searchParam})).items;

                return [...byAnnotation, ...byURL, ...byTags, ...byNote];
            } catch(error: any) {
                return "Failed";
            }

        // search by tags
        case "tags":
            try {
                const byTags = await (await db.fetch({"tags?contains": searchParam})).items;

                return byTags;
            } catch(error: any) {
                return "Failed";
            }
        
        // search by annotation
        case "annotation":
            try {
                const byAnnotation = await (await db.fetch({"annotation?contains": searchParam})).items;

                return byAnnotation;
            } catch(error: any) {
                return "Failed";
            }

        // by url
        case "url":
            try {
               const byURL = await (await db.fetch({"url?contains": searchParam})).items;

                return byURL;
            } catch(error: any) {
                return "Failed";
            }
        
        // by note
        case "note":
            try {
               const byNote = await (await db.fetch({"note?contains": searchParam})).items;

                return byNote;
            } catch(error: any) {
                return "Failed";
            }
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