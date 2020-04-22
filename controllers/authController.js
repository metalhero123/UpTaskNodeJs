const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

// Funcion para revisar si el usuario esta logeado o no

exports.usuarioAutenticado = (req, res, next) => {
    // si el usuario esta auntenticado, adelante
    if(req.isAuthenticated()) {
        return next();
    }
    // sino redirigir al formulario
    return res.redirect('/iniciar-sesion')
}

// Funcion para cerrar Sesion

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

// Genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    // Verificar que el usuario exista
    const {email} = req.body;
    const usuario = await Usuarios.findOne({where: {email}});

    // Si no existe el usuario
    if(!usuario) {
        req.flash('error', 'No existe esa cuenta')
        res.redirect('/restablecer');
    }

    // Usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    // Guardarlos en la base de datos
    await usuario.save();

    // url de reset
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;
    console.log(resetUrl);

}

exports.contraReset = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });
    console.log(usuario);
}