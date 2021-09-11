
// import model CRUD handlers

// import link handlers
import { getLink, getAllLinks, createLink, updateLink, deleteLink, searchLinks } from "../models/links";

const resolvers = {
    Query: {
        getLink: async (parent: any, args: any, context: any) => {
            // get the link ID from args
            const { linkId } = args;
            const link = await getLink(linkId);

            return link;
        }
    }
}