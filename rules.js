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

2019-02-12--17:
    feat: Separate animation function for makeConfetti()

    function animateConfetti()
        Working rudimentarily with row-based randomization
    function randomSign()
    function quoteRGBColor(x,y,z)
    function translateXorYString(axis,sign,perCent)

    TODO: NEED TO REALLY USE:
        function quoteRGBColor(x,y,z)
        function translateXorYString(axis,sign,perCent)


2019-02-18--03-04:
    WIP: Item-based randomization for confetti

    2019-02-18--03-04:
        function translateXorYString(axis,sign,perCent)
        function translate3DString(sign1, sign2, sign3, perCentX, perCentY, pixelValueZ)
        function makeRndSignsArray()
        function makeRndXYZArrays()
        function makeRndColorComponentArray()
        function makeRndColorArray()

    WH: Item-based randomization not working because of improper forEach syntax
         See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    WH 2019-03-02: Item-based randomization not working because of improper forEach syntax
                    See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
                    RESULT: Tried with element, index, array, and no change
    WH 2019-03-04: Item-based randomization not working because of improper forEach and not a for loop
                    See: https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm
                    RESULT: Tried with a for loop, and no change

2019-03-04--05 (cont'd):
    Feat: Item-based randomization for confetti

    LEARN: Have spent a long time working on this to no avail.  It wasn't until I read
           "Animating Many Elements and the Animate Method" by kirupa
           (https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm)
           that I found this, which seems to be key:

           "They are separated out into their own properties that live directly on each of the
           circle elements we are animating. This makes working with them much easier – both aesthetically
           and, as you will see in a little bit, functionally. The thing to note is that the end
           result is still the same as what you've seen before: the animate object gets called
           on an element with the keyframes and animation properties specified as arguments:"

2019-03-06:
    Feat:   Fine-tuned animateConfetti(), with cubic Bézier timing

            Added return values to more helper functions, making them more useful
            Fixed random color to use rgb and utilize helper functions
            Fixed random X, random Y, and random scale, beginning in 2nd phase
            Fixed makeRndSignsArray() to replace variable declarations for sign1, sign2, etc.

2019-03-09--10:
    Feat:   Figured out how to use hideDiv('#confetti') at the end

    Notes:  Final solution was a hack that should be refactored.
            Used new board.confettiCount to carry iteration out of for loop

            TODO: Re-factor the various keyframes so they don't use helper functions.

            Relied further on:
                https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm

            WIP:    Spent a lot of time trying to understand the differences between
                    element.animate(), animation interface, and animation object.

            TODO:   Should work on this further to really understand them.

            See:    https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
                    https://developer.mozilla.org/en-US/docs/Web/API/Animation
                    https://developer.mozilla.org/en-US/docs/Web/API/Animation/onfinish
                    http://danielcwilson.com/blog/2015/07/animations-part-1/
                    https://css-tricks.com/css-animations-vs-web-animations-api/
                    https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm
2019-03-11:
    Feat:   Refined animateConfetti(); multiple devices & prompts

            Created faster test cycle for animateConfetti()
                Added animationState property to board object
                Modified onMouseClickNEW(evt) and testMaxCorrectCardCount() to
                    look for board.animatonState
            Created long (1500 ms animation) with three principal phases
            Added support for multiple devices, based on screen width test in startGame()
                See:    https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
            Tested on multiple devices in Chrome dev tools
            Added multiple prompts as cards are matched
            Started work on startNewGame()

2019-03-12:
    Feat:   Repeated play working.  Refined animateConfetti(); multiple devices & prompts

            Created boardInitial object to facilitate re-initializing board object
            Added:  initializeBoardObject(), initializeBoardHTML(),
                    initializeConfettiHTML(), refresh()
            Localized variable names in animateConfetti() to distinguish from helper functions
            Cleaned up old comments

2019-03-12 (PM):
    Feat:   Simple animation for onMouseoverCard(evt) and fixes

            Fix: After animation, incorrect cards revert to backgroundDownColor

            Fix: "Unchecked runtime.lastError..." error
                NOTE: Relied on this StackOverlow post:
                https://stackoverflow.com/questions/54619817/how-to-fix-unchecked-runtime-lasterror-could-not-establish-connection-receivi
                When running "The Memory Game" in Chrome 72.0.3626.121 (Official Build) (64-bit),
                I repeatedly got the following error message in the DevTools console:
                    "Unchecked runtime.lastError: Could not establish connection.
                    Receiving end does not exist."
                Based on the above StackOverflow post, I tried toggling my Chrome extensions, and,
                when I inactivated the "Udacity Front End Feedback" Chrome extension, the error
                message disappeared.
            Fix: Prevented clicking on already correct card
                    Added: augmentMatchedCards(fc, sc) and new test in onMouseClickNEW(evt)
            WIP: Started on todoTODO(x,y), to prevent clicking same card twice

2019-03-13 am:
    WIP:    Started work on fixing bug in preventing clicking already correct card
                Doesn't work properly with a replay --- clearing statement in refresh function not working yet
    WIP:    Started work on preventing clicking same card twice

    TODO:   Flush out too many picks alternative and test
    TODO:   Fix the green display of the last correct pair
    TODO:   Add comments for each function
    TODO:   Add comments to describe overall structure of program
    TODO:   Check style guide
            A.  Single vs. double quotes; fix inconsistencies (probably single)
            B.  Other
    TODO:   RUN THROUG VALIDATORS

    FUTURE:     ADD exploding and changing color "CONGRATULAITONS" before confetti
    FUTURE:     Change animation for repeated plays.  (Sort of like higher levels in video game.)
                E.g., simple change would be rotating colors at beginning and ending phases
    FUTURE:     Variable size boards (4x4, 8x8, 16x16 (with multiple decks))
    FUTURE:     Refactor with object-oriented architecture.
                E.g. adding methods in boardInitial object
    FUTURE:     Figure out why I couldn't use an object.method with eventListener (2019-01-17)
    FUTURE:     Turn the "let cardRandom = remainingCards..." processes in a function (2019-01-22)
    FUTURE:     Figure out how to use Bootstrap with Sass options --> see Medium article

    GENERAL TODO:
    0.  eventHandler: Really try:
        A.  to understand why I keep having problems when I add these to onMouseClickNEW(evt); and
        B.  to figure out:
            (i)     what to do to prevent that from happening in the future; and
            (ii)    how to correct the problem when it does occur.
    1.  MISC

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

*/

// TODO: revise to add spot for changing three screens - will be container
const playInput = document.querySelector('#pre-game-button');
const playAgainInput = document.querySelector('#play-again-button');
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
const screenWidth = window.screen.width;
const suits = ['C', 'D', 'H', 'S'];
const ranks = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']
let cards = [];
let board = {};


// Generates cards by iterating over suit and rank
function makeCards() {
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            let card = rank + suit;
            cards.push(card);
        });
    });
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

