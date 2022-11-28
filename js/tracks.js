import {Track} from './track.js'
import { getYoutubeVideoTitle } from './youtube-api.js';

export async function createTracks(urlsPath){
	const urls = await loadURLsFromFilePath(urlsPath);
	
	const tracksArray = await Promise.all(urls.map(async url => {
		const title = await getYoutubeVideoTitle(url)
		const track = new Track(title, url)
		// console.log(track.title)
		return track
	}))

	const tracks = new Tracks(tracksArray);

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

function alphabetizeTracks(){
	
}


class Tracks {

	//tracks is an array
	//currentTrack is a Track object
	constructor(tracks, currentTrack){
		this.tracks = tracks
		this.currentTrack = currentTrack
	}

	addTrack(track){ 
		this.tracks.push(track) 
	}

	removeTrack(){}

	getCurrentTrack(){ 
		return this.currentTrack 
	}

	setCurrentTrack(track){ 
		this.currentTrack = track 
	}

	getTracks(){ 
		return this.tracks; 
	}

	reorder(){
	}

	printTracks(){ 
		this.tracks.forEach(track => {console.log("title " + track.title)})
	}
}