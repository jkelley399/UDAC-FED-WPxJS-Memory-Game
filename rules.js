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

2019-01-23:ds
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
2019-01-26:
    feat simple animation as part of mouseOver

    Had modest success with a "dancing" pattern using a series of x && y transforms
        evt.target.animate([
            // keyframes
            {transform: 'translateX(-15px)'},
            {transform: 'translateY(-15px)'},
            {transform: 'translateX(30px)'},
            {transform: 'translateY(30px)'},
            {transform: 'translateX(-30px)'},
            {transform: 'translateY(-15px)'},
            {transform: 'translateX(15px)'},
        ], {
            //timing
            delay: 200,
            //direction: 'alternate',
            duration: 5000,
            iterations: 1
        });
2019-01-27:
    feat simple gradients on boaders && card face down

    WIP: onMouseClick(evt) with several helper functions
    NOTE: so far, couldn't get bootstrap _variables.scss to work

2019-01-28--29:
    fix wrestling with evt.target.outerHTML w some success

    WIP: rewriting onMouseClick(evt) w helper functions failed
    DISC: learned that when using Element.outerHTML,
    "while the element will be replaced in the document,
    the variable whose outerHTML property was set will still hold
    a reference to the original element:..."
    See: https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML#Notes
    So, basically wasted a lot of time creating the helper functions,
    at least those relying upon Element.outerHTML.

    NOTE: did, however, get the right color values to match Bootstrap 4
    using Chrome Developer Tools

2019-01-30--31:
    fix wrestling with onMouseClickNEW(evt) w some success

    DISC: reminded once again of need to look for simple mistakes in logic tests,
    but did stick with it and figured out the problem.
    EXPLR: how scopes work with event handlers

    TODO:
    0.  Check style guide re single vs. double quotes; fix inconsistencies (probably single)
    1.  DONE: Check on whether really using makeCards()
    2.  Start adding play functionality
        A.  DONE: REVIEW EVENT DELEGATION
        B.  DONE: Fix the mouseover eventListener to work on individual cards, not rows
    3.  Add styling
        -B. CHANGE ALL outerHTML to classList!!!
        -A. TEST FOR CASE WHERE PERSON CLICKS ON THE SAME CARD TWICE
        A.  Example has
            (i) Pre-guess
                (a) X && Y color gradients on borders
                (b) black face down cards
                    NOTE: Have pseudo-Bootstrap-info face down cards at present
                (c) background color and icons on face up cards
            (ii) First click
                (a) background color of the card changes to blue when it's been clicked
            (iii) Correct guess
                (a) two cards expand and contract diagonally
            (iv) Incorrect guess
                (a) background color of both cards changes to red
                (b) two cards shake side to side
            (v) Winning game
                (a) page changes, "Congratulations," etc.
        B.  DONE: REVIEW JS ANIMATION
        C.  DONE: REVIEW COLOR STYLING WITH BOOTSTRAP
        D.  WIP RE STYLING
            (i) Pre-guess
                (a) DONE: X && Y color gradients on borders
                (b) DONE: black face down cards
                    NOTE: Have white face down cards at present

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
        C.  Figure out how to use Bootstrap with Sass options --> see Medium article
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


// This function generates cards by iterating over suit and rank
function makeCards() {
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            let card = rank + suit;
            cards.push(card);
        });
    });
    console.log(cards);
}

let board = {
     boardState: "preBoard", //preBoard, transBoard, postBoard; re state of game
     // messages: ["First message.", "Second message.", "Third message."],

     // state information about cards being clicked and clickCount stored in board object
     firstCardState: "notClicked", //notClicked, clicked,
     firstCardValue: "", //empty, card Value (e.g., "4S" || "10C")
     secondCardState: "notClicked", //notClicked, clicked,
     secondCardValue: "", //empty, card Value (e.g., "4S" || "10C")
     cardClickCount: 0, // 0, 1, 2
     onMouseClickTextColorError: 0, // 0, 1

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


// This function takes an array as input and then doubles it [x,y,z] -> [x,y,z,x,y,z]
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
    // console.log("The textContent of evt.target is: " + evt.target.textContent);
    // console.log("The textContent.length of evt.target is: "
    //     + evt.target.textContent.length);
    // console.log("The nodeName of evt.target is: " + evt.target.nodeName);
    // console.log("The Node.firstChild of evt.target is: " + evt.target.firstChild);
    // console.log("The innerHTML of evt.target is: " + evt.target.innerHTML);
    // console.log("The outerHTML of evt.target is: " + evt.target.outerHTML);
    //OPTIONAL: Add tests here if desired, e.g., test whether
    //          (a) textContent has acceptable syntax, using regex
    //          (b) use None.noneType to test if mouseOver is on an element_node
    if ((evt.target.textContent.length >= 2) && (evt.target.textContent.length <= 6)) {
        // console.log("mouseOver a card div");
        console.log("");
        //TODO: Add a color transformation on evt.target, preferably with bootstrap

        // 2019-01-27: For time being, commenting out animation
        // evt.target.animate([
        //     // keyframes
        //     {transform: 'translateX(-15px)'},
        //     {transform: 'translateY(-15px)'},
        //     {transform: 'translateX(30px)'},
        //     {transform: 'translateY(30px)'},
        //     {transform: 'translateX(-30px)'},
        //     {transform: 'translateY(-15px)'},
        //     {transform: 'translateX(15px)'},
        // ], {
        //     //timing
        //     delay: 200,
        //     //direction: 'alternate',
        //     duration: 5000,
        //     iterations: 1
        // });
    } else if ((evt.target.textContent.length >= 8) && (evt.target.textContent.length <= 12)) {
        // console.log("mouseOver a row-of-cards div");
        console.log("");
    } else {
        // console.log("ERROR: mouse is mouseOver neither card nor row of cards.");
        console.log("");
    }
}

