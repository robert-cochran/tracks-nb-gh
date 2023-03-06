import { Model } from './js/model.js'
import { View } from './js/view.js'
import { Controller } from './js/controller.js'

async function main() {
	const config = {
		defaultTracksFilePath: "./tracks.txt",
		trackTableContainerId: 'containerTracksTable',
		playerContainerId: 'containerPlayer',
		externalSitesPath: './external-sites.md',
		externalSitesContainerId: "containerExternalSites"
	}
	//mvc setup examples
	//https://blog.sessionstack.com/how-javascript-works-writing-modular-and-reusable-code-with-mvc-16c65cbd9f64
	//https://github.com/taniarascia/mvc/blob/master/script.js
	//too much https://alistapart.com/article/javascript-mvc/
	const model = new Model(config);
	const view = new View(config);
	const controller = new Controller(model, view, config);
	model.registerController(controller)
	view.registerController(controller)
	controller.load();
}

main();
