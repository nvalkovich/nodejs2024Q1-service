# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker
- PostgreSQL Server

## Downloading

```
git clone https://github.com/nvalkovich/nodejs2024Q1-service
```

## Installing NPM modules

```
npm install
```

## Create .env file

Rename existing .env.example to .env. You can correct configuration to your preferences

## Running application

You can start the application in dev or prod mode by running
```
npm run start:dev
```
or 
```
npm run start:prod
```
Also you can run the application in docker containers
```
docker compose up
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Vulnerabilities scanning

To scan application image for the vulnerabilities
```
npm run scan:app
```

To scan database image for the vulnerabilities

```
npm run scan:db
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
