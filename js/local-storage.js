

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
}

export async function importTracksFromLocalStorage(){}


export async function exportLocalStorageToFile(key){
    //saves the value from key to a file
}

export async function getTracksArrayFromLocalStorage(){

}