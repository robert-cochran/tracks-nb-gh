import { sortTableAlphabetically, sortTableByIndex } from './table.js';
import { checkVideoPlayableStatus } from './track-player.js';
// import { getPlayableStatus } from './youtube-api.js';

export async function createTrackTable(tracks, tableContainerId, storageDivId){
	const trackRows = await Promise.all(tracks.map(async (track, index) => {
		return createTrackRow(track.title, track.url, storageDivId, index);
	}))

	document.getElementById(tableContainerId).insertAdjacentElement("beforebegin",createSortingButtons("tracksTable"))
	document.getElementById(tableContainerId).insertAdjacentElement("beforebegin",createCheckPlayableVideoButton("tracksTable"))

	trackRows.map(tableRow => {
		document.getElementById(tableContainerId).appendChild(tableRow)
	})
}

function createTrackRow(title, url, storageDivId, index) {
	//storage
	const storageDiv = document.getElementById(storageDivId)

	//button
	const playButtonElem = document.createElement('button')
	playButtonElem.addEventListener("click", () => { 
		//ReactPlayer reads playerContainers attributes to determine what to play
		storageDiv.setAttribute('title', title);
		storageDiv.setAttribute('url', url);
	})
	playButtonElem.innerText = "Play Track"

	//tableRow
	const row = document.createElement('tr')
	row.setAttribute('index', index)
	row.setAttribute('title', title)
	row.setAttribute('url', url)
	// const rowIndex = 
	const rowTitleData = document.createElement('td')
	rowTitleData.innerText = title
	const rowLoadData = document.createElement('td')
	rowLoadData.appendChild(playButtonElem)
	row.appendChild(rowTitleData)
	row.appendChild(rowLoadData)

	return row;
}

export function createCheckPlayableVideoButton(tableId){
	const buttonContainer = document.createElement('div')
	buttonContainer.style.display = "flex"
	buttonContainer.style.justifyContent = "justify-left"

	const buttonCheckPlayableVideos = document.createElement('button')
	buttonCheckPlayableVideos.innerText = "Check Playable Videos"
	buttonCheckPlayableVideos.addEventListener("click", () => {
		crossOutUnplayableVideoRows(tableId);
	})
	buttonContainer.appendChild(buttonCheckPlayableVideos)

	return buttonContainer;
}

//future: make this more general by adding styles to add and rule to apply for specific rows
//right now the function is hyper specific, can make more general in future
function crossOutUnplayableVideoRows(tableId){
	const table = document.getElementById(tableId)
	const rows = table.rows;
	for (let row of rows){
		if(row.title === 'undefined'){
			row.style.color = "red"
		}
		// console.log(row.getAttribute("title"))
		// console.log(row.getAttribute("url"))
		if (!checkVideoPlayableStatus(row.getAttribute("url"))){
			
		}
	}
}

export function createSortingButtons(tableId){
	const buttonContainer = document.createElement('div')
	buttonContainer.style.display = "flex"
	buttonContainer.style.justifyContent = "justify-left"

	const buttonSortByIndex = document.createElement('button')
	buttonSortByIndex.innerText = "Sort By Index"
	buttonSortByIndex.addEventListener("click", () => {
		sortTableByIndex(tableId)
	})
	buttonContainer.appendChild(buttonSortByIndex)

	const buttonSortAlphabetical = document.createElement('button')
	buttonSortAlphabetical.innerText = "Sort Alphabetically"
	buttonSortAlphabetical.addEventListener("click", () => {
		sortTableAlphabetically(tableId)
	})
	buttonContainer.appendChild(buttonSortAlphabetical)

	return buttonContainer;
}