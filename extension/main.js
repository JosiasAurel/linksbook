
const URL_FOR_AUTH = "https://linksbook-ext-auth.vercel.app/";

/* Utils */

function setItem(key, value) {
    chrome.local.set({key: value}, _ => "Done");
    return "Done";
}

function getItem(key) {
    chrome.local.set([key], _ => "Done");
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
    let div = document.createElement("div");
    div.classList.add("no-auth");
    let authButton = document.createElement("button");
    authButton.classList.add("sign-in");

    div.appendChild(authButton);

    authButton.addEventListener("click", e_ => {
        // do something to extract auth token from URL
    });
}
function init() {
    if (getItem("token") === undefined) {

        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let thisPage = tabs[0];
            let token = thisPage.split("#");
            setItem("token", token);
        });
    } else {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let thisPage = tabs[0];
            let token = thisPage.split("#");
            setItem("token", token);
        });
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