const express = require("express");
const routerAPI = express.Router();

const {getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileAPI, postUploadMultipleFileAPI} = require("../controllers/apiController")
const {postCreateCustomer,postCreateArrayCustomer,getCustomer,putUpdateCustomer,deleteACustomer,deleteArrayCustomer} = require('../controllers/customerController')
const {postCreateProject,getProject,putUpdateProject,deleteProject} = require('../controllers/projectController')
const {postCreateTask,getTask,putUpdateTask,deleteTask} = require('../controllers/taskControllers')

routerAPI.get("/users", getUsersAPI);

routerAPI.post("/users", postCreateUserAPI);

routerAPI.put("/users/:userId",putUpdateUserAPI);

routerAPI.delete("/users",deleteUserAPI);


routerAPI.post("/file", postUploadSingleFileAPI)

routerAPI.post("/files", postUploadMultipleFileAPI)

routerAPI.post('/customers', postCreateCustomer)
routerAPI.post('/customers-many', postCreateArrayCustomer)

routerAPI.get('/customers', getCustomer)
routerAPI.put('/customers', putUpdateCustomer)

routerAPI.delete('/customer', deleteACustomer)
routerAPI.delete('/customers-many', deleteArrayCustomer)


routerAPI.get('/info', (req,res) => {
    return res.status(200).json({
        data : req.query
    })
})
routerAPI.get('/info/:name/:address', (req,res) => {
    console.log(">>>> check Params : ",req.params)
    return res.status(200).json({
        data : req.params
    })
})


// api Project
routerAPI.post('/projects', postCreateProject)
routerAPI.get('/projects', getProject)
routerAPI.put('/projects', putUpdateProject)
routerAPI.delete('/projects', deleteProject)

// api Task
routerAPI.post('/tasks', postCreateTask)
routerAPI.get('/tasks', getTask)
routerAPI.put('/tasks', putUpdateTask)
routerAPI.delete('/tasks', deleteTask)



module.exports = routerAPI;
