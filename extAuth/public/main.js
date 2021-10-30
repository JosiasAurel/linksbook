
// init dialog polyfill
const pinDialog = document.getElementById("pin-dialog");
dialogPolyfill.registerDialog(pinDialog);


const AUTH_SERVICE_URI = "https://celestial-unmarred-patella.glitch.me";

async function makeRequest(host, route, body) {
    let response = await fetch(`${host}/${route}`, {
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

    const result = await makeRequest(AUTH_SERVICE_URI, "create-login", { email });

    if (result.status === "Success") {
        
        const pinDialog = document.getElementById("pin-dialog");
        const validatePin = document.getElementById("validate-pin");
        pinDialog.showModal();

        // try to validate the pin
        validatePin.addEventListener("click", async _ => {
            const _pin = document.getElementById("pin-dialog-pin").value;
            const lastStep = await makeRequest(AUTH_SERVICE_URI, "complete-login", { pin: _pin, email });
            let token = lastStep.token ?? undefined;
            if (lastStep.status === "Success") {
                location.href = `${location.href}token/?token=${token}`
            } else { alert("Wrong Pin. Try again."); }
            console.log(lastStep);
        }); // done... 

    } else { alert("Something wrong occurred.") }
}

const createLoginAction = document.getElementById("create-login-action");

createLoginAction.addEventListener("click", _ => {
    handleSumbit();
});