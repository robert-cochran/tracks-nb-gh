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


async function getYoutubeVideoTitle(url){
    const response = await fetch('https://noembed.com/embed?url=' + url);
    const jsonData = await response.json();
    return jsonData.title;
}

async function loadURLs(urlsPath, urlsElemTableId, storageDivId) {
    const response = await fetch(urlsPath)
    const focusUnparsedData = await response.text();
    const unfilteredFocusURLs = focusUnparsedData.split(/\r?\n/);

    const focusURLs = unfilteredFocusURLs.filter(url => {
        return url.length > 1
    })

    //filter duplicates out
    //strike out videos that cant be played
    //add videos to table

    const urlRowElementList = await Promise.all(focusURLs.map(async url => {
        const title = await getYoutubeVideoTitle(url)
        return createURLRowElem(title, url, storageDivId);
    }))

    urlRowElementList.map(tableRow => {
        document.getElementById(urlsElemTableId).appendChild(tableRow)
    })
}



/**
 * TRACK
 */
class Track {
    constructor(title, url, storageDivId){
        this.storageDiv = document.getElementById(storageDivId)
        this.storeTrack(title, url)
    }

    storeTrack(title, url) {
        this.storageDiv.setAttribute('title', title)
        this.storageDiv.setAttribute('url', url)
    }

    getTitle(){
        return this.storageDiv.getAttribute('title')
    }

    getURL(){
        return this.storageDiv.getAttribute('url')
    }
}

class Playlist{

}



/**
 * FOCUS PLAYER
 */
class FocusPlayer {
    constructor(track, containerElementId){
        this.containerDiv = document.getElementById(containerElementId);
        this.url = track.getURL();
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


function main() {
    const radioConfig = {
        focusURLsPath: "./focus.md",
        containerPlayerElementId: 'containerPlayer',
        focusURLsElemId: 'focusSongsTable',
        startingTrackTitle: 'Nintendo 64 jungle mix 02 - Drum & bass, ragga, atmospheric, intelligent dnb, etc',
        startingTrackURL: 'https://www.youtube.com/watch?v=MGPhF1gwgIs',
    }

    const track = new Track(
        radioConfig.startingTrackTitle, 
        radioConfig.startingTrackURL, 
        radioConfig.containerPlayerElementId
    )

    loadURLs(
        radioConfig.focusURLsPath, 
        radioConfig.focusURLsElemId,
        radioConfig.containerPlayerElementId
    )

    const focusPlayer = new FocusPlayer(track, radioConfig.containerPlayerElementId)
}

main();




