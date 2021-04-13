const { text } = require("body-parser");

class Tables {
  init(connection) {
    this.connection = connection;

    this.createAttendance();
    this.createPets();
  }

  createAttendance() {
    const query =
      "CREATE TABLE IF NOT EXISTS Attendance (id int NOT NULL AUTO_INCREMENT, client varchar(11) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, status varchar(20) NOT NULL, comments text, dateService datetime NOT NULL, createAt datetime NOT NULL, PRIMARY KEY(id))";

    this.connection.query(query, (errs) => {
      if (errs) {
        console.log(errs);
      } else {
        console.log("Table of Attendance created with sucess\n");
        // console.log("\nsql: ", query);
      }
    });
  }

  createPets() {
    const query =
      "CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, name varchar(50), image varchar(200), PRIMARY KEY (id))";
    this.connection.query(query, (errs) => {
      if (errs) {
        console.log(errs);
      } else {
        console.log("Table of Pets created with sucess\n");
        // console.log("\nsql: ", query);
      }
    });
  }
}

module.exports = new Tables();
