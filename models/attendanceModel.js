const moment = require("moment");
const axios = require("axios");
const connection = require("../infra/database/bd");
const repositories = require("../repositories/attendance.repositories");

class Attendance {
  constructor() {
    this.validDate = ({ dateService, createAt }) =>
      moment(dateService).isSameOrAfter(createAt);
    this.customerValid = (size) => size >= 5;
    this.valid = (params) =>
      this.validations.filter((field) => {
        const { name } = field;
        const param = params[name];

        return !field.valid(param);
      });
    this.validations = [
      {
        name: "dateService",
        valid: this.validDate,
        mensage: "Date must be greater than or equal to the current datete",
      },
      {
        name: "client",
        valid: this.customerValid,
        mensage: "Customer must be at least 5 characters",
      },
    ];
  }
  create(attendance) {
    const createAt = moment().format("YYYY-MM-DD HH:MM:SS");
    const dateService = moment(attendance.dateService, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    const params = {
      data: { dateService, createAt },
      client: { size: attendance.client.length },
    };
    const errs = this.valid(params);
    const existsErrs = errs.length;

    if (existsErrs) {
      return new Promise((resolve, reject) => reject(errs));
    } else {
      const attendanceDate = { ...attendance, createAt, dateService };

      return repositories.create(attendanceDate).then((results) => {
        const id = results.insertId;
        return { ...attendance, id };
      });
    }
  }

  list() {
    return repositories.list();
  }

  searchId(id, res) {
    const sql = `SELECT * FROM Attendance WHERE id=${id}`;
    connection.query(sql, async (errs, results) => {
      const attendance = results[0];
      const cpf = attendance.client;
      if (errs) {
        res.status(400).json(errs);
      } else {
        const { data } = await axios.get(`http://localhost:3232/${cpf}`);
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
