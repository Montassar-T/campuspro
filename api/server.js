require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const corsOptions= require("./config/corsOptions");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT  ;
const cookieParser = require('cookie-parser'); // Import cookie-parser module

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())

connectDB();
console.log('reach')

app.use("/auth", require("./routes/authRoutes"));
app.use("/workers" , require('./routes/workersRoutes'))



app.use("*", (req,res)=>{
    res.status(404)
    if(req.accepts("json")){
        res.send({message:"404 not found"});
    }else{
res.type("txt").send("404 not found");
    }
});


mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });     

  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });