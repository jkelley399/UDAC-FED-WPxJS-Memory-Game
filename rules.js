// GENERAL INITIALIZATION SECTION

// constants and other variables used throughout
const playInput = document.querySelector('#pre-game-button');
const playAgainInput = document.querySelector('#play-again-button');
const boardFragment = document.createDocumentFragment();
const confettiFragment = document.createDocumentFragment();
const newRow = document.createElement('div');
const targetDiv = document.querySelector('#board');
const confettiDiv = document.querySelector('#confetti');
const numberCards = 16;
// If number of tries exceeds (numberCards * maxNumberCardsMultiplier),
//  program forces a new game
const maxNumberCardsMultiplier = 4;
const maxCardsMultiplier = 2; // Natural number
const dimensions = Math.sqrt(numberCards);
const hiddenClass = 'd-none';
const screenWidth = window.screen.width;
const suits = ['C', 'D', 'H', 'S'];
const ranks = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']
let cards = [];
let board = {};
// see testMaxCardClickCount(); NOTE: not adding as property of board, because doing so
// would complicate startGame() even more
let maxCardClickCountExceeded = false;  // true, false; becomes true if number of tries is exceeded

// reference object for initialzing board
// REFACTOR:   Split out board and card objects, and add methods
let boardInitial = {
//  TEST MODE PROPERTY: for makeConfetti() and animateConfetti()
//      NOTE: only used for testing
    animationState: false,// true, false; use true to test animateConfetti();

//  PRINCIPAL PROPERTIES BEGIN HERE
    // state of board
    boardState: 'preBoard', //re state of game: preBoard, transBoard, postBoard;
    // basic state information about cards being clicked
    firstCardState: 'notClicked', //notClicked, clicked,
    firstCardValue: '', //empty, card Value (e.g., '4S' || '10C')
    secondCardState: 'notClicked', //notClicked, clicked,
    secondCardValue: '', //empty, card Value (e.g., '4S' || '10C')
    cardClickCount: 0, // 0, 1, 2
    onMouseClickTextColorError: 0, // 0, 1
    // additional state information re cards being clicked
    // to prevent clicking on same card twice to get a match
    firstCardID: '',
    secondCardID: '',
    // state information about matched cards
    cardMatchCount: 0, // Positive integers (0, even); max value determined by board size
    matchedCards: [],
    // state of confetti for winning animation and confetti parameters
    confettiState: 'preConfetti', //preConfetti, transConfetti, postConfetti; re state of confetti
    confettiCount: 0, //
    confettiRowLength: 12,
    confettiMultiplier: 3


 };

// for play again functionality (i.e., played through successfully and now replaying)
// initializes board object based on boardInitial object
// NOTE: based upon
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// NOTE: would probably have to rework this if methods added to boardInitial object
function initializeBoardObject() {
    // Because Object.assign() doesn't do deep cloning
    //     (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign),
    //     it's necessary to add a preliminary step in this function to
    //     reset board.matchedCards; otherwise board.matchedCards, an array, won't be reset, and
    //     an error would arise on repeated plays.
    board.matchedCards = [];
    // KNOWN: Figure out why this additional step is necessary, but it seems to be
    boardInitial.matchedCards = [];
    board = Object.assign({}, boardInitial);
}
// for play again functionality (i.e., played through successfully and now replaying)
// initializes index.html
// NOTE: based on https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
function initializeBoardHTML() {
    if (targetDiv.hasChildNodes()) {
        while (targetDiv.firstChild) {
            targetDiv.removeChild(targetDiv.firstChild);
        }
    }
}
// for play again functionality (i.e., played through successfully and now replaying)
// initializes confetti div within index.html
// NOTE: based on https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
function initializeConfettiHTML() {
    if (confettiDiv.hasChildNodes()) {
        while (confettiDiv.firstChild) {
            confettiDiv.removeChild(confettiDiv.firstChild);
        }
    }
}

// MISCELLANEOUS HELPER FUNCTIONS SECTION

