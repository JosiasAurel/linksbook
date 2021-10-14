
// init dialog polyfill
const pinDialog = document.getElementById("pin-dialog");
dialogPolyfill.registerDialog(pinDialog);


const AUTH_SERVICE_URI = "https://celestial-unmarred-patella.glitch.me";

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

async function handleSumbit() {

    const email = document.getElementById("create-login-email").value;

    const result = await makeRequest("create-login", { email });

    if (result.status === "Success") {
        
        const pinDialog = document.getElementById("pin-dialog");
        const validatePin = document.getElementById("validate-pin");
        pinDialog.showModal();

        // try to validate the pin
        validatePin.addEventListener("click", async _ => {
            const _pin = document.getElementById("pin-dialog-pin").value;
            const lastStep = await makeRequest("complete-login", { pin: _pin, email });

            if (lastStep.status === "Success") {
                location.href = `https://extauth.linksbook.me/linksbook-extension-authentication#authToken=${lastStep.token}`;
            } else { alert("Wrong Pin. Try again."); }
            console.log(lastStep);
        }); // done... 

    } else { alert("Something wrong occurred.") }
}

const createLoginAction = document.getElementById("create-login-action");

createLoginAction.addEventListener("click", _ => {
    handleSumbit();
});