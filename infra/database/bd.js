const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ajn@2000",
  database: "agenda-petshop",
  debug: false,
});

module.exports = connection;
