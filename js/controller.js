import {TrackPlayer} from './trackPlayer.js'
import {createTracksFromUrlPath, createTracksFromArray} from './tracks.js'
import {TrackTable} from './trackTable.js'
import {readLinesFromFile, parseStringByDelimiter} from './fileSystem.js'
import { View } from './view.js'
import { Model } from './model.js'
import { exportTracksToUrlArray } from './table.js'

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
        this.loadView(tracks, externalSitesArray)
    }

    loadView(tracks, externalSitesArray){
        this.view.load();
        this.view.populateTrackTable(tracks.getArray())
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