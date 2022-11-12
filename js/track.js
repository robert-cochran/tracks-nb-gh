export class Track {
	constructor(title, url){
		this.title = title
		this.url = url
		this.tags = []
	}

	addTag(tag){
		this.tags.push(tag)
	}

	removeTag(tag){
		// this.tags remove tag
	}

}