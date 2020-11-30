const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



let authController = {
    login: async function (req, res, next) {
        try {
            let body = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            let user = await User.findOne({ email: body.email });
            if (!user) {
                return res.status(400).json({
                    err: {
                        message: "Usuario o contraseña incorrectos"
                    }
                })
            }
            if (!bcrypt.compareSync(body.password, user.password)) {
                return res.status(400).json({
                    err: {
                        message: "Usuario o contraseña incorrectos"
                    }
                });
            }
            let userRes = user.toObject()
            delete userRes.task;
            let token = jwt.sign({
                user: userRes,
            }, 'pruebaDesarrolladorFS', {
                expiresIn: '48h'
            })
            return res.json({
                user: userRes,
                token,
            })
        } catch (err) {
            return res.status(500).json({
                err
            });
        }

    },
    register: async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            let body = req.body;
            let { nombre, email, password } = body;
            let user = new User({
                nombre,
                email,
                password: bcrypt.hashSync(password, 10),
            });
            let userSave = await user.save();
            return res.json({
                user: userSave
            });
        } catch (err) {
            return res.status(500).json({
                err
            });
        }
    },
    me: async function (req, res, next) {
        return res.json({
            user: req.user
        })
    }
}

module.exports = authController;


