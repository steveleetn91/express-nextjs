const { check, oneOf } = require('express-validator');
const TaskModel = require('../models/TaskModel');
module.exports = {
    list: () => {
        return [];
    },
    create: () => {
        return [
            check("TaskName").isLength({ min: 1, max: 150 }).trim().escape()
            .withMessage("Task name need minimum 1 character and maximum 150 characters"),
            check("TaskCategory")
                .isLength({ min: 1, max: 150 }).trim().escape()
                .withMessage("Task category need minimum 1 character and maximum 150 characters")
                .isIn(TaskModel.listCatApproved)
                .withMessage("Task category invalid")
        ];
    },
    update: () => {
        return [
            check("TaskName").isLength({ min: 1, max: 150 }).trim().escape()
            .withMessage("Task name need minimum 1 character and maximum 150 characters"),
            check("TaskCategory")
                .isLength({ min: 1, max: 150 })
                .withMessage("Task category need minimum 1 character and maximum 150 characters")
                .isIn(TaskModel.listCatApproved)
                .withMessage("Task category invalid")
        ];
    },
    detail: () => {
        return [];
    },
    delete: () => {
        return [];
    }
}