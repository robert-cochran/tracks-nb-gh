import { sortTableAlphabetically, sortTableByIndex } from './table.js';
import { isVideoPlayable } from './track-player.js';
import { importTracksFromBookmark, exportTracksToBookmark } from './bookmarks.js';
import { importTracksFromLocalStorage, exportLocalStorageToFile, saveToLocalStorage } from './local-storage.js';
import { importTracksFromFile, exportTracksToFile } from './file-system-interface.js';
import { createButton, createButtonContainer } from './elements/buttons.js';
// import { getPlayableStatus } from './youtube-api.js';

export async function createTrackTable(tracks, tableContainerId, storageDivId){
	const trackRows = await Promise.all(tracks.map(async (track, index) => {
		saveToLocalStorage(index, track.url)
		return createTrackRow(track.title, track.url, storageDivId, index);
	}))

	document.getElementById(tableContainerId)
		.insertAdjacentElement("beforebegin", createSortingButtons("tracksTable"));
	
	document.getElementById(tableContainerId)
		.insertAdjacentElement("beforebegin", createCheckPlayableVideosButton("tracksTable"));
	
	document.getElementById(tableContainerId)
		.insertAdjacentElement("beforebegin", createImportTracksButtons("tracksTable"));
	
	document.getElementById(tableContainerId)
		.insertAdjacentElement("beforebegin", createExportTracksButtons("tracksTable"));

	trackRows.map(tableRow => {
		document.getElementById(tableContainerId).appendChild(tableRow)
	})

	saveToLocalStorage('tracks', exportTracksToUrlArray(tableContainerId))
}

function createTrackRow(title, url, storageDivId, index) {
	//storage
	const storageDiv = document.getElementById(storageDivId)

	//tableRow
	const row = document.createElement('tr')
	row.setAttribute('index', index)
	row.setAttribute('title', title)
	row.setAttribute('url', url)
	row.setAttribute('active', 'false')

	//button
	const playButtonElem = document.createElement('button')
	playButtonElem.addEventListener("click", () => { 
		//ReactPlayer reads playerContainers attributes to determine what to play
		storageDiv.setAttribute('currentTrackTitle', title);
		storageDiv.setAttribute('currentTrackUrl', url);
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


export function createImportTracksButtons(tableId){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left');
	buttonContainer.appendChild(createButton("Load Tracks from Local Storage", importTracksFromLocalStorage, tableId))
	buttonContainer.appendChild(createButton("Load Tracks from Bookmark", importTracksFromBookmark, tableId))
	buttonContainer.appendChild(createButton("Load Tracks from File", importTracksFromFile, tableId))
	buttonContainer.appendChild(createButton("Load Tracks from URL", importTracksFromUrlFetch, tableId))
	return buttonContainer;
}

export function createExportTracksButtons(tableId){
	const buttonContainer = createButtonContainer('div', 'flex', 'jusify-left');
	buttonContainer.appendChild(createButton("Save Tracks in Local Storage to File", exportLocalStorageToFile, exportTracksToElementArray(tableId)))
	buttonContainer.appendChild(createButton("Save Tracks to Bookmark", exportTracksToBookmark, exportTracksToElementArray(tableId)))
	buttonContainer.appendChild(createButton("Save Tracks to File", exportTracksToFile, exportTracksToElementArray(tableId)))
	return buttonContainer;
}

function importTracksFromUrlFetch(tableId){
	console.log("to be written")
}

function exportTracksToElementArray(tableId){
	const tracksTable = document.getElementById(tableId);
	const trackRows = [...tracksTable.getElementsByTagName('tr')];
	trackRows.shift();
	return trackRows;
}

function exportTracksToUrlArray(tableId){
	const tracksTable = document.getElementById(tableId);
	const trackRows = [...tracksTable.getElementsByTagName('tr')];
	trackRows.shift();
	const urls = trackRows.map(htmlTrackElem => {
		return htmlTrackElem.getAttribute("url")
	})
	return urls;
}