
// ## youtube-api
// want to find keyless api for node

// ### Browser JS compatible
// - noembed (fetch request to http endpoint, no package needed)
// - https://github.com/HermanFassett/youtube-scrape
// - google 'convert node module to be used in browser'

// ### Node
// - search terms
//		- https://www.npmjs.com/search?q=keywords:youtube%20api%20no%20key
// 		- https://www.npmjs.com/search?q=youtube
//		- https://www.npmjs.com/search?q=keywords:youtube-api or api-youtube 
// 		- https://www.npmjs.com/search?q=keywords:innertube or https://www.npmjs.com/search?q=keywords:innertubeapi
// 		- https://github.com/topics/youtube-api
// - packages (if open source cna i copy their code and use in browser?)
//		- youtube info without api key
//			- https://www.npmjs.com/search?q=keywords:youtube%20api%20no%20key
//			- https://www.npmjs.com/package/youtube-search-api
//			- https://www.npmjs.com/package/usetube
//			- https://www.npmjs.com/package/ytdl-getinfo
//			- https://www.npmjs.com/package/youtube-crawler
//			- https://www.npmjs.com/package/youtube-ext
//			- https://github.com/Eloquentia-Studios/youtube-search-no-limit
//			- https://medium.com/weekly-webtips/import-use-npm-modules-in-the-browser-easily-e70d6c84fc31
//			- https://github.com/browserify/browserify
//			- https://linuxhint.com/run-nodejs-module-browser/
// - Repos
// 		- https://github.com/LuanRT/YouTube.js
// 		- https://www.npmjs.com/package/iyoutube 
// 		- https://www.npmjs.com/package/yt-getvideos
// 		- https://www.npmjs.com/package/get-youtube-title

export async function getYoutubeVideoTitle(url){
	const response = await fetch('https://noembed.com/embed?url=' + url);
	const jsonData = await response.json();
	const title = ((jsonData.title != undefined) ? jsonData.title : 'Video Title Not Found' )
	return title;
}


export async function getLiveVideoStatus(url){
	// this node function returns live info https://www.npmjs.com/package/youtube-search-api
	//returns boolean, true if video is a live video
}

export async function getPlayableStatus(url){
	
}