const { text } = require("body-parser")

class Tables{
    init (connection){
        this.connection = connection

        this.createAttendance()
    }

    createAttendance(){
        const sql = 'CREATE TABLE IF NOT EXISTS Attendance (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, status varchar(20) NOT NULL, comments text, PRIMARY KEY(id))'

        this.connection.query(sql, (erro) =>{
            if(erro){
                console.log(erro)
            }else{
                console.log('Table of Attendance created with sucess')
                console.log('\nsql: ', sql)
            }
        })
    }
}

module.exports = new Tables