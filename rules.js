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

2019-02-02--04:
    fix continuing to wrestle with onMouseClickNEW(evt) w some success

    Got the all correct branch of the logic working.
    Appear to have gotten the incorrect branch of the logic working.
    DISC: When in doubt, step through carefully and completely.
    Still have problem with actually displaying the incorrect branch
    when not in debug mode.
    HYPO: Solve with setTimeout() method.

2019-02-05--08:
    fix: continuing wrestling with onMouseClickNEW(evt) with more success

    Got animation working on both correct and incorrect branches after
        (1) changing the eventListener to act during the capturing phase; and
        (2) commenting out the resetting of the incorrect to down color for the incorrect branch
    KEY RESOURCES:  (1) MDN basics re web annimations;
                    (2) https://github.com/web-animations/web-animations-js/issues/14
                    The latter, in particular, helped me to undertand that you need to have
                    multi-element keyframe transformations.  This occurred after I was getting
                    an "Failed to execute 'animate' on 'Element': Partial keyframes are not supported."
                    error message.
    TODO:   Still can't seem to get the incorrect branch background color and text color to persist
            during and slightly after the animation.  Some ideas about how to proceed:
            (1) Call a timeout before things change.
            (2) Move the change outside the current function (e.g., on mouse move out of the card)
            (3) Reset the color in the animation (if that's possible)
            (4) Dig deeper, and see if I can access and use the animation timeline

2019-02-09--10:
    feat: Added basic functions for winning game, but WIP

    function makeConfetti()
    function iterateCorrectCardCount()
    function testMaxCorrectCardCount()
    function iterateCardClickCount()
    function testMaxCardClickCount()

    TODO: Hide other pages to start
    TODO: Style h1s
    TODO: Confetti animation

2019-02-11:
    feat: Hiding and unhiding pages

    TODO: Confetti animation in makeConfetti()
    TODO: Style h1s

2019-02-12--14:
    feat: Separate animation function for makeConfetti()

    function anmiateConfetti()
    function randomSign()
    function quoteRGBColor(x,y,z)
    function translateXorYString(axis,sign,perCent)

    2019-02-17: Added row-based randomization

    TODO: continue animateConfetti() keyframe experimentation
    TODO: Item-based randomization
    TODO: figure out faster way to test animateConfetti() cycle
    TODO: hideDiv('#confetti'); at end --- having difficulty with it
    TODO: Fix the green display of the last correct pair
    TODO: Prevent
        (a) clicking correct cardd
        (b) clicking same card twice
    TODO: Change incorrect animation so the color reverts at end

    GENERAL TODO:
    0.  eventHandler: Really try:
        A.  to understand why I keep having problems when I add these to onMouseClickNEW(evt); and
        B.  to figure out:
            (i)     what to do to prevent that from happening in the future; and
            (ii)    how to correct the problem when it does occur.
    1.  MISC
        A.  Check style guide re single vs. double quotes; fix inconsistencies (probably single)
        B.  DONE: Check on whether really using makeCards()
        C.  Add functionality so that once cards have been matched, you can't click on them again.
        D.  Add functionality so that once card is clicked on, it can't match against itself
                Currently that yields a correct
        E.  Add count on correctly matched cards, to determine when game is won.
        F.  DONE:   Enhance project by choosing randomly from standard card deck
        G.  Update Bootstrap link
        H.  Comment out the console.log statements when finished
    2.  Start adding play functionality
        A.  DONE: REVIEW EVENT DELEGATION
        B.  DONE: Fix the mouseover eventListener to work on individual cards, not rows
        C.  TODO: Reset incorrect matches to face down after a pause
        C.  TODO: Add board reset functionality in testMaxCardClickCount()
        D.  TODO: Handle and add selector for 8, 16, or 32 cards
        E.  TODO: Prevent 2x clicks on same card
        F.  TODO: Prevent repeated clicks on cards in a positive match
    3.  Add styling
        A.  DONE: Change all outerHTML to classList!!!
        B.  TODO: Fix the text layout on index.html
        C.  Example has
            (i) Pre-guess
                (a) DONE: X && Y color gradients on borders
                (b) DONE SORT OF: black face down cards
                    NOTE: Have pseudo-Bootstrap-info face down cards at present
                (c) background color and icons on face up cards
            (ii) First click
                (a) DONE SORT OF (DIFFERENT COLOR) background color of the card changes
                    to blue when it's been clicked
            (iii) DONE SORT OF (DIFFERENT ANIMATION) Correct guess
                (a) two cards expand and contract diagonally
            (iv) DONE SORT OF (DIFFERENT ANIMATION) Incorrect guess
                (a) background color of both cards changes to red
                (b) two cards shake side to side
            (v) WIP: Winning game
                (a) Add test mechanism to basic logic
                (b) If game over, page changes, "Congratulations," etc.
        D.  DONE: REVIEW JS ANIMATION
        E.  DONE: REVIEW COLOR STYLING WITH BOOTSTRAP
    4.  Add "hiding" of different pages
    5.  TODO (MAYBE SAVE FOR FUTURE): Better object architecture
        A.  Figure out how to move the functions into methods
        B.  board object
            (i) DONE SORT OF: Create contents of board using loops
                Have that in a function
        C.  Card object
    6.  DONE: Need to add constraints to the random selection, so that
        A.  Will always have two cards that will "match"
        B.  Cannot have multiple duplicates of the same cards
            (i) E.g., only two ASs per board
    7.  FUTURE
        A.  Figure out why I couldn't use an object.method with eventListener (2019-01-17)
        B.  Turn the "let cardRandom = remainingCards..." processes in a function (2019-01-22)
        C.  Figure out how to use Bootstrap with Sass options --> see Medium article
*/

// TODO: revise to add spot for changing three screens - will be container
const playInput = document.querySelector('#pre-game-button');
const boardFragment = document.createDocumentFragment();
const confettiFragment = document.createDocumentFragment();
const newRow = document.createElement('div');
const targetDiv = document.querySelector('#board');
const confettiDiv = document.querySelector('#confetti');
const numberCards = 16;
// TODO: Handle and add selector for 8, 16, or 32 cards
const maxCardsMultiplier = 2; // Natural number
const dimensions = Math.sqrt(numberCards);
const hiddenClass = 'd-none';

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
    // console.log(cards);
}

