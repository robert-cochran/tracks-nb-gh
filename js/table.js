
export function sortTableAlphabetically(tableId) {
	let rows, switching, i, x, y, shouldSwitch;
	const table = document.getElementById(tableId);
	switching = true;
	while (switching) {
		switching = false;
		rows = table.rows;
		/* Loop through all table rows (except the
		first, which contains table headers): */
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[0];
			y = rows[i + 1].getElementsByTagName("TD")[0];
			if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				shouldSwitch = true;
				break; //once a break hits the index i is reset
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}

function alphabeticalCheck(){}

export function sortTableByIndex(tableId) {
	let rows, switching, i, x, y, shouldSwitch;
	const table = document.getElementById(tableId);
	switching = true;
	while (switching) {
		switching = false;
		rows = table.rows;
		/* Loop through all table rows (except the
		first, which contains table headers): */
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getAttribute("index");
			y = rows[i + 1].getAttribute("index");
			if (Number(x) > Number(y)) {
				shouldSwitch = true;
				break; //once a break hits the index i is reset
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}

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