
const URL_FOR_AUTH = "https://linksbook-extension-auth.vercel.app/";

function log(data) {
    chrome.extension.getBackgroundPage().console.log(data);
}

function init() {
    chrome.identity.launchWebAuthFlow({url: URL_FOR_AUTH, interactive: true}, (red_url) => {
        log(red_url);
    });
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
