
const AUTH_URI = "https://celestial-unmarred-patella.glitch.me";
const SERVER_URI = "http://localhost:5000" // "https://server.linksbook.me";

/* Utils */

function log(data) {
    chrome.extension.getBackgroundPage().console.log(data);
}

/* utils end */

const app = document.getElementById("app");

function mountAuthPage() {


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
    
    const syncButton = document.createElement("button");
    syncButton.innerText = "Sync Browser";
    syncButton.setAttribute("id", "synclinks");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.setAttribute("placeholder", "Annotation");
    titleInput.value = pageTitle;
    titleInput.setAttribute("id", "title-input");

    const urlInput = document.createElement("input");
    urlInput.type = "url";
    urlInput.setAttribute("placeholder", "URL");
    urlInput.value = pageUrl;
    urlInput.setAttribute("id", "url-input");

    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.type = "submit";
    saveButton.setAttribute("id", "saveBtn");

    /* Set input field values */

    /* Construct hierachy */
    
    const form = document.createElement("form");
    form.appendChild(titleInput);
    form.appendChild(urlInput);
    form.appendChild(saveButton);
    form.setAttribute("id", "create-link");

    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(syncButton);
    container.appendChild(form);

    return container;
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
                // console.log(thisPage);
                let container = showAppPage(title, url);
                console.log(container);
                app.appendChild(container);

                /* wanna save the link ? */
                const saveLinkForm = document.getElementById("create-link");

                saveLinkForm.addEventListener("submit", async  e => {
                    e.preventDefault(); // prevent reload
                    const authToken = localStorage.getItem("token");

                    const titleInput = document.getElementById("title-input");
                    const urlInput = document.getElementById("url-input");

                    let url = urlInput.value;
                    let annotation = titleInput.value;
                    const response = await fetch(`${SERVER_URI}/save-link`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${authToken}`
                        },
                        body: JSON.stringify({ annotation, url })
                    });

                    const result = await response.json();

                    log(result);
                });

                /* Sync bookmarks */
                const syncBookmarks = document.getElementById("synclinks");
                syncBookmarks.addEventListener("click", async _ => {
                    chrome.bookmarks.getTree(async bkms => {
                        await handleBookmarks(bkms);
                });

                });
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

var everything = [];

async function handleBookmarks(bookmarks_) {

    const authToken = localStorage.getItem("token");

    // Assuming all fetched bookmarks will always be Array(1)
    // We get all bookmark and folders from the browser
    const bookmarks = bookmarks_[0].children;

    parseBookmarks(bookmarks);
    log(everything);

    const response = await fetch(`${SERVER_URI}/sync-bookmarks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ bookmarks })
    });

    const result = await response.json();

    log(result);
    // log(bookmarksStructures);
}

function parseBookmarks(data) {

    for (item in data) {
        if (data[item].hasOwnProperty("children")) {
            everything.push({folder: data[item].title});
            parseBookmarks(data[item].children);
        } else {
            everything.push({bookmark: data[item].title});
        }
    }
}

// LinksBook v2 Chrome Extension