const User = require("../models/user");

const {uploadSingleFile, uploadMultipleFiles} = require("../services/fileService")





const getUsersAPI = async (req, res) => {
  let results = await User.find({});

  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
    // let { email, name, city } = req.body;
    let email = req.body.email
    let name = req.body.name
    let city = req.body.city
  
      let user = await User.create({
        name : name,
        email : email,
        city : city
      })
      return res.status(201).json({
        errorCode: 0,
        data: user,
      });
  
  };


  const putUpdateUserAPI = async (req, res) => {
    // let { email, name, city } = req.body;
    let email = req.body.email
    let name = req.body.name
    let city = req.body.city
    let userId = req.params.userId;
  
    let user =  await User.updateOne({_id : userId},{email : email, name : name, city : city})
     return res.status(200).json({
        errorCode: 0,
        data: user,
      });
  
  };

  const deleteUserAPI = async (req,res) => {
    const userId = req.body.userId;
    let user = await User.deleteOne({_id : userId})
    return res.status(200).json({
        errorCode: 0,
        data: user,
      });
  }

const postUploadSingleFileAPI = async (req,res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let result = await uploadSingleFile(req.files.image)
  console.log(">>>> check result : ", result)

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
}

const postUploadMultipleFileAPI = async (req,res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let fileList = [
    req.files.image1,
    req.files.image2,
    req.files.image3
  ]
  let result = await uploadMultipleFiles(fileList)
  console.log(">>>> check result : ", result)

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
}

module.exports = {
  getUsersAPI, postCreateUserAPI,
  putUpdateUserAPI, deleteUserAPI,
  postUploadSingleFileAPI, postUploadMultipleFileAPI
};
