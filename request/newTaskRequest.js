const { body } = require('express-validator');


newTaskRequest = [
    body('name','El campo es requerido').exists(),
    body('priority', 'El campo prioridad es requerido').exists(),
    body('priority', 'La prioridad no es validad').optional().isIn(['Baja','Media','Alta']),
    body('date_expire','La fecha en la que caduca la tarea es requeridad').exists(),
    body('date_expire','La fecha de caducidad debe ser una fecha validad').optional().isDate(),
]

module.exports = newTaskRequest;