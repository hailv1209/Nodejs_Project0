const express = require('express')
const router = express.Router()
const {getHomepage, getAbc, getLvh, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser} = require('../controllers/homeController')

router.get('/',getHomepage);

router.get('/abc',getAbc);

router.get('/lvh', getLvh);

router.get('/create', getCreatePage);
router.get('/update/:userId',getUpdatePage);

router.post('/create-user',postCreateUser);

router.post('/update-user/:userId',postUpdateUser);



module.exports = router;