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
	`$ git clone https://github.com/kritpi/trip-booking-services.git`
2. Navigate to the working directory :
	`$ cd trip-booking-services`
3. Install dependencies : 
	`$ npm install`
4. Set up the environment variables by creating `.env` file based on `.env.example`
	`$ cp .env.example .env`
5. Run the application :
	5.1 Start the web server : 
	`$ npm start` 
	5.2 Start the DB server :
	`$ docker compose up -d`
	
## Migration
To map data model into database schema, use the `prisma migrate` CLI Command
`npx prisma migrate dev`