// helper function
// takes an array as input, copies all its elements to the end,
    // and returns the doubled array
    // e.g. [x,y,z] -> [x,y,z,x,y,z]
function doubleArray(x) {
    x.forEach(function(value) {
        x.push(value);
    });
    return x;   //an array
}

// helper function
// NOTE: based on getRandomInt(max) in MDN - see references for Math.random()
// KNOWN:  Test, fix, and improve randomIntInRange(minInt, maxInt)
//         Add tests (e.g., ensure both parameters are integers && maxInt >= minInt)
//         Add fixes (if maxInt < minInt, then switch)
//         Test the case (maxInt = (minInt + 1)), and, if necessary, fix or add test
            // SHOULD BE SIMPLE FIX TO ADD 1 TO floorMaxInt
function randomIntInRange(minInt, maxInt) { //input, two integers
    // if either parameter is not an integer, its floor value != origiinal parameter
    let floorMinInt = Math.floor(minInt);
    let floorMaxInt = Math.floor(maxInt);
    deltInt = floorMaxInt - floorMinInt;
    // returns random integer between minInt and (maxInt -1)
    return (floorMinInt + Math.floor(Math.random() * Math.floor(deltInt)));
    // console.log(deltInt);
}

// helper function
// KNOWN: Revise if necessary after testing randomIntInRange re the case (maxInt = (minInt + 1))
function randomSign() {
    // Returns a string, either '-' or ''
    if (randomIntInRange(1,3) == 1) {
        return '-';
    }
    else {
        return '';
    }
}

// helper function
// takes string that is a div id as input and hides the div
function hideDiv(strH) {
    let divToHide = document.querySelector(strH);
    divToHide.classList.add(hiddenClass);
}

// helper function
// takes string that is a div id as input and unhides the div
function unhideDiv(strU) {
    let divToUnhide = document.querySelector(strU);
    divToUnhide.classList.remove(hiddenClass);
}


// STARTING GAME SECTION

// helper function startGame()
// generates cards by iterating over suit and rank
function makeCards() {
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            let card = rank + suit;
            cards.push(card);
        });
    });
}

