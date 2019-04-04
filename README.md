# Node.js QuickStart

## Content
* [Description](#description)
* [Installation](#installation)
* [Running migrations](#running-migrations)
* [Built With](#built-with)
* [Project Structure](#project-structure)
* [Running tests](#running-tests)
* [Simple Auth](#simple-auth)
* [Authors](#authors)

### Description

This project is a simple bootstrap Node.js app for backend. It's analogy for my [frontend](https://github.com/dgaydukov/react-quickstart) app.
Technically whenever you need to start new project, you can start from scratch. Just run `npm init` in empty folder and go on. But on average it can take up to a week to set everything you need
* app entry point
* directory structure
* dockerfile
* ORM/database
* migrations
* tests
* and so on...
So, to save your time, here is a simple bootstrap project, that will help you to start develop your project immediately, without setting up everything from scratch.


### Installation

You can install this project with the following commands:
```shell
# clone the repository
git clone https://github.com/dgaydukov/nodejs-quickstart

# go to repo
cd nodejs-quickstart

# install
npm i

# copy env variables
cp .env.tpl .env

# run the project
npm start
```

You can also run dockerized version of this app:
```shell
# build and run app
docker-compose up -d --build
```

In case you want to stop dockerized version, just type `docker-compose down`. This will kill docker container and stop app.

### Running migrations

By default migrations are run in code. Check this line `await connection.runMigrations();` in `index.ts` file. It's done so, in productions, we don't need to execute any commands from console.
But you can also use console commads:

```shell
# create new migration
npm run migrage:new my_new_migration

# execute all available migrations
npm run migrate:up

# rollback only 1 migration
npm run migrate:down
```

If you want to rollaback 5 migrations, then just type 5 times rollaback command `npm run migrate:down`.



### Built With

* [Node.js v10.15.0](https://nodejs.org/fr/blog/release/v10.15.0/)




### Project Structure
```
public # directory with public access, works as static server
src # directory with all source code
    app # all app source code
    email-templates # *.pug files with email templates
    entity # database entities
    migration # list of migrations
test # tests that run on commit, push, deploy
```


### Running tests

To run tests, type in console `npm test`. This will run all tests under `./test` folder. If you want to run specific file, try `npm run test:main`. Change filename in `package.json`.

### Simple Auth

Simple Auth module was added to this project, just as showcase.
The module is:
* Migration with user table
* Auth controller - to handle signup and signin
* userRepo - repository to handle logic
* userEntity - db entity to work with database

### Authors

* **Gaydukov Dmitiry** - *Take a look* - [How to become a Senior Javascript Developer](https://github.com/dgaydukov/how-to-become-a-senior-js-developer)