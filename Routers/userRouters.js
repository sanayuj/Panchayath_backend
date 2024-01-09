const express=require("express")
const router=express.Router()
const { Signup, login, userHeader, Complaint} =require("../Controllers/userController")
const userAuth = require("../Middleware/userAuth")
const createMulterInstance = require("../Middleware/multer")
const uploadComplaint=createMulterInstance("Complaints")


router.post("/signup",Signup)
router.post("/login",login)
router.post("/sendcomplaint",userAuth,uploadComplaint.single("image"),Complaint)



router.get("/userheader",userAuth,userHeader)

module.exports = router;