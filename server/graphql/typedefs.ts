
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

type Group {
    id: ID!
    links: [Link]
    name: String!
    createdAt: String!
}


type ActionStatus {
    status: String
}

type Query {
    getLink(linkResolver: String!): Link!
    getGroup(groupResolver: String!): Group!
    getLinks: [Link]!
    getGroups: [Group]!
    searchLinks(search: String): [Link]
    searchGroups(search: String): [Link]
}

type Mutation {
    createLink(annotation: String!, url: String!, tags: [String]!): ActionStatus
    updateLink(annotation: String, url: String, tags: [String]): ActionStatus
    deleteLink(linkId: String!): ActionStatus
    createGroup(name: String!, tags: [String], links: [String]): ActionStatus
    updateGroup(name: String, tags: [String], links: [String]): ActionStatus
    deleteGroup(groupId: String): ActionStatus
}
`;