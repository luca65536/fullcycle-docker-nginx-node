const express = require("express");
const mysql = require("mysql");

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;
connection.query(createTable);
connection.end();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const connection = mysql.createConnection(config);

  const sqlInsert = `INSERT INTO people(name) values('Wesley')`;
  connection.query(sqlInsert);

  const sqlSelect = `SELECT * FROM people`;
  connection.query(sqlSelect, function (error, results, fields) {
    connection.end();
    if (error) {
      throw error;
    }
    res.send(
      "<h1>Full Cycle Rocks!</h1> <br/>" + results.map((result) => result.name)
    );
  });
});

app.listen(port, () => console.log("Rodando na porta " + port));
