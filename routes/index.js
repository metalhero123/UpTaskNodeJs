const express = require('express');
const router = express.Router();

// Importar express validator
const { body } = require('express-validator');

// importar el controlador 
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

// Home Route
 router.get('/', proyectosController.proyectosHome);
 router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
 router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto);

// Listar proyectos
router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

// Actualizar el proyecto
router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
router.post('/nuevo-proyecto/:id',
body('nombre').not().isEmpty().trim().escape(),
proyectosController.actualizarProyecto);

// Eliminar proyecto

router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

// Tareas
router.post('/proyectos/:url', tareasController.agregarTarea);

module.exports = router;