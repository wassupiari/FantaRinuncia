const express = require('express')


const { login, logout, register,getUser,updateUser,jsonFile } = require('../controller/ApiController.cjs')
const verifyToken = require("../controller/Middleware/verifyToken.cjs");
const router = express.Router()


router.post('/register',register)

router.post('/login',login)

router.get('/logout', logout)
router.get('/api/user', verifyToken, getUser)
router.put('/api/updateProfile', verifyToken, updateUser)
router.get('/api/people',jsonFile)










module.exports =  router