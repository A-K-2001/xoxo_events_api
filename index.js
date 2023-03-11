// Importing necessary modules
const express = require("express"); // for building web applications
const dotenv = require("dotenv"); // for loading environment variables
const mongoose = require("mongoose"); // for MongoDB database connection
const app = express(); // creating an instance of express application
const eventRouter = require("./Router/event"); // importing event router

// Setting Mongoose option to allow creating collections without strict schema
mongoose.set("strictQuery", false);

// Loading environment variables from .env file
dotenv.config();

// Setting middleware to parse JSON data
app.use(express.json());

// Connecting to MongoDB database
mongoose
    .connect(process.env.MONGO_URL,) // using the MONGO_URL variable from environment variables
    .then(() => console.log("DBconnection successful")) // If connection successful, log to console
    .catch((err) => { // If connection fails, log error to console
        console.log(err);
    });

// Setting router for handling event related requests
app.use("/api/event",eventRouter);

// Starting the express application to listen on port 5000
app.listen("5000",()=>{
    console.log("runing at port 5000...");
})