import {TrackPlayer} from './js/track-player.js'
import {createTracks} from './js/tracks.js'
import {createTrackTable} from './js/track-table.js'
import {readLinesFromFile, parseStringByDelimiter} from './js/file-system.js'
import {createExternalSitesTable} from './js/external-sites-table.js'

//this is essentially the controller, bringing together the model (data files) and the view (html document)
async function main() {
	const config = {
		trackURLsPath: "./tracks.md",
		trackURLsElemId: 'tracksTable',
		playerContainerElementId: 'containerPlayer',
		externalSitesPath: './external-sites.md',
		externalSitesElemId: "externalSites"
	}
	
	const tracks = await createTracks(config.trackURLsPath);
	const trackPlayer = new TrackPlayer(tracks.getCurrentTrack(), config.playerContainerElementId)
	trackPlayer.createTrackPlayer();
	createTrackTable(tracks.tracks, config.trackURLsElemId)//, config.playerContainerElementId)
	
	const externalSites = await readLinesFromFile(config.externalSitesPath);
	const externalSitesArray = parseStringByDelimiter(externalSites)
	createExternalSitesTable(config.externalSitesElemId, externalSitesArray);
}

main();