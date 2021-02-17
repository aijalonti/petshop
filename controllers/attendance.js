const Attendance = require('../models/attendanceModel')

module.exports = (app) => {
  app.get("/atendimentos", (req, res) =>
    res.send("Você está na rota de atendimentos e está realizando um GET")
  );

  app.post("/atendimentos", (req, res) => {
    const attendance = req.body
    
    Attendance.create(attendance)
    res.send("Você está na rota de atendimentos e está realizando um POST");
  });
};
