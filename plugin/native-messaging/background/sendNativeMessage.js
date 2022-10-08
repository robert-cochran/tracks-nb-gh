// runtime.sendNativeMessage
function onResponse(response) {
  console.log(`Received ${response}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

/*
On a click on the browser action, send the app a message.
*/
browser.browserAction.onClicked.addListener(() => {
  console.log("Sending:  ping");
  let sending = browser.runtime.sendNativeMessage("tracks", "ping");
  // let sending = browser.runtime.sendMessage(
  // 	extensionId,             // optional string
  // 	message,                 // any
  // 	options                  // optional object (callback)
  // )
  sending.then(onResponse, onError);
  
});

