
const AUTH_SERVICE_URI = "https://celestial-unmarred-patella.glitch.me";

const form = document.getElementById("create-login-form");

async function makeRequest(route, body) {
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

async function handleSumbit(event) {
    event.preventDefault(); // prevent auto reload

    const email = document.getElementById("create-login-email").value;

    const result = await makeRequest("create-login", { email });

    console.log(result);
}

form.addEventListener("submit", event => {
    handleSumbit(event);
});