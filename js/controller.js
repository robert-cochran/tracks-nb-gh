import {TrackPlayer} from './track-player.js'
import {createTracksFromUrlPath, createTracksFromArray} from './tracks.js'
import {TracksTable} from './track-table.js'
import {readLinesFromFile, parseStringByDelimiter} from './file-system.js'
import { View } from './view.js'
import { Model } from './model.js'
import { exportTracksToUrlArray } from './table.js'
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

//mvc setup examples
//https://github.com/taniarascia/mvc/blob/master/script.js
//https://blog.sessionstack.com/how-javascript-works-writing-modular-and-reusable-code-with-mvc-16c65cbd9f64
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
    }

    setEventHandlers(){
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
        window.onstorage = async (event) => {
            if (event.key === 'tracks'){
                const tracksUrlArray = window.localStorage.getItem('tracks').split(',');
                const tracks = await createTracksFromArray(tracksUrlArray)
                this.model.setTracks(tracks)
                this.view.populateTracksTable(this.model.tracks.getArray())
            }
            else if (event.key === 'updatedCurrentTrack'){
                this.view.setTrackPlayerUrl(localStorage.currentTrackUrl)
            }
            
		}

        window.click = async (event) => {
            console.log(event);
            this.model.setCurrentTrack()
        }
    }
    

    onFileImport = txtFile => {}

    static updateCurrentTrack(title, url){
        Model.setCurrentTrackStatic(title, url)
    }

    static getTracks(){
        // return Model.getTracksStatic();
        //TODO FIXME. Need to pass controller around everywhere in order to call conrtollers internal variables
        //THIS IS A DIRTY HACK
        console.log(exportTracksToUrlArray('tracksTable'))
        return exportTracksToUrlArray('tracksTable')
    }
}