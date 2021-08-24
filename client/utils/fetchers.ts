

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

async function saveUser(name: string, email: string, uid: string): Promise<any> {

    // request headers
    const requestHeaders: HeadersInit = {
        "Content-Type": "application/json"
    }

    const requestBody: any = {
        name,
        email,
        uid
    }

    const saveUserResponse = await fetch(`${SERVER_URI}/save-user`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
    });

    return saveUserResponse.json();
}

// get all collections
async function fetchAllCollection(owner: string): Promise<any> {

    // request headers
    const requestHeaders: HeadersInit = {
        "Content-Type": "application/json"
    }

    const fetchedCollectionsResponse = await fetch(`${SERVER_URI}/collections`);
    const fetchedCollections = await fetchedCollectionsResponse.json();

    return fetchedCollections;
}

async function createCollection(owner: string, title: string, description: string): Promise<any> {

    // request headers
    const requestHeaders: HeadersInit = {
        "Content-Type": "application/json"
    }

    const createItem = {
        title, 
        description,
        owner
    };

    const createdCollectionResponse = await fetch(`${SERVER_URI}/collections/create`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(createItem)
    });
    const createdCollection = await createdCollectionResponse.json();

    return createdCollection;
}

async function deleteCollection(collectionId: string): Promise<any> {

    // request headers
    const requestHeaders: HeadersInit = {
        "Content-Type": "application/json"
    }

    const deletedCollectionResponse = await fetch(`${SERVER_URI}/collections/delete`);
    const deletedCollection = await deletedCollectionResponse.json();

    return deletedCollection;
}

export { saveUser, fetchAllCollection, createCollection, deleteCollection };