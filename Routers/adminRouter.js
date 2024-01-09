const express=require("express");
const { adminLogin, adminHeader, userList, blockuser } = require("../Controllers/adminControllers");
const adminAuth = require("../Middleware/adminAuth");
const router=express.Router()



//POST METHOD


router.post("/login",adminLogin)
router.post('/blockuser/:userId',adminAuth,blockuser)


//GET METHOD

router.get("/adminHeader",adminAuth,adminHeader)
router.get("/userList",adminAuth,userList)



module.exports = router;