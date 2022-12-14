// Import builtin NodeJS modules to instantiate the service
const https = require("https");
const fs = require("fs");
var cors = require('cors');

// Import the express module
const express = require("express");

// Instantiate an Express application
const app = express();
app.use(cors())

// Create a NodeJS HTTPS listener on port 4000 that points to the Express app
// Use a callback function to tell when the server is created.
https
    .createServer(
        // Provide the private and public key to the server by reading each
        // file's content with the readFileSync() method.
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app
    )
    .listen(8000, () => {
        console.log("serever is runing at port 8000");
    });

// Create an try point route for the Express app listening on port 4000.
// This code tells the service to listed to any request coming to the / route.
// Once the request is received, it will display a message "Hello from express server."
app.get('/', (req, res) => {
    res.send("Hello from express server.")
})