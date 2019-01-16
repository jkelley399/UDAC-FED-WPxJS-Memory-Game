// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

/*
2019-01-11: Reviewed style guides
    Changes var to let for variable declarations (all seems to work ok)
    Changes double quotes to single quotes
    Could not find a UDAC-approved JavaScript validator, so not doing that

2019-01-07: Added additional functionality
    double-click on cell returns it to white
    double-click on targeSubmitButton removes existing grid

    TODO:
    1.  When dragging cursor across page, lines and sometimes
    whole grid turns to color.
    2.  Run through validators and complete assignment.
*/

let colorInput = document.querySelector('#colorPicker');
let targetSubmitButton = document.querySelector('#sizePickerSubmitButton');
let targetDiv = document.querySelector('#pixelCanvas');
let inputForm = document.querySelector('#sizePicker');
let chosenColor = '#000000';

function makeGrid() {
    let inColor = inputForm.value;
    let inHt = inputForm.inputHeight.value;
    let inWh = inputForm.inputWidth.value;
    for(let i = 0; i < inHt; i++){
        console.log ('inHt = ' + inHt);
        let newRow = document.createElement('tr');
        targetDiv.appendChild(newRow);
            for(let j = 0; j < inWh; j++){
                console.log ('inWh = ' + inWh);
                let newCell = document.createElement('td');
                newRow.appendChild(newCell);
                }
    }
}

//2019-01-04: Note syntax in the following, which accesses the event.target
function changeColor(evt) {
    evt.target.style.backgroundColor = chosenColor;
}

colorPicker.addEventListener('input', function () {
    chosenColor = event.target.value;
});

function removeColor(evt) {
    evt.target.style.backgroundColor = '#ffffff';
}

function removeGrid() {
    targetDiv.innerHTML = '';
}

targetSubmitButton.addEventListener('click', makeGrid);

targetDiv.addEventListener('click', changeColor);

targetDiv.addEventListener('dblclick', removeColor);

targetSubmitButton.addEventListener('dblclick', removeGrid);
