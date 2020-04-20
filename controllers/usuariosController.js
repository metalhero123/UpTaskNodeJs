const Usuarios = require('../models/Usuarios')

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en uptask'
    });
}

exports.formIniciarSesion = (req, res) => {
    const {error} = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar sesión en uptask',
        error
    });
}

exports.crearCuenta = async (req, res) => {
    // Leer los datos
    const { email, password } = req.body;

    try {
        // crear el usuario
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear cuenta uptask',
            email,
            password
        })
    }
}