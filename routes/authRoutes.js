const express = require('express')
var router = express.Router();
const authControler = require('../controllers/AuthController');
const registerRequest = require('../request/registerRequest');
const loginRequest = require('../request/loginRequest');
const jwtMiddleware = require('../middleware/JwtMiddleware')

router.post('/login', loginRequest ,authControler.login);
router.post('/register', registerRequest ,authControler.register);
router.get('/me',jwtMiddleware.validarTokenAdmins, authControler.me);

module.exports = router;