const express = require("express");
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "A5yVf*YxpDD#G!r!u#&GMoo3QEYjyw&tcC64Z!eUqcy#W%q$gy3Khiw76P@bEHwwLzMRH",
  database : "allotment",
  port: "3306"
});

app.get("/faculty",(req,res)=>{
  db.query(
    "INSERT INTO seats (department,roomno,seatno) VALUES ('CSE','2','5');",
    (err,results)=>{
      console.log(err);
    res.send(results);
  });
});
/*const cors = require("cors");

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/User");
app.use("/user", userRoute);
const uploadRoute = require("./routes/Upload");
app.use("/upload", uploadRoute);*/

app.listen(3001, (req, res) => {
  console.log("Server running...");
});