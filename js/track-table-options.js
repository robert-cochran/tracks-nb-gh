import { sortTableAlphabetically, sortTableByIndex} from './table-sort.js' 
import { exportTracksToUrlArray } from './table.js';
import { isVideoPlayable } from './track-player.js';
import { importTracksFromBookmark, exportTracksToBookmark } from './bookmarks.js';
import { importTracksFromFile, exportTracksToFile } from './file-system.js';
import { createButton, createButtonContainer, createImportFileButton, createExportFileButton } from './element.buttons.js';
import { createInputElement } from './element.input.js';
import { createTrackRow } from './track-table-row.js';
import { getYoutubeVideoTitle } from './youtube-api.js';

export function createTableOptions(tracksLocalStorageKey, tracksTableId){
	const tableOptionsContainer = document.createElement('div');
	tableOptionsContainer.id = 'tracksTableOptions'
	tableOptionsContainer.appendChild(createSortingButtons(tracksTableId));
	tableOptionsContainer.appendChild(createCheckPlayableVideosButton(tracksTableId));
	tableOptionsContainer.appendChild(createImportTracksButtons(tracksLocalStorageKey));
	tableOptionsContainer.appendChild(createExportTracksButtons(tracksLocalStorageKey));
	tableOptionsContainer.appendChild(createAddTrackButton(tracksTableId));
	return tableOptionsContainer;
}


function createSortingButtons(tableId){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left', 'sortingButtonsContainer');
	buttonContainer.appendChild(createButton("Sort By Index [Possibly broken]", sortTableByIndex, tableId, 'sortIndexBtn'))
	buttonContainer.appendChild(createButton("Sort Alphabetically [Broken]", sortTableAlphabetically, tableId, 'sortAlphabeticalBtn'))
	return buttonContainer;
}

function createImportTracksButtons(storageKey){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left', 'importTracksButtonsContainer');
	buttonContainer.appendChild(createImportFileButton("Load Tracks from Txt File")) //, importTracksFromFile, storageKey, 'loadTracksFileBtn')
	// buttonContainer.appendChild(createButton("Load Previous Session from Local Storage [TODO]", importTracksFromLocalStorage, storageKey, 'loadSessionLocalStorageBtn'))
	//it should automatically load tracks from localStorage if localStorage has any thing in localStorage.tracks in it
	//otherwise load default
	buttonContainer.appendChild(createButton("Load Tracks from Bookmark [TODO]", importTracksFromBookmark, storageKey, 'loadTracksBookmarkBtn'))
	// buttonContainer.appendChild(createButton("Load Tracks from URL [TODO]", importTracksFromUrlFetch, storageKey, 'loadTracksUrlBtn'))
	// buttonContainer.appendChild(createInputElement('text', 'inputFetchTracks'))
	// buttonContainer.appendChild(createButton("Sync Tracks Externally [TODO][EXPERIMENTAL]", importTracksFromUrlFetch, storageKey, 'syncTracksExternalBtn'))
	return buttonContainer;
}

function createExportTracksButtons(storageKey){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left', 'exportTracksButtonsContainer');
	buttonContainer.appendChild(createExportFileButton("Save Tracks to Txt File [TODO]", exportTracksToFile, storageKey, 'saveTracksFileBtn'))
	// buttonContainer.appendChild(createButton("Save Tracks in Local Storage [TODO]", saveTracksArrayToLocalStorage, storageKey, 'saveTracksLocalStorageBtn'))
	buttonContainer.appendChild(createButton("Save Tracks to Bookmark [TODO]", exportTracksToBookmark, storageKey, 'saveTracksBookmarkBtn'))
	return buttonContainer;
}

function createAddTrackButton(tableElemId){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left', 'addTrackButtonContainer');
	const addTrackUrlBtnId = 'addTrackUrlBtn'
	buttonContainer.appendChild(createButton("Add Track URL [TODO]", addTrackFromTextInput, tableElemId, addTrackUrlBtnId)) 
	buttonContainer.appendChild(createInputElement('text', 'inputAddTrack'))
	return buttonContainer;
}

function importTracksFromUrlFetch(tableElemId){
	console.log("to be written")
}

async function addTrackFromTextInput(tableElemId){
	// TODO: check the text is a valid youtube url
	const trackUrl = document.getElementById('inputAddTrack').value;
	if (trackUrl == null || trackUrl === "") {return;}
	const tracksTable = document.getElementById(tableElemId);
	const title = await getYoutubeVideoTitle(trackUrl); //if title === undefined title = 'Video Title Not Found'
	const index = tracksTable.childElementCount; 

	//check if url already exists in list, if so, dont add
	if (!isUrlInTable(tableElemId, trackUrl)){
		tracksTable.appendChild(createTrackRow(title, trackUrl, index));
	}
}

function isUrlInTable(tableElemId, url){
	const tracks = exportTracksToUrlArray(tableElemId);
	return tracks.includes(url)
}

export function createCheckPlayableVideosButton(tableId){
	const buttonContainer = createButtonContainer("div", "flex", "justify-left", 'checkPlayableVideosButtonsContainer')
	buttonContainer.appendChild(createButton("Check Playable Videos [TODO]", crossOutUnplayableVideoRows, tableId, "checkPlayableVideoBtn"))
	return buttonContainer;
}

function crossOutUnplayableVideoRows(tableId){
	//future: make this more general by adding 
	//  styles to add and rule to apply for specific rows
	//  right now the function is hyper specific, 
	//	can make more general in future
	
	// const table = document.getElementById(tableId)
	// const rows = table.rows;
	// for (let row of rows){
	// 	console.log(row)
	// 	if (!isVideoPlayable(row.getAttribute("url"))){
	// 		// row.style.color = "grey"
	// 		// row.style.textDecoration = "line-through"
	// 	}
	// }
}