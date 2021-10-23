
import axios from "axios";

// import model CRUD handlers
import { createCollection, deleteCollection, getAllCollections, updateCollection, dropLinkToCollection, removeLink, getCollection } from "../models/collection";

// import link handlers
import { getLink, getAllLinks, createLink, updateLink, deleteLink, searchLinks } from "../models/links";
import { API_SERVICE_URL } from "../config";

const resolvers = {
    Query: {
        hello: () => {
            return "Hello World"
        },
        user: async (_parent: any, _args: any, context: any): Promise<any> => {
            const { name, email, key } = context;

            return {name, email, id: key};
        },
        searchLinks: async (parent: any, args: any, context: any): Promise<any> => {

            const searchedLinks = await searchLinks(args.search, args.type, context.key);

            if (typeof searchLinks !== "string") {
                return searchedLinks;
            } else {
                return [];
            }
        }
    },
    User: {
        links: async (parent: any, _args: any): Promise<any> => {
            const allLinks = await getAllLinks(parent.id);

            // change link key to link.id to match typedef
            allLinks.map((link: any) => link.id = link.key);
            return allLinks;
        },
        collections: async (parent: any, _args: any): Promise<any> => {
            const allCollections: any = await getAllCollections(parent.id);
            
            // set collection.id to value of collection.key
            allCollections.map((col: any) => col.id = col.key);

            return allCollections;
        }
    },
    Mutation: {
        createLink: async (parent: any, args: any, context: any): Promise<any> => {
            let annotation: string = args.annotation;
            let tags: Array<string> = args.tags;
            let url: string = args.url;

            const res: any = await axios.get(`${API_SERVICE_URL}/url/?url=${url}`);
            // console.log(res);

            const newLink = await createLink(res?.data?.pageTitle, url, tags, context.key);

            return {status: newLink};
        },
        updateLink: async (_parent: any, args: any, _ctx: any): Promise<any> => {

            // fetch old link
            const oldLink = await getLink(args.linkId);

            if (oldLink !== "Failed") {
                const result = await updateLink(args.linkId, args.annotation ? args.annotation : oldLink.annotation, args.url ? args.url : oldLink.url, args.tags ? args.tags : oldLink.tags, args.note ? args.note : oldLink.note);

                return {status: result};
            }

            return {status: "Failed"};
        },
        deleteLink: async (_parent: any, args: any, _ctx: any): Promise<any> => {
            const result = deleteLink(args.linkId);
            return {status: result};
        },
        createCollection: async (parent: any, args: any, ctx: any): Promise<any> => {
            const newCollection = await createCollection(args.name, ctx.key, false, args.parent);

            return newCollection;
        },
        updateCollection: async (parent: any, args: any, ctx: any): Promise<any> => {
            const result = await updateCollection({
                name: args.name,
                links: args.links,
                children: args.children,
                id: args.collectionId
            });

            return {status: result};
        },
        deleteCollection: async (_parent: any, args: any): Promise<any> => {
            const result = await deleteCollection(args.collectionId);

            return {status: result};
        },
        dropLink: async (_parent: any, args: any): Promise<any> => {
            const result = await dropLinkToCollection(args.collectionId, args.linkId);

            return {status: result};
        },
        removeLink: async (_parent: any, args: any): Promise<any> => {
            const result = await removeLink(args.collectionId, args.linkId);

            return {status: result};
        }
    },
    Collection: {
        links: async (parent: any, args: any) => {
            const linksId: Array<any> = parent?.links;

            const links = [];

            for (let i = 0; i < linksId.length; i++) {
                var link = await getLink(linksId[i]);
                // console.log(link);
                if (link !== null) links.push(link);
            }

            links.map(link => link.id = link.key);
            // console.log(links)
            return links;
        },
        children: async (parent: any, args: any) => {
            const childrenId: Array<string> = parent.children;

            const children = [];

            for (let i = 0; i < childrenId.length; i++) {
                var link = await getCollection(childrenId[i]);
                // console.log(link);
                if (link !== null) children.push(link);
            }

            children.map(child => child.id = child.key);
            // console.log(links)
            return children;
        }
    }
}

export { resolvers };