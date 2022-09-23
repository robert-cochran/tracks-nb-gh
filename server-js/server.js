const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs/promises');

const nbDummyTracksFilePath = '/Users/rob.cochran/.nb/home/dummy.md'
const localTracksFilePath = '/Users/rob.cochran/sandbox/bookmark-to-disk/data/tracks.md'
const actualTracksPath = '/Users/rob.cochran/.nb/tracks/tracks.md'
const tracksFilePath = actualTracksPath;

const corsOptions = {
  allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
  exposedHeaders: ["authorization"], // you can change the headers
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false
}

async function appendFile(filePath, appendedContent) {
  try { await fs.appendFile(filePath, '\n' + appendedContent, { encoding: 'utf8' }); } 
  catch (err) { console.log(err); }
}

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/', function (request, response, next) {
  console.log("BODY RECEIVED: " + request.body)
  console.log("URL RECEIVED: " + request.body.url)
  appendFile(tracksFilePath, request.body.url)
  response.send("\n\n/ POST ACK -- \n\nurl: " + request.body.url)
})

app.get('/', function (request, response, next) {
  // response.json({body: "\n\nMESSAGE RECEIVED!!\n\n"})
  response.send("\n\nMessageReceived\n\n");
})

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})

//TODO Remove the newline from the appendFile function
//TODO Function that cleans up dead links?
//TODO function that cleans up duplicate links (or avoids adding it if its a duplicate)
//TODO function that alphabetises links (more so for radio.js)
//TODO add send to local tracks and close window option 
//TODO add visual confirmation that track has been added to the popup player
//TODO show error if track not sent (i.e. network error, server isnt up, whatever...)
//TODO add option to startup server from extension and then kill it after?
//TODO use a package that comes with node https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module
//TODO read this Cache your CORS article https://news.ycombinator.com/item?id=32907234

//TODO add seashells theme, nightmode theme

//TODO function that adds tags and can filter based on tags 
//TODO function that lets me remove tracks from the list inside the index file (thats a powerful feature to add to a public page so maybe not)?

