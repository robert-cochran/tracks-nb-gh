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

// import {ReactPlayer} from './react-player.js'


export class TrackPlayer {
	constructor(controller, containerElementId){
		this.controller = controller;
		this.containerDiv = document.getElementById(containerElementId);
		this.createTrackPlayer()
	}

	createTrackPlayer(){
		renderReactPlayer(this.containerDiv, { url: '', playing: false, controls: true }) //url: this.url (for refernce)
		createLoopToggle(this.containerDiv)
	}

	pause(){ 
		renderReactPlayer(this.containerDiv, { url: this.url, playing: false }) 
	}
	
	play(){ 
		renderReactPlayer(this.containerDiv, { url: this.url, playing: true }) 
	}

	loadURL(updatedURL){ 
		renderReactPlayer(this.containerDiv, { url: updatedURL, playing: true }) 
	}
}

export function isVideoPlayable(url){
	console.log(url)
	const div = document.createElement("div")
	try {
		console.log(renderReactPlayer(div, { url: url, playing: true }))
	} catch (err) {
		console.log(err)
	}
}

function createLoopToggle(parentDiv){
	const loopTrackToggle = document.createElement("input")
	loopTrackToggle.setAttribute("type", "checkbox")
	loopTrackToggle.setAttribute("id", "loopTrackToggle")

	const loopTrackToggleLabel = document.createElement("label")
	loopTrackToggleLabel.setAttribute("for", "loopTrackToggle")
	loopTrackToggleLabel.innerText = "Loop Track [TODO]"

	parentDiv.appendChild(loopTrackToggleLabel)
	parentDiv.appendChild(loopTrackToggle)
}