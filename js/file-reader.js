//reads file
//returns an array of string lines
export async function readLinesFromFile(filePath) {
	const response = await fetch(filePath)
	const unparsedData = await response.text();
	const lines = unparsedData.split(/\r?\n/);
	return lines
}

//takes in array of strings
//converts each string into an array indexed by the || delimiter
export function parseStringByDelimiter(linesArray) {
	const externalSitesArray = linesArray.map(line => {
		return line.split("||");
	})
	return externalSitesArray;
}