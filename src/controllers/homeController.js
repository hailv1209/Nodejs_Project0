const connection = require("../config/database");
const {getAllUsers, updatedUserById} = require("../services/CRUD")


const getHomepage = async (req, res) => {
  let results = await getAllUsers();
  return res.render("home.ejs", { listUsers : results });
};

const getAbc = (req, res) => {
  res.send("check abc");
};

const getLvh = (req, res) => {
  // res.send('<h1>Hello World backe end with lvh </h1>')
  res.render("sample.ejs");
};

const postCreateUser = async (req, res) => {
  // console.log("req.body : ", req.body)

  // let email = req.body.email;
  // let name = req.body.name;
  // let city = req.body.city;

  let { email, name, city } = req.body;
  //     INSERT INTO Users (email, name, city)
  // VALUES ('test', 'lvh', 'da nang');

//   connection.query(
//     `INSERT INTO
//       Users (email,name,city)
//       VALUES (?,?,?)`,
//     [email, name, city],
//     function (err, results) {
//       console.log(results);
//       res.send("Created user successed!");
//     }
//   );

  let [results, field] = await connection.query(
    `INSERT INTO
    Users (email,name,city)
    VALUES (?,?,?)`,
    [email, name, city]
  );
      console.log(">>> Results = ", results);
    res.send("Created a new Person Success !")

};


const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async  (req,res) => {

  let [results, field] = await connection.query(
    `select * from Users where id = ${req.params.userId}`)

    let user = results && results.length > 0 ? results[0] : {}
    res.render("edit.ejs",{User : user})
 
}

const postUpdateUser = async (req, res) => {

  let { email, name, city } = req.body;
  let userId = req.params.userId;

   updatedUserById(email, name, city, userId)
    res.redirect("/")

};


module.exports = {
  getHomepage,
  getAbc,
  getLvh,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser
};
