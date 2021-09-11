
import { gql } from "apollo-server-express";

const typeDefinitions: any = gql`

type Link {
    annotation: String
    tags: [String]
    note: String
    url: String!
    owner: String!
    id: ID!
    createdAt: String!
}

type Collection {
    id: ID!
    links: [Link]
    name: String!
    children: [Collection]
    createdAt: String!
    type: String!
}


type ActionStatus {
    status: String
}

type Query {
    getLink(linkResolver: String!): Link!
    getCollection(collectionResolver: String!): Collection!
    getLinks: [Link]!
    getCollections: [Group]!
    searchLinks(search: String): [Link]
    searchCollections(search: String): [Link]
}

type Mutation {
    createLink(annotation: String!, url: String!, tags: [String]!): ActionStatus
    updateLink(annotation: String, url: String, tags: [String]): ActionStatus
    deleteLink(linkId: String!): ActionStatus
    createCollection(name: String!, tags: [String], links: [String]): ActionStatus
    updateCollection(name: String, tags: [String], links: [String]): ActionStatus
    deleteCollection(collectionId: String): ActionStatus
}
`;