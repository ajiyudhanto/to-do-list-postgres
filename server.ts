import express from "express"; 
const app = express(); // initialize the express server
// create a test route
app.get('/', (req, res, next) => {   
   res.send('Hello world')
})
// Define the port to run the server. this could either be defined // in the environment variables or directly as shown below
app.listen(process.env.PORT || 8000, () => {console.log("server started");
})