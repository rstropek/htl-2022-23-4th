# *SportSoft* Case Study

![Hero Image](hero.png)

## Background

You are applying for a job as the Chief Technical Officer (CTO) in a thriving software company, *SportSoft Ltd*. The company is reputable for its flagship software, *SoccerAccountant*, catering to the administrative needs of large soccer clubs. While SoccerAccountant has enjoyed considerable market success, the software is grappling with technical obsolescence, performance issues, and a lack of modern features.

## Introduction to SportSoft Ltd

SportSoft Ltd. was established in 1995 and quickly became a pioneer in sports management software. The company has a global footprint, with clients ranging from emerging soccer clubs to established international organizations. Their success is largely attributed to SoccerAccountant, but they also provide consulting and customized solutions.

## Current Scenario

SoccerAccountant, once a market leader, is now facing stiff competition from modern, cloud-based solutions. The software is built on outdated technologies, with a monolithic architecture using *Delphi* and an *Informix SQL* database. It is notorious for consuming excessive memory, slow response times, and frequent crashes. The *Online Fan Shop* module, despite being relatively less complex, has already been rewritten in PHP, but is infamously unreliable and sluggish. The high upfront licensing cost coupled with 20% annual maintenance fees adds to customer grievances.

## SoccerAccountant Modules

SoccerAccountant is segmented into the following modules:

* Accounting (*Buchhaltung*)
* Asset Accounting (*Anlagenbuchhaltung*)
* Payroll Accounting (*Loh- und Gehaltsverrechnung*)
* Online Fan Shop
* Human Resource Management (*Personalentwicklung*)

An external audit revealed that all modules except the Online Fan Shop have comparable complexity and codebase size. The only exception is the online fan shop module, which is simpler. It has approximately half the complexity and size of the other software modules.

At customers, the different modules are typically used by different departments. All modules share some common master data (*Stammdaten*) like user profiles, employees, products (for fan shop), players and teams, etc.

## Project Objective

SportSoft intends to revamp SoccerAccountant, transitioning it into a cloud-based Software-as-a-Service (SaaS) application, with no immediate functional enhancements planned. The focus is to modernize the technology stack, improve performance, and lay a foundation for future scalability and feature expansions. The customers will now pay a monthly subscription fee and access the application via web browsers and/or mobile devices.

## Resources

SportSoft has assembled a development team of 40 experts. Half of them are long-time employeess with in-depth knowledge of SoccerAccountant. They have participated in technical trainings to update their software development skills. The rest are new recruits skilled in modern technologies. Additionally, there are five business domain experts assigned for each module to clarify functional and non-functional requirements.

![Logo](logo.png)

## Your Assignment

As a prospective CTO, you are tasked with crafting a revitalization strategy that encompasses the software architecture and team organization.

### Part 1: Software Architecture

Outline and elaborate on your architectural vision by addressing the following questions:

* Which development technologies will you use?
* Will you split the software into modules? If you do, which modules will you build and how will they communicate?
* Will you use Container technology?
* Which cloud computing components will you use (you can assume that SportSoft has decided to use Microsoft Azure or you can decide to go for a different cloud platform)?

### Part 2: Team Organization

Propose an optimal structure for the development team by tackling these questions:

* Will you split them up in teams?
* How will they work together (e.g. exchange source code)?
* Which tools will they use (e.g. requirements management, development tools, bug tracking, communication, document management etc.)?
* How will the organizational and operational structure look like?

## Deliverables

* Split up into groups of 4-5 people.
* Discuss the questions mentioned above and agree on a proposal.
* Sketch the core ideas of your proposal in a few slides (between 2 and 5 slides). Prefer diagrams over written text! Two diagrams (one for each task) are enough if they are meaningful and expressive.
* Select two team members who are going to present your proposal next week.

## Evaluation Criteria

Your proposal will be evaluated based on:

* Innovation and practicability of the proposed architecture.
* Effective team organization and collaboration strategy.
* Clarity and cogency of the presentation.
* Justification for the chosen technologies, tools, and methodologies.
