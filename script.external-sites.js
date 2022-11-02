//reads file
//returns an array of string lines
async function readLinesFromFile(filePath) {
	const response = await fetch(filePath)
	const unparsedData = await response.text();
	const lines = unparsedData.split(/\r?\n/);
	return lines
}


//takes in array of strings
//converts each string into an array indexed by the || delimiter
function parseStringByDelimiter(linesArray) {
	const externalSitesArray = linesArray.map(line => {
		return line.split("||");
	})
	return externalSitesArray;
}

function createExternalSitesTable(containerElementId, externalSitesArray){
	tableContainerDiv = document.getElementById(containerElementId);
	externalSitesArray.forEach(externalSiteArray => {
		this.tableContainerDiv.appendChild(createLinkRow(externalSiteArray))
	})
}

function createLinkRow(namesAndLinks){
	row = document.createElement("tr");
	spacer = document.createElement("p");
	spacer.innerText = " - ";
	let i = 1;
	while(i < namesAndLinks.length){
		if(i>1){
			row.insertAdjacentText("beforeend", " - ");
		}
		row.appendChild(createLinkElement(namesAndLinks[i-1], namesAndLinks[i]))
		row.append
		//TODO append the '-' character between 'a' tags
		i+=2
		//TODO end with a <br>
	}
	return row;
}

function createLinkElement(name, link) {
	aTag = document.createElement("a")
	aTag.innerText = name
	aTag.href = link
	return aTag;
}



async function main(){
	const lines = await readLinesFromFile('./external-sites.md');
	console.log(lines)
	const externalSitesArray = parseStringByDelimiter(lines)
	console.log(externalSitesArray)
	createExternalSitesTable("externalSites", externalSitesArray);


	tableContainerDiv = document.getElementById("externalSites");
	this.tableContainerDiv.appendChild(document.createElement("div"))
}

main();