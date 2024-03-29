//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

export async function saveToLocalStorage(key, value){
    localStorage.setItem(key, value)
}

export async function setCurrentlyPlayingTrack(trackTitle, trackUrl){
    saveToLocalStorage('currentTrackTitle', trackTitle);
    saveToLocalStorage('currentTrackUrl', trackUrl);
    const event = new Event('storage');
    event.key = 'updatedCurrentTrack'
    window.dispatchEvent( event )
    // event is dispatched manually bc firefox only updates OTHER pages in the same domain 
    //  with the triggered event (i.e. doesnt work for same page)
    // ReactPlayer reads localStorage event triggers to determine what to play
    // NOTE: this will mean event is sent twice if this is used in another page for same domain
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event 
}

export async function saveTracksArrayToLocalStorage(array){
    saveToLocalStorage('tracks', array);
}

export async function saveTracksToLocalStorage(tracks){
    const tracksArray = tracks.tracksArray.map(track => {
        return track.url
    })
    localStorage.tracks = tracksArray;
}

export async function appendTrack(newTrackUrl){
	//if (allTracks === undefined || allTracks !== exportTracksToUrlArray(tableId)){
		//then I need to get exportTracksToUrlArray(tableId) + the new track into localStorage.tracks
	//} 

    const tracks = localStorage.tracks.split(',')
    tracks.push(newTrackUrl)
    localStorage.tracks = tracks
}

export function removeTrack(deletedTrack){}

export function removeItemFromValue(key, deletedItem){}

export async function getTracksArrayFromLocalStorage(){
    return localStorage.tracks.split(',');
}