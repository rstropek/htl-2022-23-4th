# Preparation For Angular Course

## Installed Software

### Must Have

* [VSCode](https://code.visualstudio.com/) with the following extensions:
  * [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)
  * [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
  * [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
  * [Code Tour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour)
  * [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
* [Git CLI](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [Angular CLI](https://angular.io/cli)
* [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)

### Consider to Install

* If you are on Windows, consider developing in the [*Windows Subsystem for Linux* (WSL)](https://docs.microsoft.com/de-de/windows/wsl/install)
* Graphical Git client. Examples:
  * [GitHub Desktop](https://desktop.github.com/)
  * [Git Extensions](http://gitextensions.github.io/)
  * [Git Kraken](https://www.gitkraken.com/)
  * [Sourcetree](https://www.sourcetreeapp.com/)
* [Windows Terminal](https://github.com/microsoft/terminal)

## Prepare Online Accounts

* Create a [GitHub Account](https://github.com/signup) if you do not already have one

## Configure Git

* See also [Getting Started - First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
* Set your identity (replace name/email with your name/email)

    ```bash
    git config --global user.name "John Doe"
    git config --global user.email johndoe@example.com
    ```

* Set VSCode as your editor for Git

    ```bash
    git config --global core.editor "code --wait"
    ```

* Set your default branch name to *main*

    ```bash
    git config --global init.defaultBranch main
    ```
