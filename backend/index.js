const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require("dotenv").config();
const connectDB = require('./config/db')
const app = express();
const router = require('./routes')
// Middleware to parse JSON bodies

app.use(cors(
  {
   origin:process.env.FRONTEND_URL,
   credentials:true
  }
 ));
app.use(express.json());
app.use("/api", router); 
// Route handling
app.get("/apidaaa", async (req, res) => {
    console.log('hello');
    res.send('Hello World');
});



const PORT = process.env.PORT || 8001; // Corrected the order of defaults
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });


  // Server listening on port 8000
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
