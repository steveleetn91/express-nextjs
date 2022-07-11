const express = require('express');
const router = express.Router();
const TaskController = require("../application/controllers/TaskController");
const task = require('../application/validators/task');
/**
 * Categories 
 */
 router.get('/category', function (req, res, next) {
    return TaskController.categoryList(req, res);
});
/**
 * List 
 */
router.get('/',task.list(), function (req, res, next) {
    return TaskController.list(req, res);
});
/**
 * Detail 
 */
 router.get('/:id',task.detail(), function (req, res, next) {
    return TaskController.detail(req, res);
});
/**
 * Create 
 */
router.post('/',task.create(), function (req, res, next) {
    return TaskController.create(req, res);
});
/**
 * Update 
 */
router.put('/:id',task.update(), function (req, res, next) {
    return TaskController.update(req, res);
});
/**
 * Delete 
 */
router.delete('/:id',task.delete(), function (req, res, next) {
    return TaskController.delete(req, res);
});

module.exports = router;
