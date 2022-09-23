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



