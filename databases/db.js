const mysql = require('mysql')

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'us-cdbr-east-05.cleardb.net',
    user            : 'b49f461dc92e98',
    password        : 'a73a5e2f',
    database        : 'heroku_93dd851c0deb5df'
  });





/* const conexion = mysql.createConnection({
    host : 'us-cdbr-east-05.cleardb.net',
    user : 'b49f461dc92e98',
    password : 'a73a5e2f',
    database : 'heroku_93dd851c0deb5df'
}) 
 */
 
/* const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : 'root',
    password : process.env.DB_PASS,
    database : 'stock_congelados_la_navieraa'
}) */

pool.getConnection((error)=>{
    if(error){
        console.log('El error de conexion es: ' + error)
        return
    }
    console.log('!Conectado a la Base de Datos MySql')
})
 
module.exports=pool