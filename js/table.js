import {createLinkElement} from './elements.js';

export async function createTrackTable(tracks, tableContainerId, storageDivId){
	const trackRows = await Promise.all(tracks.map(async (track, index) => {
		return createURLRowElem(track.title, track.url, storageDivId, index);
	}))

	document.getElementById(tableContainerId).insertAdjacentElement("beforebegin",createSortingButtons("tracksTable"))

	trackRows.map(tableRow => {
		document.getElementById(tableContainerId).appendChild(tableRow)
	})
}

function createURLRowElem(title, url, storageDivId, index) {
	//storage
	const storageDiv = document.getElementById(storageDivId)

	//button
	const buttonElem = document.createElement('button')
	buttonElem.addEventListener("click", () => { 
		//ReactPlayer reads playerContainers attributes to determine what to play
		storageDiv.setAttribute('title', title);
		storageDiv.setAttribute('url', url);
	})
	buttonElem.innerText = "Play Track"

	//tableRow
	const row = document.createElement('tr')
	row.setAttribute('index', index)
	// const rowIndex = 
	const rowTitleData = document.createElement('td')
	rowTitleData.innerText = title
	const rowLoadData = document.createElement('td')
	rowLoadData.appendChild(buttonElem)
	row.appendChild(rowTitleData)
	row.appendChild(rowLoadData)

	return row;
}



export function createLinkRow(rowContents){
	const allNames = rowContents.filter((v,i) => !(i%2))
	const externalSiteName = allNames.shift();
	const allLinks = rowContents.filter((v,i) => i%2)
	const externalSiteLink = allLinks.shift();

	const row = document.createElement("tr");
	row.appendChild(createLinkElement(externalSiteName, externalSiteLink))
	allNames.forEach((affiliatedSiteName, index) => {
		row.insertAdjacentText("beforeend", " - ");
		row.appendChild(createLinkElement(affiliatedSiteName, allLinks[index]))
	})
	return row;
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

function sortTableAlphabetically(tableId) {
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

function sortTableByIndex(tableId) {
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