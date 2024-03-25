const express=require('express');
const { verifyToken } = require('../utils/verifyUser');
const {updateUser}=require("../controllers/user.controller")

const router=express.Router();

router.post('/update/:id',verifyToken,updateUser)

module.exports=router;