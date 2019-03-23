# UDAC-FED-Web Programming with JavaScript-Project-Memory Game

## Introduction
This project is being submitted in connection with part 2, "Web Programming with JavaScript," of the Udacity Front-End Web Developer Nanodegree.  The [general required functionality for the project](https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/677caa06-55d6-444e-a853-08627c5516a7/lessons/4227cbf4-f6ce-4798-a7e5-b1ce3b9e7c33/concepts/0a38769e-8e23-4e3f-9482-d8d1aa80fbb6) was stated as follows:

> ### Game Functionality
> [In t]he real-life game, players flip over cards to locate the pairs that match[.] The goal is to recreate this effect in your project. There are a couple of interactions that you'll need to handle:

>   *   Flipping cards
>   *   What happens when cards match
>   *   What happens when cards do not match
>   *   When the game finishes

In addition to thesed requirements, some additional functionality has been added:

*   basing the faces of cards on a simplified model of playing cards (although currently without icons);
*   allowing the user to choose immediately to resume play after winning;
*   giving encouragement to the player as progress is made; and
*   establishing a maximum total number of clicks that, if exceeded, results in the user being forced to start the game over.

## Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Instructions](#instructions)
*   [Design](#design)
*   [Known Bugs or Implementation Problems](#known-bugs-or-implementation-problems)
*   [Starting Points and References](#starting-points-and-references)
*   [TODO](#todo)
*   [REFACTOR](#refactor)
*   [ROADMAP](#roadmap)
*   [LEARN](#learn)

## Instructions

### Project Instructions
For detailed instructions, see the [Udacity Classroom-Project: Memory Game > 2. Instructions](https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/677caa06-55d6-444e-a853-08627c5516a7/lessons/4227cbf4-f6ce-4798-a7e5-b1ce3b9e7c33/concepts/0a38769e-8e23-4e3f-9482-d8d1aa80fbb6) (referred to above).

### Dependencies and Requirements

#### Dependencies

[Bootstrap](https://getbootstrap.com/)

[FontAwesome](https://fontawesome.com)

NOTE: these are both added to the project through [CDNs](https://en.wikipedia.org/wiki/Content_delivery_network).

#### Requirements

A browser used to run this project must support [`Element.animate()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), which is designated as an ["experimental technology"](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Conventions_definitions#Experimental).

Chrome (50 or >), Firefox (48 or >), and Opera (37 or >), as well as various mobile browsers, are all [approved](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate#Browser_compatibility).

Notably, Internet Explorer, Edge, and Safari are [not approved](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate#Browser_compatibility).

### Installation Instructions

#### Running on GitHub Pages

This project is [currently hosted on GitHub Pages](https://jkelley399.github.io/UDAC-FED-WPxJS-Memory-Game/).

#### Installing Locally

If you wish to install this project locally:

*   navigate to the [main repository page on GitHub](https://github.com/jkelley399/UDAC-FED-WPxJS-Memory-Game);
*   clone or download the repository;
*   install the cloned or downloaded repository locally; and
*   open `index.html` using a suitable browser, as explained in the ["Requirements" section](#requirements).

## Design

### High-Level Design

The high-level design of the project generally tracks [the example implementation of the project](https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/677caa06-55d6-444e-a853-08627c5516a7/lessons/4227cbf4-f6ce-4798-a7e5-b1ce3b9e7c33/concepts/0a38769e-8e23-4e3f-9482-d8d1aa80fbb6) (referred to above):

*   there is a game board;
*   in this project, the area surrounding the game board changes, depending on the state of play;
*   the game board has representations of sixteen "cards" in a four-by-our grid;
    *   initially, the cards are arranged face down;
*   in this project, the cards, when chosen are intended to reflect playing cards;
    *   for example, "AC" signifies the ace of clubs, and "2D" the two of diamonds;
*   in this project, there are eight pairs of perfectly matching cards;
    *   for example, if there is one "AC," there will be a second "AC" as well;
*   the face down cards are chosen by being clicked, and when a card is clicked, it is flipped over to reveal its identity, e.g., "2D";
*   the player flips two cards two cards in a row, trying to match between the two cards successively flipped;
    *   in this project, the player cannot create a match by:
        *   clicking the same card twice in a row;
        *   clicking on a previously successfully matched card (on either the first click or the second click) to create a new match;
*   if the two cards chosen match, they stay face up, with a new background color;
*   if the two cards chosen do not match, they are turned down again, after first appearing with a different new background color;
*   the game proceeds until all of the cards have been matched successfully;
    *   in this project, however, a pre-determined limit of clicks to establish possible matches has been set, which is equal to four times the initial number of cards, i.e., sixty-four;
        *  if that limit is reached, the player is forced to start completely over;
*   if all of the cards are succesfully matched before that pre-determined limit has been reached, the player is notified; and
    *   in this project, the player is also given the opportunity to begin the game again immediately.

### Board Object

The board object, `board`, is initialized from another object, `boardInitial`.  `board` maintains state information concerning the board and the state of play.  (In terms of possible future work on this project, I'd like to learn how to re-implement it with a true object-oriented architecture.  See: [REFACTOR](#refactor), below.)

### Animations

There are three animations, for a successful match of two cards, for an unsuccessful match of two cards, and for completing the game successfully (see `onMouseClickNEW(evt)` for the first two and `confettiAnimator(confettiPiece)` for the last one.

### Files

The principal files are `index.html`, `rules.js`, and `styles.css`.  In addtion to `README.md`, there is also a separate file containing references, `UDAC-FED-Projects-WPwJS-JK Memory Game-JK-notes-re-additional-references-consulted`.

### Testing

*   To facilitate testing generally, it helps to make it easy to see the values of the cards, even if they are face down.
    *   This can be accomplished by changing the value for `.card-background-color-down` in styles.css
*   To facilitate testing of `makeConfetti()` and `animateConfetti()`, there is a property of the `boardInitial` object, `animationState`, that can be toggled to facilitate faster testing of the game-winning animation.

## Known Bugs or Implementation Problems

### Known Bugs or Implementation Problems

*   Card sizes will vary for small viewports (e.g., < 375 width)
*   Game winning animation behavior will vary for very large viewports.
    *   There doesn't seem to be a particular size at which this behavior appears.
    *   Instead, the behavior seems to depend on the ratio between the viewport size and the degree of zoom being used within the browser.
*   First and last phases of the game-winning animation will not display properly for small and medium sized viewports (e.g., < 768 width)

*   Figure out why this additional assignment is necessary in `initializeBoardObject()`:
    * `boardInitial.matchedCards = [];`
        * NOTE: Once fixed, should be able to change
            `let boardInitial = ....` to `const boardInitial = ....`

*   Test, fix, and improve `randomIntInRange(minInt, maxInt)`
    *   Add tests (e.g., to ensure that both parameters are integers and that `maxInt >= minInt`)
    *   Add fixes (if `maxInt < minInt`, then switch)
    *   Test the case `maxInt == (minInt + 1)`, and, if necessary, fix or add test
        *   Should be simple fix to add to `floorMaxInt`

* If `randomIntInRange(minInt, maxInt)` is improved:
    *   review and possibly fix other functions that use it

* Fix `onMouseOverCard(evt)` so it works only on individual cards, not rows
    *   To do this, could test with if/else statements for different responses depending on the characteristics of the div
        *   But: remember to look at the lesson about capitalization
            *See*: ["The `nodeName`'s Capitalization"](https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/04eb38bd-45e1-4a58-98c8-1e6f1e770438/lessons/f270dbcf-eb43-4ce3-b7be-a74d26023496/concepts/85463be2-3206-434e-aa39-4604965daa29)
        *   NOTE: if fixing, also review the `window.alert` in `onMouseClickNEW(evt)`, which provides related functionality

### Implementation Problems

*   NOTE: in `index.html` a couple of sections, e.g., `<section id="board">`, generate warnings in the [W3C Markup Validator](https://validator.w3.org/#validate_by_upload).

*   NOTE: When running "The Memory Game" in Chrome 72.0.3626.121 (Official Build) (64-bit),I repeatedly got the following error message in the DevTools console:

> Unchecked runtime.lastError: Could not establish connection.
> Receiving end does not exist.

*   I was fortunate to find: [*How to fix 'Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.'*](https://stackoverflow.com/questions/54619817/how-to-fix-unchecked-runtime-lasterror-could-not-establish-connection-receivi)
    *   Based on the above StackOverflow post, I tried toggling my Chrome extensions, and, when I inactivated the "Udacity Front End Feedback" Chrome extension, the error message disappeared.

## Starting Points and References

### Starting Points: Prior Materials Used

This project incorporates certain previous materials I prepared in connection with the following projects, exercises, and quizes:

*   Project: [Build a Portfolio Website](https://github.com/jkelley399/UDAC-FED-WF-Project-Build-a-Portfolio-Site)

*   Exercise: [Pixel Art Maker](https://github.com/jkelley399/project-pixel-art-maker-starter)

*   Quizes:

    *   [Bank Accounts 1 (7-3)](https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/cd56eea9-99b5-40c8-8725-a66a651e1ff0/lessons/634eb53a-2f3f-47a3-9447-598090024758/concepts/a35ae1dd-3f00-4798-8983-a43b4b5ad589)

    *   [Facebook Friends (7-5)](https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/cd56eea9-99b5-40c8-8725-a66a651e1ff0/lessons/634eb53a-2f3f-47a3-9447-598090024758/concepts/104ab221-418a-4e72-9086-9f9332cc2d05)

    *   [Donuts Revisited (7-6)](https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/cd56eea9-99b5-40c8-8725-a66a651e1ff0/lessons/634eb53a-2f3f-47a3-9447-598090024758/concepts/27843aa3-2082-4f21-b465-d594f95af9e1)

### Starting Points: References

#### References: Generally

Generally, please see the references listed in UDAC-FED-Projects-WPwJS-JK Memory Game-JK-notes-re-additional-references-consulted.

#### References: Animations

While also listed in [UDAC-FED-Projects-WPwJS-JK Memory Game-JK-notes-re-additional-references-consulted](https://github.com/jkelley399/UDAC-FED-WPxJS-Memory-Game/blob/master/UDAC-FED-Projects-WPwJS-JK%20Memory%20Game-JK-notes-re-additional-references-consulted)
I wish to call out a few references that I relied upon in particular:

*   Regarding animations, in general:
    *   [*Web Animations API*](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
    *   [*Animation*](https://developer.mozilla.org/en-US/docs/Web/API/Animation)
    *   [*Animation.onfinish*](https://developer.mozilla.org/en-US/docs/Web/API/Animation/onfinish)
    *   [*Web Animations API Tutorial Part 1: Creating a Basic Animation*](http://danielcwilson.com/blog/2015/07/animations-part-1/)
    *   [*CSS Animations vs Web Animations API*](https://css-tricks.com/css-animations-vs-web-animations-api/)
*   Regarding animating multiple elements, especially:
    *   [*Animating Many Elements and the Animate Method*](https://www.kirupa.com/html5/animating_multiple_elements_animate_method.htm)

## TODO

In addition to fixing [known bugs and overcoming implementation problems](#known-bugs-or-implementation-problems),

*   Revise and expand upon [README.md](https://github.com/jkelley399/UDAC-FED-WPxJS-Memory-Game/blob/master/README.md)

## REFACTOR

*   Convert to object-oriented design, e.g.,
    *   split out board and card objects, and add methods

## ROADMAP

*   Add tests throughout
*   Substitute card icons for 'rank''suit' format
*   Fix known issues
*   Test `windows.screen.width` to adjust
    *   card sizes and
    *   confetti sizes if necessary
*   Add exploding and changing color 'CONGRATULATIONS' before confetti
*   Change animations for repeated successful rounds (currently the same animation just repeats with each victory)
    *   Would be somewhat like reaching higher levels in a video game
    *   E.g., simple change would be rotating colors at beginning and ending phases
    *   NOTE: perhaps the simplest implementation would be to take existing animation and comment out parts of it for the first few successful replays, so that the full current animation would only work on, e.g., the third time through.
*   Variable size boards (4x4, 8x8, 16x16, 32x32 (with multiple decks))
    *   Add user input on `index.html` to select the number of cards for a particular game
    *   Alternatively, force the game to become harder (i.e., by requiring a bigger board) as a user wins and replays
*   Turn the `let cardRandom = remainingCards...` processes into a function
*   Figure out how to use Bootstrap with Sass options
    * See [*My favored SCSS setup with Bootstrap 4*](https://medium.com/@programmiri/my-favored-scss-setup-with-bootstrap-4-547e9ea290f8)
*   Refactor with an object-oriented architecture.
    *   Split out board, boardInitial, and card objects
    *   E.g. adding methods in boardInitial object
    *   See [REFACTOR](#refactor)
*   Add tests to `onMouseOverCard(evt)` if desired, e.g.:
    *   to test whether `textContent` has acceptable syntax, using regex; and
    *   to use `None.noneType` to test if `mouseOver` is on an element_node
*   In `makeRndColorComponentArray()`, `makeRndColorArray()`, and `makeRndScaleArray()`:
    *   to create a better way to set end values in `for` loops (right now, simply fixed integers), and
    *   to revisit calculation of end of `for` loop based on current requirements for confettiAnimator(), or, alternatively,
        *   to use simpler randomizing mechanisms inside `confettiAnimator()`

## LEARN

*   Need to understand how to move functions into methods and have them work properly with animations.
    *   NOTE: Figure out why I couldn't use an `object.method` with an `eventListener` (2019-01-17)
