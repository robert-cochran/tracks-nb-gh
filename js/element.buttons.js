import { Controller } from './controller.js'

export function createButton(innerText, eventFunction, eventFunctionInput, id){
	const button = document.createElement('button')
	button.innerText = innerText
	button.id = id;
	button.addEventListener("click", () => {
		eventFunction(eventFunctionInput)
	})
	return button
}

export function createPlayButton(title, url, playableVideo){
	const playButtonElem = document.createElement('button')
	if (playableVideo){
		playButtonElem.addEventListener("click", () => { 
			Controller.updateCurrentTrack(title, url)
		})
	} else {
		playButtonElem.style.textDecoration = 'line-through'
		playButtonElem.style.opacity = '0.3'
	}
	playButtonElem.innerText = "Play Track"
	return playButtonElem;
}

export function createDeleteButton(title, url){
	const deleteButtonElem = document.createElement('button')
	deleteButtonElem.addEventListener("click", () => { 
		const row = document.getElementById(url)
		const table = row.parentElement;
		table.removeChild(row);
    })
	
	deleteButtonElem.innerText = "\uD83D\uDDD1 Remove" 
	deleteButtonElem.setAttribute('title', 'Remove Track')
	return deleteButtonElem;
}

export function createExportFileButton(innerText){
	const button = document.createElement('button')
	button.id = 'importFileBtn'
	button.innerText = innerText
	button.addEventListener('click', handleExportTracksToFileContents)
	return button
}

function handleExportTracksToFileContents(event){
	const urlArray = Controller.getTracks(); //dirty hack using static method
	const urlString = urlArray.join("\n")
	const file = new File([urlString], "tracks.txt", {type: "text/plain",})
	downloadFile(file)
}

function downloadFile(file) {
	// Create a link and set the URL using `createObjectURL`
	const link = document.createElement("a");
	link.style.display = "none";
	link.href = URL.createObjectURL(file);
	link.download = file.name;
  
	// It needs to be added to the DOM so it can be clicked
	document.body.appendChild(link);
	link.click();
  
	// To make this work on Firefox we need to wait
	// a little while before removing it.
	setTimeout(() => {
		URL.revokeObjectURL(link.href);
		link.parentNode.removeChild(link);
	}, 0);
}

export function createImportFileButton(innerText){
	const input = document.createElement('input');
	input.type = 'file'
	input.id = 'importFileInput'
	input.accept = ".txt"
	input.addEventListener('change', handleReadFileContents)

	const button = document.createElement('button')
	button.id = 'importFileBtn'
	button.innerText = innerText

	button.addEventListener("click", (e) => {
		if (input) { input.click(); } 
	}, false)

	return button
}

function handleReadFileContents(event){
	const file = event.target.files[0]
	const reader = new FileReader();
	reader.readAsText(file)
	//TODO: need to verify file ext is correct apparently since the accept types can be circumvented
	reader.addEventListener("load", async () => {
		const fileContents = reader.result;
		const urlArray = fileContents.split(/\r?\n/);
		localStorage.tracks = urlArray
		// using localStorage could have problems with 
		// limiting size in future if localStorage is full
		const event = new Event("storage");
		event.key = 'tracks'
		window.dispatchEvent( event )
	}, false);
}

export function createImportBookmarkButton(){
	//in order to get this to work I need to know if im running locally or running in public domain
}

export function createExportBookmarkButton(){
	
}


export function createButtonContainer(elementTag, display, justifyContent, id){
	const buttonContainer = document.createElement(elementTag)
	buttonContainer.style.display = display
	buttonContainer.style.justifyContent = justifyContent
	buttonContainer.id = id
	return buttonContainer;
}