
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
            },
            collections {
                id,
                name,
                parent,
                links {
                    annotation,
                    tags,
                    note,
                    id,
                    url
                },
                children {
                    id,
                    name,
                    parent,
                    links {
                        annotation,
                        tags,
                        note,
                        id,
                        url
                    }
                }
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

const DELETE_LINK = gql`
    mutation deleteLink($linkId: String!) {
        deleteLink(linkId: $linkId) {
            status
        }
    }
`;


const CREATE_COLLECTION = gql`
    mutation createCollection($name: String!, $parent: String) {
        createCollection(name: $name, parent: $parent) {
            status
        }
    }
`;

const DROP_LINK_IN_COLLECTION = gql`
    mutation dropLink($collectionId: String!, $linkId: String!) {
        dropLink(collectionId: $collectionId, linkId: $linkId) {
            status
        }
    }
`;

const REMOVE_LINK_FROM_COLLECTION = gql`
    mutation removeLink($collectionId: String!, $linkId: String!) {
        removeLink(collectionId: $collectionId, linkId: $linkId) {
            status
        }
    }
`;

const RENAME_COLLECTION = gql`
    mutation updateCollection($collectionId: String!, $name: String) {
        updateCollection(collectionId: $collectionId, name: $name) {
            status
        }
    }
`;

const ADD_COLLECTION_CHILD = gql`
    mutation addCollectionChild($collectionId: String!, $childName: String!) {
        	addCollectionChild(collectionId: $collectionId, childName: $childName) {
                status
            }
    }
`;

const DELETE_COLLECTION = gql`
    mutation deleteCollection(collectionId: String!) {
        deleteCollection(collectionId: $collectionId) {
            status
        }
    }
`;

export { 
    FETCH_ALL, 
    CREATE_LINK, 
    UPDATE_LINK, 
    CREATE_COLLECTION,
    DELETE_LINK, 
    DROP_LINK_IN_COLLECTION,
    REMOVE_LINK_FROM_COLLECTION,
    RENAME_COLLECTION,
    ADD_COLLECTION_CHILD,
    DELETE_COLLECTION
};