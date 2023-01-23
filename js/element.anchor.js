export function createAnchorElement(name, link) {
	const aTag = document.createElement("a")
	aTag.innerText = name
	aTag.href = link
	return aTag;
}