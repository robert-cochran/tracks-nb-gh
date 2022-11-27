import { createLinkRow } from './table.js';

export function createExternalSitesTable(containerElementId, externalSitesArray){
	const tableContainerDiv = document.getElementById(containerElementId);
	externalSitesArray.forEach(externalSiteArray => {
		tableContainerDiv.appendChild(createLinkRow(externalSiteArray))
	})
}



