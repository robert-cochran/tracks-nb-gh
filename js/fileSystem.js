import { exportTracksToUrlArray } from './table.js'

//https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API
	//browser filesystem? useful?

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

//exports file
//returns an array of string lines
export async function writeArrayToFile(filePath, array) {
	const response = await fetch(filePath)
	const unparsedData = await response.text();
	const lines = unparsedData.split(/\r?\n/);
	return lines
}

export async function importTracksFromFile(){

} 

export async function exportTracksToFile(tableId){
	const urlArray = exportTracksToUrlArray(tableId);
}