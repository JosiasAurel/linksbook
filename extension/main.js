
const AUTH_URI = "https://linksbook-ext-auth.vercel.app/";

/* Utils */

function setItem(key, value) {
    chrome.local.set({key: value}, _ => "Done");
    return "Done";
}

function getItem(key) {
    chrome.local.get([key], _ => "Done");
    return "Done";
}

function clearStorage() {
    chrome.storage.local.clear(() => {
        // done
});
}

function removeItem(key) {
    chrome.storage.local.remove([key], (result) => {
        return result;
});
}

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
            setItem("token", token);
        });

    });
}

async function verifyToken() {
    let result;

    const res = await fetch(`${AUTH_URI}/is-authenticated`);
    const data = await res.json();

    if (data.status === "Success") {
        result = data;
    } else { result = "Failed" }

    return result;
}

function init() {
    if (getItem("token") === undefined) {
        mountAuthPage();

    } else {
        const isAuth = verifyToken();

        if (result !== "Failed") {
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                let thisPage = tabs[0];
                const url = thisPage.url;
                const title = thisPage.title;
                console.log({url, title});
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