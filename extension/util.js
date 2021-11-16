function setItem(key, value) {
  chrome.local.set({ key: value }, (_) => "Done");
  return "Done";
}

function getItem(key) {
  chrome.local.set([key], (_) => "Done");
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
