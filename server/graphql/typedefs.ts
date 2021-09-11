
import { gql } from "apollo-server-express";

const typeDefinitions: any = gql`

type User {
    id: ID!
    name: String!
    email: String!
    links: [Link]!
    collections: [Collection]!
}

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
    owner: String!
}


type ActionStatus {
    status: String
}

type Query {
    user: User
    searchLinks(search: String!, type: String!): [Link]
    hello: String!
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

export { typeDefinitions };