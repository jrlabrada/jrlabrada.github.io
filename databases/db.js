const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : 'us-cdbr-east-05.cleardb.net',
    user : 'b49f461dc92e98',
    password : 'a73a5e2f',
    database : 'heroku_93dd851c0deb5df'
})

conexion.connect((error)=>{
    if(error){
        console.log('El error de conexion es: ' + error)
        return
    }
    console.log('!Conectado a la Base de Datos MySql')
})

module.exports=conexion