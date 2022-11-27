import {Track} from './js/track.js'
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
		startingTrackTitle: 'Nintendo 64 jungle mix 02 - Drum & bass, ragga, atmospheric, intelligent dnb, etc',
		startingTrackURL: 'https://www.youtube.com/watch?v=MGPhF1gwgIs',
	}
	const startingTrack = new Track(config.startingTrackTitle, config.startingTrackURL)
	const tracks = await createTracks(config.trackURLsPath);
	tracks.setCurrentTrack(startingTrack)
	const trackPlayer = new TrackPlayer(tracks.getCurrentTrack(), config.containerPlayerElementId)
	createTrackTable(tracks.tracks, config.trackURLsElemId, config.containerPlayerElementId)
	

	const externalSites = await readLinesFromFile('./external-sites.md');
	const externalSitesArray = parseStringByDelimiter(externalSites)
	createExternalSitesTable("externalSites", externalSitesArray);
}

main();