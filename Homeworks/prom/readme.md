# Prom Management

## Introduction

Your class agreed to help with organizing your school's prom night. One class offered to build a web app for ticket sales. Another class will build a mobile app for prom organizers (e.g. checking tickets at the entry). You class decided to contribute the API backend for web app and mobile app.

## Functional Requirements

* The API has to maintain a list of ticket types in its DB. The API must only support reading ticket types. There is no need for writing ticket types (e.g. insert, update, delete) through the API. Ticket types are maintained directly in the DB as they do not change over time.

    | Ticket type                                                                  | Price [€] |
    | ---------------------------------------------------------------------------- | --------: |
    | Regular                                                                      |        30 |
    | External Students (age <= 19)                                                |        15 |
    | HTL Students (needs invitation code, max. 3 tickets per student)             |         5 |
    | HTL Teacher (needs invitation code, max. 2 tickets per teacher)              |        15 |
    | HTL Teacher of 5th grade (needs invitation code, max. 2 tickets per teacher) |      free |

* The API must support uploading a student list (see [Prom-Students.csv](./Prom-Students.csv)). This list is particularly important for student invitation codes.

* The API must support uploading a teacher list (see [Prom-Teachers.csv](./Prom-Teachers.csv)). This list is particularly important for teacher invitation codes and the flag whether the teacher teaches in a 5th grade class.

* The API must support buying tickets. It must be possible to buy multiple tickets in a single API request. The following data is required when tickets are bought:
  * First name of guest
  * Last name of guest
  * Ticket type
  * Invitation code (if required for the ticket type)

* The ticket buying API must validate incoming data. It must return a meaningful error response if something is wrong. You have to work out the necessary validation checks yourself.

* The ticket buying API must return a summary of the purchase with the following data:
  * Generated purchase ID.
  * Number of bought tickets
  * Total price

* The API must support querying tickets based on the purchase ID. For security reasons, purchase ID and one guest last name of the purchase must be given. The ticket quey API must return:
  * For each ticket in the purchase
    * First name of guest
    * Last name of guest
    * Ticket type
    * Flag indicating whether age verification is necessary at the entry (for ticket type *External Students*)
  * Total price
  * Purchase ID

* The API needs to support cancelling tickets. For security reasons, purchase ID and one guest last name of the purchase must be given to cancel tickets. Customers can only cancel all tickets of a purchase, not specific ones. The cancel API must return:
  * Purchase ID
  * Total money to return to the customer (=total price of the purchase)

* The organizers need to monitor the total ticket sales statistic. For that, the API must offer a statistic API returning:
  * Total number of tickets sold per ticket type
  * Total revenue

## Non-Functional Requirements

* Use C#
* Use ASP.NET Core
* Use Entity Framework Core
* Offer basic API documentation through OpenAPI Specification (OAS, aka Swagger)
