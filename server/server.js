import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";
import path from 'path';

const app = express();
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0703009814Az",
  database: "dota2"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
  const sqlGet = "SELECT * FROM statistics_db";
  db.query(sqlGet, (error, result) => {
    res.send(result)
  })
});

app.get('/api/get/:id', (req, res) => {
  const {id} = req.params;
  const sqlGet = "SELECT * FROM statistics_db WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error)
    }
    res.send(result)
  })
})

app.post("/api/post", (req, res) => {
  const {attribute, hero, status, fraction, date} = req.body;
  const sqlInsert = "INSERT INTO statistics_db (attribute,hero,status,fraction,date) VALUES (?,?,?,?,?)";
  db.query(sqlInsert, [attribute, hero, status, fraction, date]), (error, result) => {
    if (error) {
      console.log(error)
    }
  }
});

app.delete("/api/remove/:id", (req, res) => {
  const {id} = req.params;
  const sqlRemove = "DELETE FROM statistics_db WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error)
    }
  })
});

app.put('/api/update/:id', (req, res) => {
  const {id} = req.params;
  const {attribute, hero, status, fraction, date} = req.body;
  const sqlUpdate = "UPDATE statistics_db SET attribute=?, hero=?, status=?, fraction=?, date=? WHERE id = ?";
  db.query(sqlUpdate, [attribute, hero, status, fraction, date, id], (error, result) => {
    if (error) {
      console.log(error)
    }
    res.send(result);
  })
})

app.get("/", (req, res) => {
  // const sqlInsert = "INSERT INTO statistics_db (attribute, hero, status, fraction,date) VALUES (?,?,?,?,?)";
  // const values = ['Сила', 'Abaddon', 'Победа', 'Свет','2023-07-28'];
  // db.execute(sqlInsert, values, (err, result) => {
  //   if (err) {
  //     console.log('error:', err);
  //     return;
  //   }
  //   console.log('result:', result);
  //   res.send("Hello Mysql!");
  // });
})

app.listen(5000, () => {
  console.log('Server is running on port 5000')
});