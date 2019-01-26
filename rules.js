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

2019-01-21:
    feat startGame produces matching cards; fixed makeCards

    startGame now produces 8x2 matching cards, not 16 random cards
    fixed makeCards to use forEach instead of for loops
    added new doubleArray function (took a while to figure out)
    Updated TODO to include play functionality, styling, hiding, etc.

2019-01-23:
    fix got the mouseover eventListener to finally work

    Problem was that I had the wrong target (adding to to board).
    Solution was to add it to targetDiv
    New issue will be to get it to only work on individual cards,
    because it's currently working on entire rows.

2019-01-25:
    feat syntax & simple tests to discriminate cards from rows of cards

    Key is to use the textContent of divs that can be single card or groups of cards
    First use is simply in console.log statements:

    if ((evt.target.textContent.length >= 2) && (evt.target.textContent.length <= 6)) {
        console.log("The mouse is mouseOver a div that is a card.");
    } else if ((evt.target.textContent.length >= 8) && (evt.target.textContent.length <= 12)) {
        console.log("The mouse is mouseOver a div that is a row of cards.");
    } else {
        console.log("ERROR: mouse is mouseOver neither card nor row of cards.");
    }


    TODO:
    0.  Check style guide re single vs. double quotes; fix inconsistencies (probably single)
    1.  DONE: Check on whether really using makeCards()
    2.  Start adding play functionality
        A.  ***REVIEW EVENT DELEGATION
        B.  Fix the the mouseover eventListener to work only on individual cards, now rows
    3.  Add styling
    4.  Add "hiding" of different pages
    5.  Figure out how to move the functions into methods
    6.  DONE: Need to add constraints to the random selection, so that
        A.  Will always have two cards that will "match"
        B.  Cannot have duplicates of the same cards
            (i) E.g., only one AS per board
    7.  board object
        A.  CREATE CONTENTS OF BOARD USING LOOPS
        B.  enhance project by choosing randomly from standard card deck
    8.  card object
    9.  FUTURE
        A.  Figure out why I couldn't use an object.method with eventListener (2019-01-17)
        B.  Turn the "let cardRandom = remainingCards..." processes in a function (2019-01-22)
*/

// TODO: revise to add spot for changing three screens - will be container
const playInput = document.querySelector('#pre-game-button');
const boardFragment = document.createDocumentFragment();
const newRow = document.createElement('div');
const targetDiv = document.querySelector('#board');
const numberCards = 16;
const dimensions = Math.sqrt(numberCards);

// function makeCardsOld() {
//     for (let i = 0; i < 4; i++) {
//         for (let j = 0; j < 13; i++) {
//         cards.push(suits[i]+ranks[j]);
//         }
//     }
// }

const suits = ['C', 'D', 'H', 'S'];
const ranks = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']
let cards = [];

function makeCards() {
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            let card = rank + suit;
            cards.push(card);
        });
    });
    console.log(cards);
}


