import { sortTableAlphabetically, sortTableByIndex} from './table-sort.js' 
import { exportTracksToUrlArray, appendRowsToTable } from './table.js';
import { isVideoPlayable } from './track-player.js';
import { importTracksFromBookmark, exportTracksToBookmark } from './bookmarks.js';
import { importTracksFromLocalStorage, saveTracksArrayToLocalStorage } from './local-storage.js';
import { importTracksFromFile, exportTracksToFile } from './file-system.js';
import { createButton, createButtonContainer } from './buttons.js';
import { createInputElement } from './input.js';
import { createTrackRow } from './track-table-row.js';
import { getYoutubeVideoTitle } from './youtube-api.js';

// import { getPlayableStatus } from './youtube-api.js';

// export class TracksTable{
// 	constructor(initialTracks, tableContainerId){
// 		this.initialTracks = initialTracks
// 		this.tableContainerId = tableContainerId
// 		createTrackTable(this.initialTracks, )
// 	}
// }

export async function createTrackTable(tracks, tableElemId){ 
	const trackRows = await Promise.all(tracks.map(async (track, index) => {
		return createTrackRow(track.title, track.url, index+1); 
	}))

	const tracksLocalStorageKey = "tracks";

	const tableContainer = document.getElementById(tableElemId);
	tableContainer.insertAdjacentElement("beforebegin", createSortingButtons(tracksLocalStorageKey));
	tableContainer.insertAdjacentElement("beforebegin", createCheckPlayableVideosButton(tracksLocalStorageKey));
	tableContainer.insertAdjacentElement("beforebegin", createImportTracksButtons(tracksLocalStorageKey));
	tableContainer.insertAdjacentElement("beforebegin", createExportTracksButtons(tracksLocalStorageKey));
	tableContainer.insertAdjacentElement("beforebegin", createAddTrackButton(tableElemId));

	appendRowsToTable(trackRows, tableElemId)	
}

function removeTrackRow(tableId, url, index){
	//not sure which one to use yet, probably just url

	// on event this
}

export function createCheckPlayableVideosButton(tableId){
	const buttonContainer = createButtonContainer("div", "flex", "justify-left", 'checkPlayableVideosButtonsContainer')
	buttonContainer.appendChild(createButton("Check Playable Videos [TODO]", crossOutUnplayableVideoRows, tableId))
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

export function createSortingButtons(tableId, containerId){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left', 'sortingButtonsContainer');
	buttonContainer.appendChild(createButton("Sort By Index", sortTableByIndex, tableId, 'sortIndexBtn'))
	buttonContainer.appendChild(createButton("Sort Alphabetically", sortTableAlphabetically, tableId, 'sortAlphabeticalBtn'))
	return buttonContainer;
}

export function createImportTracksButtons(storageKey){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left', 'importTracksButtonsContainer');
	buttonContainer.appendChild(createButton("Load Previous Session from Local Storage [TODO]", importTracksFromLocalStorage, storageKey, 'loadSessionLocalStorageBtn'))
	buttonContainer.appendChild(createButton("Load Tracks from Bookmark [TODO]", importTracksFromBookmark, storageKey, 'loadTracksBookmarkBtn'))
	buttonContainer.appendChild(createButton("Load Tracks from Txt File [TODO]", importTracksFromFile, storageKey, 'loadTracksTxtFileBtn'))
	buttonContainer.appendChild(createButton("Load Tracks from Json File [TODO]", importTracksFromFile, storageKey, 'loadTracksJsonFileBtn'))
	buttonContainer.appendChild(createButton("Load Tracks from URL [TODO]", importTracksFromUrlFetch, storageKey, 'loadTracksUrlBtn'))
	buttonContainer.appendChild(createInputElement('text', 'inputFetchTracks'))
	return buttonContainer;
}

export function createExportTracksButtons(storageKey){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left', 'exportTracksButtonsContainer');
	buttonContainer.appendChild(createButton("Save Tracks in Local Storage [TODO]", saveTracksArrayToLocalStorage, storageKey, 'saveTracksLocalStorageBtn'))
	buttonContainer.appendChild(createButton("Save Tracks to Bookmark [TODO]", exportTracksToBookmark, storageKey, 'saveTracksBookmarkBtn'))
	buttonContainer.appendChild(createButton("Save Tracks to File [TODO]", exportTracksToFile, storageKey, 'saveTracksFileBtn'))
	return buttonContainer;
}

export function createAddTrackButton(tableElemId){
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
	const tracksTable = document.getElementById(tableElemId);
	const title = await getYoutubeVideoTitle(trackUrl); //if title === undefined title = 'Video Title Not Found'
	const url = trackUrl;
	const index = tracksTable.childElementCount; 

	//check if url already exists in list, if so, dont add
	if (!checkForUrlInTable(tableElemId, url)){
		tracksTable.appendChild(createTrackRow(title, url, index));
	}
}

function checkForUrlInTable(tableElemId, url){
	const tracks = exportTracksToUrlArray(tableElemId);
	return tracks.includes(url)
}