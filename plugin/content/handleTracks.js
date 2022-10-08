// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#communicating_with_background_scripts
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage

function onResponse(response) {
	console.log(`Content Received ${JSON.stringify(response)}`);
}

function onError(error) {
	console.log(`Background Error: ${error}`);
}

// ---------- runtime.sendMessage --------------------

async function getActiveTabURL(){
    let tab = await browser.tabs.query({currentWindow: true, active: true})
    let activeTabUrl = tab[0].url
    return activeTabUrl
}

async function sendPingToBackground(){
    let sending = browser.runtime.sendMessage({"url":"ping"})
    sending.then(onResponse, onError);
}

async function sendMessageToBackground(event){
    let activeTabURL = await getActiveTabURL()
    let sending = browser.runtime.sendMessage({"url": activeTabURL})
    sending.then(onResponse, onError);
}

document.getElementById("ping").addEventListener("click", sendPingToBackground);
document.getElementById("local-tracks-endpoint").addEventListener("click", sendMessageToBackground);
document.getElementById("local-tracks-endpoint-close").addEventListener("click", sendMessageToBackground);







    

