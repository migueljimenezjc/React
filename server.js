const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./Routes/api/Usuarios");

const app = express();

// Inicializamos el middleware Bodyparser
app.use(
    bodyParser.urlencoded({
        extended:false
    })
);
app.use(bodyParser.json());

// configuracion DB
const db = require('./config/keys').mongoURI;

// Conexion con Mongo
mongoose
 .connect(
     db,
     { useNewUrlParser:true }
 ).then(()=> console.log("MongoDB conectado exitosamente"))
 .catch(err=> console.log(err));

 app.use(passport.initialize());
 require("./config/passport")(passport);
 
 app.use("/api/Usuarios",users);

 

 const port = process.env.port || 5000; 

 app.listen(port,() => console.log(`Server conectado y corriendo en el puerto ${ port } !`));
 