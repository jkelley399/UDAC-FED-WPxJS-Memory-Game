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

    TODO: GET <a class="nav-link" href="#banner">Return to Top</a> TO WORK PROPERLY
    TODO: In animateConfetti(), localize variable names, so they're not the same as in helper functions
    TODO: Consider adding exploding and changing color "CONGRATULAITONS" before confetti
    TODO: Add comments for each function
    TODO: Fix this error
            index.html#banner:1
            Unchecked runtime.lastError: Could not establish connection.
            Receiving end does not exist.
    DONE: figure out faster way to test animateConfetti() cycle
            feat (minor): call animateConfetti() in the console

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
        D.  Could increase the confetti resolution dramatically and them into "YOU WON" (2019-03-05)
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
//  Test mode for makeConfetti() and animateConfetti()
//  TODO: Comment out when finished with testing
    animationState: false,// true, false; use true to test animateConfetti();

//  Non-test mode part of object begins here
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

// 2019-01-23: TODO: Fix this so it works only on individual cards, not rows
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
function startNewGame() {
    hideDiv('#post-game');
    unhideDiv('#banner');
    refresh();
    startGame();
}

// TODO flush out refresh() (@668) and fix playAgainInput.addEventListener('click', startNewGame);
// Probable course of action
//     @356, move let cards into makeCards()
//     @380, move let board into new function, makeBoard()
//     @664, move makeCards() and makeBoard() into refresh()
function refresh() {
    console.log("Working on refresh function")
}

