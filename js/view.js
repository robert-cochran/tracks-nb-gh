import { TracksTable } from "./track-table.js";
import { TrackPlayer } from "./track-player.js";
import { ExternalSitesTable } from "./external-sites-table.js";

export class View{
    constructor(config){
        this._tracksTableContainerId = config.tracksTableContainerId;
        this._playerContainerId = config.playerContainerId;
        this._externalSitesPath = config.externalSitesPath;
        this._externalSitesContainerId = config.externalSitesContainerId

        this.trackPlayer = new TrackPlayer(config.playerContainerElementId)
        this.tracksTable = new TracksTable(config.tracksTableContainerId)
        this.externalSitesTable = new ExternalSitesTable(config.externalSitesContainerId)
    }

    setTrackPlayerUrl(url){
        this.trackPlayer.loadURL(url)
    }

    populateTracksTable(tracksArray){
        this.tracksTable.create(tracksArray)
    }

    populateExternalSites(externalSitesArray){
        this.externalSitesTable.populate(externalSitesArray);
    }

    get tracksTableContainerId(){
        return this._tracksTableContainerId
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