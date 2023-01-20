// import {TrackPlayer} from './js/track-player.js'
// import {createTracksFromUrlPath} from './js/tracks.js'
// import {createTrackTable} from './js/track-table.js'
// import {readLinesFromFile, parseStringByDelimiter} from './js/file-system.js'
// import {createExternalSitesTable} from './js/external-sites-table.js'
import { Model } from './js/model.js'
import { View } from './js/view.js'
import { Controller } from './js/controller.js'

//this is essentially the controller, bringing together the model (data files) and the view (html document)
//should really move this into a dedicated controller
async function main() {
	const config = {
		defaultTracksFilePath: "./tracks-reduced.txt",
		tracksTableContainerId: 'containerTracksTable',
		playerContainerElementId: 'containerPlayer',
		externalSitesPath: './external-sites.md',
		externalSitesContainerId: "containerExternalSites"
	}

	const controller = new Controller(new Model(config), new View(config), config);
	controller.load();
	
	// const tracks = await createTracksFromUrlPath(config.defaultTracksFilePath);
	// const trackPlayer = new TrackPlayer(tracks.getCurrentTrack(), config.playerContainerElementId)
	// trackPlayer.createTrackPlayer();
	// createTrackTable(tracks.getTracks(), config.tracksTableContainerElemId)
	
	// const externalSites = await readLinesFromFile(config.externalSitesPath);
	// const externalSitesArray = parseStringByDelimiter(externalSites)
	// createExternalSitesTable(config.externalSitesElementId, externalSitesArray);
}

main();