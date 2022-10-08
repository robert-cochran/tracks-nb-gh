// // ------------ runtime.sendNativeMessage ----------------------


// using NativeConnect, runtime.connect, and postMessage
function nativeConnect() {
    https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/connect
    let myPort = browser.runtime.connect();

    myPort.postMessage({greeting: "hello from content script"});

    myPort.onMessage.addListener((responseMessage) => {
        console.log("In content script, received message from background script: ");
        console.log(responseMessage.greeting);
    });

    document.body.addEventListener("click", () => {
        myPort.postMessage({greeting: "they clicked the page!"});
    });
    
    /* On a click on the browser action, send the app a message. */
    browser.browserAction.onClicked.addListener(() => {
        console.log("Sending: ping");
        port.postMessage({greeting: "ping"});
    });
}