function startGame() {
    // Test windows.screen.width to adjust confetti constants if necessary
    if (screenWidth < 768) {
        board.confettiRowLength = 8;
        board.confettiMultiplier= 2;
    }
    // Hide and display relevant parts of index.html
    hideDiv('#pre-game');
    unhideDiv('#banner-1');
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
// TODO: Better way to set end values in for loops; right now, fixed integers
// TODO-CWH-2019-03-01: Reason that the item-based randomization is not working is that the
// initial variable declarations are outside of the helper functions, which means that the
// arrays are simply be getting longer each time through; TRYING PUTTING HELPERS INSIDE MAIN FUNCTION

let rndSignsArray = [];
function makeRndSignsArray() {
    for (let i = 0; i < (dimensions * board.confettiMultiplier * 3 * 3); i += 3) { // almost same multiple of dimensions as in
        // makeRndColorComponentArray() --- multiplied by 3 at end: only 3 uses in
        // confettiAnimator(confettiPiece, x)
        let rndSgn = randomSign();
        rndSignsArray.push(rndSgn);
    }
    // console.log(rndSignsArray);
    return rndSignsArray;
}

// Returns only Generates 3 random perCentX, perCentY, and pixelValueZ values for animateConfetti()
// TODO: Better way to set end values in for loops; right now, by hand
// TODO: Way to set different end values in for loops for Z; right now, Z same as X & Y
// TODO-CWH-2019-03-01: Reason that the item-based randomization is not working is that the
// initial variable declarations are outside of the helper functions, which means that the
// arrays are simply be getting longer each time through; TRYING PUTTING HELPERS INSIDE MAIN FUNCTION

let rndPerCentXArray = [];
let rndPerCentYArray = [];
let rndPixelValueZArray = [];
function makeRndXYZArrays() {
    for (let i = 0; i < 3; i++) {
        let rndX = randomIntInRange(30,90);
        rndPerCentXArray.push(rndX);
        let rndY = randomIntInRange(0,30);
        rndPerCentYArray.push(rndY);
        let rndZ = randomIntInRange(0,100);
        rndPixelValueZArray.push(rndZ);
    }
    // console.log(rndPerCentXArray);
    // console.log(rndPerCentYArray);
    // console.log(rndpixelValueZArray);
    // TODO: break apart function or figure out how to return multple values
    return rndPixelValueZArray;
}

// Generates random color components (0-255)for animateConfetti()
// TODO: Better way to set end values in for loops; right now, fixed integers
// TODO-CWH-2019-03-01: Reason that the item-based randomization is not working is that the
// initial variable declarations are outside of the helper functions, which means that the
// arrays are simply be getting longer each time through; TRYING PUTTING HELPERS INSIDE MAIN FUNCTION

let rndColorComponentArray = [];
function makeRndColorComponentArray() {
    for (let i = 0; i < (dimensions * board.confettiMultiplier * 3 * 4); i++) { // dimensions * confmultiplr * 3 rgb * 4 uses
        let rndColorComponent = randomIntInRange(0,255);
        rndColorComponentArray.push(rndColorComponent);
    }
    // console.log(rndColorComponentArray);
    return rndColorComponentArray;
}

// Generates 6 random colors in *****FORMAT*** for animateConfetti()
// TODO: Better way to set end values in for loops; right now, fixed integers
// TODO-CWH-2019-03-01: Reason that the item-based randomization is not working is that the
// initial variable declarations are outside of the helper functions, which means that the
// arrays are simply be getting longer each time through; TRYING PUTTING HELPERS INSIDE MAIN FUNCTION

let rndColorArray = [];
function makeRndColorArray() {
    for (let i = 0; i < (dimensions * 2 * 3 * 4); i += 3) { // same multiple of dimensions as in
        // makeRndColorComponentArray()
        let rndColor = rgbColorString(rndColorComponentArray[i], rndColorComponentArray[i + 1],
            rndColorComponentArray[i + 2]);
        rndColorArray.push(rndColor);
    }
    // console.log(rndColorArray);
    return rndColorArray;
}

// Generates array of two random integers, first in range (4,10), second in range (0,5)
// for animateConfetti()
// TODO: Change max values for randomIntInRange if I fix randomIntInRange()
// TODO-CWH-2019-03-01: Reason that the item-based randomization is not working is that the
// initial variable declarations are outside of the helper functions, which means that the
// arrays are simply be getting longer each time through; TRYING PUTTING HELPERS INSIDE MAIN FUNCTION

// let rndScaleArray = [];
// function makeRndScaleArray() {
//     let scl1 = randomIntInRange(4,11);
//     let scl2 = randomIntInRange(0,6);
//     let rndScl1 = 'scale(' + scl1 + ')';
//     let rndScl2 = 'scale(' + scl2 + ')';
//     rndScaleArray.push(rndScl1);
//     rndScaleArray.push(rndScl2);
//     // console.log(rndScaleArray);
//     return rndScaleArray;
// }

// Generates array of random integers, first in range (0,10)
// for animateConfetti()
// TODO: Change max values for randomIntInRange if I fix randomIntInRange()
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

// NOTE: This approach to animating multiple elements using the animate method is based upon this:
//     https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm
//     TODO: Implement eventHandler discussed in last part of article (not presently necessary)

    const confettiPieces = document.querySelectorAll('.confetti-piece');

    // TODO 2019-03-10: New goal --- transform for loop in animateConfetti(), so that:
    //     a.  We create an animation for each confettiPiece, which enables us to
    //     b.  Use the animation object properties of that animation, e.g., onfinish
    //         See:    https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
    //                 https://developer.mozilla.org/en-US/docs/Web/API/Animation
    //                 https://developer.mozilla.org/en-US/docs/Web/API/Animation/onfinish
    //                 http://danielcwilson.com/blog/2015/07/animations-part-1/
    //                 https://css-tricks.com/css-animations-vs-web-animations-api/
    //                 https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm


    for (let i = 0; i < (board.confettiRowLength ** 2); i++) {
        let confettiPiece = confettiPieces[i];
        confettiAnimator(confettiPiece, i);
        board.confettiCount += 1;
    }

     function confettiAnimator(confettiPiece) {
        let xMax = 20;
        let yMax = 20;
        let sMax = 10;
        let tSuppBase = 10;
        let tSuppMult = 10;
        let tMax = 10;
// TODO: localize the following variable names, so they're not the same as in helper functions
        let rndColorComponentArray = makeRndColorComponentArray();
        let rndColorArray = makeRndColorArray();
        let rndSignsArrayX = makeRndSignsArray();
        let rndSignsArrayY = makeRndSignsArray();
        let rndScaleArray = makeRndScaleArray();

        let x = board.confettiCount;

// DONE: Random color --- need to modify format (not hex, but rgb, and need to refer to arrays above)
//       Random Y +/- beginning 2nd phase
//       Random X +/- beginning 2nd phase
//       Random scale beginning 2nd phase

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
            color: rndColorArray[x],
            transform: 'translate3d(-10%, -50%, 0) scale(5.0)'
        }, {
            opacity: Math.random(),
            color: rndColorArray[x + 1],
            transform: 'translate3d(-20px, 100px, 5px) scale(10.0)',
            // Old code follows:
            // transform: 'translate3d(' + rndSignsArrayX[x] + (Math.random() * xMax) + 'px, ' +
            //     rndSignsArrayY[x] + (Math.random() * yMax) + 'px, 0px) scale(' +
            //     rndScaleArray[x] + ')'
       }, {
            opacity: 1,
            color: rndColorArray[x + 2],
            transform: 'translate3d(' + rndSignsArrayX[x + 1] + (Math.random() * xMax) + 'px, ' +
                '100px, 0px) scale(' + rndScaleArray[x + 1] + ')'
       }, {
            opacity: .7,
            color: rndColorArray[x + 3],
            transform: 'translate3d(-5px, 100px, 0px) rotate(2.0turn) scale(3.0)'
       }, {
            opacity: 1,
            color: rndColorArray[x + 4],
            transform: 'translate3d(20px, 100px, 0px) rotate(-.75turn) scale(10.0)'
       }, {
            opacity: 1,
            color: rndColorArray[x + 5],
            transform: 'translate3d(-20px, 100px, 0px) rotate(.75turn) scale(15.0)'
       }, {
            opacity: 1,
            color: rndColorArray[x + 6],
            transform: 'translate3d(20px, 100px, 0px) rotate(-.75turn) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArray[x + 7],
            transform: 'translate3d(-20px, 100px, 0px) rotate(.75turn) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArray[x + 8],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArray[x + 9],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArray[x + 10],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArray[x + 11],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArray[x + 12],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: 1,
            color: rndColorArray[x + 13],
            transform: 'translate3d(-80px, 100px, 0px) scale(20.0)'
       }, {
            opacity: (Math.random() * 2),
            color: rndColorArray[x + 10],
            transform: 'translate3d(' + rndSignsArrayX[x + 2] + (Math.random() * xMax) + 'px, ' +
                ((rndSignsArrayY[x + 2] + (Math.random() * yMax)) + 100) + 'px, 0px) scale(' +
                (rndScaleArray[x + 2] + 5.0) + ')'
        }, {
            opacity: .1,
            color: '#F00',
            transform: 'translate3d(-10px, 100px, 0px) rotate(-.75turn) scale(0.1)'
       }, {
            opacity: .1,
            color: '#F00',
            transform: 'translate3d(-10px, 100px, 0px) scale(0.1)'
       }, {
            opacity: .2,
            color: '#F00',
            transform: 'translate3d(-10px, 100px, 0px) scale(0.2)'
       }, {
            opacity: .3,
            color: '#F00',
            transform: 'translate3d(-25px, 100px, 0px) scale(3.0)'
       }, {
            opacity: .4,
            color: '#F00',
            transform: 'translate3d(-25px, 100px, 0px) scale(4.0)'
       }, {
            opacity: .6,
            color: '#F00',
            transform: 'translate3d(-35px, 100px, 0px) scale(5.0)'
       }, {
            opacity: .8,
            color: '#F00',
            transform: 'translate3d(-35px, 100px, 0px) scale(6.0)'
       }, {
            opacity: 1,
            color: '#F00',
            transform: 'translate3d(-35px, 100px, 0px) scale(7.0)'
        }];

        confettiPiece.animProps = {
            duration: 15000 + (tSuppBase * (Math.random() * tSuppMult)),
            easing: 'cubic-bezier(0.1, 0.1, 1, 1)',
            // easing: 'steps(4,end)',
            // easing: 'ease-out',
            iterations: 1
        }

