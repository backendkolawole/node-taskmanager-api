const Task = require('../models/Tasks')
const asyncWrapper = require('../middleware/async-wrapper')
const {createCustomError} = require('../errors/custom-error')

const createTask = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
        // res.send('Task has been created')
    }
) 

const getAllTasks = asyncWrapper(async (req, res) => {
        
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
        
    }
) 

const getTask = asyncWrapper(async (req, res, next) => {
            const { id } = req.params
            const task = await Task.findById(id)
            if (!task) {
                return next(createCustomError(`No task with id: ${id}`, 404))

            }
            res.status(200).json({ task })
    }
) 

const updateTask = asyncWrapper(async (req, res, next) => {
            const { id } = req.params
            const task = await Task.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true })
            res.status(200).json({ task })
            if (!task) {
                return next(createCustomError(`No task with id: ${id}`, 404))

            }
    }

) 

const deleteTask = asyncWrapper(async (req, res, next) => {
            const { id } = req.params
            const task = await Task.findOneAndDelete({ _id: id })
            if (!task) {
                return next(createCustomError(`No task with id: ${id}`, 404))

            }
            res.status(200).json({ task })
    }
) 


module.exports = {createTask, getAllTasks, getTask, updateTask, deleteTask}