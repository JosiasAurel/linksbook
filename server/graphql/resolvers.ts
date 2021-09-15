
// import model CRUD handlers
import { createCollection, deleteCollection, getAllCollections, updateCollection, dropLinkToCollection, removeLink } from "../models/collection";

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

            // change link key to link.id to match typedef
            allLinks.map((link: any) => link.id = link.key);
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

            return {status: newLink};
        },
        updateLink: async (_parent: any, args: any, _ctx: any): Promise<any> => {

            // fetch old link
            const oldLink = await getLink(args.linkId);

            if (oldLink !== "Failed") {
                const result = await updateLink(args.linkId, args.annotation ? args.annotation : oldLink.annotation, args.url ? args.url : oldLink.url, args.tags ? args.tags : oldLink.tags);

                return {status: result};
            }

            return {status: "Failed"};
        },
        deleteLink: async (_parent: any, args: any, _ctx: any): Promise<any> => {
            const result = deleteLink(args.linkId);
            return {status: result};
        },
        createCollection: async (parent: any, args: any, ctx: any): Promise<any> => {
            const newCollection = await createCollection(args.name, args.type, ctx.key, args.parent);

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
    }
}

export { resolvers };