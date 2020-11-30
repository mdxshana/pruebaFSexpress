const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.validarTokenAdmins = async (req, res, next) => {

    let token = null

    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }

    jwt.verify(token, 'pruebaDesarrolladorFS', {
        ignoreExpiration: false
    }, async (err, encode) => {
        if (err) {
            return res.status(401).json({
                error: "El usuario no esta autenticado"
            })
        }
        req.user = encode.user;
        next();
    })

}