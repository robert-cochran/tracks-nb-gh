export function createButton(innerText, eventFunction, eventFunctionInput){
	const button = document.createElement('button')
	button.innerText = innerText
	button.addEventListener("click", () => {
		eventFunction(eventFunctionInput)
	})
	return button
}

export function createButtonContainer(elementTag, display, justifyContent){
	const buttonContainer = document.createElement(elementTag)
	buttonContainer.style.display = display
	buttonContainer.style.justifyContent = justifyContent
	return buttonContainer;
}