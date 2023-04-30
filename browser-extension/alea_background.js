chrome.tabs.onUpdated.addListener(
    function (tabId, changeInfo, tab) {
        if (changeInfo.url.match(".*ldjam\.com/games.*")) {
            chrome.scripting.executeScript({
                target: { tabId },
                files: ["alea_content.js"]
            })
        }
        // console.error(tab.url);
        // if (tab.url.match("*://*.ldjam.com/*")) {
        //     chrome.runtime.reload();
        // }
    });