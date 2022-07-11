const Response = require("../helpers/Response")
const { validationResult } = require('express-validator');
const TaskModel = require("../models/TaskModel");
module.exports = {
    categoryList : (req,res) => {
        return res.status(200).json(new Response(200, {
            code: 0,
            data: TaskModel.listCatApproved
        })); 
    },
    list: async (req, res) => {
        try {
            /**
             * Validator 
             */
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(new Response(400, {
                    code: 1000,
                    data: errors.array()
                }));
            }
            /**
             * Model 
             */
            const model = await TaskModel.connection();
            const db = await model.db(process.env.DB_NAME);
            const collection = await db.collection(TaskModel.table);
            const data = await collection.find({
                TaskDeleted: false
            }).toArray();
            return res.status(200).json(new Response(200, {
                code: 0,
                data: data.length > 0 ? data : []
            }));

        } catch (err) {
            console.log(err);
            res.status(400).json(new Response(400, {
                code: 500,
                data: err.toString()
            }));
        }

    },
    detail: async (req, res) => {
        try {
            /**
             * Validator 
             */
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(new Response(400, {
                    code: 1000,
                    data: errors.array()
                }));
            }
            /**
             * Model 
             */

            const model = await TaskModel.connection();
            const db = await model.db(process.env.DB_NAME);
            const collection = await db.collection(TaskModel.table);
            const data = await collection.find({ TaskID: Number(req.params.id) }).toArray();
            return res.status(200).json(new Response(200, {
                code: 0,
                data: data.length > 0 ? data[0] : {}
            }));
        } catch (err) {
            res.status(400).json(new Response(400, {
                code: 500,
                data: err.toString()
            }));
        }
    },
    create: async (req, res) => {
        try {
            /**
             * Validator 
             */
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(new Response(400, {
                    code: 1000,
                    data: errors.array()
                }));
            }
            /**
             * Model 
             */
            const model = await TaskModel.connection();
            const db = await model.db(process.env.DB_NAME);
            const collection = await db.collection(TaskModel.table);
            const data = await collection.insertOne({
                TaskID: TaskModel.makeTaskID(),
                TaskDeleted: false,
                TaskCategory: req.body.TaskCategory,
                TaskName: req.body.TaskName,
                TaskCompleted: false,
                TaskCreated: new Date
            });
            return res.status(200).json(new Response(200, {
                code: 0,
                data: data
            }));
        } catch (err) {
            res.status(400).json(new Response(400, {
                code: 500,
                data: err.toString()
            }));
        }
    },
    update: async (req, res) => {
        try {
            /**
             * Validator 
             */
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(new Response(400, {
                    code: 1000,
                    data: errors.array()
                }));
            }
            /**
             * Model 
             */

            const model = await TaskModel.connection();
            const db = await model.db(process.env.DB_NAME);
            const collection = await db.collection(TaskModel.table);
            const data = await collection.updateOne({
                TaskID: Number(req.params.id)
            }, {
                $set: {
                    TaskCategory: req.body.TaskCategory,
                    TaskName: req.body.TaskName,
                    TaskCompleted: req.body.TaskCompleted ? true : false
                }
            });
            return res.status(200).json(new Response(200, {
                code: 0,
                data: data
            }));
        } catch (err) {
            res.status(400).json(new Response(400, {
                code: 500,
                data: err.toString()
            }));
        }
    },
    delete: async (req, res) => {
        try {
            /**
             * Validator 
             */
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(new Response(400, {
                    code: 1000,
                    data: errors.array()
                }));
            }
            /**
             * Model 
             */

            const model = await TaskModel.connection();
            const db = await model.db(process.env.DB_NAME);
            const collection = await db.collection(TaskModel.table);
            const data = await collection.updateOne({ TaskID: Number(req.params.id) }, {
                $set: {
                    TaskDeleted: true
                }
            });
            return res.status(200).json(new Response(200, {
                code: 0,
                data: data
            }));
        } catch (err) {
            res.status(400).json(new Response(400, {
                code: 500,
                data: err.toString()
            }));
        }
    }
}