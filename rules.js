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

2019-01-18:
    created const newRowHtmlString
    got newRowHtmlString into targetDiv
    PROBLEM: targetDiv not adjusting on repeated cycles

2019-01-19:
    Problem re targetDiv not adjusting on repeated cycles was caused by
    my not remembering that you can't use appendChild to repeatedly
    add the same element.  See:
        https://stackoverflow.com/questions/36635392/how-to-appendchildelement-many-times-the-same-element
        https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
    Choice then becomes whether to use cloneNode or DocumentFragment
    Decided to use DocumentFragment, but it took me a while to figure out for loops.
    Started working on makeCards()

2019-01-20:
    feat created randomIntInRange(minInt, maxInt) & modified startGame()

    added randomizing ranks and suits to cards in startGame()

    TODO:
    1.  Need to add constraints to the random selection, so that
        A.  Will always have two cards that will "match"
        B.  Cannot have duplicates of the same cards
            (i) E.g., only one AS per board
    1.  board object
        A.  CREATE CONTENTS OF BOARD USING LOOPS
        B.  enhance project by choosing randomly from standard card deck
    2.  card object
    3.  FUTURE
        A.  Figure out why I couldn't use an object.method with eventListener (2019-01-17)
*/

// TODO: revise to add spot for changing three screens - will be container
const playInput = document.querySelector('#pre-game-button');
const boardFragment = document.createDocumentFragment();
const newRow = document.createElement('div');
const playInputNew = document.querySelector('#pre-game-button');
const targetDiv = document.querySelector('#board');
const suits = ['C', 'D', 'H', 'S'];
const ranks = ['A','K','Q','J','10','9','8','7','6','5','4','3','2','Joker',]
let cards = '';

function makeCards() {
    for (let i = 0; i < 4; i++) {
        cards += suits[i];
    }
    console.log(cards);
}

// NOTE: This function is based on getRandomInt(max) in MDN - see references for Math.random()
// TODO: Add tests (e.g., ensure both parameters are integers && maxInt >= minInt)
//       Add fixes (if maxInt < minInt, then switch)

function randomIntInRange(minInt, maxInt) { //input, two integers
    // If either parameter is not an integer, its floor value != origiinal parameter
    let floorMinInt = Math.floor(minInt);
    let floorMaxInt = Math.floor(maxInt);
    deltInt = floorMaxInt - floorMinInt;
    // Expected output integer from minInt to (maxInt -1)
    return (floorMinInt + Math.floor(Math.random() * Math.floor(deltInt)));
    console.log(deltInt);
}

// uses suits.length, because randomIntInRange ranges over first-last index of array
// let suitsRandom = suits[randomIntInRange(0,suits.length)];
// use ranks.length, because randomIntInRange ranges over first-last index of array
// let ranksRandom = ranks[randomIntInRange(0,ranks.length)];

// TODO: create constants --- height; width; possible (playing) cards (nested for loops)

let board = {
     state: "neutral", //initial, pre, trans, post; re state of game
     // messages: ["First message.", "Second message.", "Third message."],

     startGame: function strtGm() {
        console.log("board.startGame() called");
        console.log("#pre-game-button clicked!");
     },

     makeCards: function mkCrds() {
        console.log("board.makeCards() called");
     },

     displayCards: function dsplyCrds() {
        console.log("board.displayCards() called");
     }
 };

 function startGame() {
    // console.log("board.startGameSimple() called");
    makeCards();
    for (let i = 0; i < 4; i++) {
        let newFourCardHtml = '';
        for (let j = 0; j < 4; j++) {
            // uses suits.length, because randomIntInRange ranges over
            // first-last index of array
            let suitsRandom = suits[randomIntInRange(0,suits.length)];
            // use ranks.length, because randomIntInRange ranges over
            //first-last index of array
            let ranksRandom = ranks[randomIntInRange(0,ranks.length)];
            const newCardHtml = '<div class="card col-2 m-1">'
                                + ranksRandom + suitsRandom + '</div>';
            newFourCardHtml += newCardHtml;
        }

        const newRowDiv = document.createElement('div');
        boardFragment.appendChild(newRowDiv);
        const newRowHtml =  '<div class="row four-cards justify-content-center">' +
                            newFourCardHtml + '</div>';
        newRowDiv.innerHTML = newRowHtml;
    }
    targetDiv.appendChild(boardFragment);
 }

playInput.addEventListener('click', startGame);

// OLD WIP CODE BELOW