// creates the card board, intitialzing based on windows.screen.width and
//     prior play state
function startGame() {

    // VIEWPORT INITIALIZATION
    // KNOWN:  card sizes will vary for small viewports (e.g., < 375 width)
    // KNOWN:  first and last phases of winning animation will not display properly
    //             for small and medium sized viewports (e.g., < 768 width)
    // FUTURE: Test windows.screen.width to adjust (a) card sizes and
    //          (b) confetti sizes
    if (screenWidth < 768) {
        board.confettiRowLength = 8;
        board.confettiMultiplier= 2;
    }

    // PRIOR PLAY INITIALIZATION (varies depending on maxCardClickCountExceeded from prior play)
    //initialize board object
    initializeBoardObject();
    //initialize board section in index.html
    initializeBoardHTML();
    //initialize confetti section in index.html
    initializeConfettiHTML();
    // Hide and display relevant parts of index.html, unless maxCardClickCountExceeded
    if (maxCardClickCountExceeded == false) {
        hideDiv('#pre-game');
        unhideDiv('#banner');
        unhideDiv('#banner-1');
    } else {
    // if maxCardClickCountExceeded before startGame(), then reset to false and display
    // initial version of index.html
        maxCardClickCountExceeded = false;
        unhideDiv('#pre-game');
        hideDiv('#banner');
        hideDiv('#banner-1');
    }
    makeCards();

    // CORE SECTION
    let remainingCards = cards;
    // uses removedCards to avoid duplication of pairs of cards on board
    let removedCards = [];

    for (let h = 0; h < (dimensions * 2); h++) {
        // uses remainingCards.length, because randomIntInRange ranges over
        //  first-last index of array
        // TODO Turn the 'let cardRandom = remainingCards...' processes into a function
        let cardRandom = remainingCards[randomIntInRange(0,remainingCards.length)];
        let cardRandomIndex = remainingCards.indexOf(cardRandom);
        removedCard = remainingCards.splice(cardRandomIndex, 1);
        removedCards.push(removedCard[0]);
    }

    let cardsSubset = doubleArray(removedCards);
    let displayedCards = [];

    for (let i = 0; i < dimensions; i++) {
        let newDimensionsCardHtml = '';
        for (let j = 0; j < dimensions; j++) {
            // uses cardsSubset.length, because randomIntInRange ranges over
            //  first-last index of array
            let cardSubsetRandom = cardsSubset[randomIntInRange(0,cardsSubset.length)];
            let cardSubsetIndex = cardsSubset.indexOf(cardSubsetRandom);
            displayCard = cardsSubset.splice(cardSubsetIndex, 1);
            displayedCards.push(displayCard);
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
    board.boardState = 'transBoard';
 }


// used to start new game with two variations
// if game runs to successful completion to allow user to initiate new play
// if game terminates because maxCardClickCountExceeded reached, to force starting over
function startNewGame() {
    hideDiv('#post-game');
    hideDiv('#banner-8');
    // if maxCardClickCountExceeded reached, display index.html in initial state
    if (maxCardClickCountExceeded == false) {
        unhideDiv('#banner');
        unhideDiv('#confetti');
    }
    refresh();
    startGame();
}

// helper function to start new game if maxCardClickCountExceeded reached
function tooManyTriesStartNewGame() {
    hideDiv('#banner-1');
    hideDiv('#banner-2');
    hideDiv('#banner-3');
    hideDiv('#banner-4');
    hideDiv('#banner-5');
    hideDiv('#banner-6');
    hideDiv('#banner-7');
    startNewGame();
}

// helper function for startNewGame
function refresh() {
    //reset cards to initial state
    cards = [];
    matchedCards = [];
}

// CARD CLICKING SECTION

// provides animation when mousing over cards
// KNOWN: Fix onMouseOverCard(evt) so it works only on individual cards, not rows
//  To do this, could test with if/else statements for different responses
//      depending on the characteristics of the div
//          But: remember to look at the lesson about capitalization
//              See: 'The nodeName's Capitalization' in
//                  https://classroom.udacity.com/nanodegrees/nd001/
//                  parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/
//                  04eb38bd-45e1-4a58-98c8-1e6f1e770438/lessons/
//                  f270dbcf-eb43-4ce3-b7be-a74d26023496/concepts/
//                  85463be2-3206-434e-aa39-4604965daa29
//  NOTE: if fixing, also review the window.alert in onMouseClickNEW(evt)
        // which provides related functionality
function onMouseOverCard(evt) {
    //  FUTURE: Add tests here if desired, e.g., test whether
    //          (a) textContent has acceptable syntax, using regex
    //          (b) use None.noneType to test if mouseOver is on an element_node
    if ((evt.target.textContent.length >= 2) && (evt.target.textContent.length <= 6)) {
        // console.log('mouseOver a card div in onMouseOverCard');
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
    // KNOWN: to build out if fixing to work only on individual cards, not rows
    } else if ((evt.target.textContent.length >= 8) && (evt.target.textContent.length <= 12)) {
        // console.log('mouseOver a row-of-cards div in onMouseOverCard');
        console.log('');
    // KNOWN: to build out if fixing to work only on individual cards, not rows
    } else {
        // console.log('ERROR: mouse is mouseOver neither card nor row of cards.');
        console.log('');
    }
}

// helper function to track count of correctly matched cards
function iterateCorrectCardCount() {
    // console.log('before ' + board.cardMatchCount);
    board.cardMatchCount += 2;
    // console.log('after increment ' + board.cardMatchCount);
}

// helper function to track count of correctly matched cards
// fc and sc are the card values of the first and second matched cards
function augmentMatchedCards(fc, sc) {
    board.matchedCards.push(fc);
    board.matchedCards.push(sc);
}


// tests whether all the cards on the board have been properly matched
function testMaxCorrectCardCount() {

//  test mode for makeConfetti() and animateConfetti() to facilitate testing
    if (board.animationState == true) {
        hideDiv('#pre-game');
        hideDiv('#banner');
        unhideDiv('#post-game');
        makeConfetti();
    }

//  non-test mode part of function begins here
    if (board.cardMatchCount  >= numberCards) {
        // window.alert('CONGRATUALTIONS! board.cardMatchCount >= ' + numberCards);
        hideDiv('#pre-game');
        hideDiv('#banner');
        unhideDiv('#post-game');
        makeConfetti();
    }   else  {
        // console.log('board.cardMatchCount still less than ' + numberCards);
    }
}

// helper function to track count of how many cards have been clicked
function iterateCardClickCount() {
    // console.log('before ' + board.cardClickCount);
    board.cardClickCount += 1;
    // console.log('after increment ' + board.cardClickCount);
}

// tests whether the number of cards clicked exceeds a pre-determined maximum number of tries
function testMaxCardClickCount() {
    if (board.cardClickCount  >= (maxNumberCardsMultiplier * numberCards)) {
        // console.log(board.cardClickCount);
        window.alert('Sorry, you have exceeded the maximum number of tries.  Please try again.');
        maxCardClickCountExceeded = true;
        tooManyTriesStartNewGame();
    }   else if (board.cardClickCount  >= ((0.75 *maxNumberCardsMultiplier) * numberCards)) {
        window.alert('You are getting close to the maximum number of tries.  ' +
            'You have only ' + ((maxNumberCardsMultiplier * numberCards) - board.cardClickCount) +
            ' tries left, before the game will start over.')
    }   else  {
            console.log('board.cardClickCount still less than ' +
                '((0.75 *maxNumberCardsMultiplier) * numberCards)');
    }
}

// principal function for handling clicking of cards on board
function onMouseClickNEW(evt) {

    let clickedDivClassList = evt.target.classList;
    let hiddenText = 'text-info';
    let darkText = 'text-dark';
    let backgroundDownColor = 'card-background-color-down';
    let backgroundCorrectColor = 'card-background-color-correct';
    let backgroundIncorrectColor = 'card-background-color-incorrect';
    let firstClickedCardClass = 'first-card-clicked';

//  Test mode for makeConfetti() and animateConfetti()
    if (board.animationState == true) {
        testMaxCorrectCardCount();
    }

//  non-test mode part of function resumes here
//  FUTURE: consider this functionality if revising onMouseOverCard(evt)
    if (clickedDivClassList.contains('card')) {
        iterateCardClickCount();
        testMaxCardClickCount();
    } else {
        window.alert('You did not click on a card.  Please try again.')
    }

    // clicking on first card
    if ((clickedDivClassList.contains('card')) && (board.firstCardState == 'notClicked')) {
         board.firstCardValue = evt.target.textContent;
         // board property to prevent clicking on same card twice to get a match
         board.firstCardID = evt.target.id;
         // test to prevent first click on already matched card
         if (board.matchedCards.includes(board.firstCardValue)) {
            window.alert('Your first click is on a card you have already matched.  Please try again.');
            return console.log('clicking on first card: First click on an already-matched card.');
         }
        board.firstCardState = 'clicked';

        clickedDivClassList.replace(hiddenText, darkText);
        clickedDivClassList.add(firstClickedCardClass);
        // console.log('First clicked card value  = ' + board.firstCardValue);

    // clicking on second card after first card has been sucdessfully clicked
    } else if ((clickedDivClassList.contains('card')) && (board.firstCardState == 'clicked')) {
        board.secondCardState = 'clicked';
        board.secondCardValue = evt.target.textContent;
        // board property to prevent clicking on same card twice to get a match
        board.secondCardID = evt.target.id;
         // test to prevent second click on already matched card
         if (board.matchedCards.includes(board.secondCardValue)) {
            window.alert('Your second click is on a card you have already matched.  Please try again.');
            return console.log('clicking on second card: Second click on an already-matched card.');
         }
        // test to prevent clicking on same card twice to get a match, while allowing later clicking
         if (board.firstCardID == board.secondCardID) {
            window.alert('You can not match by clicking the same card twice.  Please pick a different second card.');
            // resetting second card values from above to allow for match with new second card
            board.secondCardValue = '';
            board.secondCardID = '';
            board.secondCardState = 'notClicked';
            return console.log ('testing on clicking same card twice: You can not match by clicking the same card twice.');
         }
        clickedDivClassList.replace(hiddenText, darkText);
        let firstClickedCardDiv = document.querySelector('.first-card-clicked');

        // first and second clicked cards match
        if (board.firstCardValue == board.secondCardValue) {

            let firstClickedCardDiv = document.querySelector('.first-card-clicked');
            firstClickedCardDiv.classList.replace(backgroundDownColor, backgroundCorrectColor);
            clickedDivClassList.replace(backgroundDownColor, backgroundCorrectColor);

            // animation when first and second clicked cards match

            firstClickedCardDiv.animate([
                    // keyframes
                    {transform: 'translateY(-25px)'},
                    {transform: 'scale(2)'},
                ], {
                    //timing options
                    duration: 1000,
                    iterations: 1
                }
            );

            evt.target.animate([
                    // keyframes
                    {transform: 'translateY(+25px)'},
                    {transform: 'scale(2)'},
                ], {
                    //timing options
                    duration: 1000,
                    iterations: 1
                }
            );

            firstClickedCardDiv.classList.remove(firstClickedCardClass);
            board.firstCardState = 'notClicked';
            board.secondCardState = 'notClicked';

            // track how many cards have been matched
            iterateCorrectCardCount();
            // track which card values have been matched already
            augmentMatchedCards(board.firstCardValue, board.secondCardValue);

            // cleaning up board, depending on how many cards have previously been
            // matched, if the limit for tries has been reached
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
            // test for whether all the cards on the board have been correctly matched
            testMaxCorrectCardCount();

        // first and second clicked cards do not match
        } else {
            clickedDivClassList.replace(hiddenText, darkText);
            firstClickedCardDiv.classList.replace(backgroundDownColor, backgroundIncorrectColor);
            clickedDivClassList.replace(backgroundDownColor, backgroundIncorrectColor);
            clickedDivClassList.replace(hiddenText, darkText);

            // animation when first and second clicked cards do not match
            // NOTE: This section revised based on
                // https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API
                // https://codepen.io/rachelnabors/pen/PNYGZQ?editors=0010
                // https://developer.mozilla.org/en-US/docs/Web/API/Animation/onfinish
            let firstClickedIncorrectAnimate = firstClickedCardDiv.animate(
                [
                // keyframes
                    {
                        transform: 'translateX(-100px)',
                        color: backgroundIncorrectColor
                    }, {
                        transform: 'rotate(0.5turn)'}
                ], {
                    //timing options
                    duration: 1000,
                    easing: 'ease-out',
                    iterations: 2
                }
            );

            let evtTargetIncorrectAnimate = evt.target.animate(
                [
                // keyframes
                    {
                        transform: 'translateX(+100px)',
                        color: backgroundIncorrectColor
                    }, {
                        transform: 'rotate(0.5turn)'}
                ], {
                //timing options
                    duration: 1000,
                    easing: 'ease-out',
                    iterations: 2
                }
            );

            // resetting the first and second clicked cards when they do not match
            // after animation
            firstClickedIncorrectAnimate.play();
            evtTargetIncorrectAnimate.play();
            firstClickedIncorrectAnimate.onfinish = function() {
                firstClickedCardDiv.classList.replace(backgroundIncorrectColor, backgroundDownColor);
            };
            evtTargetIncorrectAnimate.onfinish = function() {
                clickedDivClassList.replace(backgroundIncorrectColor, backgroundDownColor);
            };

            firstClickedCardDiv.classList.remove(firstClickedCardClass);
            board.firstCardState = 'notClicked';
            board.secondCardState = 'notClicked';
            clickedDivClassList.replace(darkText, hiddenText);
            // firstClickedCardDiv.classList.replace(backgroundIncorrectColor, backgroundDownColor);
            firstClickedCardDiv.classList.replace(darkText, hiddenText);
            // clickedDivClassList.replace(backgroundIncorrectColor, backgroundDownColor);
            clickedDivClassList.replace(darkText, hiddenText);
        }

    } else {
        // catchall console.log if error in onMouseClickNEW(evt)
        return console.log('@ end of onMouseClickNEW(evt) - error somewhere');
    }
}

// WINNING GAME INITIALIZATION SECTION

// helper function for winning game animation
// inputs are integers (but not really testing for this at present)
function rgbColorString(x,y,z) {
    // Returns a string of an RGB color, e.g., 'rgb(30, 40, 50)'
    return ('rgb(' + x.toString() + ', ' + y.toString() + ', ' + z.toString() + ')');
}

// helper function for possible future animation functionality
// all inputs must be strings
//  inputs are 'X' or 'Y', a sign ('' or '-')), and an integer
//  (but not really testing for this at present)
// FUTURE: modify translateXorYString() to work with two perCent values and translate3D
function translateXorYString(axis,sign,perCent) {
    // returns a string of a keyframe translateX or translateY value
    return ('translate' + axis + '(' + sign + perCent + '%)');
}

// helper function for possible future animation functionality
// FUTURE: modify translateXorYString() to work with two perCent values and translate3D
function translate3DString(sign1, sign2, sign3, perCentX, perCentY, pixelValueZ) {
    // all inputs must be strings
    // returns a string of a keyframe translateX or translateY value, e.g., 'rgb(30, 40, 50)'
    return ('translate3D(' + sign1 + perCentX + '%, ' + sign2 + perCentY + '%, '
        + sign3 + pixelValueZ + 'px)');
}

// generates random signs for animateConfetti()
// FUTURE: better way to set end values in for loops; right now, fixed integers
// FUTURE: revisit calculation of end of for loop based on current requirements for confettiAnimator()
let rndSignsArray = [];
function makeRndSignsArray() {
    for (let i = 0; i < (dimensions * board.confettiMultiplier * 3 * 3); i += 3) {
        let rndSgn = randomSign();
        rndSignsArray.push(rndSgn);
    }
    // console.log(rndSignsArray);
    return rndSignsArray;
}

// helper function for winning game animation
// generates random color components (0-255) for animateConfetti()
// FUTURE: better way to set end values in for loops; right now, fixed integers
// FUTURE: revisit calculation of end of for loop based on current requirements for confettiAnimator()
let rndColorComponentArray = [];
function makeRndColorComponentArray() {
    for (let i = 0; i < (dimensions * board.confettiMultiplier * 3 * 4); i++) {
        let rndColorComponent = randomIntInRange(0,255);
        rndColorComponentArray.push(rndColorComponent);
    }
    // console.log(rndColorComponentArray);
    return rndColorComponentArray;
}

// helper function for winning game animation
// generates 6 random colors in rgb format (e.g., 'rgb(30, 40, 50)') for animateConfetti()
// FUTURE: better way to set end values in for loops; right now, fixed integers
// FUTURE: revisit calculation of end of for loop based on current requirements for confettiAnimator()
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

// helper function for winning game animation
// generates array of random integers, first in range (0,10)
// FUTURE: change max values for randomIntInRange if I fix randomIntInRange()
// FUTURE: revisit calculation of end of for loop based on current requirements for confettiAnimator()
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

// winning game animation
function animateConfetti() {
    // initializing area for display of confetti
    hideDiv('#post-game-header-2');
    hideDiv('#contact-information');

// NOTE: this approach to animating multiple elements uses the animate method based upon this:
//     https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm
//     a.  An animation is created for each confettiPiece, which enables one to
//          use the animation object properties of that animation, e.g., onfinish
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
// configuration variables for fine-tuning animation
        let xMax = 20;
        let yMax = 20;
        let sMax = 10;
        let tSuppBase = 10;
        let tSuppMult = 10;
        let tMax = 10;
// localizing variable names to distinguish from helper functions
        let rndColorComponentArrayLocal = makeRndColorComponentArray();
        let rndColorArrayLocal = makeRndColorArray();
        let rndSignsArrayX = makeRndSignsArray();
        let rndSignsArrayY = makeRndSignsArray();
        let rndScaleArrayLocal = makeRndScaleArray();

        let x = board.confettiCount;

        // keyframes
        // NOTE: long (15000ms) animation, with beginning, middle, and end phases
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

        //timing options
        confettiPiece.animProps = {
            duration: 15000 + (tSuppBase * (Math.random() * tSuppMult)),
            easing: 'cubic-bezier(0.1, 0.1, 1, 1)',
            // easing: 'steps(4,end)',
            // easing: 'ease-out',
            iterations: 1
        }

// NOTE: the following is based on:
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
    board.confettiState = 'postConfetti';
}

// make the confetti used in the winning game animation
function makeConfetti() {
    board.confettiState = 'transConfetti';
    for (let i = 0; i < (board.confettiRowLength); i++) {
        let newDimensionsConfettiHtml = '';
        for (let j = 0; j < (board.confettiRowLength); j++) {
            // const newConfettiHtml = '<div class='confetti-piece border-dark col-2 m-1'>*****</div>';
            // TRY: switching to single asterisk to set up individual animations
            const newConfettiHtml = '<div class="confetti-piece border-dark col-1">*</div>';
            newDimensionsConfettiHtml += newConfettiHtml;
        }
        const newConfettiDiv = document.createElement('div');
        confettiFragment.appendChild(newConfettiDiv);
        const newConfettiRowHtml =  '<div class="row col-12 four-confetti-piece justify-content-center">' +
                            newDimensionsConfettiHtml + '</div>';
        newConfettiDiv.innerHTML = newConfettiRowHtml;
        // console.log('confettiPieces is: ' + confettiPieces);

    }
    confettiDiv.appendChild(confettiFragment);

    animateConfetti();

    // TODO: Probably add hideDiv('#post-game-header-1'); here
    board.boardState = 'postBoard';
    // console.log('3rd board.boardState, confetti, is ' + board.boardState);
    // console.log('3rd board.boardState, confetti, is ' + board.boardState);
 }

// control display of area on index.html that will display the confetti
function testConfettiState() {
    if (board.confettiState == 'postConfetti') {
        hideDiv('#confetti');
    } else {
        console.log('board.confettiState != postConfetti');
    }
}

// eventListeners
playInput.addEventListener('click', startGame);

targetDiv.addEventListener('mouseover', onMouseOverCard);

targetDiv.addEventListener('click', onMouseClickNEW, true);

playAgainInput.addEventListener('click', startNewGame);

/*
1.  I consulted a variety of other sources in connection with this project.
    Please see the accompanying file, "UDAC-FED-Projects-WPwJS-JK Memory Game-JK-notes-re-additional-references-consulted,"
    which lists additional, non-Udacity materials consulted and relied upon in preparing this project.
2.  While also listed in "UDAC-FED-Projects-WPwJS-JK Memory Game-JK-notes-re-additional-references-consulted,"
    I wish to call out a few references that I relied upon in particular:
    A.  Regarding animations, in general:
        https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
        https://developer.mozilla.org/en-US/docs/Web/API/Animation
        https://developer.mozilla.org/en-US/docs/Web/API/Animation/onfinish
        http://danielcwilson.com/blog/2015/07/animations-part-1/
        https://css-tricks.com/css-animations-vs-web-animations-api/
    B.  Regarding animating multiple elements, especially:
        https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm
    C.  NOTE:   When running "The Memory Game" in Chrome 72.0.3626.121 (Official Build) (64-bit),
                I repeatedly got the following error message in the DevTools console:
                    "Unchecked runtime.lastError: Could not establish connection.
                    Receiving end does not exist."
                I was fortunate to find:
                https://stackoverflow.com/questions/54619817/how-to-fix-unchecked-runtime-lasterror-could-not-establish-connection-receivi
                Based on the above StackOverflow post, I tried toggling my Chrome extensions, and,
                when I inactivated the "Udacity Front End Feedback" Chrome extension, the error
                message disappeared.
*/


/*
KNOWN ISSUES

KNOWN:  Card sizes will vary for small viewports (e.g., < 375 width)
KNOWN:  Game winning animation behavior will vary for very large viewports (there doesn't seem to be a particular size at which this behavior appears; instead, it seems to depend on the ratio between the viewport size and the degree of zoom being used within the browser.
KNOWN:  First and last phases of winning animation will not display properly
        for small and medium sized viewports (e.g., < 768 width)

KNOWN:  Figure out why this additional assignment is necessary in
            initializeBoardObject(), but it seems to be:
                boardInitial.matchedCards = [];
        NOTE: Once fixed, should be able to change
            let boardInitial = .... to const boardInitial = ....

KNOWN:  Test, fix, and improve randomIntInRange(minInt, maxInt)
        Add tests (e.g., ensure both parameters are integers && maxInt >= minInt)
        Add fixes (if maxInt < minInt, then switch)
        Test the case (maxInt = (minInt + 1)), and, if necessary, fix or add test
            // SHOULD BE SIMPLE FIX TO ADD 1 TO floorMaxInt

KNOWN:  If randomIntInRange(minInt, maxInt) is improved,
            review and possibly fix other functions that use it

KNOWN:  Fix onMouseOverCard(evt) so it works only on individual cards, not rows
            To do this, could test with if/else statements for different responses
                depending on the characteristics of the div
                    But: remember to look at the lesson about capitalization
                        See: 'The nodeName's Capitalization' in
                            https://classroom.udacity.com/nanodegrees/nd001/
                            parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/
                            04eb38bd-45e1-4a58-98c8-1e6f1e770438/lessons/
                            f270dbcf-eb43-4ce3-b7be-a74d26023496/concepts/
                            85463be2-3206-434e-aa39-4604965daa29
            NOTE: if fixing, also review the window.alert in onMouseClickNEW(evt)
                which provides related functionality
*/

/*
TODO:   CHANGE COLORS ON CARDS
*/

/*
REFACTOR:   Convert to object-oriented design, e.g.
                split out board and card objects, and add methods

/*
FUTURE:     Add tests throughout
FUTURE:     Substitute card icons for 'rank''suit' format
FUTURE:     Fix known issues
FUTURE:     Test windows.screen.width to adjust (a) card sizes and
                (b) confetti sizes if necessary
FUTURE:     Add exploding and changing color 'CONGRATULAITONS' before confetti
FUTURE:     Change animations for repeated plays (right now this just repeats).
            Would be somewhat like reaching higher levels in video game.
            E.g., simple change would be rotating colors at beginning and ending phases
            NOTE:   Simple implementation would be to take existing animation and
                    comment out parts of it for the first few replays, so that the full
                    current animation only works on, e.g., the third time through.
FUTURE:     Variable size boards (4x4, 8x8, 16x16, 32x32 (with multiple decks))
            Add user input on index.html to select number of cards for the game
            Alternatively, make game harder (i.e., bigger board) as user wins and replays
FUTURE:     Turn the 'let cardRandom = remainingCards...' processes in a function
FUTURE:     Figure out how to use Bootstrap with Sass options --> see Medium article
FUTURE:     Refactor with object-oriented architecture.
            Split out board, boardInitial, and card objects
            E.g. adding methods in boardInitial object
            LEARN:  Need to understand how to move functions into methods and
                    have them work properly with animations.
                    NOTE:   Figure out why I couldn't use an object.method
                            with eventListener (2019-01-17)
FUTURE:     Add tests to onMouseOverCard(evt) if desired, e.g., test whether
            (a) textContent has acceptable syntax, using regex
            (b) use None.noneType to test if mouseOver is on an element_node
FUTURE:     In makeRndColorComponentArray(), makeRndColorArray(), and
                makeRndScaleArray(),
                    (a) create better way to set end values in for loops
                        (right now, fixed integers), and
                    (b) revisit calculation of end of for loop based on
                        current requirements for confettiAnimator(), or, alternatively,
                    (c) just use simpler randomizing mechanisms inside confettiAnimator()
*/
