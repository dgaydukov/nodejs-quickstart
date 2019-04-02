# Node.js QuickStart

## Content
* [Description](#description)
* [Installation](#installation)
* [Built With](#built-with)
* [Project Structure](#project-structure)
* [Running tests](#running-tests)
* [Authors](#authors)

### Description

This project is a simple bootstrap Node.js app for backend. It's analogy for my [frontend](https://github.com/dgaydukov/react-quickstart) app.


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


### Built With

* [Node.js v10.15.0](https://nodejs.org/fr/blog/release/v10.15.0/)




### Project Structure
```
```


### Running tests
To run tests, type in consoel `npm test`. This will run all tests under ./test folder. If you want to run specific file, try `npm run test:main`. Change filename in `package.json`.


### Authors

* **Gaydukov Dmitiry** - *Take a look* - [How to become a Senior Javascript Developer](https://github.com/dgaydukov/how-to-become-a-senior-js-developer)