import {TrackPlayer} from './js/track-player.js'
import {createTracks} from './js/tracks.js'
import {createTrackTable} from './js/table.js'
import {readLinesFromFile, parseStringByDelimiter} from './js/file-reader.js'
import {createExternalSitesTable} from './js/external-sites.js'

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
	createTrackTable(tracks.tracks, config.trackURLsElemId, config.playerContainerElementId)
	
	const externalSites = await readLinesFromFile(config.externalSitesPath);
	const externalSitesArray = parseStringByDelimiter(externalSites)
	createExternalSitesTable(config.externalSitesElemId, externalSitesArray);
}

main();