let boardInitial = {
//  TEST MODE PROPERTY: for makeConfetti() and animateConfetti()
//  TODO: Comment out when finished with testing
    animationState: false,// true, false; use true to test animateConfetti();

//  PRINCIPAL PROPERTIES BEGIN HERE
    boardState: "preBoard", //preBoard, transBoard, postBoard; re state of game
    // messages: ["First message.", "Second message.", "Third message."],

    // state information about cards being clicked and clickCount stored in board object
    confettiState: "preConfetti", //preConfetti, transConfetti, postConfetti; re state of confetti
    confettiCount: 0, //
    confettiRowLength: 12,
    confettiMultiplier: 3,
    firstCardState: "notClicked", //notClicked, clicked,
    firstCardValue: "", //empty, card Value (e.g., "4S" || "10C")
    secondCardState: "notClicked", //notClicked, clicked,
    secondCardValue: "", //empty, card Value (e.g., "4S" || "10C")
    cardClickCount: 0, // 0, 1, 2
    onMouseClickTextColorError: 0, // 0, 1
    cardMatchCount: 0, // Positive integers (0, even); max value determined by board size
    matchedCards: [],
    //New properties to prevent clicking on same card twice to get a match
    firstCardID: "",
    secondCardID: ""

 // TODO:   Convert these stubs into actual methods to replace functions below
            // NOTE: Would probably have to rework initializeBoardObject() if methods added
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

// For play again functionality
// NOTE: Would probably have to rework this if methods added to boardInitial object
function initializeBoardObject() {
    board = Object.assign({}, boardInitial);
}
// For play again functionality
// NOTE: Based on https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
function initializeBoardHTML() {
    if (targetDiv.hasChildNodes()) {
        while (targetDiv.firstChild) {
            targetDiv.removeChild(targetDiv.firstChild);
        }
    }
}
// For play again functionality
// NOTE: Based on https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
function initializeConfettiHTML() {
    if (confettiDiv.hasChildNodes()) {
        while (confettiDiv.firstChild) {
            confettiDiv.removeChild(confettiDiv.firstChild);
        }
    }
}

// This function takes an array as input and then doubles it [x,y,z] -> [x,y,z,x,y,z]
function doubleArray(x) {
    x.forEach(function(value) {
        x.push(value);
    });
    return x;
}

// NOTE: Based on getRandomInt(max) in MDN - see references for Math.random()
// TODO: Add tests (e.g., ensure both parameters are integers && maxInt >= minInt)
//       Add fixes (if maxInt < minInt, then switch)
// TODO: Test the case (maxInt = (minInt + 1)), and, if necessary, fix or add test
            // SHOULD BE SIMPLE FIX TO ADD 1 TO floorMaxInt
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

// FUTURE: Fix this so it works only on individual cards, not rows
// To do this, can experiment with an if/else statement for different responses
// depending on the characteristics of the div
// But remember to look at the lesson about capitalization
// See: "The nodeName's Capitalization" in
// https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/04eb38bd-45e1-4a58-98c8-1e6f1e770438/lessons/f270dbcf-eb43-4ce3-b7be-a74d26023496/concepts/85463be2-3206-434e-aa39-4604965daa29
function onMouseoverCard(evt) {
    //  OPTIONAL: Add tests here if desired, e.g., test whether
    //          (a) textContent has acceptable syntax, using regex
    //          (b) use None.noneType to test if mouseOver is on an element_node
    if ((evt.target.textContent.length >= 2) && (evt.target.textContent.length <= 6)) {
        // console.log("mouseOver a card div in onMouseoverCard");
        evt.target.animate([
            // keyframes
            {
                color: '#999',
                transform: 'scale(1.1)'
            }, {
                color: '#999',
                transform: 'scale(1.1)'
        }], {
            //timing and iterations
            delay: 10,
            duration: 20,
            iterations: 1
        });
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

//FUTURE: Helper function for cardsDoMatch alternative
function cardsDoMatch () {console.log("");
}

//FUTURE: Helper function for cardsDoNotMatch alternative
function cardsDoNotMatch () {console.log("");
}

// TODO: REVIEW THIS;
//Helper function to add .card card-background-up-color to .card
function cardToBackgroundColor(e) {
    let stHidden = "card";
    let sti = "card card-background-up-color"
    e.target.outerHTML = e.target.outerHTML.replace(stHidden, sti);
}

function startNewGame() {
    hideDiv('#post-game');
    hideDiv('#banner-8');
    unhideDiv('#banner');
    unhideDiv('#confetti');
    refresh();
    startGame();
}

function refresh() {
    //reset cards to initial state
    cards = [];
    matchedCards = [];
}

function startGame() {

    // INITIALIZATION
    // Test windows.screen.width to adjust confetti constants if necessary
    if (screenWidth < 768) {
        board.confettiRowLength = 8;
        board.confettiMultiplier= 2;
    }
    //initialize board object
    initializeBoardObject();
    //initialize board section in index.html
    initializeBoardHTML();
    //initialize confetti section in index.html
    initializeConfettiHTML()
    // Hide and display relevant parts of index.html
    hideDiv('#pre-game');
    unhideDiv('#banner-1');
    makeCards();

    // CORE FUNCTION
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
            // OLD CODE:
            // const newCardHtml = '<div class="card card-background-color-down text-info border border-dark text-center col-2 m-1">'+
            //                     cardSubsetRandom + '</div>';

            // TEST CODE:

            // MODEL:          <div id="banner-1" class="d-none row banner-header-1 col-12 m-2 justify-content-center">
            let newCardHtml =   '<div id="a_' + i + '-' + j +
                                '" class="card card-background-color-down text-info border border-dark text-center col-2 m-1">' +
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
    return ('translate' + axis + '(' + sign + perCent + '%)');
}
// TODO: Modify translateXorYString() to work with two perCent values and translate3D
function translate3DString(sign1, sign2, sign3, perCentX, perCentY, pixelValueZ) {
    // All inputs must be strings
    // Returns a string of a keyframe translateX or translateY value, e.g., "rgb(30, 40, 50)"
    return ('translate3D(' + sign1 + perCentX + '%, ' + sign2 + perCentY + '%, '
        + sign3 + pixelValueZ + 'px)');
}

// Generates random signs for animateConfetti()
// FUTURE: Better way to set end values in for loops; right now, fixed integers
// FUTURE: Revisit calculation of end of for loop based on current requirements for confettiAnimator()
let rndSignsArray = [];
function makeRndSignsArray() {
    for (let i = 0; i < (dimensions * board.confettiMultiplier * 3 * 3); i += 3) {
        let rndSgn = randomSign();
        rndSignsArray.push(rndSgn);
    }
    // console.log(rndSignsArray);
    return rndSignsArray;
}

// Generates random color components (0-255)for animateConfetti()
// FUTURE: Better way to set end values in for loops; right now, fixed integers
// FUTURE: Revisit calculation of end of for loop based on current requirements for confettiAnimator()
let rndColorComponentArray = [];
function makeRndColorComponentArray() {
    for (let i = 0; i < (dimensions * board.confettiMultiplier * 3 * 4); i++) {
        let rndColorComponent = randomIntInRange(0,255);
        rndColorComponentArray.push(rndColorComponent);
    }
    // console.log(rndColorComponentArray);
    return rndColorComponentArray;
}

// Generates 6 random colors in *****FORMAT*** for animateConfetti()
// FUTURE: Better way to set end values in for loops; right now, fixed integers
// FUTURE: Revisit calculation of end of for loop based on current requirements for confettiAnimator()
let rndColorArray = [];
function makeRndColorArray() {
    for (let i = 0; i < (dimensions * 2 * 3 * 4); i += 3) {
        let rndColor = rgbColorString(rndColorComponentArray[i], rndColorComponentArray[i + 1],
            rndColorComponentArray[i + 2]);
        rndColorArray.push(rndColor);
    }
    // console.log(rndColorArray);
    return rndColorArray;
}

// Generates array of random integers, first in range (0,10)
// FUTURE: Change max values for randomIntInRange if I fix randomIntInRange()
// FUTURE: Revisit calculation of end of for loop based on current requirements for confettiAnimator()
let rndScaleArray = [];
function makeRndScaleArray() {
    for (let i = 0; i < (dimensions * board.confettiMultiplier * 3 * 3); i += 3) { // almost same multiple of dimensions as in
        // makeRndColorComponentArray() --- multiplied by 3 at end: only 3 uses in
        // confettiAnimator(confettiPiece, x)
        let rndScl = randomIntInRange(0,11);
        rndScaleArray.push(rndScl);
    }
    // console.log(rndScaleArray);
    return rndScaleArray;
}

// Adjusts defaults to make 8x8 confetti display and fewer random elements
//     for smaller viewports (windows.screen.width < 768)
function animateConfetti() {
    // hideDiv('#post-game-header-1');
    hideDiv('#post-game-header-2');
    hideDiv('#contact-information');

// NOTE: This approach to animating multiple elements uses the animate method based upon this:
//     https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm
//     a.  An animation is created for each confettiPiece, which enables one to
//     b.  Use the animation object properties of that animation, e.g., onfinish
//     c.  See:    https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
//                 https://developer.mozilla.org/en-US/docs/Web/API/Animation
//                 https://developer.mozilla.org/en-US/docs/Web/API/Animation/onfinish
//                 http://danielcwilson.com/blog/2015/07/animations-part-1/
//                 https://css-tricks.com/css-animations-vs-web-animations-api/
//                 https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm

    const confettiPieces = document.querySelectorAll('.confetti-piece');

    for (let i = 0; i < (board.confettiRowLength ** 2); i++) {
        let confettiPiece = confettiPieces[i];
        confettiAnimator(confettiPiece, i);
        board.confettiCount += 1;
    }

     function confettiAnimator(confettiPiece) {
// Configuration variables for fine-tuning animation
        let xMax = 20;
        let yMax = 20;
        let sMax = 10;
        let tSuppBase = 10;
        let tSuppMult = 10;
        let tMax = 10;
// Localizing variable names to distinguish from helper functions
        let rndColorComponentArrayLocal = makeRndColorComponentArray();
        let rndColorArrayLocal = makeRndColorArray();
        let rndSignsArrayX = makeRndSignsArray();
        let rndSignsArrayY = makeRndSignsArray();
        let rndScaleArrayLocal = makeRndScaleArray();

        let x = board.confettiCount;

// Keyframes
// NOTE: Long animation, with beginning, middle, and end phases
        confettiPiece.keyframes = [{
            opacity: 0.1,
            color: '#F00',
            transform: 'translate3d(0px, 100px, 0px) rotate(0.25turn) scale(1.0)'
        }, {
            opacity: 0.3,
            color: '#F00',
            transform: 'translate3d(-15px, 100px, 0px) rotate(-.25turn) scale(5.0)'
        }, {
            opacity: 0.3,
            color: '#00F',
            transform: 'translate3d(-10px, 100px, 0px) rotate(0.5turn) scale(2.0)'
        }, {
            opacity: 0.5,
            color: '#00F',
            transform: 'translate3d(-15px, 100px, 0px) rotate(-0.5turn) scale(5.0)'
        }, {
            opacity: 0.7,
            color: '#00F',
            transform: 'translate3d(-10px, 100px, 0px) rotate(0.75turn) scale(2.5)'
        }, {
            opacity: 1.0,
            color: '#F00',
            transform: 'translate3d(-20px, 100px, 0px) rotate(-.75turn) scale(7.5)'
        }, {
            opacity: 1.0,
            color: '#F00',
            transform: 'translate3d(-20px, 100px, 0px) rotate(1.0turn) scale(8.5)'
        }, {
            opacity: 1.0,
            color: '#F00',
            transform: 'translate3d(-20px, 100px, 0px) rotate(-1.0turn) scale(9.5)'
        }, {
            opacity: (Math.random() * 0.25),
            color: rndColorArrayLocal[x],
            transform: 'translate3d(-10%, -50%, 0) scale(5.0)'
        }, {
            opacity: Math.random(),
            color: rndColorArrayLocal[x + 1],
            transform: 'translate3d(-20px, 100px, 5px) scale(10.0)',
            // Old code follows:
            // transform: 'translate3d(' + rndSignsArrayX[x] + (Math.random() * xMax) + 'px, ' +
            //     rndSignsArrayY[x] + (Math.random() * yMax) + 'px, 0px) scale(' +
            //     rndScaleArray[x] + ')'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 2],
            transform: 'translate3d(' + rndSignsArrayX[x + 1] + (Math.random() * xMax) + 'px, ' +
                '100px, 0px) scale(' + rndScaleArrayLocal[x + 1] + ')'
       }, {
            opacity: .7,
            color: rndColorArrayLocal[x + 3],
            transform: 'translate3d(-5px, 100px, 0px) rotate(2.0turn) scale(3.0)'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 4],
            transform: 'translate3d(20px, 100px, 0px) rotate(-.75turn) scale(7.0)'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 5],
            transform: 'translate3d(-20px, 100px, 0px) rotate(.75turn) scale(10.0)'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 6],
            transform: 'translate3d(20px, 100px, 0px) rotate(-.75turn) scale(15.0)'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 7],
            transform: 'translate3d(-20px, 100px, 0px) rotate(.75turn) scale(15.0)'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 8],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 9],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 10],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 11],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 12],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArrayLocal[x + 13],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: (Math.random() * 2),
            color: rndColorArrayLocal[x + 10],
            transform: 'translate3d(' + rndSignsArrayX[x + 2] + (Math.random() * xMax) + 'px, ' +
                ((rndSignsArrayY[x + 2] + (Math.random() * yMax)) + 100) + 'px, 0px) scale(' +
                (rndScaleArrayLocal[x + 2] + 5.0) + ')'
        }, {
            opacity: .1,
            color: '#F00',
            transform: 'translate3d(-1px, 50px, 0px) rotate(-.1turn) scale(0.1)'
       }, {
            opacity: .1,
            color: '#F00',
            transform: 'translate3d(10px, 40px, 0px) scale(0.1)'
       }, {
            opacity: .2,
            color: '#F00',
            transform: 'translate3d(-1px, 35px, 0px) scale(0.2)'
       }, {
            opacity: .3,
            color: '#F00',
            transform: 'translate3d(10px, 30px, 0px) scale(3.0)'
       }, {
            opacity: .4,
            color: '#F00',
            transform: 'translate3d(-1px, 35px, 0px) scale(4.0)'
       }, {
            opacity: .6,
            color: '#F00',
            transform: 'translate3d(10px, 40px, 0px) scale(5.0)'
       }, {
            opacity: .8,
            color: '#F00',
            transform: 'translate3d(-1px, 45px, 0px) scale(6.0)'
       }, {
            opacity: 1,
            color: '#F00',
            transform: 'translate3d(10px, 50px, 0px) scale(7.0)'
        }];

        confettiPiece.animProps = {
            duration: 15000 + (tSuppBase * (Math.random() * tSuppMult)),
            easing: 'cubic-bezier(0.1, 0.1, 1, 1)',
            // easing: 'steps(4,end)',
            // easing: 'ease-out',
            iterations: 1
        }

