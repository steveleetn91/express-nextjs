# Task Module
This module use NEXTJS and EXPRESSJS to built a module manage task. This only for testing and it has not UNIT TESTING.

## Folders
    - ./express this is folder for backend (API)
    - ./react-nextjs this is folder for frontend (API) 

## ExpressJS
Currently we using MONGODB.
### Root
    ./express
### How to setup ?
First step you need copy `env.example` to `.env`. Don't forget config MongoDB connect at `.env`. Then run `npm install`
### How to change port? 
You are really can do it at `.env`. That's `PORT` field.
### How to start? 
To start you need run `npm run start`
## NextJS 
### Root
    ./react-nextjs
### How to setup?
Run `npm install`
### How to start development? 
To start you need run `npm run dev`
### How to start production? 
To start you need run `npm run build`, next step start server `npm run start`
### Note 
If you wanna changed API HOST. You are really can do it at `next.config.js`