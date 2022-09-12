# Angular Guide

⚠️ Make sure you have the required prerequisites as mentioned [here](0005-Preparation.md).

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

* To add a new service, we use the following command (`--skip-tests` only if you do not want unit tests):

    ```bash
    npx ng generate service <service-name> --skip-tests
    ```

## Important Angular Resources

* [Angular Documentation](https://angular.io/docs)
  * Great [tutorial](https://angular.io/tutorial) for self-studying Angular
