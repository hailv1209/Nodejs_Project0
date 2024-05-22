const {createTaskService,getTaskService,updateTaskService,deleteTaskService} = require('../services/taskService')
module.exports = {
    postCreateTask : async (req,res) => {
        let result = await createTaskService(req.body)
        if(result) {
            return res.status(201).json({
                error : 0,
                data : result
            })
        }else {
            return res.status(500).json({
                error : 1,
                data : result
            })
        }
    },
    getTask : async (req,res) => {
        let result = await getTaskService(req.query)
        if(result) {
            return res.status(201).json({
                error : 0,
                data : result
            })
        }else {
            return res.status(500).json({
                error : 1,
                data : result
            })
        }
    },
    putUpdateTask : async (req,res) => {
        let result = await updateTaskService(req.body)
        if(result) {
            return res.status(201).json({
                error : 0,
                data : result
            })
        }else {
            return res.status(500).json({
                error : 1,
                data : result
            })
        }
    },
    deleteTask : async (req,res) => {
        let result = await deleteTaskService(req.body)
        if(result) {
            return res.status(201).json({
                error : 0,
                data : result
            })
        }else {
            return res.status(500).json({
                error : 1,
                data : result
            })
        }
    }
}