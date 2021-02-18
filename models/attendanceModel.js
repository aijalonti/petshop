const moment = require('moment')
const connection = require('../infra/bd')

class Attendance {
    create(attendance){
        const createAt = moment().format('YYYY-MM-DD HH:MM:SS')
        const dateService = moment(attendance.dateService, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const attendanceDate = {...attendance, createAt, dateService}
        const sql = 'INSERT INTO Attendance SET ?'
        
        connection.query(sql, attendanceDate, (erro, results) =>{
            if(erro) {
                console.log(erro)
            }else{
                console.log(results)
            }
        })
   
    }
}

module.exports = new Attendance