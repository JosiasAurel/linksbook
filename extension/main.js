
const AUTH_URI = "https://celestial-unmarred-patella.glitch.me";

/* Utils */

function log(data) {
    chrome.extension.getBackgroundPage().console.log(data);
}

/* utils end */

function mountAuthPage() {

    const app = document.getElementById("app");

    let div = document.createElement("div");
    div.classList.add("no-auth");
    let authButton = document.createElement("button");
    authButton.classList.add("sign-in");

    div.appendChild(authButton);

    app.appendChild(div);

    authButton.addEventListener("click", e_ => {
        // do something to extract auth token from URL

        /* Extract the auth token from the URL */
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let thisPage = tabs[0];
            let token = thisPage.split("#");
            localStorage.setItem("token", token);
        });

    });
}

async function verifyToken() {
    let result;

    const thisToken = localStorage.getItem("token");

    const res = await fetch(`${AUTH_URI}/is-authenticated`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: thisToken })
    });

    const data = await res.json();

    if (data.status === "Success") {
        result = data;
    } else { result = "Failed" }

    return result;
}

function showAppPage(pageTitle, pageUrl) {

    /* Create basic elements */
    const container = document.createElement("div");
    const syncButton = document.createElement("button");
    const syncBtnImage = document.createElement("img");
    const form = document.createElement("form");
    const titleInput = document.createElement("input");
    const urlInput = document.createElement("input");
    const saveButton = document.createElement("button");

    /* Set attributs */
    container.classList.add("container");
    syncBtnImage.src = "cloud.png";
    syncBtnImage.alt = "cloud";
    titleInput.type = "text";
    titleInput.setAttribute("placeholder", "Annotation");
    urlInput.type = "url";
    urlInput.setAttribute("placeholder", "URL");

    /* Construct hierachy */

    form.appendChild(titleInput);
    form.appendChild(urlInput);
    form.appendChild(saveButton);
    saveButton.innerText = "Save";

    syncButton.appendChild(syncBtnImage);
    syncButton.innerText = "Sync Browser";
    
    container.appendChild(syncButton);
    container.appendChild(form);

    // mount app to app component
    const app = document.getElementById("app");
    app.appendChild(container);

    /* Handle events */

}

function init() {
    if (localStorage.getItem("token") === undefined) {
        mountAuthPage();

    } else {
        const isAuth = verifyToken();

        if (isAuth !== "Failed") {
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                let thisPage = tabs[0];
                const url = thisPage.url;
                const title = thisPage.title;
                showAppPage(title, url);
                console.log(thisPage);
                /* Show the app pages */

            });

            /* Show the app pages */

        } else { mountAuthPage(); }
    }   
}

init();

chrome.bookmarks.getTree(bkms => {
    handleBookmarks(bkms);
});

function handleBookmarks(bookmarks) {

    // Assuming all fetched bookmarks will always be Array(1)
    // We get all bookmark and folders from the browser
    const bookmarksStructures = bookmarks[0].children;
    const folders = bookmarksStructures.map(item => item);

    let result = parseBookmarks(bookmarksStructures);

    log(result);
    log(everything);
    log(bookmarksStructures);
}

// LinksBook v2 Chrome Extension