// NOTE: The following is based on:
//      https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm

        let confettiPlayer = confettiPiece.animate(confettiPiece.keyframes, confettiPiece.animProps);
        animationFinishHandler(confettiPlayer, confettiPiece);

        function animationFinishHandler(anim, el) {
            anim.addEventListener('finish', function(e) {
                hideDiv('#confetti');
                unhideDiv('#post-game-header-2');
                unhideDiv('#contact-information');
            }, false);
        }
    }
    board.confettiState = "postConfetti";
}

function makeConfetti() {
    board.confettiState = "transConfetti";
    for (let i = 0; i < (board.confettiRowLength); i++) {
        let newDimensionsConfettiHtml = '';
        for (let j = 0; j < (board.confettiRowLength); j++) {
            // const newConfettiHtml = '<div class="confetti-piece border-dark col-2 m-1">*****</div>';
            // TRY: switching to single asterisk to set up individual animations
            const newConfettiHtml = '<div class="confetti-piece border-dark col-1">*</div>';
            newDimensionsConfettiHtml += newConfettiHtml;
        }
        const newConfettiDiv = document.createElement('div');
        confettiFragment.appendChild(newConfettiDiv);
        const newConfettiRowHtml =  '<div class="row col-12 four-confetti-piece justify-content-center">' +
                            newDimensionsConfettiHtml + '</div>';
        newConfettiDiv.innerHTML = newConfettiRowHtml;
        // console.log("confettiPieces is: ") + confettiPieces;

    }
    confettiDiv.appendChild(confettiFragment);

    animateConfetti();

    // TODO: Probably add hideDiv('#post-game-header-1'); here
    board.boardState = "postBoard";
    // console.log("3rd board.boardState, confetti, is " + board.boardState);
    // console.log("3rd board.boardState, confetti, is " + board.boardState);
 }

