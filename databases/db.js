const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : 'root',
    password : process.env.DB_PASS,
    database : 'stock_congelados_la_navieraa',
})

conexion.connect((error)=>{
    if(error){
        console.log('El error de conexion es: ' + error)
        return
    }
    console.log('!Conectado a la Base de Datos MySql')
})

module.exports=conexion