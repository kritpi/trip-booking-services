
# Trip-Booking-Services

This is the backend of the Trip Booking web application. It's a Node.js server using **Express** (Typescript) provided RESTful APIs services to interacted with database


## Tech Stack
- Typescript - Strongly typed programming language built on JavaScript
- Express Js - Routing Framework written in JavaScript and hosted within the _Node_._js_ runtime environment
- PostgreSQL - Open source, SQL object-relational database system

## Prerequisites
- Node&Npm install on the computer
- Docker for containerization
- Git for version control

## Installation
1. Clone the repository :
	```bash
	$ git clone https://github.com/kritpi/trip-booking-services.git
	```
2. Navigate to the working directory :
	```bash
	$ cd trip-booking-services
	```
3. Install dependencies : 
	```bash
	$ npm install
	```
4. Set up the environment variables by creating `.env` file based on `.env.example`
	```bash
	$ cp .env.example .env 
	```
5. Start the web server : 
	```bash
	$ npm start
	``` 
6. Start the DB server :
	```bash
	$ docker compose up -d
	```
	
## Migration
To map data model into database schema, use the `prisma migrate` CLI Command
```bash
$ npx prisma migrate dev
```


