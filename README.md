# Requirements

- node.js v16.13.0
- git 2.36.0
- Postman v9.15.13

---

# App setup

## &nbsp;&nbsp;&nbsp; 1. Cloning Github repository

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Open a terminal on the path where you want to clone the repository and run the following command:

```BASH
git clone https://github.com/mrff88/assessment-backend.git
```

## &nbsp;&nbsp;&nbsp; 2. Installing dependencies

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Once the repository has been cloned, run the following command to install the project's dependencies:

```BASH
npm install
```

## &nbsp;&nbsp;&nbsp; 3. Setup env variables

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Create two files at the root of the project: dev.env and test.env. Configure each env. file following the example of [example.env](example.env), which contains the following info:

```
PORT = <port number>
DB_STRING_CONNECTION = "<mongodb connection string>"
SECRET_KEY = <JWT secret key>
```

---

# Available Scripts

&nbsp;&nbsp;&nbsp; Run the following scripts on the terminal inside the project's path:

## &nbsp;&nbsp;&nbsp; 1. To run with dev.env variables:

```BASH
npm run start
```

## &nbsp;&nbsp;&nbsp; 2. To run with test.env variables:

```BASH
npm run test
```

## &nbsp;&nbsp;&nbsp; 3. To run jest tests:

```BASH
npm run test:watch
```

---

# Postman endpoints' tests

&nbsp;&nbsp;&nbsp; Import file [backend-assessment.postman_collection](backend-assessment.postman_collection.json) into postman to review all the endpoints' tests done in postman

---

# Questions:

## &nbsp;&nbsp;&nbsp; 1. Indicate which are the parts of the following url:

```
https://backend.mega-app.com.co:8080/api/articles/search?docid=1020&hl=en#dayone
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - _https://_ => url Scheme

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - _backend._ => url subdomain

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - _mega-app._ => url domain

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - _com.co_ => url top level domain

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - _:8080_ => port number

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - _/api/articles/search_ => path

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - _?_ => query string separator

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - _docid=1020&hl=en_ => query string

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - _#dayone_ => fragment

## &nbsp;&nbsp;&nbsp; 2. Define what is a Web API, Restful and what are the statusCode 200-, 400-, 500-

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - what is a Web API

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A web API (Application Programming Interface) is a bridge for a web based applications, usually located on a server.

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - what is a Restful API

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A Restful API (REST - REpresentational State Transfer ) is a type of web API that uses HTTP requests to access and use data.

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - what are the statusCode 200-, 400-, 500-

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The status codes in the 200 range indicate a succesful response; status codes in the 400 range indicate client error responses; status codes in the 500 range indicate server side errors.

## &nbsp;&nbsp;&nbsp; 3. When we talk about CRUD, what does it mean?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CRUD Is the acronym for the four basic operations (C - Create, R - Read, U - Update, D - Delete) that a persisten storage can do.
