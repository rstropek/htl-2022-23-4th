# Morse Encoder/Decoder

## Introduction

You job is to implement a web app for encoding text into Morse code and decoding Morse code into text.

## Functional Requirements

### Morse Code Encoding and Decoding Rules

* You only need to handle uppercase letter A-Z. Trying to handle any other characters should lead to an error.
* Words in plain text are separated with blanks (e.g. `HELLO WORLD`; note blank between words).
  * If the input text contains multiple consecutive blanks between words, treat them as if the user would have entered a single blank.
  * Blanks at the beginning or at the end of the plain text must be ignored.
* A dot in Morse Code is represented with a `.` character, a dash is represented with a `-`.
* At the end of this chapter, you find the Morse code alphabet that you have to use.
* Letters in Morse code are separated by a single blank (e.g. *HELLO* becomes `.... . .-.. .-.. ---`; note the blanks between the letters)
* Words in Morse code are separated by a blank, followed by slash, followed by another blank (` / `; e.g. *HELLO WORLD* becomes `.... . .-.. .-.. --- / .-- --- .-. .-.. -..`; note the ` / ` between the words).
* The resulting Morse code must not contain any unnecessary blanks (not at the beginning, not at the end, not in the middle).
* If you want to test the correctness of your encoding/decoding algorithm, compare your results and generate test data using [https://morsedecoder.com/](https://morsedecoder.com/).

```js
const morseCode = [
  /* A */ '.-',
  /* B */ '-...',
  /* C */ '-.-.',
  /* D */ '-..',
  /* E */ '.',
  /* F */ '..-.',
  /* G */ '--.',
  /* H */ '....',
  /* I */ '..',
  /* J */ '.---',
  /* K */ '-.-',
  /* L */ '.-..',
  /* M */ '--',
  /* N */ '-.',
  /* O */ '---',
  /* P */ '.--.',
  /* Q */ '--.-',
  /* R */ '.-.',
  /* S */ '...',
  /* T */ '-',
  /* U */ '..-',
  /* V */ '...-',
  /* W */ '.--',
  /* X */ '-..-',
  /* Y */ '-.--',
  /* Z */ '--..',
];
```

### User Interface

* Implement two separate routes, one for encoding and one for decoding (e.g. *http://localhost:4200/encode* and *http://localhost:4200/decode*). If the user does not enter any route, redirect her to the encoding route.
* The encoder UI has to consist of the following elements:
  * An input box in which the user can enter the text to be encoded.
  * A button that triggers the encoding process. This button must be disabled if the text to encode is empty or contains any other characters than A-Z and blanks separating words.
  * An input box that receives the Morse code result. It has to be read-only (`readonly` attribute of `input` tag).
* The decoder UI has to consist of the following elements:
  * An input box in which the user can enter the Morse code to be decoded.
  * A button that triggers the decoding process. This button must be disabled if the Morse code to decode is empty or contains any other characters than dots, dashes, or spaces.
  * A text output that contains an error message if the Morse code is invalid (e.g. unknown combination of dots and dashes). This text output must only be visible if there is an error, otherwise it should be hidden.
  * An input box that receives the plain text result. It has to be read-only (`readonly` attribute of `input` tag).
* Use CSS to style your app at least a little bit. This exercise is not a design exercise, but the UI should at least look somewhat clean.

## Non-Functional Requirements

* The app has to be a single page app (SPA) implemented with Angular 14.
* Use *data binding* (one-way and two-way) to connect the view (HTML) with the logic (TypeScript).
* Encapsulate the encoding and decoding functionality in an Angular service (or multiple services, you can choose).
* Write at least four meaningful unit tests for the encoding and decoding functionality (at least two for encoding and at least two for decoding).

## Bonus Exercise

* [https://stackblitz.com/edit/typescript-f6qnhb?file=player.ts](https://stackblitz.com/edit/typescript-f6qnhb?file=player.ts) contains helper functions and constants for playing dash and dot sounds for Morse code.
  * [https://stackblitz.com/edit/typescript-f6qnhb?file=index.ts](https://stackblitz.com/edit/typescript-f6qnhb?file=index.ts) contains sample code for playing SOS.
* Turn the provided helper function into an Angular service.
* Add a *Play* button to the Morse encoder that plays the Morse code result using the provided helper functions.
