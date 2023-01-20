import { createLinkElement } from './links.js';

export class ExternalSitesTable{
	
	constructor(externalSitesContainerId){
		this.externalSitesContainerId = externalSitesContainerId;
		this.externalSitesTableId = 'externalSitesTable'
		this.create(this.externalSitesContainerId, this.externalSitesTableId)
	}

	create(externalSitesContainerId, externalSitesTableId){
		const table = document.createElement('table')
		table.id = externalSitesTableId
		document.getElementById(externalSitesContainerId).appendChild(table)
	}

	populate(externalSitesArray){
		if (externalSitesArray != null && Array.isArray(externalSitesArray)){
			const externalSitesTable = document.getElementById(this.externalSitesTableId);
			externalSitesArray.forEach(externalSiteArray => {
				externalSitesTable.appendChild(createLinkRow(externalSiteArray))
			})
		}	
	}
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
