const express=require("express")
const router=express.Router()
const { Signup} =require("../Controllers/userController")
router.post("/Signup",Signup)

module.exports = router;