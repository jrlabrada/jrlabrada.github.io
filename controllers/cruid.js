const pool = require ('../databases/db')

exports.save = (req, res)=>{
    const date = req.body.date;
    const codigo = req.body.codigo;
    const producto = req.body.producto;
    const almacen = req.body.almacen;
    const Ccajas = req.body.Ccajas;
    const Ktotales = req.body.Ktotales;
    const kxCajas = Ktotales/Ccajas;
    const glaseo = req.body.glaseo;
    const lote = req.body.lote;
    const cliente = req.body.cliente;
    const Npalet = req.body.Npalet;

    

    pool.query('INSERT INTO entradas_act SET ?',{fecha_entrada:date, codigo:codigo, producto:producto, almacen:almacen, cajas:Ccajas, kilos_cajas:kxCajas, kilos_totales:Ktotales , glaseo:glaseo, lote:lote, cliente:cliente, no_palet:Npalet}, (error, results)=>{
    if(error){
        console.log(error);
    }else{
         
        res.redirect('/');
    } 
    pool.query()   
    }) 

}
//Modificar
exports.modificar = (req, res)=>{
    const id = req.body.id;
    const date = req.body.date;
    const codigo = req.body.codigo;
    const producto = req.body.producto;
    const almacen = req.body.almacen;
    const Ccajas = req.body.Ccajas;
    const Ktotales = req.body.Ktotales;
    const kCajas = Ktotales/Ccajas;
    const glaseo = req.body.glaseo;
    const lote = req.body.lote;
    const cliente = req.body.cliente;
    const Npalet = req.body.Npalet;
    
     

    pool.query('UPDATE entradas_act SET ? WHERE id = ?', [{fecha_entrada:date, codigo:codigo, producto:producto, almacen:almacen, cajas:Ccajas, kilos_cajas:kCajas, kilos_totales:Ktotales , glaseo:glaseo, lote:lote, cliente:cliente, no_palet:Npalet}, id], (error, results)=>{
        if(error){
            throw error;
        }else{
            
            res.redirect('/stock');
        } 
         
    } )

}

exports.despacho = (req, res)=>{
    const id = req.body.id;
    const date = req.body.date;
    const codigo = req.body.codigo;
    const producto = req.body.producto;
    const almacen = req.body.almacen;
    const Ccajas = req.body.Ccajas;
    const Ktotales = req.body.Ktotales;
    const kxCajas = Ktotales/Ccajas;
    const glaseo = req.body.glaseo;
    const lote = req.body.lote;
    const cliente = req.body.cliente;
    const Npalet = req.body.Npalet;
    var refe
    var comparar
    var cadena
    var cadenaJson
    var KxCajasActualizar
    pool.query('SELECT cajas FROM entradas_act WHERE id=?', [id], (err, rows)=>{
       

           
             cadena = JSON.stringify(rows)
            cadenaJson = JSON.parse(cadena)
             comparar = cadenaJson[0].cajas

              refe = comparar - Ccajas
              KxCajasActualizar = Ktotales/refe
              
              
      if (refe > 0 ) {
        pool.query('UPDATE entradas_act SET ? WHERE id = ?', [{cajas:refe, kilos_cajas:KxCajasActualizar, kilos_totales:Ktotales}, id], (error, results)=>{
            if(error){
                throw error;
            }  
            pool.query('INSERT INTO salidas_act SET ?',{fecha_entrada:date, codigo:codigo, producto:producto, almacen:almacen, cajas:Ccajas, kilos_cajas:kxCajas, kilos_totales:Ktotales , glaseo:glaseo, lote:lote, cliente:cliente, no_palet:Npalet}, (error, results)=>{
            if(error){
                throw error;
            }else{
                
                res.redirect('/stock');
            } 
        } ) 
         
      } )
      
        
    }

    if (refe==0)
    {
        pool.query('INSERT INTO salidas_act SET ?',{fecha_entrada:date, codigo:codigo, producto:producto, almacen:almacen, cajas:Ccajas, kilos_cajas:kxCajas, kilos_totales:Ktotales , glaseo:glaseo, lote:lote, cliente:cliente, no_palet:Npalet}, (error, results)=>{
         if(error){
             throw error;
         }else{
            pool.query('DELETE FROM entradas_act WHERE id=?', [id], (error, results)=>{
                if(error){
                    throw error;
                }else{
                    res.redirect('/stock');
                }
        
            })    
         } 
     } ) 
   }
  
    
    
})
}