// const newRowHtmlString =    '<div class="row four-cards justify-content-center">' +
//                                 '<div class="card col-2 m-1">' +
//                                     'w2' +
//                                 '</div>' +
//                                 '<div class="card col-2 m-1">' +
//                                     'x2' +
//                                 '</div>' +
//                                 '<div class="card col-2 m-1">' +
//                                     'y2' +
//                                 '</div>' +
//                                 '<div class="card col-2 m-1">' +
//                                     'z2' +
//                                 '</div>' +
//                             '</div>'

// function startGameFunction() {
//         //
//         console.log("board.startGame() called");
//         targetDiv.appendChild(newRow);
//         let targetDivLastChild = targetDiv.lastElementChild;
//         targetDivLastChild.innerHTML = newRowHtmlString;
//         console.log("targetDiv.innerHTML = " + targetDiv.innerHTML);
//         console.log("targetDiv.childElementCount = " + targetDiv.childElementCount);
//         console.log("targetDiv.lastElementChild.innerHTML = " + targetDiv.lastElementChild.innerHTML);
//      }

// OLD EXERCISE CODE BELOW

// targetSubmitButton.addEventListener('click', makeGrid);

// targetDiv.addEventListener('click', changeColor);

// targetDiv.addEventListener('dblclick', removeColor);

// targetSubmitButton.addEventListener('dblclick', removeGrid);


// function makeGrid() {
//     let inColor = inputForm.value;
//     let inHt = inputForm.inputHeight.value;
//     let inWh = inputForm.inputWidth.value;
//     for(let i = 0; i < inHt; i++){
//         console.log ('inHt = ' + inHt);
//         let newRow = document.createElement('tr');
//         targetDiv.appendChild(newRow);
//             for(let j = 0; j < inWh; j++){
//                 console.log ('inWh = ' + inWh);
//                 let newCell = document.createElement('td');
//                 newRow.appendChild(newCell);
//                 }
//     }
// }

// //2019-01-04: Note syntax in the following, which accesses the event.target
// function changeColor(evt) {
//     evt.target.style.backgroundColor = chosenColor;
// }

// // colorPicker.addEventListener('input', function () {
// //     chosenColor = event.target.value;
// // });

// function removeColor(evt) {
//     evt.target.style.backgroundColor = '#ffffff';
// }

// function removeGrid() {
//     targetDiv.innerHTML = '';
// }


// let savingsAccount = {
//     balance: 1000,
//     interestRatePercent: 1,
//     deposit: function addMoney(amount) {
//         if (amount > 0) {
//             savingsAccount.balance += amount;
//         }
//     },
//     withdraw: function removeMoney(amount) {
//         var verifyBalance = savingsAccount.balance - amount;
//         if (amount > 0 && verifyBalance >= 0) {
//             savingsAccount.balance -= amount;
//         }
//     },
//     printAccountSummary: function prntAcctSum() {
//         var out =
//             ("Welcome!\n" +
//             "Your balance is currently $" +
//             savingsAccount.balance +
//             " and your interest rate is " +
//             savingsAccount.interestRatePercent +
//             "%.");
//          return out;

//     }
//     // your code goes here
// };

// console.log(savingsAccount.printAccountSummary());



// var donuts = [
//     { type: "Jelly", cost: 1.22 },
//     { type: "Chocolate", cost: 2.45 },
//     { type: "Cider", cost: 1.59 },
//     { type: "Boston Cream", cost: 5.99 }
// ];

// donuts.forEach(function(donut) {
//     console.log(donut.type + " donuts cost $" + donut.cost + " each")
// });

// let board = {
//      state: "neutral", //initial, pre, trans, post; re state of game
//      // friends: 10,
//      // messages: ["First message.", "Second message.", "Third message."],

//      startGame: function strtGm() {
//         //
//         console.log("board.startGame() called");
//         console.log("#pre-game-button clicked!");
//      },

//      makeCards: function mkCrds() {
//         console.log("board.makeCards() called");
//      },

//      displayCards: function dsplyCrds() {
//         console.log("board.displayCards() called");
//      }

//      // postMessage: function postMsg(message) {
//      //     facebookProfile.messages.push(message);
//      // },
//      // deleteMessage: function delMsg(index) {
//      //     facebookProfile.messages.splice(index, 1);
//      // },
//      // addFriend: function addFrnd() {
//      //     facebookProfile.friends += 1;
//      // },
//      // removeFriend: function rmvFrnd() {
//      //     facebookProfile.friends -= 1;
//      // }
//  };