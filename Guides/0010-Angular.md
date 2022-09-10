# Angular Guide

## Prepare Your Computer

### Must Have

* Install [VSCode](https://code.visualstudio.com/) with the following extensions:
  * [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)
  * [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
  * [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
* Install [Node.js](https://nodejs.org/en/)
* Install [Angular CLI](https://angular.io/cli)
* Install [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)

### Consider

* If you are on Windows, consider developing in the [*Windows Subsystem for Linux* (WSL)](https://docs.microsoft.com/de-de/windows/wsl/install)

## Prepare Online Accounts

* Create a [GitHub Account](https://github.com/signup) if you do not already have one

## ⚠️ Avoid

* Do **not** store your Angular projects in paths that contain blanks or special characters.
* Do **not** store your Angular projects too deep in the folder hierarchy.

## Create an Angular Application

* Study [*ng new*](https://angular.io/cli/new) command options
* In this course, we create Angular applications as follows:

    ```bash
    ng new <project-name> --routing --skip-git --strict --view-encapsulation ShadowDom --style css
    ```

* If you do not want unit tests for now, delete `src/app/<project-name>/app.component.spec.ts`

## Run an Angular Application For Debugging

* ⚠️ Open the folder of the Angular app in VSCode (=folder in which the *package.json* file is stored)
* Study [*ng serve*](https://angular.io/cli/serve) command options
* Run `npm start` (which starts *ng serve* in the background)

## Add Items To Angular Project

* Study [*ng generate*](https://angular.io/cli/generate) command options
* To add a new component, we use the following command (`--skip-tests` only if you do not want unit tests):

    ```bash
    npx ng generate component <component-name> --skip-tests
    ```

* 