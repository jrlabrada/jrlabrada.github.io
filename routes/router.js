const { Router } = require('express')
const express = require('express')
const router =  express.Router()

const conexion = require('../databases/db')

const authController = require('../controllers/authController')

//ROUTER PARA LAS VISTAS

router.get('/', authController.isAuthenticated, (req, res)=>{
    
    conexion.query('SELECT * FROM entradas_act', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index.ejs');
        }

    })   
})

//Control de Stock
//RUTA PARA CREAR ENTRADAS
router.get('/create', (req, res)=>{
    res.render('create');
})

 

//RUTA PARA EDITAR REGISTROS
router.get('/edit/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM entradas_act WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit', {valor:results[0]});
        }

    })    

})
//Modificar Productos
router.get('/modificar/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM entradas_act WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('modificar', {valor:results[0]});
        }

    })    

})

//Despachar Productos
router.get('/despacho/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM entradas_act WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('despacho', {valor:results[0]});
        }

    })    

})
//RUTA PARA ELIMINAR REGISTRO

router.get('/delete/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM entradas_act WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/stock');
        }

    })    

})

//Stock Actual
router.get('/stock', (req, res)=>{
    
         
    conexion.query('SELECT * FROM entradas_act', (error, results)=>{
        
          if(error){
              throw error;
          }else{
               res.render('stock', {results:results});
               
            
          } 
  
      })       
  });
//Salidas
router.get('/salidas', (req, res)=>{
    
         
    conexion.query('SELECT * FROM salidas_act', (error, results)=>{
        
          if(error){
              throw error;
          }else{
               res.render('salidas', {results:results});
               
            
          } 
  
      })       
  });
 


 


router.get



router.get('/graficoarticulos', (req, res)=>{
 
      
    conexion.query('SELECT `producto`,`cajas` FROM `salidas_act` WHERE id=?',[38], (error, results)=>{
        
        if(error){
            throw error;
        }else{
           
             res.send(results);
             
          
        } 

    })       
    })      


//Control de Login

router.get('/login', (req,res)=>{
    res.render('login'/* , {alert:false} */)
})

router.get('/register',(req, res)=>{
    res.render('register')
})


//ROUTER PARA LOS METODOS DE CONTROLLER
 
const cruid = require ('../controllers/cruid');

router.post('/save', cruid.save);
router.post('/modificar', cruid.modificar);
 
router.post('/despacho', cruid.despacho);
 
 

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
module.exports = router