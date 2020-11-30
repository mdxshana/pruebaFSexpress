const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const User = require('../models/User');


let taskController = {
    index: async function (req, res, next){
        try{
            let user = await User.findById(req.user._id).populate('task');
            return res.json({tasks: user.task})
        }catch(err){
            return res.status(500).json({
                err
            })
        }
    },
    sotre: async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            let body = req.body;
            const task = await Task.create({
                ...body,
                user: req.user._id
            });
            await task.save();
            const userById = await User.findById(req.user._id);
            userById.task.push(task);
            await userById.save();
            return res.json(task)
        } catch (err) {
            return res.status(500).json({
                err
            })
        }
    },
    update: async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            let body = req.body;
            let task = await Task.findByIdAndUpdate(req.params.taskId,body, {new: true});
            return res.json(task)
        } catch (err) {
            return res.status(500).json({
                err
            })
        }
    },

    destroy: async function (req, res, next) {
        try {
            let body = req.body;
            let task = await Task.findByIdAndDelete(req.params.taskId,body);
            return res.json(task)
        } catch (err) {
            return res.status(500).json({
                err
            })
        }
    }
}


module.exports = taskController;