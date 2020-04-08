const express = require('express');
const path = require('path');
const BodyParser = require('body-parser');

// helpers con algunas funciones
const helpers = require('./helpers');

// crear la coneccion a la bd

const db = require('./config/db');

// importar el modelo
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

// crear una app de express
const app = express();

// View Engine 
app.set('view engine', 'pug');

// static files
app.use(express.static('public'));

// cargar vistas 
app.set(path.join(__dirname, './views'));

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

// BodyParser para leer datos del formulario
app.use(BodyParser.urlencoded({extended: true}));

// routes
app.use(require('./routes'));

app.listen(3000, (req, res) => {
    console.log('Server on port 3000');
});