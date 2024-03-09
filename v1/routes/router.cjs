const express = require('express')


const { login, logout, register,getUser,updateUser } = require('../controller/ApiController.cjs')
const verifyToken = require("../controller/Middleware/verifyToken.cjs");
const router = express.Router()


router.post('/register',register)

router.post('/login',login)

router.get('/logout', logout)
router.get('/api/user', verifyToken, getUser)
router.put('/api/updateProfile', verifyToken, updateUser)











module.exports =  router