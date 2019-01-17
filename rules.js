/*
2019-01-16:
    Initial commit

    Sketch of overall flow:
    Select board input
    Generate board
    Select card input
    Test and generate cards
    End game

2019-01-17:
    3-state Bootstrap skeleton w 1st eventListener
    PROBLEM: couldn't use board.startGame() with eventListener
    QUICK-FIX: created new startGameFunction()

    TODO:
    1.  board object
        A.  CREATE CONTENTS OF BOARD USING LOOPS
        B.  enhance project by choosing randomly from standard card deck
    2.  card object
    3.  FUTURE
        A.  Figure out why I couldn't use an object.method with eventListener (2019-01-17)
*/


// TODO: revise to add spot for changing three screens - will be container
let playInput = document.querySelector('#pre-game-button');

// TODO: create constants --- height; width; possible (playing) cards (nested for loops)
let chosenColor = '#000000';

let board = {
     state: "neutral", //initial, pre, trans, post; re state of game
     // friends: 10,
     // messages: ["First message.", "Second message.", "Third message."],

     startGame: function strtGm() {
        //
        console.log("board.startGame() called");
        console.log("#pre-game-button clicked!");
     },

     makeCards: function mkCrds() {
        console.log("board.makeCards() called");
     },

     displayCards: function dsplyCrds() {
        console.log("board.displayCards() called");
     }

     // postMessage: function postMsg(message) {
     //     facebookProfile.messages.push(message);
     // },
     // deleteMessage: function delMsg(index) {
     //     facebookProfile.messages.splice(index, 1);
     // },
     // addFriend: function addFrnd() {
     //     facebookProfile.friends += 1;
     // },
     // removeFriend: function rmvFrnd() {
     //     facebookProfile.friends -= 1;
     // }
 };


let savingsAccount = {
    balance: 1000,
    interestRatePercent: 1,
    deposit: function addMoney(amount) {
        if (amount > 0) {
            savingsAccount.balance += amount;
        }
    },
    withdraw: function removeMoney(amount) {
        var verifyBalance = savingsAccount.balance - amount;
        if (amount > 0 && verifyBalance >= 0) {
            savingsAccount.balance -= amount;
        }
    },
    printAccountSummary: function prntAcctSum() {
        var out =
            ("Welcome!\n" +
            "Your balance is currently $" +
            savingsAccount.balance +
            " and your interest rate is " +
            savingsAccount.interestRatePercent +
            "%.");
         return out;

    }
    // your code goes here
};

console.log(savingsAccount.printAccountSummary());



// var donuts = [
//     { type: "Jelly", cost: 1.22 },
//     { type: "Chocolate", cost: 2.45 },
//     { type: "Cider", cost: 1.59 },
//     { type: "Boston Cream", cost: 5.99 }
// ];

// donuts.forEach(function(donut) {
//     console.log(donut.type + " donuts cost $" + donut.cost + " each")
// });


function startGameFunction() {
        //
        console.log("board.startGame() called");
        console.log("#pre-game-button clicked!");
     }


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

// colorPicker.addEventListener('input', function () {
//     chosenColor = event.target.value;
// });

function removeColor(evt) {
    evt.target.style.backgroundColor = '#ffffff';
}

function removeGrid() {
    targetDiv.innerHTML = '';
}

playInput.addEventListener('click', startGameFunction);

// targetSubmitButton.addEventListener('click', makeGrid);

// targetDiv.addEventListener('click', changeColor);

// targetDiv.addEventListener('dblclick', removeColor);

// targetSubmitButton.addEventListener('dblclick', removeGrid);
