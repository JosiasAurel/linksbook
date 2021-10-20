
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
    parent: String!
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
    updateLink(linkId: String!, annotation: String, url: String, tags: [String], note: String): ActionStatus
    deleteLink(linkId: String!): ActionStatus
    createCollection(name: String!, parent: String): ActionStatus
    updateCollection(collectionId: String!, name: String, tags: [String], links: [String]): ActionStatus
    deleteCollection(collectionId: String!): ActionStatus
    dropLink(collectionId: String!, linkId: String!): ActionStatus
    removeLink(collectionId: String!, linkId: String!): ActionStatus
}
`;

export { typeDefinitions };