function testConfettiState() {
    if (board.confettiState == 'postConfetti') {
        hideDiv('#confetti');
    } else {
        console.log('board.confettiState != postConfetti');
    }
}

function iterateCorrectCardCount() {
    // console.log("before " + board.cardMatchCount);
    board.cardMatchCount += 2;
    // console.log("after increment " + board.cardMatchCount);
}

// fc and sc are the card values of the first and second matched cards
function augmentMatchedCards(fc, sc) {
    board.matchedCards.push(fc);
    board.matchedCards.push(fc);
}

// calculates positon of clicked card in board section
// TODO: NEED TO FIGURE OUT INPUTS AND PERHAPS CREATE NEW LIST
function todoTODO(x,y) {
    // board.matchedCards.push(fc);
    // board.matchedCards.push(fc);
}

// TODO: Deal with case in which same pair of cards is clicked repeatedly
function testMaxCorrectCardCount() {

//  Test mode for makeConfetti() and animateConfetti()
//  TODO: Comment out when finished with testing
    if (board.animationState == true) {
        hideDiv('#pre-game');
        hideDiv('#banner');
        unhideDiv('#post-game');
        makeConfetti();
    }

//  Non-test mode part of function begins here
    if (board.cardMatchCount  >= numberCards) {
        // Following window.alert used for testing
        // window.alert("CONGRATUALTIONS! board.cardMatchCount >= " + numberCards);
        hideDiv('#pre-game');
        hideDiv('#banner');
        unhideDiv('#post-game');
        makeConfetti();
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
        console.log("board.cardClickCount still less than 2X numberCards");
    }
}

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

