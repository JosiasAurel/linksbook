

function log(data) {
    chrome.extension.getBackgroundPage().console.log(data);
}

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
}

let everything = [];

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
