require('dotenv').config()

const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const express = require('express')
const mongoose = require('mongoose')
const connection = require('./config/database')

const app = express() // create app
const port = process.env.PORT || 8888 ;// assign port
const hostname = process.env.HOST_NAME;


//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended:true}))//for form data


//config template engine
configViewEngine(app);

//get route
app.use('/',webRoutes)



;(async () => {
// test connection
try {
  await connection();
  app.listen(port, hostname, () => {
    console.log(`Backend zero app listening on port ${port}`)
  })
} catch (error) {
  console.log('Error connect to db : ',error);
}

})()


