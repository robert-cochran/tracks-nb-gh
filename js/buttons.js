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
	input.style.display = 'none'; //*hack
	input.addEventListener('change', readFileContents)

	const button = document.createElement('button')
	button.id = 'importFileBtn'
	button.innerText = innerText

	button.addEventListener("click", (e) => {
		if (input) { input.click(); } 
	}, false)

	button.appendChild(input) //*hack
	/**
	 * 	is there a way to do this without appending the input to btn?
	 * 	i.e. how could we pass the File attribute value in input
	 * 	to the model without being able to query select the input elem (returns null)
	 * 
	 * 	recap: its going from view.button to somewhere in model, then back to view.tables
	 * 
	 *	since the event contains the input element, how can the model grab the event once its fired 
	 		there are mutation observers that can notify us when somethings changed, but how could we connect
			that with the unqueryable input elem

			QUESTION: 		can we control where the event gets sent 
				A:				kind of, see the code snippet below
			
		
		recap: 		running elem.click will trigger the click event
					and running elem.dispatchEvent(event) will run a custom event
		recap:		there are event dispatchers and event listeners, is that right
		recap:		events are objects

		and both will run any event listener functions attached?



		https://www.w3docs.com/learn-javascript/dispatching-custom-events.html
		code below to run what looks like a custom event type that can be globally listened for?
			<body>
				<h1 id="elemId">Welcome to W3Docs</h1>
				<script>
				// catch on document
				document.addEventListener("hello", function(event) {
					alert("Hello from " + event.target.tagName); // Hello from H1
				});
				// dispatch on elem
				let event = new Event("hello", {
					bubbles: true
				});
				elemId.dispatchEvent(event);
				// the document handler activates and displays a message
				</script>
			</body>


		QUESTION:		can a class or variable have an event listener?
						is there a way to have something polling for events in the model?
		QUESTION:		in the code above the document is listening for "hello" events, but if it
						was listening for 'click' events would all click events be sent there
						or just ones. what about if document was something not global, 
						what if it was some low html element, would that receive all click events or just
						click events it made?
						my question is, why does the document receive the hello event if dispatch 
						didnt specify it at all, 
		HYPOTHETICAL:	if we dispatched a click event, then surely that wouldnt be received for every element on the page that can run a click event right?
						so there must be some kind of direction or selection process to determine who gets the event from dispatchEvent right?
			QUESTION:		is it the bubbling that is allowing the document to catch the hello event?
							if i dispatched a click event underneath a button would it bubble up and trigger the parent button?

		RECAP:			bubbling. event delegation creates the event in the child node, 
						if theres no event handler for it there it bubbles up 
						once something catches it its done (i think)
						not sure if the event stays alive after being ignored by a parent elem
		
		SOLUTION:		input is appended to child 
						we read the contents of the file into a string array
						we either
							1. 
								save contents into localStorage 
								have an eventlistener in controller to listen for localStorage.newTracks
								have controller update the newTracks in model
							2. 
								keep urlArray in memory
								have an elem in controller
								use dispatchEvent on controllers elemn to send event directly
								have controller update the newTracks in model
						model updates its newTracks value
						creates a new Tracks() object
						send it to view to update the table and the currently playing track
						view runs view.reset() on table (purge and createTrackTable(tracks.getTracks(), 'containerTracksTable'))
	 */	

	return button
}

function readFileContents(event){
	const file = event.target.files[0]
	const reader = new FileReader();
	reader.readAsText(file)
	reader.addEventListener("load", async () => {
		const fileContents = reader.result;
		const urlArray = fileContents.split(/\r?\n/);
		localStorage.tracks = urlArray
		// const event = new CustomEvent('build', { detail: {key: 'tracks'} })
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