// NOTE: The following, which I've commented out, is from
//      https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm
//      I didn't really understand it, and I didn't find it necessary for this project
//      but it's something to study further after re-reading the article
//
        // function addConfettiFinishHandler(anim, el) {
        //     anim.addEventListener('finish', function(e) {
        //         confettiAnimator(el);
        //     }, false);
        // }

        let confettiPlayer = confettiPiece.animate(confettiPiece.keyframes, confettiPiece.animProps);
        animationFinishHandler(confettiPlayer, confettiPiece);

        function animationFinishHandler(anim, el) {
            anim.addEventListener('finish', function(e) {
                hideDiv('#confetti');
                unhideDiv('#post-game-header-2');
                unhideDiv('#contact-information');
            }, false);
        }

        // addConfettiFinishHandler(confettiPlayer, confettiPiece);

// TODO 2019-03-09: Need to figure out how to use the addConfettiFinishHandler and invoke testConfettiState();

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
        console.log("");
        // window.alert("board.cardClickCount still less than 2X numberCards");
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

            if (board.cardMatchCount == 2) {
                hideDiv('#banner-1');
                unhideDiv('#banner-2');
            }

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
        console.log('Error somewhere');
    }
}

// console.log("1st board.boardState is " + board.boardState);

playInput.addEventListener('click', startGame);

