# League of Legends Champion browser
This repository is a tutorial used to incrementally build an application that
displays League of Legends champions and their skins.

It consists of a NodeJS service and uses ExpressJS as the web application
framework and a React-based front end. The service communicates with the
Riot API, specifically Data Dragon for fetching information about the
universe of champions and their skins.

We'll call the front end piece the UI (User Interface) and the back end piece the service.
We will start building the service first, then we'll switch over to the ui and get some
of that built. We may jump back and forth a bit, but you'll get to see it all take shape
right before your eyes.

## Tutorial structure
The tutorial is evolutionary in that the main branch contains an empty
repository with simply this README and a few other files. A series of 
branches exist and each incrementally adds a component or noteworthy feature.

The branches will be alphabetically named using League of Legend champion names
so that it's easy to follow. Once you're comfortable with the branch you're
on, simply checkout the next branch (alphabetically) to see the application
evolve.

This README will be updated in each branch to explain what is new and different
from the previous branch.

## Code
To keep things organized, we will separate the application into 2 main sub-folders:

* [lol-champion-browser-service](lol-champion-browser-service): This is where the source code for the ExpressJS service will live
* [lol-champion-browser-ui](lol-champion-browser-ui): This is where the source code for the React UI will live

Each will be distinct and separate. We'll get to this, but each will have its own package.json,
its own dependencies, scripts, etc.

## Branches
* main : This is the default branch in the repository. It's empty and ready to be
used to build the application
* [alistar](./docs/alistar.md) : Setup the initial project structure, including the package.json file, some initial dependencies and some scaffolding to startup your service
* [blitzcrank](./docs/blitzcrank.md) : Design the service API and create some ExpressJS routes
