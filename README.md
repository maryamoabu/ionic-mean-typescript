# Ionic MEAN Stack Typescript
MEIN Stack - The MEAN Stack with Ionic &amp; Typescript

## Overview
MEIN Stack is a TypeScript Full Stack MongoDB + ExpressJS + Angular2 + NodeJS with Ionic 2 Framework to provide multi platform application.

## Prerequisites
- NVM - [Download](https://github.com/creationix/nvm)& Install Node Version Manage
- NodeJS 7 - Download & Install Node.js and the npm package manager with NVM `$ nvm install node 7`.
- MongoDB - [Download](https://www.mongodb.com) & Install MongoDB, and make sure it's running on the default port (27017).
- Typescript Latest stable version install in Global `$ npm install -g typescript`
- Ionic 2 & Cordova - Latest stable version install in Global `$ npm install -g ionic cordova`
- And you should also have git installed to a better working flow.

## Quick Start
- open CLI from `./mongodb/bin` folder and run`$ ./mongod --dbpath ../data/db`
- open this project in your IDE and install all node_modules from IDE CLI `$ nvm use 7`, `$ npm install` and `$ ionic serve`
- close the default opening browser window and go to the following url `http://localhost:8080/`
- open a other IDE CLI an run `$ nvm use 7`, `$ npm run server` or `$ npm start server` if ./server.js is build
- if you've trouble try the manual start

## Manual Start
- open CLI from `./mongodb/bin` folder and run`$ ./mongod --dbpath ../data/db`
- open this project in your IDE and install all node_modules from IDE CLI `$ nvm use 7` and `$ npm install`
- now run Node Server from IDE CLI `$ ntsc api/server.ts`
- and then run  `$ node api/server.js`
- Typescript=> if trouble withtypes definition, use `$ npm install @types/{{TYPE_MODULE}} --save-dev
` for each module needed
- now open new IDE CLI window and run `$ nvm use 7` and `$ ionic serve` for building application
- close the default opening browser window and go to the following url `http://localhost:8080/`
- you'r now ready to start to work ;)
- info: server index endpoints: `http://localhost:8080/api/todos` & Request Method `$_GET`

## About author
Hi, i'm a Front-end developper living in Geneva Switzerland and i build hybrid mobile & web applications for almost 15 years. You can follow me on Twitter @FazioNico or checkout my own website http://nicolasfazio.ch
