import { appendRowsToTable } from './table.js';
import { createTrackRow } from './trackTable.row.js';
import { resetTableRowIndexs, createRowHeader } from './table.js';
import { setCurrentlyPlayingTrack } from './localStorage.js';

export class TrackTable {

	constructor(controller){
		this.controller = controller;
		this.tracksLocalStorageKey = "tracks";
		this.trackTableId = 'trackTable'
		this.trackTableElem = null;
	}

	create(){
		this.trackTableElem = this.createEmptyTracksTable(this.trackTableId)
		return this.trackTableElem
	}

	createEmptyTracksTable(tableId){
		const table = document.createElement('table');
		table.id = tableId;
		
		const config = { attributes: false, childList: true, subtree: true };
		const observer = new MutationObserver(tracksTableChangeCallback);
		observer.observe(table, config);
	
		table.appendChild(createRowHeader(['Index', 'Track', 'Play', 'Remove']))
		return table;
	}

	async populate(tracksArray){
		this.deleteTable(this.trackTableElem)
		const trackRows = await Promise.all(tracksArray.map(async (track, index) => {
			return createTrackRow(track.title, track.url, index+1); 
		}))
		trackRows.forEach(trackRow => { this.trackTableElem.append(trackRow) })
	}

	deleteTable(tableElem){
		tableElem.innerHTML = '';
	}
}


const tracksTableChangeCallback = (mutationList) => {
//https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#example
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
	}
};


