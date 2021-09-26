
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

export { FETCH_ALL, CREATE_LINK };