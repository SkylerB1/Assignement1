const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Vbnm@2022",
  database: "office_transactions",
});

// app.get("/", (req, res) => {
//   const sqlIns =
//     "INSERT INTO Transactions (transaction_type,amount,description,date) VALUES ('debit','100','food',today())";
//   db.query(sqlIns, (err, result) => {
//     console.log("Inserted");
//   });
// });

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM Transactions";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { transaction_type, amount, description } = req.body;
  const sqlInsert =
    "INSERT INTO Transactions (transaction_type,amount,description,date) VALUES (?,?,?,now())";
  db.query(
    sqlInsert,
    [transaction_type, amount, description],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
