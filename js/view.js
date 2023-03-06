import { TrackTable } from "./trackTable.js";
import { TrackPlayer } from "./trackPlayer.js";
import { createTrackTableOptions } from "./trackTableOptions.js";
import { ExternalSitesTable } from "./externalSitesTable.js";

export class View{
    constructor(config){
        this._playerContainerId = config.playerContainerId;
        this._trackTableContainerId = config.trackTableContainerId;
        this._trackTableContainerElem = document.getElementById(this._trackTableContainerId)
        this._externalSitesPath = config.externalSitesPath;
        this._externalSitesContainerId = config.externalSitesContainerId
        this._controller = null;
        
        this._trackPlayer = null;
        this._trackTable = null;
        this._trackTableElem = null; 
        this._externalSitesTable = null;
        this._trackTableOptionsElem = null;
    }

    registerController(controller){
        this._controller = controller;
    }

    async load(){
        this._trackPlayer = new TrackPlayer(this._controller, this._playerContainerId);
        
        this._trackTableOptionsElem = createTrackTableOptions()
        this._trackTableContainerElem.appendChild(this._trackTableOptionsElem)

        this._trackTable = new TrackTable(this._controller, this._trackTableContainerId);
        this._trackTableElem = this._trackTable.create();
        this._trackTableContainerElem.appendChild(this._trackTableElem)

        this._externalSitesTable = new ExternalSitesTable(this._externalSitesContainerId);
    }

    setTrackPlayerUrl(url){
        this._trackPlayer.loadURL(url)
    }

    populateTrackTable(tracksArray){
        this._trackTable.populate(tracksArray)
    }

    populateExternalSites(externalSitesArray){
        this._externalSitesTable.populate(externalSitesArray);
    }

    get trackTableContainerId(){
        return this._trackTableContainerId
    }

    get playerContainerId(){
        return this._playerContainerId
    }

    get externalSitesPath(){
        return this._externalSitesPath
    }

    get externalSitesId(){
        return this._externalSitesId
    }

   
}