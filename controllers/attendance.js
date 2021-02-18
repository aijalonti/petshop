const Attendance = require('../models/attendanceModel')

module.exports = (app) => {
  app.get("/atendimentos", (req, res) =>{
    Attendance.list(res)
  })

  app.get("/atendimentos/:id", (req, res) =>{
    const id = parseInt(req.params.id)

    Attendance.searchId(id, res)
  })

  app.post("/atendimentos", (req, res) => {
    const attendance = req.body
    
    Attendance.create(attendance, res)
  })

  app.patch('/atendimentos/:id', (req, res) =>{
    const id = parseInt(req.params.id)
    const values = req.body

    Attendance.update(id, values, res)

  })
};
