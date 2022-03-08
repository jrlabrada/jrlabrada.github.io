const { Router } = require('express')
const express = require('express')
const router =  express.Router()

const pool = require('../databases/db')

const authController = require('../controllers/authController')

//ROUTER PARA LAS VISTAS

router.get('/', authController.isAuthenticated, (req, res)=>{
    
    pool.query('SELECT * FROM entradas_act', (error, results)=>{
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
    pool.query('SELECT * FROM entradas_act WHERE id=?', [id], (error, results)=>{
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
    pool.query('SELECT * FROM entradas_act WHERE id=?', [id], (error, results)=>{
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
    pool.query('SELECT * FROM entradas_act WHERE id=?', [id], (error, results)=>{
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
    pool.query('DELETE FROM entradas_act WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/stock');
        }
        
    })    

})
//Borrar Salidas
router.get('/deleteSalidas/:id', (req, res)=>{
    const id = req.params.id;
    pool.query('DELETE FROM salidas_act WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/salidas');
        }
        
    })    

})

//Stock Mercancías Bergondo
router.get('/bergondo', (req, res)=>{
     const almacen = 'Bergondo'
    pool.query('SELECT * FROM `entradas_act` WHERE almacen = ?',[almacen], (error, results)=>{
        
        if(error){
            throw error;
        }else{
             res.render('stock', {results:results});
             
          
        } 
        
    })     

})
//Stock Mercancías Coruñesa
router.get('/corunesa', (req, res)=>{
    const almacen = 'La Coruñesa'
   pool.query('SELECT * FROM `entradas_act` WHERE almacen = ?',[almacen], (error, results)=>{
       
       if(error){
           throw error;
       }else{
            res.render('stock', {results:results});
            
         
       } 
       
   })     

})
//Stock Actual
router.get('/stock', (req, res)=>{
    
         
    pool.query('SELECT * FROM entradas_act', (error, results)=>{
        
          if(error){
              throw error;
          }else{
               res.render('stock', {results:results});
               
            
          } 
          
      })       
  });

  //Restaurar
  router.get('/Restaurar', (req, res)=>{
    
         
    pool.query('SELECT * FROM entradas_act', (error, results)=>{
        
          if(error){
              throw error;
          }else{
               res.render('stock', {results:results});
               
            
          } 
          
      })       
  });

//Salidas
router.get('/salidas', (req, res)=>{
    
         
    pool.query('SELECT * FROM salidas_act', (error, results)=>{
        
          if(error){
              throw error;
          }else{
               res.render('salidas', {results:results});
               
            
          } 
          
      })       
  });
 


 


 



router.get('/graficoarticulos', (req, res)=>{
 
      
    pool.query('SELECT `producto`,`cajas` FROM `salidas_act` WHERE id=?',[38], (error, results)=>{
        
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