const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../databases/db')
const {promisify} = require('util')

const JWT_SECRETO = 'numero_secreto'
const JWT_TIEMPO_EXPIRA = '7d'
const JWT_COOKIE_EXPIRES = 90
exports.register = async(req, res)=>{
   try {
    const name = req.body.name
    const user = req.body.user
    const pass = req.body.pass
    let passHash = await bcryptjs.hash(pass, 8)
    //console.log(passHash)
    conexion.query('INSERT INTO users set ?', {user:user, name:name, pass:passHash},(error, results)=>{
        if (error) {console.log(error)
            }
            res.redirect('/login')
    })

   } catch (error) {
       console.log(error)
       
   }

  

    
}

exports.login = async (req, res) =>{
try {const user = req.body.user
    const pass = req.body.pass
   
   
   if(!user || !pass){
   res.render('login')
  
   
   }
   else{conexion.query('SELECT * FROM users WHERE  user = ?', [user], async (error,results)=>{
      
       if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
           res.render('login')
            
           
    }else{
       
                

                  //inisio de sesion OK
                 
   
                  const id = results[0].id     
                  const token = jwt.sign({id:id}, JWT_SECRETO, {
                      expiresIn: JWT_TIEMPO_EXPIRA
                  })
                  
                  const cookieOptions = {
                       expires:new Date(Date.now()+JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                       httpOnly:true
                  }
                  res.cookie('jwt', token, cookieOptions)
                  res.render('')  
                   
           }
       })
   } 
    
} catch (error) {
    console.log(error)
}
 
} 

exports.isAuthenticated = async (req, res, next) =>{
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify (jwt.verify)(req.cookies.jwt,JWT_SECRETO)
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
        
    }
    else{
        res.redirect('/login')
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}
 

