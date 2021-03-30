const moment = require("moment");
const attendance = require("../controllers/attendance");
const connection = require("../infra/bd");

class Attendance {
  create(attendance, res) {
    const createAt = moment().format("YYYY-MM-DD HH:MM:SS");
    const dateService = moment(attendance.dateService, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    const validDate = moment(dateService).isSameOrAfter(createAt);
    const customerValid = attendance.client.length >= 5;

    const validations = [
      {
        name: "dateService",
        valid: validDate,
        mensage: "Date must be greater than or equal to the current datete",
      },
      {
        name: "client",
        valid: customerValid,
        mensage: "Customer must be at least 5 characters",
      },
    ];

    const errs = validations.filter((field) => !field.valid);
    const existsErrs = errs.length;

    if (existsErrs) {
      res.status(400).json(errs);
    } else {
      const attendanceDate = { ...attendance, createAt, dateService };

      const sql = "INSERT INTO Attendance SET ?";

      connection.query(sql, attendanceDate, (err) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(attendance);
        }
      });
    }
  }

  list(res) {
    const sql = "SELECT * FROM Attendance";

    connection.query(sql, (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(results);
      }
    });
  }

  searchId(id, res) {
    const sql = `SELECT * FROM Attendance WHERE id=${id}`;
    connection.query(sql, (err, result) => {
      const attendance = result[0];
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(attendance);
      }
    });
  }

  update(id, values, res) {
    if (values.dateService) {
      values.dateService = moment(values.dateService, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }
    const sql = "UPDATE Attendance SET ? WHERE id=?";

    connection.query(sql, [values, id], (err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json("Custumer update with sucess ${...values, id}");
      }
    });
  }

  delete(id, res) {
    const sql = "DELETE FROM Attendance WHERE id=?";

    connection.query(sql, id, (err) => {
      if (err) {
        res.status(400).json(erro);
      } else {
        res
          .status(200)
          .json(`Custumer with id: ${id} has been successfully removed`);
      }
    });
  }
}

module.exports = new Attendance();
