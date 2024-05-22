const {createProjectService,getProjectService,updateProjectService,deleteProjectService} = require("../services/projectService")
module.exports = {
    postCreateProject : async (req,res) => {
        let task = req.body
        let result = await createProjectService(task)
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
    getProject : async (req,res) => {
        let result = await getProjectService(req.query)
        if(result) {
            return res.status(200).json({
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
    putUpdateProject : async (req,res) => {
        let result = await updateProjectService(req.body)
        if(result) {
            return res.status(200).json({
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
    deleteProject : async (req,res) => {
        let result = await deleteProjectService(req.body)
        if(result) {
            return res.status(200).json({
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