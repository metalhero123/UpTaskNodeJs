const express = require('express');
const router = express.Router();

// Importar express validator
const { body } = require('express-validator');

// importar el controlador 
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

// Home Route
router.get('/', 
    authController.usuarioAutenticado,
    proyectosController.proyectosHome
);

router.get('/nuevo-proyecto',
    authController.usuarioAutenticado,
    proyectosController.formularioProyecto);

router.post('/nuevo-proyecto',
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
);

// Listar proyectos
router.get('/proyectos/:url', 
    authController.usuarioAutenticado,
    proyectosController.proyectoPorUrl
);

// Actualizar el proyecto
router.get('/proyecto/editar/:id',
    authController.usuarioAutenticado,
    proyectosController.formularioEditar
);
router.post('/nuevo-proyecto/:id',
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
);

// Eliminar proyecto

router.delete('/proyectos/:url', 
    authController.usuarioAutenticado,
    proyectosController.eliminarProyecto
);

// Tareas
router.post('/proyectos/:url',
    authController.usuarioAutenticado,
    tareasController.agregarTarea
);

// Actualizar tarea
router.patch('/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea
);

// Eliminar tarea
router.delete('/tareas/:id', 
    authController.usuarioAutenticado,
    tareasController.eliminarTarea
);

// Crear nueva cuenta
router.get('/crear-cuenta', usuariosController.formCrearCuenta);
router.post('/crear-cuenta', usuariosController.crearCuenta);

// Iniciar sesion
router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
router.post('/iniciar-sesion', authController.autenticarUsuario);

// cerrar sesion
router.get('/cerrar-sesion', authController.cerrarSesion);

// restablecer contraseña
router.get('/restablecer', usuariosController.formRestablecerPassword);
router.post('/restablecer', authController.enviarToken);
router.get('/restablecer/:token', authController.contraReset);


module.exports = router;