function incorrectCardAnimation(carddiv) {
    carddiv.animate([
            {transform: 'scale(2)'}
        ], {
            duration: 3000,
            iterations: 2
        }
    );
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
     cardMatchCount: 0, // Positive integers (0, even); max value determined by board size

     // TODO: Convert these stubs into actual methods to replace functions below
 //     startGame: function strtGm() {
 //        console.log("board.startGame() called");
 //        console.log("#pre-game-button clicked!");
 //     },

 //     makeCards: function mkCrds() {
 //        console.log("board.makeCards() called");
 //     },

 //     displayCards: function dsplyCrds() {
 //        console.log("board.displayCards() called");
 //     }
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
// TODO: Test the case (maxInt = (minInt + 1)), and, if necessary, fix or add test
function randomIntInRange(minInt, maxInt) { //input, two integers
    // If either parameter is not an integer, its floor value != origiinal parameter
    let floorMinInt = Math.floor(minInt);
    let floorMaxInt = Math.floor(maxInt);
    deltInt = floorMaxInt - floorMinInt;
    // Expected output integer from minInt to (maxInt -1)
    return (floorMinInt + Math.floor(Math.random() * Math.floor(deltInt)));
    console.log(deltInt);
}

// TODO: Revise if necessary after testing randomIntInRange re the case (maxInt = (minInt + 1))
function randomSign() {
    // Returns a string, either "-" or ""
    if (randomIntInRange(1,3) == 1) {
        return "-";
    }
    else {
        return "";
    }
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
        // console.log("");
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

// TODO: REVIEW THIS; IT'S PROBABLY ALL DEFUNCT AT THIS POINT

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

    // console.log("In onCardMouseClick(evt) with evt.target = " + evt.target);

    //if error in setup, return setup error
    cardMatchSetupError(evt);

    //wait for first click; on first click:
    //update states:
    // if (board.clickCount == 0) {
    if (true) {
        // console.log("Before click, board.clickCount = " + board.clickCount);
        board.firstCardState = "clicked";
        board.firstCardValue = evt.target.innerHTML;
        board.clickCount += 1;
        // console.log("After click, board.clickCount = " + board.clickCount);

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

function startGame() {
    hideDiv('#pre-game');
    unhideDiv('#banner');
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

    // console.log(cardsSubset);

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
    // console.log("2nd board.boardState is " + board.boardState);
 }

function unhideDiv(strU) {
    let divToUnhide = document.querySelector(strU);
    divToUnhide.classList.remove(hiddenClass);
}

function hideDiv(strH) {
    let divToHide = document.querySelector(strH);
    divToHide.classList.add(hiddenClass);
}

function rgbColorString(x,y,z) {
    // Returns a string of an RGB color, e.g., "rgb(30, 40, 50)"
    return ('rgb(' + x.toString() + ', ' + y.toString() + ', ' + z.toString() + ')');
}

function translateXorYString(axis,sign,perCent) {
    // All inputs must be strings
    // Returns a string of a keyframe translateX or translateY value, e.g., "rgb(30, 40, 50)"
    return ('translate' + axis + '(' + sign + perCent + ')');
}

function anmiateConfetti() {
    hideDiv('#post-game-header-1');
    hideDiv('#post-game-header-2');
    const confettiPieces = document.querySelectorAll('.confetti-piece');
    confettiPieces.forEach(function(cp) {
        // NOTE: Many of base specifics based on keyframe examples in
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API
        // TODO: Experiment more with (a) easing, (b) rotate, (c) translate3D (esp. Z-axis)

        // Random X; Random Y; Random Color

        // For each piece of confetti, random translateX (+30 - +90%), translateY (-30 - +30%), color3x
        // TODO: Revise if necessary after testing randomIntInRange re the case (maxInt = (minInt + 1))
        let rndX = randomIntInRange(30,90);
        let rndY = randomIntInRange(0,30);
        let rndSgn = randomSign();
        let rndR = randomIntInRange(0,255);
        let rndG = randomIntInRange(0,255);
        let rndB = randomIntInRange(0,255);

        let rndTranslX = 'translateX(' + rndSgn + rndX + '%)';
        let rndTranslY = 'translateY(' + rndSgn + rndX + '%)';
        let rndColor1 = 'rgb(' + rndR + ', ' + rndG + ', '  + rndB  + ')' ;
        let rndColor2 = 'rgb(' + rndG + ', ' + rndB + ', '  + rndR  + ')' ;
        let rndColor3 = 'rgb(' + rndB + ', ' + rndR + ', '  + rndG  + ')' ;

        cp.animate([

            // Row-based randomization
            // TODO: Item-based randomization
            {transform: rndTranslX, color: rndColor1},
            {transform: 'scale(2)', color: '#03F'},
            {transform: 'translate3D(+75%, +75%, -150px)', color: rndColor2},
            {transform: rndTranslY, color: '#0F0'},
            {transform: 'scale(2)', color: '#F03'},
            {transform: 'translate3D(+75%, +75%, +150px)', color: rndColor3},

            ], {
                duration: 1500,
                easing: 'steps(4,end)',
                iterations: 5
            }
        );
    });
    // console.log(cards);
}

function makeConfetti() {
    for (let i = 0; i < dimensions; i++) {
        let newDimensionsConfettiHtml = '';
        for (let j = 0; j < dimensions; j++) {
            const newConfettiHtml = '<div class="confetti-piece border-dark col-2 m-1">*****</div>';
            newDimensionsConfettiHtml += newConfettiHtml;
        }
        const newConfettiDiv = document.createElement('div');
        confettiFragment.appendChild(newConfettiDiv);
        const newConfettiRowHtml =  '<div class="row four-confetti-piece justify-content-center">' +
                            newDimensionsConfettiHtml + '</div>';
        newConfettiDiv.innerHTML = newConfettiRowHtml;
        // console.log("confettiPieces is: ") + confettiPieces;

    }
    confettiDiv.appendChild(confettiFragment);
    anmiateConfetti();
    board.boardState = "postBoard";
    // console.log("3rd board.boardState, confetti, is " + board.boardState);
    // console.log("3rd board.boardState, confetti, is " + board.boardState);
 }

function iterateCorrectCardCount() {
    // console.log("before " + board.cardMatchCount);
    board.cardMatchCount += 2;
    // console.log("after increment " + board.cardMatchCount);
}

function testMaxCorrectCardCount() {
    if (board.cardMatchCount  >= numberCards) {
        window.alert("CONGRATUALTIONS! board.cardMatchCount >= " + numberCards);
        hideDiv('#pre-game');
        hideDiv('#banner');
        unhideDiv('#post-game');
        makeConfetti();
        unhideDiv('#post-game-header-2');
}   else  {
        // console.log("board.cardMatchCount still less than " + numberCards);
    }
}

// TODO: ADD THESE IN THE APPROPRIATE LOCATIONS
function iterateCardClickCount() {
    // console.log("before " + board.cardClickCount);
    board.cardClickCount += 1;
    // console.log("after increment " + board.cardClickCount);
}

function testMaxCardClickCount() {
    if (board.cardClickCount  >= (numberCards * 2)) {
        // console.log(board.cardClickCount);
        window.alert("SORRY -- TOO MANY CLICKS1! Resetting board...");
        // TODO: Add board reset functionality in testMaxCardClickCount()
}   else  {
        console.log("");
        // window.alert("board.cardClickCount still less than 2X numberCards");
    }
}


//TRYING TO FIGURE OUT ERROR: "rules.js:308 Uncaught DOMException:
// Failed to set the 'outerHTML' property on 'Element':
// This element has no parent node."
// Problem seems to be that when you set outerHTML, the variable points
// to the old parent element
function onMouseClickNEW(evt) {
    // TODO: Will not need these once helper functions working
    // console.log("evt.target  = " + evt.target);

    let clickedDivClassList = evt.target.classList;
    // TODO: Maybe get rid of most of these variables and just use strings below
    let hiddenText = "text-info";
    let darkText = "text-dark";
    let backgroundDownColor = "card-background-color-down";
    let backgroundUpColor = "card-background-color-up";
    let backgroundCorrectColor = "card-background-color-correct";
    let backgroundIncorrectColor = "card-background-color-incorrect";
    let firstClickedCardClass = "first-card-clicked";

    if (clickedDivClassList.contains("card")) {
        iterateCardClickCount();
        testMaxCardClickCount();
    } else {
        return;
    }

    if ((clickedDivClassList.contains("card")) && (board.firstCardState == "notClicked")) {
        board.firstCardState = "clicked";
        board.firstCardValue = evt.target.textContent;
        clickedDivClassList.replace(hiddenText, darkText);
        clickedDivClassList.add(firstClickedCardClass);
        // console.log("First clicked card value  = " + board.firstCardValue);

    } else if ((clickedDivClassList.contains("card")) && (board.firstCardState == "clicked")) {
        board.secondCardState = "clicked";
        board.secondCardValue = evt.target.textContent;
        clickedDivClassList.replace(hiddenText, darkText);
        let firstClickedCardDiv = document.querySelector('.first-card-clicked');
        if (board.firstCardValue == board.secondCardValue) {

            let firstClickedCardDiv = document.querySelector('.first-card-clicked');
            firstClickedCardDiv.classList.replace(backgroundDownColor, backgroundCorrectColor);
            clickedDivClassList.replace(backgroundDownColor, backgroundCorrectColor);

            firstClickedCardDiv.animate([
                    {transform: 'translateY(-25px)'},
                    {transform: 'scale(2)'},
                ], {
                    duration: 500,
                    iterations: 1
                }
            );

            evt.target.animate([
                    {transform: 'translateY(+25px)'},
                    {transform: 'scale(2)'},
                ], {
                    duration: 500,
                    iterations: 1
                }
            );

            firstClickedCardDiv.classList.remove(firstClickedCardClass);
            board.firstCardState = "notClicked";
            board.secondCardState = "notClicked";

            iterateCorrectCardCount();

            testMaxCorrectCardCount();

            // TODO: WHY IS THE ANIMATION SO BRITTLE IF I ADD NEW COMMANDS, EVEN A CONSOLE.LOG?
            // TODO: WHAT HAPPENS IF I MOVE THIS OUT AS NEW FUNCTION?
            // increment cardMatchCount
            // console.log("before " + cardMatchCount);
            // board.cardMatchCount += 2;
            // console.log("after increment " + cardMatchCount);

            // if (cardMatchCount  >= numberCards) {

            //     // TODO: CREATE ARRAY; each
            //     // REVIEW: https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm

            //     evt.target.animate([ // change the target and the animation
            //             {transform: 'translateY(+25px)'},
            //             {transform: 'scale(2)'},
            //         ], {
            //             duration: 1000,
            //             iterations: 2
            //         }
            //     );
            //     // reset everything
            //     // go to new page
            //     // offer opportunity to play again

            // } else {
            //     console.log("cardMatchCount still below threshold: " + cardMatchCount);
            // }
        } else {
            clickedDivClassList.replace(hiddenText, darkText);
            firstClickedCardDiv.classList.replace(backgroundDownColor, backgroundIncorrectColor);
            clickedDivClassList.replace(backgroundDownColor, backgroundIncorrectColor);
            clickedDivClassList.replace(hiddenText, darkText);
            // window.alert("Sorry.  The first and second cards do not match!");

            // TODO: Figure out how to delay the change from incorrect to background color
            // TODO: Figure out how to delay an incorrect second card from black to background for incorrect card

            firstClickedCardDiv.animate([
                    {transform: 'translateX(-100px)'},
                    {transform: 'rotate(0.5turn)'}
                ], {
                    duration: 1000,
                    iterations: 2
                }
            );

            evt.target.animate([
                    {transform: 'translateX(+100px)'},
                    {transform: 'rotate(0.5turn)'}
                ], {
                    duration: 1000,
                    iterations: 2
                }
            );

            // TODO 2019-02-07: MAYBE TRY (A) ADDING LIST OF DIVS TO ANIMATE TO THE OBJECT;
            // (B) DEFINE ANIMATION FUNCTION; AND (C) ITERATE OVER THE LIST (LOOK FOR REFERENCES)

            firstClickedCardDiv.classList.remove(firstClickedCardClass);
            board.firstCardState = "notClicked";
            board.secondCardState = "notClicked";

            // firstClickedCardDiv.classList.replace(backgroundDownColor, backgroundIncorrectColor);
            // clickedDivClassList.replace(backgroundDownColor, backgroundIncorrectColor);

            // clickedDivClassList.replace(backgroundIncorrectColor, backgroundDownColor);
            // clickedDivClassList.replace(darkText, hiddenText);

            // firstClickedCardDiv.classList.replace(darkText, hiddenText);
            // firstClickedCardDiv.classList.replace(backgroundIncorrectColor, backgroundDownColor);
            // firstClickedCardDiv.classList.remove(firstClickedCardClass);

        }
    } else {
        console.log("Error somewhere");
    }
}

// console.log("1st board.boardState is " + board.boardState);

playInput.addEventListener('click', startGame);

// 2019-01-23: TODO: Fix this so it works only on individual cards, not rows
// 2019-02-04: HYPO: Tried commenting this out to see how it affects onMouseClickNEW; no change
targetDiv.addEventListener('mouseover', onMouseoverCard);
// 2019-02-08:  HYPO: Maybe the animation problems are because the eventListener
//              acts during the bubbling phase; testing setting the third parameter to "true"
                // FALSE: The animation still fails to do anything
                // ERROR MESSAGE: rules.js:583 Uncaught DOMException:
                // INITALLLY: Failed to execute 'animate' on 'Element':
                // Partial keyframes are not supported.
                // SUBSEQUENTLY: I added a second element in the keyframe, and it worked!!
targetDiv.addEventListener('click', onMouseClickNEW, true);



// ANIMATION WIP

            // firstClickedCardDiv.classList.add("animate hinge");
            // clickedDivClassList.classList.add("animate hinge");

            //TODO: PROBABLY NEED TO SET A TIMEOUT BEFORE THE ALERT
            //SEE: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
            //BUT: Maybe this won't be necessary when I add the animation.
            // window.alert("I'm sorry.  The first and second cards did not match.");

            // 2019-02-06: TRYING MOVING THESE BELOW THE ANIMATION
                // NOTE: With this move, the first animated element kept its red color until the
                // second animated element was activated --- why is that???
            // firstClickedCardDiv.classList.replace(darkText, hiddenText);
            // firstClickedCardDiv.classList.replace(backgroundIncorrectColor, backgroundDownColor);
            // clickedDivClassList.replace(backgroundIncorrectColor, backgroundDownColor);
            // clickedDivClassList.replace(darkText, hiddenText);
            // // TODO: Don't like repeating all this reset code; should add function
            // firstClickedCardDiv.classList.remove(firstClickedCardClass);
            // board.firstCardState = "notClicked";
            // board.secondCardState = "notClicked";
            // END OF ATTEMPTED MOVE

            // evt.target.animate([
            //     // keyframes
            //     {
            //         opacity: 1,
            //         color: "#d9534f"
            //     },
            //     {transform: 'translateY(-25px)'},
            //     {transform: 'scale(2)'},
            //     {transform: 'skew(30deg, 30deg)'},
            //     {transform: 'rotate(0.5turn)'},

            // ], {
            //     //timing
            //     delay: 200,
            //     duration: 1500,
            //     //repeats
            //     iterations: 1
            // });

            // 2019-02-06: TRYING MOVING THESE BELOW THE ANIMATION
                // NOTE: Now trying reordering and moving pieces between the animations
                // NOTE: Even with this re-ordering, still have the same problem;
                    // the first animated element only kept its red color until the
                    // second animated element was activated (in the next line below)
                    // clickedDivClassList.replace(backgroundIncorrectColor, backgroundDownColor);
                    // --- why is that???
                    //     HYPO: MAYBE THERE'S A WAY TO SPECIFY WHEN THE ANIMATION RUNS WITHIN A FUNCTION?
                    //     HYPO: ALTERNATIVELY, MAYBE THERE'S A WAY TO HANDLE THE COLOR AND TEXT
                    //           FROM INSIDE THE ANIMATION
            // firstClickedCardDiv.animate([
            //     // keyframes
            //     {
            //         opacity: 1,
            //         color: "#d9534f"
            //     },
            //     {transform: 'translateY(-25px)'},
            //     {transform: 'scale(2)'},
            //     {transform: 'skew(30deg, 30deg)'},
            //     {transform: 'rotate(0.5turn)'},

            // ], {
            //     //timing
            //     delay: 200,
            //     duration: 1500,
            //     //repeats
            //     iterations: 1
            // });
