export function createButton(innerText, eventFunction, eventFunctionInput, id){
	const button = document.createElement('button')
	button.innerText = innerText
	button.id = id;
	button.addEventListener("click", () => {
		eventFunction(eventFunctionInput)
	})
	return button
}

export function createButtonContainer(elementTag, display, justifyContent, id){
	const buttonContainer = document.createElement(elementTag)
	buttonContainer.style.display = display
	buttonContainer.style.justifyContent = justifyContent
	buttonContainer.id = id
	return buttonContainer;
}