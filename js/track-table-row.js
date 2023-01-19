import { setCurrentlyPlayingTrack } from './local-storage.js'

// TODO worth implementing?
// class TrackRow{
//     constructor(){}
//     create(){}
// }

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

function createButtonDataCell(innerText, eventFunction){}
function addButton(dataCell, eventFunction){}

function createPlayButtonDataCell(title, url, playableVideo){
    const playButtonDataCell = document.createElement('td')
	const playButtonElem = document.createElement('button')
	if (playableVideo){
		playButtonElem.addEventListener("click", () => { 
			setCurrentlyPlayingTrack(title, url)
		})
	} else {
		playButtonElem.style.textDecoration = 'line-through'
		playButtonElem.style.opacity = '0.3'
	}
	playButtonElem.innerText = "Play Track"
	playButtonDataCell.appendChild(playButtonElem)
    return playButtonDataCell
}

function createDeleteButtonDataCell(title, url){
    const deleteButtonDataCell = document.createElement('td')
	const deleteButtonElem = document.createElement('button')
	deleteButtonElem.addEventListener("click", () => { 
		const row = document.getElementById(url)
		const table = row.parentElement;
		table.removeChild(row);

		//reset index for all rows
			// will probably need a trigger on the table to reset index


		// - [ ] delete track row when user presses delete button
		// 	- need to reset all index's on remove track
		//	- deleting a song that currently playing
		//		if other songs available then move current track to anyhting else
		//		but if its the last rtack then what do?
		//		this will need to either 
		//		- trigger event for table to handle 
		//		-  or call table, find row with url, remove it
    })
	
	deleteButtonElem.innerText = "\uD83D\uDDD1 [TODO]" 
	deleteButtonElem.setAttribute('title', 'Remove Track')
	deleteButtonDataCell.appendChild(deleteButtonElem);
    return deleteButtonDataCell;
}