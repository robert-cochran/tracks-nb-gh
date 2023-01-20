import {TrackPlayer} from './track-player.js'
import {createTracksFromUrlPath} from './tracks.js'
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
            console.log(`The ${mutation.Files} attribute was modified.`);
        }
    }

}



export class Controller {


    constructor(model, view, config){
        this.model = model;
        this.view = view;
        this.config = config;
    }

    async load(){
        const tracks = await Model.createTracksFromFile(this.model.defaultTracksFilePath)
        const externalSitesArray = await Model.readExternalSitesArrayFromPath(this.model.externalSitesPath)
        this.view.populateTracksTable(tracks.getArray())
        this.view.setTrackPlayerUrl(tracks.getArray()[0].url)
    }




    observerTest(){
        const input = document.getElementById('importFileInput');
        
        const mutationConfig = { attributes: true, childList: false, subtree: false };
        const observer = new MutationObserver(fileIn);
        observer.observe(input, mutationConfig);
    }





    //this will be a bridge
    //which means we need a way to call or be notified when model changes
    //but we also need a way to change the front end somewhat easily?
        //but my front end is my back end, all my tracks are stored in the table, 
        //so does this create too much coupling?
    
    //how do i run this callback when the file is loaded
        //i could have an attribute on the input button that I change once I have the file contents
        //and a mutation observer on that attribute to signal there is new content
    //how do i send the contents of FileReader to here so that I can pass it back
        //is FileReader readable from everywhere?
        //can I call the File

    //so we have an orphan input element (with id 'importFileInput' (which we should avoid trying to omnipitously know?))
    //but if we did know it could we use it to get the FileReader inside in its callback?
    
    //can we run its callback event here instead of in buttons.js?
    //so the data we want in inside the triggered event, and events will provide that file data to anyone thats
    //added an eventListener to that attribute right?
    //so if i add a 'change' event listener to the input, then I can access the data here ( which would require me processing it )

    //input has an attribute called files which is storing the file we input

    //could i store the contents in the btn as an attribute value?

    //the input event has the target, so if we can somehow get notified of that we can get the target and then get the file from teh attribute
    onFileImport = txtFile => {

        
    }
}