//  Test mode for makeConfetti() and animateConfetti()
//  TODO: Comment out when finished with testing
    if (board.animationState == true) {
        testMaxCorrectCardCount();
    }

//  Non-test mode part of function resumes here
    if (clickedDivClassList.contains("card")) {
        iterateCardClickCount();
        testMaxCardClickCount();
    } else {
        window.alert("You didn't click on a card.  Please try again.")
    }

    if ((clickedDivClassList.contains("card")) && (board.firstCardState == "notClicked")) {
         board.firstCardValue = evt.target.textContent;
         //New board property to prevent clicking on same card twice to get a match
         board.firstCardID = evt.target.id;
         // New test to prevent clicking on already matched card
         if (board.matchedCards.includes(board.firstCardValue)) {
            window.alert("You've already matched that card.");
            return
         }
        board.firstCardState = "clicked";

        clickedDivClassList.replace(hiddenText, darkText);
        clickedDivClassList.add(firstClickedCardClass);
        // console.log("First clicked card value  = " + board.firstCardValue);

    } else if ((clickedDivClassList.contains("card")) && (board.firstCardState == "clicked")) {
        board.secondCardState = "clicked";
        board.secondCardValue = evt.target.textContent;
        //New board property to prevent clicking on same card twice to get a match
        board.secondCardID = evt.target.id;
        // Prevent clicking on same card twice in a row to get a match, but allow later clicking
         if (board.firstCardID == board.secondCardID) {
            window.alert("You can't match by clicking the same card twice.");
            board.firstCardID = "";
            board.secondCardID = "";
            return
         }
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
                    duration: 1000,
                    iterations: 1
                }
            );

            evt.target.animate([
                    {transform: 'translateY(+25px)'},
                    {transform: 'scale(2)'},
                ], {
                    duration: 1000,
                    iterations: 1
                }
            );

            firstClickedCardDiv.classList.remove(firstClickedCardClass);
            board.firstCardState = "notClicked";
            board.secondCardState = "notClicked";

            // TODO: CREATE NEW FUNCTION HERE TO ADD CARD VALUES AND IDEALLY CARD NUMBER WITHIN divs
            //     TO "PAIRED CARD LIST"

            //Keep track of how many cards have been matched
            iterateCorrectCardCount();
            //Keep track of which card values have been matched already
            augmentMatchedCards(board.firstCardValue, board.secondCardValue);

            switch (board.cardMatchCount) {
                case 2:
                    hideDiv('#banner-1');
                    unhideDiv('#banner-2');
                    hideDiv('#banner-3');
                    hideDiv('#banner-4');
                    hideDiv('#banner-5');
                    hideDiv('#banner-6');
                    hideDiv('#banner-7');
                    hideDiv('#banner-8');
                    break;
                case 4:
                    hideDiv('#banner-1');
                    hideDiv('#banner-2');
                    unhideDiv('#banner-3');
                    hideDiv('#banner-4');
                    hideDiv('#banner-5');
                    hideDiv('#banner-6');
                    hideDiv('#banner-7');
                    hideDiv('#banner-8');
                    break;
                case 6:
                    hideDiv('#banner-1');
                    hideDiv('#banner-2');
                    hideDiv('#banner-3');
                    unhideDiv('#banner-4');
                    hideDiv('#banner-5');
                    hideDiv('#banner-6');
                    hideDiv('#banner-7');
                    hideDiv('#banner-8');
                    break;
                case 8:
                    hideDiv('#banner-1');
                    hideDiv('#banner-2');
                    hideDiv('#banner-3');
                    hideDiv('#banner-4');
                    unhideDiv('#banner-5');
                    hideDiv('#banner-6');
                    hideDiv('#banner-7');
                    break;
                case 10:
                    hideDiv('#banner-1');
                    hideDiv('#banner-2');
                    hideDiv('#banner-3');
                    hideDiv('#banner-4');
                    hideDiv('#banner-5');
                    unhideDiv('#banner-6');
                    hideDiv('#banner-7');
                    hideDiv('#banner-8');
                    break;
                case 12:
                    hideDiv('#banner-1');
                    hideDiv('#banner-2');
                    hideDiv('#banner-3');
                    hideDiv('#banner-4');
                    hideDiv('#banner-5');
                    hideDiv('#banner-6');
                    unhideDiv('#banner-7');
                    hideDiv('#banner-8');
                    break;
                case 14:
                    hideDiv('#banner-1');
                    hideDiv('#banner-2');
                    hideDiv('#banner-3');
                    hideDiv('#banner-4');
                    hideDiv('#banner-5');
                    hideDiv('#banner-6');
                    hideDiv('#banner-7');
                    unhideDiv('#banner-8');
                    break;
            }

            testMaxCorrectCardCount();

        } else {
            clickedDivClassList.replace(hiddenText, darkText);
            firstClickedCardDiv.classList.replace(backgroundDownColor, backgroundIncorrectColor);
            clickedDivClassList.replace(backgroundDownColor, backgroundIncorrectColor);
            clickedDivClassList.replace(hiddenText, darkText);

            // NOTE: This section revised based on
                // https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API
                // https://codepen.io/rachelnabors/pen/PNYGZQ?editors=0010
                // https://developer.mozilla.org/en-US/docs/Web/API/Animation/onfinish
            let firstClickedIncorrectAnimate = firstClickedCardDiv.animate(
                [
                    {
                        transform: 'translateX(-100px)',
                        color: backgroundIncorrectColor
                    }, {
                        transform: 'rotate(0.5turn)'}
                ], {
                    duration: 1000,
                    easing: 'ease-out',
                    iterations: 2
                }
            );

            let evtTargetIncorrectAnimate = evt.target.animate(
                [
                    {
                        transform: 'translateX(+100px)',
                        color: backgroundIncorrectColor
                    }, {
                        transform: 'rotate(0.5turn)'}
                ], {
                    duration: 1000,
                    easing: 'ease-out',
                    iterations: 2
                }
            );

            firstClickedIncorrectAnimate.play();
            evtTargetIncorrectAnimate.play();
            firstClickedIncorrectAnimate.onfinish = function() {
                firstClickedCardDiv.classList.replace(backgroundIncorrectColor, backgroundDownColor);
            };
            evtTargetIncorrectAnimate.onfinish = function() {
                clickedDivClassList.replace(backgroundIncorrectColor, backgroundDownColor);
            };

            firstClickedCardDiv.classList.remove(firstClickedCardClass);
            board.firstCardState = "notClicked";
            board.secondCardState = "notClicked";
            clickedDivClassList.replace(darkText, hiddenText);
            // firstClickedCardDiv.classList.replace(backgroundIncorrectColor, backgroundDownColor);
            firstClickedCardDiv.classList.replace(darkText, hiddenText);
            // clickedDivClassList.replace(backgroundIncorrectColor, backgroundDownColor);
            clickedDivClassList.replace(darkText, hiddenText);
        }
    } else {
        console.log('Error somewhere');
    }
}

// console.log("1st board.boardState is " + board.boardState);

playInput.addEventListener('click', startGame);

targetDiv.addEventListener('mouseover', onMouseoverCard);

targetDiv.addEventListener('click', onMouseClickNEW, true);

playAgainInput.addEventListener('click', startNewGame);


