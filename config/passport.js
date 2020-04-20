const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios');

// local strategy - Login con credenciales propios (user and password)
passport.use(
    new LocalStrategy(
        // por default passport espera un usuario y contraseña
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {email: email}
                })
                // El usuario existe, password incorrecto
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'La contraseña es incorrecta'
                    })
                }
                // El email existe y el password es correcto
                return done(null, usuario);
            } catch (error) {
                // Ese usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);

// Serializar el usuario 
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});
// Deserialzar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;