const Attendance = require("../models/attendanceModel");

module.exports = (app) => {
  app.get("/attendance", (req, res) => {
    Attendance.list()
      .then((results) => res.json(results))
      .catch((errs) => res.status(400).json(errs));
  });

  app.get("/attendance/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Attendance.searchId(id, res);
  });

  app.post("/attendance", (req, res) => {
    const attendance = req.body;

    Attendance.create(attendance)
      .then((registeredService) => res.status(201).json(registeredService))
      .catch((errs) => res.status(400).json(errs));
  });

  app.patch("/attendance/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;

    Attendance.update(id, values, res);
  });

  app.delete("/attendance/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Attendance.delete(id, res);
  });
};
