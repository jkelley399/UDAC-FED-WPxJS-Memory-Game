# UDAC-FED-Web Programming with JavaScript-Project-Memory Game

## Introduction
This project is being submitted in connection with part 2, "Web Programming with JavaScript," of the Udacity Front-End Web Developer Nanodegree.  The [general required functionality](https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/677caa06-55d6-444e-a853-08627c5516a7/lessons/4227cbf4-f6ce-4798-a7e5-b1ce3b9e7c33/concepts/0a38769e-8e23-4e3f-9482-d8d1aa80fbb6) for the project was stated as follows:

> ### Game Functionality
> The real-life game, players flip over cards to locate the pairs that match The goal is to recreate this effect in your project. There are a couple of interactions that you'll need to handle:

>   *   Flipping cards
>   *   What happens when cards match
>   *   What happens when cards do not match
>   *   When the game finishes

In addition to this required functionality, a few things have been added:

*   Basing the cards on a simplified model of playing cards (although currently without icons)
*   Allowing the user to resume play after winning
*   Establishing a maximum total number of clicks that, when exceeded, forces the user to start the game over

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
For detailed instructions, see the [Udacity Classroom-Project: Memory Game > 2. Instructions](https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/677caa06-55d6-444e-a853-08627c5516a7/lessons/4227cbf4-f6ce-4798-a7e5-b1ce3b9e7c33/concepts/0a38769e-8e23-4e3f-9482-d8d1aa80fbb6).

### Dependencies and Requirements

#### Dependencies

[Bootstrap](https://getbootstrap.com/)

[FontAwesome](https://fontawesome.com)

NOTE: these are both added to the project through CDNs.

#### Requirements

A browser used to run the project must support [`Element.animate()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), which is designated as an ["experimental technology"](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Conventions_definitions#Experimental).

Chrome (50 or >), Firefox (48 or >), and Opera (37 or >), as well as various mobile browsers, are all [approved](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate).

Notably, Internet Explorer, Edge, and Safari are [not approved](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate0.

### Installation Instructions



## Design

### High-Level Design

### Board Object

### Animations

### Files

## Known Bugs or Implementation Problems

### Known Bugs or Implementation Problems

*   Card sizes will vary for small viewports (e.g., < 375 width)
*   First and last phases of winning animation will not display properly for small and medium sized viewports (e.g., < 768 width)

*   Figure out why this additional assignment is necessary in initializeBoardObject(), but it seems to be:
    * `boardInitial.matchedCards = [];`
        * NOTE: Once fixed, should be able to change
            `let boardInitial = ....` to `const boardInitial = ....`

*   Test, fix, and improve `randomIntInRange(minInt, maxInt)`
    *   Add tests (e.g., ensure both parameters are integers && maxInt >= minInt)
    *   Add fixes (if maxInt < minInt, then switch)
    *   Test the case (maxInt = (minInt + 1)), and, if necessary, fix or add test
        *   Should be simple fix to add to `floorMaxInt`

* If `randomIntInRange(minInt, maxInt)` is improved:
    *   review and possibly fix other functions that use it

* Fix `onMouseOverCard(evt)` so it works only on individual cards, not rows
    *   To do this, could test with if/else statements for different responses depending on the characteristics of the div
        *   But: remember to look at the lesson about capitalization
            *See*: ["The nodeName's Capitalization"](https://classroom.udacity.com/nanodegrees/nd001/parts/3d3d1bdc-316b-46c2-bdcf-b713c82804da/modules/04eb38bd-45e1-4a58-98c8-1e6f1e770438/lessons/f270dbcf-eb43-4ce3-b7be-a74d26023496/concepts/85463be2-3206-434e-aa39-4604965daa29)
        *   NOTE: if fixing, also review the `window.alert` in `onMouseClickNEW(evt)`, which provides related functionality

### Implementation Problems

* NOTE: in `index.html` a couple of sections, e.g., `<section id="board">`,
    generate warnings in the [W3C Markup Validator](https://validator.w3.org/#validate_by_upload).

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

Please see the references listed in UDAC-FED-Projects-WPwJS-JK Memory Game-JK-notes-re-additional-references-consulted


## TODO

In addition to fixing [known bugs and overcoming implementation problems](#known-bugs-or-implementation-problems),

*   Revise and expand upon README.md

## REFACTOR

*   Convert to object-oriented design, e.g.,
    *   split out board and card objects, and add methods

## ROADMAP

*   Add tests throughout
*   Substitute card icons for 'rank''suit' format
*   Fix known issues
*   Test windows.screen.width to adjust
    *   card sizes and
    *   confetti sizes if necessary
*   Add exploding and changing color 'CONGRATULATIONS' before confetti
*   Change animations for repeated plays (right now this just repeats).
    *   Would be somewhat like reaching higher levels in video game.
    *   E.g., simple change would be rotating colors at beginning and ending phases
    *   NOTE:  Simple implementation would be to take existing animation and comment out parts of it for the first few replays, so that the full current animation only works on, e.g., the third time through.
*   Variable size boards (4x4, 8x8, 16x16, 32x32 (with multiple decks))
    *   Add user input on index.html to select number of cards for the game
    *   Alternatively, make game harder (i.e., bigger board) as user wins and replays
*   Turn the `let cardRandom = remainingCards...` processes into a function
*   Figure out how to use Bootstrap with Sass options --> see *(My favored SCSS setup with Bootstrap 4)*(https://medium.com/@programmiri/my-favored-scss-setup-with-bootstrap-4-547e9ea290f8)
*   Refactor with object-oriented architecture.
    *   Split out board, boardInitial, and card objects
    *   E.g. adding methods in boardInitial object
*   Add tests to `onMouseOverCard(evt)` if desired, e.g., test whether
    *   `textContent` has acceptable syntax, using regex
    *   use `None.noneType` to test if `mouseOver` is on an element_node
*   In `makeRndColorComponentArray()`, `makeRndColorArray()`, and `makeRndScaleArray()`:
    *   create better way to set end values in for loops (right now, fixed integers), and
    *   revisit calculation of end of for loop based on current requirements for confettiAnimator(), or, alternatively,
    *   just use simpler randomizing mechanisms inside `confettiAnimator()`

## LEARN

*   Need to understand how to move functions into methods and have them work properly with animations.
    *   NOTE: Figure out why I couldn't use an `object.method` with an `eventListener` (2019-01-17)
