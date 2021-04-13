const moment = require("moment");
const axios = require("axios");
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

      connection.query(sql, attendanceDate, (errs, results) => {
        if (errs) {
          res.status(400).json(errs);
        } else {
          const id = results.insertId;
          res.status(201).json({ ...attendance, id });
        }
      });
    }
  }

  list(res) {
    const sql = "SELECT * FROM Attendance";

    connection.query(sql, (errs, results) => {
      if (errs) {
        res.status(400).json(errs);
      } else {
        res.status(200).json(results);
      }
    });
  }

  searchId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
    connection.query(sql, async (errs, results) => {
      const attendance = results[0];
      const cpf = attendance.client;
      if (errs) {
        res.status(400).json(errs);
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        attendance.client = data;
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

    connection.query(sql, [values, id], (errs, results) => {
      if (errs) {
        res.status(400).json(errs);
      } else {
        res.status(200).json({ ...values, id });
      }
    });
  }

  delete(id, res) {
    const sql = "DELETE FROM Attendance WHERE id=?";

    connection.query(sql, id, (errs, results) => {
      if (errs) {
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
