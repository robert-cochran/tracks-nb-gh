const chromeServer = require('./ping_pong')

console.log("Starting...")

//initial hardcoded variables
const domain = "localhost"
// const domain = "127.0.0.1"
const port = "6789"
const filename = "dummy.md"
const filenumber = "93"

const dummyURL = "http://localhost:8080/notes.md"
const htmlContentsURL = "https://" + domain + ":" + port + "/home:/" + filename
const textContentsURL = "http://" + domain + ":" + port + "/--original/home/" + filename
const editContentsURL = "http://"  + domain + ":" + port +  "/home:" + filenumber + "?--edit"
//nb server url examples
//http://localhost:6789/home:93?--edit
//http://localhost:6789/--original/home/dummy.md
//http://localhost:6789/home:93


const contentTypeHeader = "Content-Type: application/x-www-form-urlencoded"
const currentContent = "httpCONTENTS%0D%0"
const appendContent = "ANEWLINESENTFROMCURL"
const content = "content=" + currentContent + appendContent
const body = content;


//Order of Operation is to get the original content with a GET, concatenate that with the new data, then POST that to url

async function getContentsAsText(url){
	var req = new Request(url, {
		method: 'GET',
		mode: 'cors',
		redirect: 'follow',
		headers: {
			"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
	});
	const response = await fetch(req);
	const text = await response.text();
	return text;
	
	// const response = await fetch('http://127.0.0.1:8080')
	// const json = await response.json()
	// return json.body;
}

async function postContent(url, content){

	fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			title: 'foo',
			body: 'bar',
			userId: 1,
			url: content
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	})
	.then(res => res.json())
	.then(console.log)

}


async function main(){
	// postContent(url="https://localhost:8080", content="https://YOUTUBE.URL/y67cj2a")
	const contents = await getContentsAsText('http://127.0.0.1:8080')
	console.log(contents)
}
main();

chromeServer()

