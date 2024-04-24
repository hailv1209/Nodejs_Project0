require('dotenv').config()

const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const express = require('express')


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


app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})