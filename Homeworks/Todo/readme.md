# Todo List

## Introduction

In this exercise you have to implement a user interface for a ToDo-List application. You have to use Angular to implement it.

Everybody has to submit her or his best try via GitHub.

## Web API

The backend Web API has been prepared for you. You can find it in [*TodoApi*](https://github.com/rstropek/htl-2022-23-4th/tree/main/Examples/TodoApi). Clone the API from GitHub, run `npm install` to install the dependencies, and run `npm start` to start it. Take particular note of [*demo.http*](https://github.com/rstropek/htl-2022-23-4th/blob/main/Examples/TodoApi/demo.http) (requires that you have the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) installed in your VSCode). It contains sample HTTP requests demonstrating how you can:

* Get all people (persons who you can assign a todo item)
* Get a list of all todo items
* Add a todo item
* Get a single todo item
* Update a todo item (change *description*, *assignedTo*, or *done*)
* Delete a todo item

The API's code is kept simple. Note that this is not production code. It should just serve as a sample for our Angular exercise.

## Requirements

1. Create a web-based UI using the *Angular* framework. Create the app on your local computer. Using *Stackblitz* is not sufficient.

1. As a user, I want to get a list of all my todo items. The list has to contain at least the description, the assigned person (if there is one) and the done-flag.

1. As a user, I want to be able to filter the list of todo items so that I only see the items that are *undone*.

1. As a user, I want to be able to filter the list of todo items so that I only see the items that are assigned to me.

1. As a user, I want to be able to combine the filters mentioned above (e.g. all todo items that are undone and assigned to me).

1. As a user, I want to be able to add a new todo item. I want to enter a description and optionally assign the new todo item to a person (drop-down list of all available people).

1. As a user, I want to be able to edit an existing todo item. I want to be able to change description, assigned person (it has to be able to remove an assignment, too), and done-flag.

1. As a user, I want to be able to delete an existing todo item.

## Advanced Exercises for Extra Points

### Angular Material

[*Angular Material*](https://material.angular.io/) is a great framework to build mobile web apps. Read the [getting started guide](https://material.angular.io/guide/getting-started) and try to apply it to your app. Use e.g. [lists](https://material.angular.io/components/list/overview) and/or [cards](https://material.angular.io/components/card/overview) for todo items. Use [inputs](https://material.angular.io/components/input/overview), [autocomplete](https://material.angular.io/components/autocomplete/overview), and/or [checkboxes](https://material.angular.io/components/checkbox/overview) for the todo form.

Send me a link to your solution styled with *Angular Material* via a GitHub issue and you will get up to two extra points for your grade.
