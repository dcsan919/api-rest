const express = require('express');
const cors = require('cors')
const app = express();
const dbConnection = require('../db/conn');
app.use(cors());
app.use(express.json());

port = 4000;
app.listen(port, ()=> console.log(`Servidor en el puerto: ${port}`))

app.get("/get/Pcs", (req, res) => {
       const sql = "SELECT * FROM pc";

       dbConnection.query(sql, (error, results) => {
           if (error) {
               console.error("Error al realizar la consulta:", error);
               res.status(500).json({ error: "Error al obtener datos de la base de datos" });
               return;
           }
           res.json(results);
       });
});

app.get("/get/:nombre", (req, res) =>{
    const { nombre } = req.params;
    const sql ="SELECT id, nombre, teclado, observacion, modelo, no_serie, mouse, id_estado, id_tabla FROM pc WHERE nombre=?";
    dbConnection.query(sql, [nombre], (error, results, fields) =>{
        if (error) {
            console.error("Error al realizar la consulta:", error);
            res.status(500).json({ error: "Error al obtener datos en la base de datos", errro});
            return;
        }
        res.json(results);
    })
})

app.get("/getPc/:id", (req, res) =>{
    const sql = "SELECT * FROM pc WHERE id=?";
    dbConnection.query(sql, [req.params.id],(error, results) => {
        if (error) {
            console.error("Error al realizar la consulta:", error);
            res.status(500).json({ error: "Error al obtener datos de la base de datos", error });
            return;
        }
        res.json(results);
    });
});

app.post("/create", (req, res) => {
       const { nombre, teclado, observacion, modelo, no_serie, mouse, id_estado, id_tabla } = req.body;
   
       const sql = "INSERT INTO pc (nombre, teclado, observacion, modelo, no_serie, mouse, id_estado, id_tabla) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
       
       dbConnection.query(sql, [nombre, teclado, observacion, modelo, no_serie, mouse, id_estado, id_tabla], (error, results, fields) => {
           if (error) {
               console.error("Error al crear la consulta:", error);
               res.status(500).json({ error: "Error al crear los datos en la base de datos" });
               return;
           }
           res.json({ results, message: "Registro creado correctamente" })
       });
});
   
app.put("/update/:id", (req, res) => {
       const id = req.params.id;
       const { nombre, teclado, observacion, modelo, no_serie, mouse, id_estado, id_tabla } = req.body;
   
       const sql = "UPDATE pc SET nombre=?, teclado=?, observacion=?, modelo=?, no_serie=?, mouse=?, id_estado=?, id_tabla=? WHERE id=?";
      
       dbConnection.query(sql, [nombre, teclado, observacion, modelo, no_serie, mouse, id_estado, id_tabla, id], (error, results, fields) => {
           if (error) {
               console.error("Error al actualizar el registro:", error);
               res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
               return;
           }
   
           res.json({ message: "Registro actualizado correctamente" });
       });
});

app.delete("/delete/:id", (req, res)=>{
       const id = req.params.id;
       const sql = "DELETE FROM pc WHERE id=?";
       dbConnection.query(sql, [id],(error, results) =>{
              if (error) {
                     console.error("Error al eliminar el registro:", error);
                     res.status(500).json({ error: "Error al eliminar el registro en la base de datos" });
                     return;
                 }

                 res.json({ message: "Registro eliminado correctamente" });
       })
})