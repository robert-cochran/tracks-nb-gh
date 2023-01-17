// https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage

async function saveToBrowserCache(){

}

async function printBrowserCache(){

}

async function readFromBrowserCache(){

}

export async function saveToCacheStorage(key, value){
    const cache = CacheStorage.open()
}

export async function saveTrackToCacheStorage(key, value){
    // CacheStorage.
}

export async function saveTracksToCacheStorage(array){

}

export async function importTracksFromCacheStorage(tableId){

}

export async function exportCacheStorageToFile(tableId) {
    //use tableId to get all tracks from the table into an array
}

export async function getTracksArrayFromCacheStorage(){

}