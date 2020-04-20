const passport = require('passport');

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