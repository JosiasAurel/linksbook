
import { gql } from "@apollo/client";

const FETCH_ALL = gql`
    query {
        user {
            name, 
            email,
            links {
                annotation,
                tags,
                note,
                id,
                url
            }
        }
    }
    `;

const CREATE_LINK = gql`
    mutation createLink($annotation: String!, $url: String!, $tags: [String]!) {
        createLink(annotation: $annotation, url: $url, tags: $tags) {
            status
        }
    }
`;

const UPDATE_LINK = gql`
    mutation updateLink($linkId: String!, $annotation: String, $url: String, $tags: [String], $note: String) {
        updateLink(linkId: $linkId, annotation: $annotation, url: $url, tags: $tags, note: $note) {
            status
        }
    }
`;

const CREATE_COLLECTION = gql`
    mutation createCollection($name: String!, $type: String!, $parent: String) {
        createCollection(name: $name, type: $type, parent: $parent) {
            status
        }
    }
`;

export { FETCH_ALL, CREATE_LINK, UPDATE_LINK, CREATE_COLLECTION };