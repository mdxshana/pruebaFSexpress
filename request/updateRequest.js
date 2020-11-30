const { body } = require('express-validator');


newTaskRequest = [
    body('priority', 'La prioridad no es validad').optional().isIn(['Baja','Media','Alta']),
    body('date_expire','La fecha de caducidad debe ser una fecha validad').optional().isDate(),
    body('status','El estado de la tarea debe ser un  valor boleano').optional().isBoolean()
]

module.exports = newTaskRequest;