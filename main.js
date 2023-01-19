import {TrackPlayer} from './js/track-player.js'
import {createTracks} from './js/tracks.js'
import {createTrackTable} from './js/track-table.js'
import {readLinesFromFile, parseStringByDelimiter} from './js/file-system.js'
import {createExternalSitesTable} from './js/external-sites-table.js'

//this is essentially the controller, bringing together the model (data files) and the view (html document)
//should really move this into a dedicated controller
async function main() {
	const config = {
		defaultTracksFilePath: "./tracks-reduced.txt",
		tracksTableElemId: 'tracksTable',
		playerContainerElementId: 'containerPlayer',
		externalSitesPath: './external-sites.md',
		externalSitesElementId: "externalSites"
	}
	
	const tracks = await createTracks(config.defaultTracksFilePath);
	const trackPlayer = new TrackPlayer(tracks.getCurrentTrack(), config.playerContainerElementId)
	trackPlayer.createTrackPlayer();
	createTrackTable(tracks.getTracks(), config.tracksTableElemId)
	
	// const externalSites = await readLinesFromFile(config.externalSitesPath);
	// const externalSitesArray = parseStringByDelimiter(externalSites)
	// createExternalSitesTable(config.externalSitesElementId, externalSitesArray);
}

main();