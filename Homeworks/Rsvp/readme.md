# RSVP

## Introduction

You want to throw a big party. In order to know how many snacks and drinks you need to buy, you want to setup an RSVP website. You job is to implement this website.

## Requirements

### Base Requirements

Everybody must be able to implement the following base requirements:

* Create an **RSVP form** in which guests can register for your party. The form must contain the following fields:
  * Name of the primary guest (string, mandatory)
  * Flag indicating whether the guest will attend the party (boolean)
  * If the guest will be attending:
    * Remark field where the guest can add comments (string, optional; e.g. *will come a bit late*, *I am vegan*)
    * Flag indicating whether the guest will bring an additional guest, aka "+1" (boolean)
    * If the guest will bring a "+1":
      * Name of the additional guest (string, mandatory if additional guest will come)
  * The RSVP form must be a separate Angular route (*/register*)

* Create an **list of all registered guests**
  * Display all registered guests in a table with all the fields from the RSVP form
  * Under the list, write the total number of guests who said that they will come (primary guests plus additional ones)
  * The list must be separate Angular route (*/guest-list*)

### Advanced Requirements

Here are some advanced requirements for the guest list:

* **Filters**
  * Offer a filter field that filters on the guest name (only primary guest, not additional guest). Filtering has to be done in the database, not just in the Angular client application.
  * Offer a filter field with which a user can hide all guests who said that they will not attend the party. Filtering has to be done in the database, not just in the Angular client application.
  * Note that the filters must also be taken into account for the total number of guests written under the list.

* During the party, you want to **mark the registered guests who came**.
  * Add a button *Is Present* to the list of registered guests. It should only appear for guests who said that they will come to the party.
  * When pressed, update the *is present*-flag of the corresponding row in the database

## Non-Functional Requirements

* Use Angular 15
* Use Airtable to store the data
* Put the data access logic in a separate service
* Add the header necessary for Airtable in an Angular Injector
