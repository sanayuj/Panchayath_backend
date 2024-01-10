const express=require("express")
const router=express.Router()
const { Signup, login, userHeader, Complaint, fetchSelectedCertDetails} =require("../Controllers/userController")
const userAuth = require("../Middleware/userAuth")
const createMulterInstance = require("../Middleware/multer")
const { fetchAllCertificate } = require("../Controllers/certificateController")
const uploadComplaint=createMulterInstance("Complaints")


router.post("/signup",Signup)
router.post("/login",login)
router.post("/sendcomplaint",userAuth,uploadComplaint.single("image"),Complaint)



router.get("/userheader",userAuth,userHeader)
router.get("/fetchAllCertificate",fetchAllCertificate)
router.get("/fetchCertRequiredDetails/:certId",fetchSelectedCertDetails)

module.exports = router;