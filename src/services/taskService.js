const Task = require('../models/task')
const aqp = require ('api-query-params');
module.exports = {
    createTaskService : async (data) => {
        try {
            if(data.type === "EMPTY-TASK") {
                let result = await Task.create(data)
                return result
            }
            return null

        } catch (error) {
            console.log(">>>> Error while create Task : ",error)
            return null
        }
    },
    getTaskService : async (queryString) => {
        try {
            let {filter, limit} = aqp(queryString);
            delete filter.page
            let offset = (queryString.page - 1) * limit
            let result = await Task
                .find(filter)
                .skip(offset)
                .limit(limit)
                .exec()
            return result
        } catch (error) {
            console.log(">>>> Error while get Task : ",error)
            return null
        }
    },
    updateTaskService : async (data) => {
        try {
                let result = await Task.updateOne({_id : data.id},{...data})
                return result

        } catch (error) {
            console.log(">>>> Error while update Task : ",error)
            return null
        }
    },
    deleteTaskService : async (data) => {
        try {
            let result = await Task.deleteById(data.id)
            return result
        } catch (error) {
            console.log(">>>> Error while delete Task : ",error)
            return null
        }
    }
}
