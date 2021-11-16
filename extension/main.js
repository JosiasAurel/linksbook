const app = document.getElementById("app");

const SERVER_URI = "http://localhost:5000"; //"https://server.linksbook.me";

/* Utils */

function log(data) {
  chrome.extension.getBackgroundPage().console.log(data);
}

/* utils end */
function showAppPage(pageTitle, pageUrl) {
  /* Create basic elements */

  const syncButton = document.createElement("button");
  syncButton.innerText = "Sync Browser";
  syncButton.setAttribute("id", "synclinks");
  syncButton.classList.add("button");

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
  saveButton.classList.add("button");

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

function Setup() {
  const userEmail = prompt("Enter your email address");
  chrome.storage.local.set({ email: userEmail });
}

function init() {
  chrome.storage.local.get("email", (res) => {
    console.log("init res");
    console.log(res);
    if (res.email === undefined) {
      Setup();
    } else {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let thisPage = tabs[0];
        const url = thisPage.url;
        const title = thisPage.title;
        // console.log(thisPage);
        let container = showAppPage(title, url);
        console.log(container);
        app.appendChild(container);

        /* wanna save the link ? */
        const saveLinkForm = document.getElementById("create-link");

        saveLinkForm.addEventListener("submit", async (e) => {
          e.preventDefault(); // prevent reload
          chrome.storage.local.get("email", async (res) => {
            const titleInput = document.getElementById("title-input");
            const urlInput = document.getElementById("url-input");

            let url = urlInput.value;
            let annotation = titleInput.value;
            const response = await fetch(`${SERVER_URI}/save-link`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: res.email, annotation, url }),
            });

            const result = await response.json();

            log(result);
          });

          /* Sync bookmarks */
          const syncBookmarks = document.getElementById("synclinks");
          syncBookmarks.addEventListener("click", async (_) => {
            chrome.bookmarks.getTree(async (bkms) => {
              await handleBookmarks(bkms);
            });
          });
        });
      });
    }
  });
}
init();

chrome.bookmarks.getTree((bkms) => {
  handleBookmarks(bkms);
});

var everything = [];

async function handleBookmarks(bookmarks_) {
  chrome.storage.local.get("email", async (res) => {
    // Assuming all fetched bookmarks will always be Array(1)
    // We get all bookmark and folders from the browser
    const bookmarks = bookmarks_[0].children;

    parseBookmarks(bookmarks);
    log(everything);

    const response = await fetch(`${SERVER_URI}/sync-bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: res.email, bookmarks }),
    });

    const result = await response.json();

    log(result);
    // log(bookmarksStructures);
  });
}

function parseBookmarks(data) {
  for (item in data) {
    if (data[item].hasOwnProperty("children")) {
      everything.push({ folder: data[item].title });
      parseBookmarks(data[item].children);
    } else {
      everything.push({ bookmark: data[item].title });
    }
  }
}

// LinksBook v2 Chrome Extension
