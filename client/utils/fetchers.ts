

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

export { saveUser };