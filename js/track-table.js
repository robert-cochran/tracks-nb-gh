import { appendRowsToTable } from './table.js';
import { createTrackRow } from './track-table-row.js';
import { resetTableRowIndexs } from './table.js';
import { createTableOptions } from './track-table-options.js';
import { setCurrentlyPlayingTrack } from './local-storage.js';

// export class TracksTable{
// 	constructor(initialTracks, tableContainerId){
// 		this.initialTracks = initialTracks
// 		this.tableContainerId = tableContainerId
// 		createTrackTable(this.initialTracks, )
// 	}
// }

export async function createTrackTable(tracks, tableContainerElemId){ 
	const trackRows = await Promise.all(tracks.map(async (track, index) => {
		return createTrackRow(track.title, track.url, index+1); 
	}))

	const tracksLocalStorageKey = "tracks";
	const tracksTableId = 'tracksTable'
	const tableContainer = document.getElementById(tableContainerElemId);
	tableContainer.appendChild(createTableOptions(tracksLocalStorageKey, tracksTableId))
	tableContainer.appendChild(createTracksTable(tracksTableId))

	appendRowsToTable(trackRows, tracksTableId)	
}

function createTracksTable(tableId){
	const table = document.createElement('table');
	table.id = tableId;
	
	const config = { attributes: false, childList: true, subtree: true };
	const observer = new MutationObserver(tracksTableDOMChangeCallback);
	observer.observe(table, config);

	table.appendChild(createRowHeader(['Index', 'Track', 'Play', 'Remove']))
	return table;
}

const tracksTableDOMChangeCallback = (mutationList) => {
	for (const mutation of mutationList) {
		if (mutation.type === 'childList' 
					&& mutation.removedNodes.length > 0
					&& mutation.target.tagName==="TABLE") {
			
			resetTableRowIndexs(mutation.target.id)
			// TODO use mutation.nextSibling and mutation.previousSibling to 
			// change the video to another in the list, 
			// remember to check if its the first, last or only element in the list
			setCurrentlyPlayingTrack('', '')
		} 

		else if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
			// console.log(`${mutation.addedNodes[0].id} child node added.`);
		} 
		// else if (mutation.type === 'attributes') {}
	}
};


function createRowHeader(headers){
	const rowHeader = document.createElement('tr')
	headers.forEach(headerText => {
		const header = document.createElement('th')
		header.innerText = headerText
		rowHeader.appendChild(header)
	})
    return rowHeader;
}