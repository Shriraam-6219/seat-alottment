const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require("cors");
app.use(cors());

const db = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "your_current_password",
  database : "allotment",
  port: "3306"
});

//student seat findingx

app.post("/student",(req,res)=>{

  const rgnum= req.body.rgnum

  db.query(
    "SELECT * FROM seats WHERE rgnum=(?);",
    [rgnum],
    (err,results)=>{
      console.log(err);
    res.send(results);
  });
});

app.use(express.json());

/*const userRoute = require("./routes/User");
app.use("/user", userRoute);
const uploadRoute = require("./routes/Upload");
app.use("/upload", uploadRoute);*/

app.listen(3001, (req, res) => {
  console.log("Server running...");
});