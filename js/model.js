import { createTracksFromUrlPath } from "./tracks.js"
import { readLinesFromFile, parseStringByDelimiter } from "./fileSystem.js"
import { setCurrentlyPlayingTrack } from "./localStorage.js"

export class Model{

    constructor(config){
        this._defaultTracksFilePath = config.defaultTracksFilePath
        this._externalSitesPath = config.externalSitesPath
        this._tracks = null;
        this._externalSites = null;
        this._controller = null;
        // this._currentTrackUrl = null;
        // this._currentTrackName = null;

        
    }

    registerController(controller){
        this._controller = controller
    }

    //TODO: delete the Tracks class and store the Tracks object in here

    static async createTracksFromFile(tracksFilePath){
        if (tracksFilePath != null && typeof tracksFilePath === "string"){
            return await createTracksFromUrlPath(tracksFilePath);
        }
        return []
    }

    static async readExternalSitesArrayFromPath(externalSitesFilePath){
        if (externalSitesFilePath != null && typeof externalSitesFilePath === "string"){
            const externalSites = await readLinesFromFile(externalSitesFilePath);
            const externalSitesArray = parseStringByDelimiter(externalSites)
            return externalSitesArray;
        }
        return [];
    }

    get defaultTracksFilePath(){
        return this._defaultTracksFilePath
    }

    get externalSitesPath(){
        return this._externalSitesPath
    }

    get tracks(){
        return this._tracks
    }

    static get tracksStatic(){
        return this._tracks;
    }

    setTracks(tracks){
        this._tracks = tracks;
    }

    get currentTrackUrl(){
        return localStorage.currentTrackUrl
    }

    setCurrentTrack(currentTrackName, currentTrackUrl){
        setCurrentlyPlayingTrack(currentTrackName, currentTrackUrl)
    }

    static setCurrentTrackStatic(currentTrackName, currentTrackUrl){
        setCurrentlyPlayingTrack(currentTrackName, currentTrackUrl)
    }

    get externalSites(){}

    setExternalSites(){}
}