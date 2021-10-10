

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
    log(bookmarksStructures);
}

let everything = [];

function parseBookmarks(data, parent = "NONE") {

    for (item in data) {
        if (data[item].hasOwnProperty("children")) {
            // folders with same name exists ?
            // yes -> get the folder ID
            // no --proceed
            // create the folder
            // if parent is NONE, pass...
            // if parent is not NONE, modify parent to include this folder ID
            // pass the ID of the new folder in the recursive call
            // parseBookmarks(data[item].children, parentId)
            // modify parent to include the ID of the new folder if this is child of parent
            everything.push({folder: data[item].title, parent});
            parseBookmarks(data[item].children, data[item].title);
        } else {
            // check if link (url) exists ?
            // yes then skip
            //  -> 
            // no -> proceed to create
            // create link
            // modify parent to include id of new link
            everything.push({bookmark: data[item].title, parent});
        }
    }
}
