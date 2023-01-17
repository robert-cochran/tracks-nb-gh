

async function saveToBrowserLocalStorage(){

}

async function printBrowserLocalStorage(){
    
}

async function readFromBrowserLocalStorage(){

}

export async function saveToLocalStorage(key, value){
    localStorage.setItem(key, value)
}

export async function saveCurrentTrackToLocalStorage(title, url){
    saveToLocalStorage('currentTrackTitle', title);
    saveToLocalStorage('currentTrackUrl', url);
    window.dispatchEvent( new Event('storage') )
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
}

export async function saveAllTracksToLocalStorage(array){
    saveToLocalStorage('tracks', array);
}

export function removeItemFromValue(key, deletedItem){

}

export function removeTrackFromLocalStorage(deletedTrack){
    
}


export async function importTracksFromLocalStorage(){}


export async function exportLocalStorageToFile(key){
    //saves the value from key to a file
}

export async function getTracksArrayFromLocalStorage(){

}