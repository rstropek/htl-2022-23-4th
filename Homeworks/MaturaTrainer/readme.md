# Matura trainer

## Introduction

You are currently preparing for the HTL Matura. In a learning team, you have worked out questions that may come up for the Matura. Now you want to write a program that can be used to capture the questions and then practice them.

You have decided to build a web app where you can practice for your Matura.

## Functional requirements

### Collection of questions

* Users can enter questions.
* Each question consists of a question text and 1..9 possible answers.
* For each answer option, users can specify whether the answer is correct.
* Implement entering a new question with the corresponding answers in a separate route.

### List of Questions

* Display the list of questions as a table.
* Optional filter options:
  * Question text (filter with *contains*)
* Implement the list of questions in a separate route.

### Deleting questions

* In the list of questions there must be a *Delete* button for each question, with which the question can be deleted.

### Do the quiz

* You can use the questions to practice (same logic as in last exam with *check*, *next*, and *skip* buttons).
* Implement doing the quiz in a separate route.

## Minimum requirements

Your program must meet the following minimum requirements in order to be rated positively:

* *Collection of questions* works
* *List of questions* works **unfiltered**
* *Deleting questions* works

## Sample questions (JSON, German)

```json
[
    {
        "text": "Richtig oder falsch? Kommandozeilentools aus NPM sollte man immer global (d.h. mit npm install ... --global) installieren.",
        "options": [
            {
                "text": "Richtig",
                "isCorrect": false
            },
            {
                "text": "Falsch",
                "isCorrect": true
            }
        ]
    },
    {
        "text": "Wie installiert man Node.js am besten?",
        "options": [
            {
            "text": "Installer für das jeweilige Betriebssystem von nodejs.org herunterladen und ausführen.",
            "isCorrect": true
            },
            {
            "text": "Mit NPM über das Kommando: `npm install -g nodejs`",
            "isCorrect": false
            },
            {
            "text": "Installation ist nicht notwendig, Node.js ist auf praktisch jedem Windows- und Linux-System vorinstalliert.",
            "isCorrect": false
            },
            {
            "text": "Node.js wird nicht installiert. Man lädt *node.exe* herunter und kopiert es die Datei in einen beliebigen Ordner.",
            "isCorrect": false
            }
        ]
    },
    {
        "text": "Für welche Arten von Anwendungen ist Node.js besonders gut geeignet?",
        "options": [
            {
            "text": "Plattformunabhängige Konsolenanwendungen",
            "isCorrect": true
            },
            {
            "text": "Schnelle, skalierbare Netzwerkapplikationen",
            "isCorrect": true
            },
            {
            "text": "Rechenintensive Serveranwendungen",
            "isCorrect": false
            }
        ]
    },
    {
        "text": "I/O Operationen (z.B. Zugriff auf Festplatte, Netzwerk) in Node.js sind...",
        "options": [
            {
            "text": "...immer synchron (=blockierend)",
            "isCorrect": false
            },
            {
            "text": "...immer asynchron (=nicht blockierend)",
            "isCorrect": false
            },
            {
            "text": "...asynchron (=nicht blockierend) oder synchron (=blockierend). Wenn beide Varianten angeboten werden, ist synchron im Zweifelsfall zu bevorzugen.",
            "isCorrect": false
            },
            {
            "text": "...asynchron (=nicht blockierend) oder synchron (=blockierend). Wenn beide Varianten angeboten werden, ist asynchron im Zweifelsfall zu bevorzugen.",
            "isCorrect": true
            }
        ]
    },
    {
        "text": "Ein Node.js Programm namens app.js startet man mit...",
        "options": [
            {
            "text": "node app.js",
            "isCorrect": true
            },
            {
            "text": "npm run app.js",
            "isCorrect": false
            },
            {
            "text": "npm app.js",
            "isCorrect": false
            }
        ]
    },
    {
        "text": "Welches Paket der in Node.js eingebauten API verwendet man, um mit Dateien zu arbeiten?",
        "options": [
            {
            "text": "fs",
            "isCorrect": true
            },
            {
            "text": "io",
            "isCorrect": false
            },
            {
            "text": "files",
            "isCorrect": false
            },
            {
            "text": "stdin",
            "isCorrect": false
            }
        ]
    },
    {
        "text": "Wahr oder falsch: NPM wird mit Node.js mitinstalliert",
        "options": [
            {
            "text": "Wahr",
            "isCorrect": true
            },
            {
            "text": "Falsch",
            "isCorrect": false
            }
        ]
    },
    {
        "text": "Richtig oder falsch? Pakete, die man zur Laufzeit braucht (z.B. jQuery), installiert man mit `npm install`. Bei Paketen, die man zur Entwicklungszeit braucht (z.B. TypeScript Compiler), muss man die Option --global hinzufügen.",
        "options": [
            {
            "text": "Richtig",
            "isCorrect": false
            },
            {
            "text": "Falsch",
            "isCorrect": true
            }
        ]
    }
]
```
