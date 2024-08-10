# Saraha

**Saraha** is an anonymous messaging app designed to ensure secure and confidential communication between users. This application allows users to send and receive anonymous messages, fostering open and honest communication without revealing identities.

## Features
- **Anonymous Messaging**: Send and receive messages without disclosing your identity.
- **Secure Communication**: Ensures that all messages are kept confidential and private.

## Technologies
- **NestJS**: For building the backend application framework.
- **Express**: Used within NestJS for handling routing and middleware.
- **Mongoose**: For interacting with MongoDB, managing data models.
- **Joi**: For data validation and ensuring the integrity of user inputs.
- **Nodemailer**: For sending emails, such as notifications or account confirmations.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
