const express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// helpers con algunas funciones
const helpers = require('./helpers');

// crear la coneccion a la bd

const db = require('./config/db');

// importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

// crear una app de express
const app = express();

// static files
app.use(express.static('public'));

// View Engine 
app.set('view engine', 'pug');

// BodyParser para leer datos del formulario
app.use(BodyParser.urlencoded({extended: true}));


// cargar vistas 
app.set(path.join(__dirname, './views'));

// Agregar flash messages
app.use(flash());

app.use(cookieParser());

// Sesiones nos permiten navegar entre distintas paginas sin volvernos a autentificar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});

// routes
app.use(require('./routes'));

app.listen(3000, (req, res) => {
    console.log('Server on port 3000');
});