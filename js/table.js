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