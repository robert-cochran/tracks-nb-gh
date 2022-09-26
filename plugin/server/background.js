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
    let sending = browser.runtime.sendNativeMessage(
      "ping_pong",
      "ping");
    sending.then(onResponse, onError);
  });
  