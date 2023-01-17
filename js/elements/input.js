export function createInputElement(type, id){
    const input = document.createElement('input');
    input.setAttribute("type", type);
    input.setAttribute('id', id)
    return input;
}