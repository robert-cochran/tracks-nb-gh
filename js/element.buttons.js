// import { createTrackTable } from './track-table.js'
// import { createTracksFromArray } from './tracks.js';

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
			updateCurrentTrack(title, url)
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

		//reset index for all rows
			// will probably need a trigger on the table to reset index


		//	- deleting a song that currently playing
		//		if other songs available then move current track to anyhting else
		//		but if its the last rtack then what do?
		//		this will need to either 
		//		- trigger event for table to handle 
		//		-  or call table, find row with url, remove it
    })
	
	deleteButtonElem.innerText = "\uD83D\uDDD1 Remove" 
	deleteButtonElem.setAttribute('title', 'Remove Track')
	return deleteButtonElem;
}


/**
 * Files links
 * 		Working with files Mozilla https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Working_with_files
 * 		Using files from web applications https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
 * 		
 * 		import file https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#getting_information_on_selected_files
 * 		input type="file" api https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
 * 		
 * 		create file https://developer.mozilla.org/en-US/docs/Web/API/File/File
 * 		file interface https://developer.mozilla.org/en-US/docs/Web/API/File
 * 
 * 		TODO: 	//need to verify file ext is correct apparently since the accept types can be circumvented
 */
 export function createExportFileButton(innerText){
	//need some way to get the read the data in, either its passed in to the button event(?)
	//or the event process can trigger an export event on the table to collect all the tracks in the table
	//and export them to controller, then to model, then to local storage (or just local storage?)

	//then we read from localStorage (or controller from model from localStorage, whatever)
	const button = document.createElement('button')
	button.id = 'importFileBtn'
	button.innerText = innerText
	button.addEventListener('click', handleExportTracksToFileContents)
	
	return button
}

function handleExportTracksToFileContents(event){
	const tracksArray = ['TODO'];
	const file = new File(tracksArray, "tracks.txt", {type: "text/plain",})
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


export function createButtonContainer(elementTag, display, justifyContent, id){
	const buttonContainer = document.createElement(elementTag)
	buttonContainer.style.display = display
	buttonContainer.style.justifyContent = justifyContent
	buttonContainer.id = id
	return buttonContainer;
}