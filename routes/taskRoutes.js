const express = require('express')
var router = express.Router();
const taskController = require('../controllers/TaskController');
const newTaskRequest = require('../request/newTaskRequest');
const updateRequest = require('../request/updateRequest');
const jwtMiddleware = require('../middleware/JwtMiddleware')


router.get('/tasks', [
    jwtMiddleware.validarTokenAdmins
], taskController.index);

router.post('/tasks', [
    ...newTaskRequest,
    jwtMiddleware.validarTokenAdmins
], taskController.sotre);

router.put('/tasks/:taskId', [
    ...updateRequest,
    jwtMiddleware.validarTokenAdmins
], taskController.update);

router.delete('/tasks/:taskId', [
    jwtMiddleware.validarTokenAdmins
], taskController.destroy);


module.exports = router;