// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#communicating_with_background_scripts

function onResponse(response) {
	console.log(`Received ${response}`);
}

function onError(error) {
	console.log(`Error: ${error}`);
}

// ---------- runtime.sendMessage --------------------

async function getActiveTabURL(){
    let tab = await browser.tabs.query({currentWindow: true, active: true})
    let activeTabUrl = tab[0].url
    return activeTabUrl
}

async function sendMessageToBackground(event){
    let activeTabURL = await getActiveTabURL()
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage
    let sending = browser.runtime.sendMessage(
        {
            "greeting": event.target.href,
            "url": activeTabURL
        }
    )
    sending.then(onResponse, onError);
}



document.getElementById("pingpongid").addEventListener("click", sendMessageToBackground);


// // // ------------ runtime.sendNativeMessage ----------------------


// // using NativeConnect, runtime.connect, and postMessage
// function nativeConnect() {
    //https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/connect
//     let myPort = browser.runtime.connect();

//     myPort.postMessage({greeting: "hello from content script"});

//     myPort.onMessage.addListener((responseMessage) => {
//         console.log("In content script, received message from background script: ");
//         console.log(responseMessage.greeting);
//     });

//     document.body.addEventListener("click", () => {
//         myPort.postMessage({greeting: "they clicked the page!"});
//     });
    
//     /* On a click on the browser action, send the app a message. */
//     browser.browserAction.onClicked.addListener(() => {
//         console.log("Sending: ping");
//         port.postMessage({greeting: "ping"});
//     });
// }




    

