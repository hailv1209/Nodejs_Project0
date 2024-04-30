const connection = require("../config/database");
const {getAllUsers, updatedUserById, getUserById, deletedUserById} = require("../services/CRUD")
const User = require('../models/user')

const getHomepage = async (req, res) => {
  let results = await User.find({});
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
  let { email, name, city } = req.body;


    await User.create({
      name,
      email,
      city
    })
    res.send("Created a new Person Success !")

};


const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async  (req,res) => {

    let user = await getUserById(req.params.userId)
    res.render("edit.ejs",{User : user})
 
}

const postUpdateUser = async (req, res) => {
  let { email, name, city } = req.body;
  let userId = req.params.userId;

   await updatedUserById(email, name, city, userId)
    res.redirect("/")

};

const getDeleteUser = async (req,res) => {
  let user = await getUserById(req.params.userId)
  res.render('delete.ejs', {User : user})
}

const postDeleteUser = async (req,res) => {
  await deletedUserById(req.params.userId)
  res.redirect('/')
}

module.exports = {
  getHomepage,
  getAbc,
  getLvh,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  getDeleteUser,
  postDeleteUser
};
