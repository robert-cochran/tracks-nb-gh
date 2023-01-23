import { setCurrentlyPlayingTrack } from './local-storage.js'
import { updateCurrentTrack } from './controller.js'
import { createPlayButton, createDeleteButton } from './element.buttons.js'

export function createTrackRow(title, url, index) {
	const row = createRow(index, title, url, 'false') //tableRow
	
    row.appendChild(createTextDataCell(index)); //rowIndexData
	row.appendChild(createTextDataCell(title)) //rowTitleData
	row.appendChild(createPlayButtonDataCell(title, url, (title != 'Video Title Not Found'))) //rowLoadData
	row.appendChild(createDeleteButtonDataCell(title, url)) //rowDeleteData

	return row;
}

function createRow(index, title, url, active){
    const row = document.createElement('tr')
	row.setAttribute('index', index)
	row.setAttribute('title', title)
	row.setAttribute('url', url)
	row.id = url;
    return row;
}

function createTextDataCell(innerText){
    const dataCell = document.createElement('td')
	dataCell.innerText = innerText;
    return dataCell;
}

function createPlayButtonDataCell(title, url, playableVideo){
    const playButtonDataCell = document.createElement('td')
	playButtonDataCell.appendChild(createPlayButton(title, url, playableVideo))
    return playButtonDataCell
}

function createDeleteButtonDataCell(title, url){
    const deleteButtonDataCell = document.createElement('td')
	deleteButtonDataCell.appendChild(createDeleteButton(title, url));
    return deleteButtonDataCell;
}