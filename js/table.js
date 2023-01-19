export function exportTracksToElementArray(tableId){
	const tracksTable = document.getElementById(tableId);
	const trackRows = [...tracksTable.getElementsByTagName('tr')];
	trackRows.shift();
	return trackRows;
}

export function exportTracksToUrlArray(tableId){
	const tracksTable = document.getElementById(tableId);
	const trackRows = [...tracksTable.getElementsByTagName('tr')];
	trackRows.shift();
	const urls = trackRows.map(htmlTrackElem => {
		return htmlTrackElem.getAttribute("url")
	})
	return urls;
}

export function appendRowsToTable(rows, table){
	rows.map(row => {
		document.getElementById(table).appendChild(row)
	})
}

export function resetTableRowIndexs(tableId){
	const table = document.getElementById(tableId)
	table.childNodes.forEach((trackRowNode, index) => {
		if (index!=0){
			trackRowNode.setAttribute('index', index)
			trackRowNode.firstElementChild.innerText = index
		}
	})
	
}