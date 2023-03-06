export function exportTracksToElementArray(tableId){
	const trackTable = document.getElementById(tableId);
	const trackRows = [...trackTable.getElementsByTagName('tr')];
	trackRows.shift();
	return trackRows;
}

export function exportTracksToUrlArray(tableId){
	const urls = exportTracksToElementArray(tableId)
		.map(htmlTrackElem => {
			return htmlTrackElem.getAttribute("url")
		})
	return urls;
}

export function appendRowsToTable(rows, tableId){
	rows.map(row => {
		document.getElementById(tableId).appendChild(row)
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

export function createRowHeader(headers){
	const rowHeader = document.createElement('tr')
	headers.forEach(headerText => {
		const header = document.createElement('th')
		header.innerText = headerText
		rowHeader.appendChild(header)
	})
    return rowHeader;
}