targetDiv.addEventListener('mouseover', onMouseoverCard);

targetDiv.addEventListener('click', onMouseClickNEW, true);

playAgainInput.addEventListener('click', startNewGame);


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



// SAVED 2019-03-10: OLD VERSION OF function animateConfetti()

// function animateConfetti() {
//     hideDiv('#post-game-header-1');
//     hideDiv('#post-game-header-2');

// // NOTE: This approach to animating multiple elements using the animate method is based upon this:
// //     https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm
// //     TODO: Implement eventHandler discussed in last part of article (not presently necessary)

//     const confettiPieces = document.querySelectorAll('.confetti-piece');

//     for (let i = 0; i < 64; i++) {
//         let confettiPiece = confettiPieces[i];
//         confettiAnimator(confettiPiece, i);
//     }

//      function confettiAnimator(confettiPiece, x) {
//         let xMax = 20;
//         let yMax = 20;
//         let sMax = 10;
//         let tSuppBase = 10;
//         let tSuppMult = 10;
//         let tMax = 10;
// // TODO: localize the following variable names, so they're not the same as in helper functions
//         let rndColorComponentArray = makeRndColorComponentArray();
//         let rndColorArray = makeRndColorArray();
//         let rndSignsArrayX = makeRndSignsArray();
//         let rndSignsArrayY = makeRndSignsArray();
//         let rndScaleArray = makeRndScaleArray();

// // DONE: Random color --- need to modify format (not hex, but rgb, and need to refer to arrays above)
// //       Random Y +/- beginning 2nd phase
// //       Random X +/- beginning 2nd phase
// //       Random scale beginning 2nd phase

//         confettiPiece.keyframes = [{
//             opacity: (Math.random() * 0.3),
//             color: rndColorArray[x],
//             transform: 'translate3d(0, -1000%, 0) scale(15.0)'
//         }, {
//             opacity: Math.random(),
//             color: rndColorArray[x + 1],
//             // transform: 'translate3d(0, -1000%, 0) scale(10.0)',
//             transform: 'translate3d(' + rndSignsArrayX[x] + (Math.random() * xMax) + 'px, ' +
//                 rndSignsArrayY[x] + (Math.random() * yMax) + 'px, 0px) scale(' +
//                 rndScaleArray[x] + ')'
//        }, {
//         //     opacity: (Math.random() * 0.6),
//         //     color: rndColorArray[x],
//         //     transform: 'translate3d(0, -1000%, 0) scale(10.0)'
//         // }, {
//             opacity: 1,
//             color: rndColorArray[x + 2],
//             transform: 'translate3d(' + rndSignsArrayX[x + 1] + (Math.random() * xMax) + 'px, ' +
//                 rndSignsArrayY[x + 1] + (Math.random() * yMax) + 'px, 0px) scale(' +
//                 rndScaleArray[x + 1] + ')'
//        }, {
//         //     opacity: (Math.random() * 0.6),
//         //     color: rndColorArray[x],
//         //     transform: 'translate3d(0, -1000%, 0) scale(10.0)'
//         // }, {
//             opacity: (Math.random() * 2),
//             color: rndColorArray[x + 3],
//             transform: 'translate3d(' + rndSignsArrayX[x + 2] + (Math.random() * xMax) + 'px, ' +
//                 rndSignsArrayY[x + 2] + (Math.random() * yMax) + 'px, 0px) scale(' +
//                 rndScaleArray[x + 2] + ')'
//         }];


//         confettiPiece.animProps = {
//             duration: 6000 + (tSuppBase * (Math.random() * tSuppMult)),
//             easing: 'cubic-bezier(1, 0.25, 0.90, 1)',
//             // easing: 'steps(4,end)',
//             // easing: 'ease-out',
//             iterations: 1
//         }

// // NOTE: The following, which I've commented out, is from
// //      https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm
// //      I didn't really understand it, and I didn't find it necessary for this project
// //      but it's something to study further after re-reading the article
// //
//         // function addConfettiFinishHandler(anim, el) {
//         //     anim.addEventListener('finish', function(e) {
//         //         confettiAnimator(el);
//         //     }, false);
//         // }

//         let confettiPlayer = confettiPiece.animate(confettiPiece.keyframes, confettiPiece.animProps);
//         // addConfettiFinishHandler(confettiPlayer, confettiPiece);

// // TODO 2019-03-09: Need to figure out how to use the addConfettiFinishHandler and invoke testConfettiState();

//     }
//     board.confettiState = "postConfetti";
// }

