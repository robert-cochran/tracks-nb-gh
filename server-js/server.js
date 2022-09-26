const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs/promises');

// const nbDummyTracksFilePath = '/Users/rob.cochran/.nb/home/dummy.md'
// const actualTracksPath = '/Users/rob.cochran/.nb/tracks/tracks.md'
// const tracksFilePath = localTracksPath;

// const corsOptions = {
// 	allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
// 	exposedHeaders: ["authorization"], // you can change the headers
// 	origin: "*",
// 	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// 	preflightContinue: false
// }

async function appendFile(filePath, appendedContent) {
	try { 
		await fs.appendFile(filePath, '\n' + appendedContent, { encoding: 'utf8' }); 
		// console.log("Appended to filepath: " + tracksFilePath)
  	} catch (err) { 
		console.log("Error: file could not be appended to. Message: " + err); 
  	}
}

async function duplicateCheck(filePath, text) {
	try {
		const fileContents = await fs.readFile(filePath, { encoding: 'utf8' })
		return fileContents.includes(text)
	} catch (err) {
		console.log("Error: file could not be read. Message: " + err); 
	}
}

async function addTrack(tracksFilePath, url){
	if (!await duplicateCheck(tracksFilePath, url)){
		await appendFile(tracksFilePath, url)
	}
}

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/', function (request, response, next) {
	const tracksFilePath = '/Users/rob.cochran/sandbox/tracks/tracks.md'
	console.log(`\nRequest start\nBODY RECEIVED: ${JSON.stringify(request.body)} \nURL RECEIVED: ${request.body.url}`)
	addTrack(tracksFilePath, request.body.url)
	console.log("Request end\n")
	response.send("\n\n/ POST ACK -- \n\nurl: " + request.body.url)
})

app.post('/local', function (request, response, next) {
	const tracksFilePath = '/Users/rob.cochran/sandbox/tracks/tracks.md'
	console.log(`\nRequest start\nBODY RECEIVED: ${JSON.stringify(request.body)} \nURL RECEIVED: ${request.body.url}`)
	addTrack(tracksFilePath, request.body.url)
	console.log("Request end\n")
	response.send("\n\n/ POST ACK -- \n\nurl: " + request.body.url)
})

app.post('/nb', function (request, response, next) {
	const tracksFilePath = '/Users/rob.cochran/.nb/tracks/tracks.md'
	console.log(`\nRequest start\nBODY RECEIVED: ${JSON.stringify(request.body)} \nURL RECEIVED: ${request.body.url}`)
	addTrack(tracksFilePath, request.body.url)
	console.log("Request end\n")
	response.send("\n\n/ POST ACK -- \n\nurl: " + request.body.url)
})

app.get('/', function (request, response, next) {
	// response.json({body: "\n\nMESSAGE RECEIVED!!\n\n"})
	response.send("\n\nMessageReceived\n\n");
})

app.listen(8080, function () {
	console.log('CORS-enabled web server listening on port 8080')
})