//Helper function for cardMatchSetupError
function cardMatchSetupError() {
    console.log("In cardMatchSetupError(evt)");
}

//Parameters are two ???
//TODO: How to get card IDs?
function sameCardClickedTwiceQuery (ci1, ci2) {
    let cardId1 = ci1;
    let cardId2 = ci2;
    if (cardId1 === cardId2) {
        return true;
    } else {
        return false;
    }
}

//NOTE: PROBABLY DON'T NEED THIS, BECAUSE THAT'S WHAT'S IN OBJECT
//Helper function for number cards clicked
//TODO: How to get card IDs?
// function numberCardsClicked() {
//     if (board.cardClickCount === cardId2) {
//         return true;
//     } else {
//         return false;
//     }
// }



//Parameters are two strings
function doDifferentCardsMatchQuery (vc1, vc2) {
    let valueCard1 = vc1;
    let valueCard2 = vc2;
    if (valueCard1 == valueCard2) {
        return true;
    } else {
        return false;
    }
}

//Helper function to turn text-info to text-dark
function textInfoToTextDark (evt) {
    let stHidden = "text-info";
    let sti = "text-dark";
    evt.target.outerHTML = evt.target.outerHTML.replace(stHidden, sti);
}



//Helper function for cardsDoMatch alternative
function cardsDoMatch () {console.log("");
}

// Helper function for cardsDoNotMatch alternative
function cardsDoNotMatch () {console.log("");
}

//MAIN FUNCTION
//Display or hide value based on whether same card is clicked twice in a row
function onCardMouseClick(evt) {
    //setup global strings

    //setup helper functions
//Helper function to add .card card-background-up-color to .card
    function cardToBackgroundColor(e) {
        let stHidden = "card";
        let sti = "card card-background-up-color"
        e.target.outerHTML = e.target.outerHTML.replace(stHidden, sti);
    }

    console.log("In onCardMouseClick(evt) with evt.target = " + evt.target);

    //if error in setup, return setup error
    cardMatchSetupError(evt);

    //wait for first click; on first click:
    //update states:
    // if (board.clickCount == 0) {
    if (true) {
        console.log("Before click, board.clickCount = " + board.clickCount);
        board.firstCardState = "clicked";
        board.firstCardValue = evt.target.innerHTML;
        board.clickCount += 1;
        console.log("After click, board.clickCount = " + board.clickCount);

        //change first card's text color and background color
        let str1 = "card";
        let sti1 = "card card-background-up-color";
        let str2 = "text-info";
        let sti2 = "text-dark";

        if ((evt.target.outerHTML.includes("card")) && (board.firstCardState = "clicked")) {
            textInfoToTextDark (evt);
            cardToBackgroundColor (evt);
        }
    }
}

/*wait for second click
on second click, update states, check to see if second card == first card
    if second card == first card,
        update states,
        change first card's text color back, and
        change first card's background color back
    if second card != first card
        update states,
        change second card's text color, and
        change second card's background color
        test whether second card's value == first card's value
            if second card's value != first card's value
                    run mismatch animation
                    update states
                    change first card's text color back, and
                    change first card's background color back
            if second car's value == first card's value
                    run match animation
                    change states
            test whether sum of cards matched == maximum number matches
                if sum of cards matched != maximum number matches
                    wait for first click
                if sum of cards matched == maximum number matches
                    update states
                    run completion animation
                    go to next page
*/


