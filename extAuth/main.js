
const AUTH_SERVICE_URI = "";

async function makeRequest(route) {
    let response = await fetch(`${AUTH_SERVICE_URI}/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    let data = await response.json();

    return data;
}