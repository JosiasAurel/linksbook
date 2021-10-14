
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

    if (result.status === "Success") {
        const _pin = prompt("Enter your login pin");

        const lastStep = await makeRequest("complete-login", { pin: _pin, email });

        if (lastStep.status === "Success") {
            location.href = `https://extauth.linksbook.me/linksbook?token=${lastStep.token}`;
        } else { alert("Wrong Pin. Try again."); }
        // console.log(lastStep);
    } else {
        alert("Something wrong occurred... Maker sure your email is correct and try again.");
    }
}

form.addEventListener("submit", event => {
    handleSumbit(event);
});