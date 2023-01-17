import { sortTableAlphabetically, sortTableByIndex, exportTracksToUrlArray, appendRowsToTable } from './table.js';
import { isVideoPlayable } from './track-player.js';
import { importTracksFromBookmark, exportTracksToBookmark } from './bookmarks.js';
import { importTracksFromLocalStorage, saveAllTracksToLocalStorage, saveToLocalStorage, saveCurrentTrackToLocalStorage, saveAllTracksToLocalStorage } from './local-storage.js';
import { importTracksFromFile, exportTracksToFile } from './file-system.js';
import { createButton, createButtonContainer } from './elements/buttons.js';
import { createInputElement } from './elements/input.js';
// import { getPlayableStatus } from './youtube-api.js';

export async function createTrackTable(tracks, tableContainerId){ 
	const trackRows = await Promise.all(tracks.map(async (track, index) => {
		return createTrackRow(track.title, track.url, index); 
	}))

	const localStorageTracksKey = "tracks";

	const tableContainer = document.getElementById(tableContainerId);
	tableContainer.insertAdjacentElement("beforebegin", createSortingButtons(localStorageTracksKey));
	tableContainer.insertAdjacentElement("beforebegin", createCheckPlayableVideosButton(localStorageTracksKey));
	tableContainer.insertAdjacentElement("beforebegin", createImportTracksButtons(localStorageTracksKey));
	tableContainer.insertAdjacentElement("beforebegin", createExportTracksButtons(localStorageTracksKey));

	appendRowsToTable(trackRows)	
}

function createTrackRow(title, url, index) {
	//tableRow
	const row = document.createElement('tr')
	row.setAttribute('index', index)
	row.setAttribute('title', title)
	row.setAttribute('url', url)
	row.setAttribute('active', 'false')

	//button
	const playButtonElem = document.createElement('button')
	playButtonElem.addEventListener("click", () => { 
		//ReactPlayer reads localStorage event triggers to determine what to play
		saveCurrentTrackToLocalStorage(title, url);

		document.querySelector("tr[active='true']")?.setAttribute('active', 'false')
		document.querySelector(`tr[url='${url}']`).setAttribute('active', 'true')
	})
	playButtonElem.innerText = "Play Track"

	// const rowIndex = 
	const rowTitleData = document.createElement('td')
	rowTitleData.innerText = title
	const rowLoadData = document.createElement('td')
	rowLoadData.appendChild(playButtonElem)
	row.appendChild(rowTitleData)
	row.appendChild(rowLoadData)

	return row;
}

function removeActiveAttribute(url){
	const activeTrackDiv = document.querySelectorAll(`[title=${url}]`);
}

function setActiveAttribute(url){

}

export function createCheckPlayableVideosButton(tableId){
	const buttonContainer = createButtonContainer("div", "flex", "justify-left")
	buttonContainer.appendChild(createButton("Check Playable Videos", crossOutUnplayableVideoRows, tableId))
	return buttonContainer;
}

//future: make this more general by adding styles to add and rule to apply for specific rows
//right now the function is hyper specific, can make more general in future
function crossOutUnplayableVideoRows(tableId){
	const table = document.getElementById(tableId)
	const rows = table.rows;
	for (let row of rows){
		console.log(row)
		if (!isVideoPlayable(row.getAttribute("url"))){
			// row.style.color = "grey"
			// row.style.textDecoration = "line-through"
		}
	}
}

export function createSortingButtons(tableId){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left');
	buttonContainer.appendChild(createButton("Sort By Index", sortTableByIndex, tableId))
	buttonContainer.appendChild(createButton("Sort Alphabetically", sortTableAlphabetically, tableId))
	return buttonContainer;
}


export function createImportTracksButtons(storageKey){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left');
	buttonContainer.appendChild(createButton("Load Previous Session from Local Storage [BROKEN]", importTracksFromLocalStorage, storageKey))
	buttonContainer.appendChild(createButton("Load Tracks from Bookmark [BROKEN]", importTracksFromBookmark, storageKey))
	buttonContainer.appendChild(createButton("Load Tracks from File [BROKEN]", importTracksFromFile, storageKey))
	buttonContainer.appendChild(createButton("Load Tracks from URL [BROKEN]", importTracksFromUrlFetch, storageKey))
	buttonContainer.appendChild(createInputElement('text', 'inputFetchTracks'))
	buttonContainer.appendChild(createButton("Add Track URL [BROKEN]", addTrackFromInput, storageKey))
	buttonContainer.appendChild(createInputElement('text', 'inputAddTrack'))
	
	return buttonContainer;
}

export function createExportTracksButtons(storageKey){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left');
	buttonContainer.appendChild(createButton("Save Tracks in Local Storage [BROKEN]", saveAllTracksToLocalStorage, storageKey))
	buttonContainer.appendChild(createButton("Save Tracks to Bookmark [BROKEN]", exportTracksToBookmark, storageKey))
	buttonContainer.appendChild(createButton("Save Tracks to File [BROKEN]", exportTracksToFile, storageKey))
	return buttonContainer;
}

function importTracksFromUrlFetch(tableId){
	console.log("to be written")
}

function addTrackFromInput(inputUrl){
	saveToLocalStorage(localStorageTracksKey, exportTracksToUrlArray(tableContainerId))
}