import {TrackPlayer} from './js/track-player.js'
import {createTracks} from './js/tracks.js'
import {createTrackTable} from './js/table.js'
import {readLinesFromFile, parseStringByDelimiter} from './js/file-reader.js'
import {createExternalSitesTable} from './js/external-sites.js'

//this is essentially the controller, bringing together the model (data files) and the view (html document)
async function main() {
	const config = {
		trackURLsPath: "./tracks.md",
		containerPlayerElementId: 'containerPlayer',
		trackURLsElemId: 'tracksTable',
	}
	const tracks = await createTracks(config.trackURLsPath);
	const trackPlayer = new TrackPlayer(tracks.getCurrentTrack(), config.containerPlayerElementId)
	createTrackTable(tracks.tracks, config.trackURLsElemId, config.containerPlayerElementId)
	
	const externalSites = await readLinesFromFile('./external-sites.md');
	const externalSitesArray = parseStringByDelimiter(externalSites)
	createExternalSitesTable("externalSites", externalSitesArray);
}

main();