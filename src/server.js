require("dotenv").config();

const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const routerAPI = require("./routes/api");
const fileUpload = require("express-fileupload");

const express = require("express");
const connection = require("./config/database");
const { MongoClient } = require("mongodb");

const app = express(); // create app
const port = process.env.PORT || 8888; // assign port
const hostname = process.env.HOST_NAME;

//config file upload
// default options
app.use(fileUpload());

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); //for form data

//config template engine
configViewEngine(app);

//get route
app.use("/", webRoutes);

app.use("/v1/api/", routerAPI);
(async () => {
  // test connection
  try {
    // using mongoose
    await connection();

    // using mongodb driver
    // Connection URL
    // const url = process.env.DB_HOST_WITH_DRIVER;
    // const client = new MongoClient(url);

    // // Database Name
    // const dbName = process.env.DB_NAME;

    // await client.connect();
    // console.log("Connected successfully to server");

    // const db = client.db(dbName);
    // const collection = db.collection("customers");




    // {
    //   id : 1,
    //   city : "danang",
    //   district : "sontra",
    //   country : {
    //     name : "VietNam",
    //     zipCode : 1234
    //   }
    // },
    // {
    //   id : 2,
    //   city : "hanoi",
    //   district : "cam",
    //   country : {
    //     name : "VietNam",
    //     zipCode : 1234
    //   }
    // }

    // // await collection.insertOne({"name" : "Abcdef"})
    // await collection.insertOne(
    //   {
    //     "address" : 
    //     [1,2]
    //   }
    // )
    // let a = await collection.findOne({ address : 'hanoi'})
    // console.log(">>>> find  : ",a)

    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log("Error connect to db : ", error);
  }
})();
