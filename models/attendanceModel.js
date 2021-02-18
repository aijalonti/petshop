const moment = require("moment");
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

      connection.query(sql, attendanceDate, (erro, results) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(results);
        }
      });
    }
  }
}

module.exports = new Attendance();
