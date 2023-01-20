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
export function createExportFileButton(){
	
	
}

export function createImportFileButton(innerText){
	const input = document.createElement('input');
	input.type = 'file'
	input.id = 'importFileInput'
	input.accept = ".txt"
	input.addEventListener('change', readFileContents)

	const button = document.createElement('button')
	button.id = 'importFileBtn'
	button.innerText = innerText

	button.addEventListener("click", (e) => {
		console.log("button")
		console.log(button)
		console.log("event")
		console.log(e)
		console.log("input elem")
		console.log(input)
		if (input) { input.click(); } //if orphan input exists, trigger its event?
	}, false)

	return button
}

function readFileContents(event){
	console.log(event)
	const file = event.target.files[0]
	const reader = new FileReader();
	reader.readAsText(file)
	reader.addEventListener("load", async () => {
		
		// const tracks = await createTracksFromArray(reader.result);
		// // console.log(tracks)
		// document.getElementById('containerTracksTable').innerHTML = ''
		// createTrackTable(tracks.getTracks(), 'containerTracksTable') 
		//THIS IS PURELY TO SEE IF IT WILL WORK, THIS IS A BAD DUMN SOLUTION

	}, false);


	// so where to send the data now, to localStorage?
		// then have an event monitor a change for that attribute?
	// or call trackTable creation from here?
		//that seems like its going to cause a mess since I have no idea what is calling what

	// easiest way would be to destroy the current tracksTable and make a new one
	// which only requires an array of Tracks objects
	// const tracks = await createTracks(config.defaultTracksFilePath);
	// createTrackTable(tracks.getTracks(), config.tracksTableContainerElemId) //THIS WILL RECREATE OPTIONS, does that matter?
	
}



export function createButtonContainer(elementTag, display, justifyContent, id){
	const buttonContainer = document.createElement(elementTag)
	buttonContainer.style.display = display
	buttonContainer.style.justifyContent = justifyContent
	buttonContainer.id = id
	return buttonContainer;
}