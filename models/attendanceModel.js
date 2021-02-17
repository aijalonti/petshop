const connection = require('../infra/bd')

class Attendance {
    create(attendance){
        const sql = 'INSERT INTO Attendance SET ?'
        
        connection.query(sql, attendance, (erro, results) =>{
            if(erro) {
                console.log(erro)
            }else{
                console.log(results)
            }
        })
   
    }
}

module.exports = new Attendance