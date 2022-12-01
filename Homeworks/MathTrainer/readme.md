# Math Trainer

## Introduction

Your job is to implement a math trainer for elementary school students.

## Functional Requirements

### Settings

* Students can configure the math trainer.
* They can define **how many digits** they can handle in numbers (e.g. 1 digit would result in exercises like *5 \* 7 = 35*, 2 digits would result in exercises like *53 + 12 = 65*, etc.). Possible values are 1, 2, 3, or 4. The default value for this setting is 1.
* The students can define **how many questions** they want to have in one exercise. Possible are values between 5 and 20. The default value for this setting is 10.
* They can choose **which operators** they want to practice. They can choose between one and four out of addition, subtraction, multiplication, division. By default, all operators are used.
* The setting screen must ensure that the user has chosen a valid configuration (e.g. not more than 4 digits, at least one operator, etc.).

You have to create a fitting UI/UX design (e.g. do you use input boxes or select controls for number of digits).

### Generating Exercises

* The values for the exercises are generated randomly (use [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) for that).
* However, there are some limitations that must be considered:
  * The result of subtractions *must not be negative* (e.g. *5 - 9* is not allowed).
  * The result of divisions must be without a remainder (e.g. *5 / 2* is not allowed).

Tip: Implement addition and multiplication first. In an exam, that would be the minimum requirement for getting a positive grade. The completeness and correctness of the implementations of subtraction and multiplication would determine your grade.

### Doing Exercises

* Students can start a new exercise at any time by clicking on a *New Exercise* button.
* In each exercise they get random math questions fitting to the chosen settings. Here are some sample exercises (*?* is where the student has to enter an answer):
  * *5 \* 7 = ?*
  * *9 - 6 = ?*
* The student sees *all* questions *on one screen*, enters *all* results in one go, and has to press the *Done* button when ready. The *Done* button must be disabled as long as the student has not entered all results.
* After pressing *Done*, the program writes the correct result to each exercise. The result has to be written in green if the answer of the student was correct, otherwise red.

## User Interface

* Implement two separate routes, one for settings and one for exercising (e.g. *http://localhost:4200/settings* and *http://localhost:4200/exercise*). If the user does not enter any route, redirect her to the exercising route.
* Use CSS to style your app at least a little bit. This exercise is not a design exercise, but the UI should at least look somewhat clean.

## Non-Functional Requirements

* The app has to be a single page app (SPA) implemented with Angular 14.
* Use data binding (one-way and two-way) to connect the view (HTML) with the logic (TypeScript).
* Encapsulate the exercise generator in an Angular service (or multiple services, you can choose).
* Write at least two meaningful unit tests for the exercise generator functionality.
