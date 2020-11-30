const { body } = require('express-validator');


loginRequest = [
    body('email', 'El campo email es requerido').exists(),
    body('email','El campo email debe un formato valido').optional().isEmail(),
    body('password','El campo password es requerido').exists(),
    body('password','El password debe tener entre 6 a 12 caracteres').optional().isLength({min:6, max:12})
]

module.exports = loginRequest;