import {Track} from './track.js'
import { getYoutubeVideoTitle } from './youtube-api.js';

export async function createTracksFromUrlPath(urlsPath){
	const urls = await loadURLsFromFilePath(urlsPath);
	
	const tracksArray = await Promise.all(urls.map(async url => {
		const title = await getYoutubeVideoTitle(url)
		const track = new Track(title, url)
		return track
	}))

	const tracks = new Tracks(tracksArray, (tracksArray.length > 0 ? tracksArray[0] : ''));

	return tracks
}

export async function createTracksFromArray(array){
	const filteredUrlArray = array.filter(url => {
		return (url.length > 1 && url.includes('youtube.com'))
	});
	
	const tracksArray = await Promise.all(filteredUrlArray.map(async url => {
		const title = await getYoutubeVideoTitle(url)
		const track = new Track(title, url)
		return track
	}))

	const tracks = new Tracks(tracksArray, (tracksArray.length > 0 ? tracksArray[0] : ''));

	return tracks
}

async function loadURLsFromFilePath(urlsPath) {
	const response = await fetch(urlsPath)
	const unparsedData = await response.text();
	const unfilteredURLs = unparsedData.split(/\r?\n/);

	const urlArray = unfilteredURLs.filter(url => {
		return url.length > 1
	})
	
	return urlArray
}

class Tracks {
	//tracks is an array of Track objects
	//currentTrack is a Track object
	constructor(tracksArray, currentTrack){
		this.tracksArray = tracksArray
		this.tracksAddedOldestToNewest = [...tracksArray]
		this.currentTrack = currentTrack
	}

	addTrack(track){ 
		this.tracksArray.push(track) 
	}

	removeTrack(){}

	getCurrentTrack(){ 
		return this.currentTrack 
	}

	setCurrentTrack(track){ 
		this.currentTrack = track 
	}

	getArray(){ 
		return this.tracksArray; 
	}

	printTracks(){ 
		this.tracksArray.forEach(track => {console.log("title " + track.title)})
	}
}