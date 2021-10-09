
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
        const fetchLinks = await (await db.fetch({owner})).items;
        return fetchLinks;
    } catch (error: any) {
        return "Failed";
    }
}

async function searchLinks(searchParam: string, type: string, owner: string): Promise<any> {

    switch (type) {
        case "all":
            try {
                const byAnnotation = await (await db.fetch({"annotation?contains": searchParam, owner})).items;
                const byURL = await (await db.fetch({"url?contains": searchParam, owner})).items;
                const byTags = await (await db.fetch({"tags?contains": searchParam, owner})).items;
                const byNote = await (await db.fetch({"note?contains": searchParam, owner})).items;

                console.log([...byAnnotation, ...byURL, ...byTags, ...byNote])
                return [...byAnnotation, ...byURL, ...byTags, ...byNote];
            } catch(error: any) {
                return "Failed";
            }

        // search by tags
        case "tags":
            try {
                const byTags = await (await db.fetch({"tags?contains": searchParam, owner})).items;

                return byTags;
            } catch(error: any) {
                return "Failed";
            }
        
        // search by annotation
        case "annotation":
            try {
                const byAnnotation = await (await db.fetch({"annotation?contains": searchParam, owner})).items;

                return byAnnotation;
            } catch(error: any) {
                return "Failed";
            }

        // by url
        case "url":
            try {
               const byURL = await (await db.fetch({"url?contains": searchParam, owner})).items;

                return byURL;
            } catch(error: any) {
                return "Failed";
            }
        
        // by note
        case "note":
            try {
               const byNote = await (await db.fetch({"note?contains": searchParam, owner})).items;

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

async function updateLink(linkId: string, annotation: string, url: string, tags: Array<string>, note: string): Promise<string> {
    try {
        await db.update({
            annotation,
            url,
            note,
            tags,
        }, linkId);
        return "Success";
    } catch(error: any) {
        return "Failed";
    }
}

async function deleteLink(linkId: string): Promise<string> {
    await db.delete(linkId);
    return "Done";
}

async function linkWithUrl(url: string): Promise<any> {
    const link = await (await db.fetch({ url })).items;
    if (link.length === 0) {
        return false;
    } 

    return true;
}

export { createLink, deleteLink, updateLink, getLink, getAllLinks, searchLinks, linkWithUrl };