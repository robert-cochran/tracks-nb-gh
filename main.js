import {Track} from './js/track.js'
import {TrackPlayer} from './js/track-player.js'
import {createTracks} from './js/tracks.js'
import {createTrackTable} from './js/table.js'

async function main() {
	const config = {
		trackURLsPath: "./tracks.md",
		containerPlayerElementId: 'containerPlayer',
		trackURLsElemId: 'tracksTable',
		startingTrackTitle: 'Nintendo 64 jungle mix 02 - Drum & bass, ragga, atmospheric, intelligent dnb, etc',
		startingTrackURL: 'https://www.youtube.com/watch?v=MGPhF1gwgIs',
	}
	
	const tracks = await createTracks(config.trackURLsPath);
	tracks.setCurrentTrack(new Track(config.startingTrackTitle, config.startingTrackURL))
	const trackPlayer = new TrackPlayer(tracks.getCurrentTrack(), config.containerPlayerElementId)
	createTrackTable(tracks.tracks, config.trackURLsElemId, config.containerPlayerElementId)
	
}

main();