function doubleArray(x) {
    x.forEach(function(value) {
        x.push(value);
    });
    return x;
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

// 2019-01-23: TODO: Fix this so it works only on individual cards, not rows
// To do this, can experiment with an if/else statement for different responses
// depending on the characteristics of the div
// But remember to look at the lesson about capitalization
// See: "The nodeName's Capitalization" in
// https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/04eb38bd-45e1-4a58-98c8-1e6f1e770438/lessons/f270dbcf-eb43-4ce3-b7be-a74d26023496/concepts/85463be2-3206-434e-aa39-4604965daa29
function onMouseoverCard(evt) {
    console.log("The textContent of evt.target is: " + evt.target.textContent);
    console.log("The textContent.length of evt.target is: "
        + evt.target.textContent.length);
    console.log("The nodeName of evt.target is: " + evt.target.nodeName);
    console.log("The Node.firstChild of evt.target is: " + evt.target.firstChild);
    if ((evt.target.textContent.length >= 2) && (evt.target.textContent.length <= 6)) {
        console.log("The mouse is mouseOver a div that is a card.");
    } else if ((evt.target.textContent.length >= 8) && (evt.target.textContent.length <= 12)) {
        console.log("The mouse is mouseOver a div that is a row of cards.");
    } else {
        console.log("ERROR: mouse is mouseOver neither card nor row of cards.");
    }
}

// uses suits.length, because randomIntInRange ranges over first-last index of array
// let suitsRandom = suits[randomIntInRange(0,suits.length)];
// use ranks.length, because randomIntInRange ranges over first-last index of array
// let ranksRandom = ranks[randomIntInRange(0,ranks.length)];

// TODO: create constants --- height; width; possible (playing) cards (nested for loops)

let board = {
     state: "preBoard", //preBoard, transBoard, postBoard; re state of game
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

console.log("1st board.state is " + board.state);

//TODO: Get this to work with 8 matching cards, instead of 16 random cards
function startGame() {
    makeCards();
    // using chosenCards to (a) avoid duplication and (b) create set for duplication
    let remainingCards = cards;
    let chosenCards = [];
    let removedCards = [];

    for (let h = 0; h < (dimensions * 2); h++) {
        // uses remainingCards.length, because randomIntInRange ranges over
        // first-last index of array
        // TODO Turn the "let cardRandom = remainingCards..." processes in a function
        let cardRandom = remainingCards[randomIntInRange(0,remainingCards.length)];
        let cardRandomIndex = remainingCards.indexOf(cardRandom);
        removedCard = remainingCards.splice(cardRandomIndex, 1);
        removedCards.push(removedCard[0]);
    }

    let cardsSubset = doubleArray(removedCards);

    console.log(cardsSubset);

    let displayedCards = [];

    for (let i = 0; i < dimensions; i++) {
        let newDimensionsCardHtml = '';
        for (let j = 0; j < dimensions; j++) {
            // uses cardsSubset.length, because randomIntInRange ranges over
            // first-last index of array
            let cardSubsetRandom = cardsSubset[randomIntInRange(0,cardsSubset.length)];
            let cardSubsetIndex = cardsSubset.indexOf(cardSubsetRandom);
            displayCard = cardsSubset.splice(cardSubsetIndex, 1);
            displayedCards.push(displayCard);

            const newCardHtml = '<div class="card col-2 m-1">'+ cardSubsetRandom + '</div>';
            newDimensionsCardHtml += newCardHtml;
        }
        const newRowDiv = document.createElement('div');
        boardFragment.appendChild(newRowDiv);
        const newRowHtml =  '<div class="row four-cards justify-content-center">' +
                            newDimensionsCardHtml + '</div>';
        newRowDiv.innerHTML = newRowHtml;
    }
    targetDiv.appendChild(boardFragment);
    board.state = "transBoard";
    console.log("2nd board.state is " + board.state);
 }

playInput.addEventListener('click', startGame);

// 2019-01-23: TODO: Fix this so it works only on individual cards, not rows
targetDiv.addEventListener('mouseover', onMouseoverCard);


// TODO: Fix error that occurs when I have the following at 197 ---
//      Tried to move inside the startGame function didn't work either.
//      Tried inside an IF that tests for existence of new divs, but didn't work either
// if (board.state = "transBoard") {
//     board.addEventListener('mouseover', onMouseoverCard);
// };
//         Thesis - look for help

// ****TODO*** board.addEventListener('mouseover', onMouseoverCard);

// function startGameOld() {
//     makeCards();
//     // using chosenCards to (a) avoid duplication and (b) create set for duplication
//     let remainingCards = cards;
//     let chosenCards = [];
//     let removedCards = [];
//     for (let i = 0; i < dimensions; i++) {
//         let newDimensionsCardHtml = '';
//         for (let j = 0; j < dimensions; j++) {
//             // uses remainingCards.length, because randomIntInRange ranges over
//             // first-last index of array
//             console.log("remainingCards.length is  " + remainingCards.length);
//             let cardRandom = remainingCards[randomIntInRange(0,remainingCards.length)];
//             console.log("cardRandom is  " + cardRandom);
//             console.log("remainingCards.length is  " + remainingCards.length);
//             let cardRandomIndex = remainingCards.indexOf(cardRandom);
//             console.log("cardRandomIndex is  " + cardRandomIndex);
//             removedCard = remainingCards.splice(cardRandomIndex, 1);
//             removedCards.push(removedCard);
//             console.log("after splice, remainingCards.length is now " + remainingCards.length);
//             console.log("remainingCards are " + remainingCards);
//             console.log("after splice, removedCards.length is now " + removedCards.length);
//             console.log("removedCards are " + removedCards);
//             // let remainingCards = 1;// TODO: figure this out

//             const newCardHtml = '<div class="card col-2 m-1">'+ cardRandom + '</div>';
//             newDimensionsCardHtml += newCardHtml;
//         }
//         const newRowDiv = document.createElement('div');
//         boardFragment.appendChild(newRowDiv);
//         const newRowHtml =  '<div class="row four-cards justify-content-center">' +
//                             newDimensionsCardHtml + '</div>';
//         newRowDiv.innerHTML = newRowHtml;
//     }
//     targetDiv.appendChild(boardFragment);
//  }


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