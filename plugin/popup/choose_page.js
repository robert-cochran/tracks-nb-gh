document.addEventListener("click", async (event) => {    
    // if (!event.target.classList.contains("page-choice")) {
    //     return;
    // }
  
    // const chosenPage = `https://${event.target.textContent}`;
    // browser.tabs.create({
    //     url: chosenPage,
    // });

    const tabs = await browser.tabs.query({currentWindow: true, active: true})
    const activeUrl = tabs[0].url
    
    var req = new Request("http://127.0.0.1:8080/", {
		method: 'POST',
		mode: 'cors',
		redirect: 'follow',
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		},
        body: `{"url":"${activeUrl}"}`
	});

	const response = await fetch(req);
	const text = await response.text();
    
  

});