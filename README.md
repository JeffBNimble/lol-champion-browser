# League of Legends Champion browser
This repository is a tutorial used to incrementally build an application that
displays League of Legends champions and their skins.

It consists of a NodeJS service and uses ExpressJS as the web application
framework and a React-based front end. The service communicates with the
Riot API, specifically Data Dragon for fetching information about the
universe of champions and their skins.

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

## Branches
* main : This is the default branch in the repository. It's empty and ready to be
used to build the application
* [alistar](./docs/alistar.md) : Setup the initial project structure, including the package.json file, some initial dependencies and some scaffolding to startup your service
* [blitzcrank](./docs/blitzcrank.md) : Design the service API and create some ExpressJS routes
