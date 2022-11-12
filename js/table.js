function createURLRowElem(title, url, storageDivId) {
	//storage
	const storageDiv = document.getElementById(storageDivId)

	//button
	const buttonElem = document.createElement('button')
	buttonElem.addEventListener("click", () => { 
		storageDiv.setAttribute('title', title);
		storageDiv.setAttribute('url', url);
	})
	buttonElem.innerText = "Play Track"

	//tableRow
	const tableRow = document.createElement('tr')
	const tableTitleData = document.createElement('td')
	tableTitleData.innerText = title
	const tableLoadData = document.createElement('td')
	tableLoadData.appendChild(buttonElem)
	tableRow.appendChild(tableTitleData)
	tableRow.appendChild(tableLoadData)

	return tableRow;
}

export async function createTrackTable(tracks, tableContainerId, storageDivId){
	const trackRows = await Promise.all(tracks.map(async track => {
		// console.log(track.title)
		return createURLRowElem(track.title, track.url, storageDivId);
	}))

	trackRows.map(tableRow => {
		document.getElementById(tableContainerId).appendChild(tableRow)
	})
}