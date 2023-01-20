import { createTracksFromUrlPath } from "./tracks.js"
import { readLinesFromFile, parseStringByDelimiter } from "./file-system.js"

export class Model{

    constructor(config){
        this._defaultTracksFilePath = config.defaultTracksFilePath
        this._externalSitesPath = config.externalSitesPath
        this.tracks = null
    }

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
}