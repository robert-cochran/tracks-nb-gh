// // runtime.sendNativeMessage
function onResponse(response) {
	console.log(`Received ${response}`);
}

function onError(error) {
	console.log(`Error: ${error}`);
}

/* On a click on the browser action, send the app a message. */
browser.browserAction.onClicked.addListener(() => {
	console.log("Sending:  ping");
	let sending = browser.runtime.sendNativeMessage("tracks", "ping");
	// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging
	// let sending = browser.runtime.sendMessage(
	// 	extensionId,             // optional string
	// 	message,                 // any
	// 	options                  // optional object (callback)
	// )
	sending.then(onResponse, onError);
});


function handleMessage(request, sender, sendResponse) {
	console.log(
		`A content script sent a message: \n
		message: ${request.greeting} \n
		url: ${request.url} \n
		sender: ${sender} \n`
	);
	sendResponse({ response: "Response from background script" });

	let sending = browser.runtime.sendNativeMessage("tracks", request.url);

	sending.then(onResponse, onError);
}
  
browser.runtime.onMessage.addListener(handleMessage);
