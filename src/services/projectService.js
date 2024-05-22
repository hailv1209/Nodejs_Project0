const Project = require('../models/project')
const aqp = require ('api-query-params');
module.exports = {
    createProjectService : async (project) => {
        try {
            if(project.type === "EMPTY-PROJECT") {
                let result = await Project.create(project)
                return result
            }
            if(project.type === "ADD-USERS"){
                let myProject = await Project.findById(project.projectId).exec();
                for(let i = 0; i < project.usersArr.length ; i++) {
                    myProject.usersInfor.push(project.usersArr[i]);
                }
                let newResult = await myProject.save()  
                return newResult;
            }
            if(project.type === "DELETE-USERS"){
                let myProject = await Project.findById(project.projectId).exec();
                for(let i = 0; i < project.usersArr.length ; i++) {
                    myProject.usersInfor.pull(project.usersArr[i]);
                }
                let newResult = await myProject.save()  
                return newResult;
            }
            if(project.type === "ADD-TASKS"){
                let myProject = await Project.findById(project.projectId).exec();
                for(let i = 0; i < project.taskArr.length ; i++) {
                    myProject.tasks.push(project.taskArr[i]);
                }
                let newResult = await myProject.save()  
                return newResult;
            }
            return null

        } catch (error) {
            console.log(">>>> Error while create project : ",error)
            return null
        }

    },
    getProjectService : async (queryString) => {
        try {
            const page = queryString.page
            const {filter,limit,population} = aqp(queryString);
            delete filter.page
            let offset = (page - 1)* limit
            let result = await Project
            .find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .exec()
            return result
        } catch (error) {
            console.log(">>>> Error while get project : ",error)
            return null
        }
    },
    updateProjectService : async (data) => {
        try {
            let result = await Project.updateOne(
                { _id: data.id },
                {
                  name: data.name,
                  description: data.description,
                }
              );
              return result;
        } catch (error) {
            console.log(">>>> Error while update project : ",error)
            return null  
        }
    },
    deleteProjectService : async (data) => {
        try {
            let result = await Project.deleteById(data.id)
              return result;
        } catch (error) {
            console.log(">>>> Error while update project : ",error)
            return null  
        }
    }
}