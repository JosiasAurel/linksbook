
import { gql } from "apollo-server-express";

const typeDefinitions: any = gql`

type Link {
    annotation: String
    tags: [String]
    note: Note
    url: String
    owner: String
    id: ID
    createdAt: String
}

type Group {
    id: ID
    links: [ID]
    name: String
    createdAt: String
}

type Note {
    id: ID
    link: ID
    content: String
    title: String
}

`;