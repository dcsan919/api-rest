const mysql = require('mysql');

let connection;

try {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        pass: "",
        database: "bdlab",
        port: 3306
    });
    connection.on('error', (err) => {
        console.error("Error de conexión a la base de datos:", err);
    });
    connection.connect((err) => {
        if (err) {
            console.error("Error al conectar a la base de datos:", err);
        } else {
            console.log("Conexión exitosa a la base de datos");
        }
    });
} catch (error) {
    console.error("Error al intentar conectar a la base de datos:", error);
}

module.exports = connection;
