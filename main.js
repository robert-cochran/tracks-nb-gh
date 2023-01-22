import { Model } from './js/model.js'
import { View } from './js/view.js'
import { Controller } from './js/controller.js'

async function main() {
	const config = {
		defaultTracksFilePath: "./tracks-reduced.txt",
		tracksTableContainerId: 'containerTracksTable',
		playerContainerId: 'containerPlayer',
		externalSitesPath: './external-sites.md',
		externalSitesContainerId: "containerExternalSites"
	}
	const controller = new Controller(new Model(config), new View(config), config);
	controller.load();
}

main();