import {createLinkElement} from './elements.js';

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
		return createURLRowElem(track.title, track.url, storageDivId);
	}))

	trackRows.map(tableRow => {
		document.getElementById(tableContainerId).appendChild(tableRow)
	})
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