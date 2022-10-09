/* Players
 * https://www.npmjs.com/package/react-player
 * https://www.npmjs.com/package/howler
 *      cdn 1 https://cdnjs.com/libraries/howler
 *      cdn 2 https://www.jsdelivr.com/package/npm/howler
 * https://www.npmjs.com/package/react-audio-player
 * https://www.npmjs.com/package/jplayer
 * https://www.npmjs.com/package/react-howler
 * https://www.npmjs.com/package/yt-player
 * https://github.com/benkaiser/stretto
 * https://www.npmjs.com/package/react-h5-audio-player
 */


/**
 * ------------TABLE---------------
 */
/**
 * 
 * @param {*} title 
 * @param {*} url 
 * @param {*} storageDivId 
 * @returns 
 */
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

async function createTrackTable(tracks, tableContainerId, storageDivId){
	const trackRows = await Promise.all(tracks.map(async track => {
		// console.log(track.title)
		return createURLRowElem(track.title, track.url, storageDivId);
	}))

	trackRows.map(tableRow => {
		document.getElementById(tableContainerId).appendChild(tableRow)
	})
}





/**
 * ------------TRACKS---------------
 */

 async function createTracks(urlsPath){
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

async function getYoutubeVideoTitle(url){
	const response = await fetch('https://noembed.com/embed?url=' + url);
	const jsonData = await response.json();
	return jsonData.title;
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

/**
 * ---------------TRACKS---------------
 */
class Tracks {

	constructor(tracks, currentTrack){
		this.tracks = tracks
		this.currentTrack = currentTrack
	}

	addTrack(track){ this.tracks.push(track) }

	removeTrack(){}

	getCurrentTrack(){ return this.currentTrack }

	setCurrentTrack(track){ this.currentTrack = track }

	getTracks(){ return this.tracks; }

	printTracks(){ 
		this.tracks.forEach(track => {console.log("title " + track.title)})
	}
}


/**
 * ---------------TRACK---------------
 */
class Track {
	constructor(title, url){
		this.title = title
		this.url = url
		this.tags = []
	}

	addTag(tag){
		this.tags.push(tag)
	}

	removeTag(tag){
		// this.tags remove tag
	}

}

/**
 * ---------------PLAYLIST---------------
 */
class Playlist{}

/**
 * ---------------FOCUS PLAYER---------------
 */
class TrackPlayer {
	constructor(track, containerElementId){
		this.containerDiv = document.getElementById(containerElementId);
		this.url = track.url;
		const trackConfig = { attributes: true };
		const attributeCallback = () => {
			const currentURL = this.containerDiv.getAttribute('url')
			this.loadURL(currentURL)
		}
		const observer = new MutationObserver(attributeCallback);
		observer.observe(this.containerDiv, trackConfig);
		renderReactPlayer(this.containerDiv, { url: this.url, playing: false, controls: true })
	}

	pause () { renderReactPlayer(this.containerDiv, { url: this.url, playing: false }) }
	
	play () { renderReactPlayer(this.containerDiv, { url: this.url, playing: true }) }

	loadURL(updatedURL){ 
		this.url = updatedURL
		renderReactPlayer(this.containerDiv, { url: updatedURL, playing: true }) 
	}
}

/**
 * ---------------MAIN---------------
 */
async function main() {
	const config = {
		trackURLsPath: "./tracks.md",
		containerPlayerElementId: 'containerPlayer',
		trackURLsElemId: 'tracksTable',
		startingTrackTitle: 'Nintendo 64 jungle mix 02 - Drum & bass, ragga, atmospheric, intelligent dnb, etc',
		startingTrackURL: 'https://www.youtube.com/watch?v=MGPhF1gwgIs',
	}
	
	const tracks = await createTracks(config.trackURLsPath);
	tracks.setCurrentTrack(new Track(config.startingTrackTitle, config.startingTrackURL))
	const trackPlayer = new TrackPlayer(tracks.getCurrentTrack(), config.containerPlayerElementId)
	createTrackTable(tracks.tracks, config.trackURLsElemId, config.containerPlayerElementId)
	
}

main();



