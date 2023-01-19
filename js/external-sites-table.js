import { createLinkElement } from './links.js';

export function createExternalSitesTable(containerElementId, externalSitesArray){
	const tableContainerDiv = document.getElementById(containerElementId);
	externalSitesArray.forEach(externalSiteArray => {
		tableContainerDiv.appendChild(createLinkRow(externalSiteArray))
	})
}


function createLinkRow(rowContents){
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
