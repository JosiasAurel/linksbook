
// import model CRUD handlers
import {} from "../models/links";
import {} from "../models/collection";

// import link handlers
import { getLink, getAllLinks, createLink, updateLink, deleteLink, searchLinks } from "../models/links";

const resolvers = {
    Query: {
        hello: () => {
            return "Hello World"
        },
        user: async (_parent: any, _args: any, context: any): Promise<any> => {
            const { name, email } = context;

            return {name, email};
        }
    },
    User: {
        links: async (parent: any, _args: any): Promise<any> => {
            return {};
        }
    }
}

export { resolvers };