/*
CURRENT WORKING HYPOTHESIS: NL sketch of onCardMouseClick(evt)

setup global strings
if error in setup, return setup error
wait for first click
on first click,
    update states,
    change first card's text color, and
    change first card's background color
wait for second click
on second click, update states, check to see if second card == first card
    if second card == first card,
        update states,
        change first card's text color back, and
        change first card's background color back
    if second card != first card
        update states,
        change second card's text color, and
        change second card's background color
        test whether second card's value == first card's value
            if second card's value != first card's value
                    run mismatch animation
                    update states
                    change first card's text color back, and
                    change first card's background color back
            if second car's value == first card's value
                    run match animation
                    change states
            test whether sum of cards matched == maximum number matches
                if sum of cards matched != maximum number matches
                    wait for first click
                if sum of cards matched == maximum number matches
                    update states
                    run completion animation
                    go to next page
*/

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

            const newCardHtml = '<div class="card card-background-color-down text-info border border-dark text-center col-2 m-1">'+
                                cardSubsetRandom + '</div>';
            newDimensionsCardHtml += newCardHtml;
        }
        const newRowDiv = document.createElement('div');
        boardFragment.appendChild(newRowDiv);
        const newRowHtml =  '<div class="row four-cards justify-content-center">' +
                            newDimensionsCardHtml + '</div>';
        newRowDiv.innerHTML = newRowHtml;
    }
    targetDiv.appendChild(boardFragment);
    board.boardState = "transBoard";
    console.log("2nd board.boardState is " + board.boardState);
 }

//TRYING TO FIGURE OUT ERROR: "rules.js:308 Uncaught DOMException:
// Failed to set the 'outerHTML' property on 'Element':
// This element has no parent node."
// Problem seems to be that when you set outerHTML, the variable points
// to the old parent element
function onMouseClickNEW(evt) {
    // TODO: Will not need these once helper functions working
    let clickedDivClassList = evt.target.classList;
    // console.log(clickedDivClassList);

    let hiddenText = "text-info";
    let darkText = "text-dark";
    let backgroundDownColor = "card-background-color-down";
    let backgroundUpColor = "card-background-color-up";
    let backgroundCorrectColor = "card-background-color-correct";
    let backgroundIncorrectColor = "card-background-color-incorrect";
    let firstClickedCardClass = "first-card-clicked";

    if ((clickedDivClassList.contains("card")) && (board.firstCardState == "notClicked")) {
        board.firstCardState = "clicked";
        board.firstCardValue = evt.target.textContent;
        clickedDivClassList.replace(hiddenText, darkText);
        clickedDivClassList.add(firstClickedCardClass);
        console.log("First clicked card value  = " + board.firstCardValue);

    } else if ((clickedDivClassList.contains("card")) && (board.firstCardState == "clicked")) {
        board.secondCardState = "clicked";
        board.secondCardValue = evt.target.textContent;
        clickedDivClassList.replace(hiddenText, darkText);
        let firstClickedCardDiv = document.querySelector('.first-card-clicked');
        if (board.firstCardValue == board.secondCardValue) {
            // let firstClickedCardDiv = document.querySelector('.first-card-clicked');
            firstClickedCardDiv.classList.replace(backgroundDownColor, backgroundCorrectColor);
            clickedDivClassList.replace(backgroundDownColor, backgroundCorrectColor);
            window.alert("Congratulations!  The first and second cards match!");
            firstClickedCardDiv.classList.remove(firstClickedCardClass);
        } else {
            // let firstClickedCardDiv = document.querySelector('.first-card-clicked');
            firstClickedCardDiv.classList.replace(backgroundDownColor, backgroundIncorrectColor);
            // TODO: 2019-01-31: clickedDivClassList ISN'T WORKING
            //          WHAT IS ITS VALUE HERE?
            clickedDivClassList.replace(backgroundDownColor, backgroundIncorrectColor);
            clickedDivClassList.replace(hiddenText, darkText);
            window.alert("I'm sorry.  The first and second cards did not match.");
            firstClickedCardDiv.classList.replace(darkText, hiddenText);
            firstClickedCardDiv.classList.remove(firstClickedCardClass);
            clickedDivClassList.replace(backgroundIncorrectColor, backgroundDownColor);
            clickedDivClassList.replace(darkText, hiddenText);
            board.firstCardState = "notClicked";
            board.secondCardState = "notClicked";
            clickedDivClassList.remove(firstClickedCardClass);
        }
    }
}



console.log("1st board.boardState is " + board.boardState);



playInput.addEventListener('click', startGame);

// 2019-01-23: TODO: Fix this so it works only on individual cards, not rows
targetDiv.addEventListener('mouseover', onMouseoverCard);

targetDiv.addEventListener('click', onMouseClickNEW);


