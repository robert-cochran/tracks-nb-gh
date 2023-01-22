import {TrackPlayer} from './track-player.js'
import {createTracksFromUrlPath, createTracksFromArray} from './tracks.js'
import {TracksTable} from './track-table.js'
import {readLinesFromFile, parseStringByDelimiter} from './file-system.js'
import { View } from './view.js'
import { Model } from './model.js'
//point of this is to monitor changes to the model (i.e. localStorage) and make changes to the view

//use this as a mediator between front end and lcoalStorage

//could return the code to store the currently playing info inside an attribute using the mutation / observer, 
//  and having a html elem attribute for active, but honestly this is probably better 

const fileIn = (mutationList) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
            console.log(`The input element attribute was modified.`);
            console.log(`The ${mutation.Files} attribute was modified.`);
        }
    }
}


export class Controller {

    constructor(model, view, config){
        this.model = model;
        this.view = view;
        this.config = config;
        
        this.setEventHandlers()
    }

    async load(){
        const tracks = await Model.createTracksFromFile(this.model.defaultTracksFilePath)
        const externalSitesArray = await Model.readExternalSitesArrayFromPath(this.model.externalSitesPath)
        this.view.populateTracksTable(tracks.getArray())
        this.view.setTrackPlayerUrl(tracks.getArray()[0].url)

       

        
        // this.view.populateExternalSites(externalSitesArray)
        // this.observerTest()
    }

    setEventHandlers(){
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
        window.onstorage = async (event) => {
            if (event.key === 'tracks'){
                const tracksUrlArray = window.localStorage.getItem('tracks').split(',');
                // console.log(tracksUrlArray)
                const tracks = await createTracksFromArray(tracksUrlArray)
                console.log(tracks)
                this.model.setTracks(tracks)
                this.view.populateTracksTable(this.model.tracks.getArray())
            }
		}



    }


    // observerTest(){
        // const input = document.getElementById('importFileInput');
        // const mutationConfig = { attributes: true, childList: false, subtree: false };
        // const observer = new MutationObserver(fileIn);
        // observer.observe(input, mutationConfig);
    // }

    /**
        NOTE:       this will be a bridge
                    which means we need a way to call or be notified when model changes
        
        QUESTION:   how do i run this callback when the file is loaded
                    i could have an attribute on the input button that I change once I have the file contents
                    and a mutation observer on that attribute to signal there is new content

        QUESTION:   can we run its callback event here instead of in buttons.js?
                    so the data we want in inside the triggered event, 
                    and events will provide that file data to anyone thats
                    added an eventListener to that attribute right?
                    so if i add a 'change' event listener to the input, 
                    then I can access the data here ( which would require me processing it )

        OPTION 1:   get the event dispatched from the input elem and sned it to the model

        OPTION 2:   from teh input callback redispatch the event but from a source I choose
                    (i.e. a source that exists in the model that can listen and handle events)
     */
    
    
    onFileImport = txtFile => {

        
    }
}