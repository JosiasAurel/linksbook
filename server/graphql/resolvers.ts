
// import model CRUD handlers
import { createCollection, getAllCollections } from "../models/collection";

// import link handlers
import { getLink, getAllLinks, createLink, updateLink, deleteLink, searchLinks } from "../models/links";

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
            return allLinks;
        },
        collections: async (parent: any, _args: any): Promise<any> => {
            const allCollections: any = getAllCollections(parent.id);

            if (allCollections.status === "Success") {
                return allCollections.objects;
            } else {
                return [];
            }
        }
    },
    Mutation: {
        createLink: async (parent: any, args: any, context: any): Promise<any> => {
            let annotation: string = args.annotation;
            let tags: Array<string> = args.tags;
            let url: string = args.url;
            const newLink = createLink(annotation, url, tags, context.key);

            return newLink;
        },
        updateLink: async (parent: any, args: any, ctx: any): Promise<any> => {

            // fetch old link
            const oldLink = await getLink(args.linkId);

            const result = await updateLink(args.linkId, args.annotation ? args.annotation : oldLink.annotation, args.url ? args.url : oldLink.url, args.tags ? args.tags : oldLink.tags);

            return result;
        }
    }
}

export { resolvers };