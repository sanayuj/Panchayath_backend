const express=require("express")
const router=express.Router()
const { Signup, login, userHeader, Complaint, fetchSelectedCertDetails, applyCertificate} =require("../Controllers/userController")
const userAuth = require("../Middleware/userAuth")
const createMulterInstance = require("../Middleware/multer")
const { fetchAllCertificate } = require("../Controllers/certificateController")
const uploadComplaint=createMulterInstance("Complaints")
const uploadAddressProof=createMulterInstance("AddressProof")


router.post("/signup",Signup)
router.post("/login",login)
router.post("/sendcomplaint",userAuth,uploadComplaint.single("image"),Complaint)
router.post("/applyCertificate",userAuth,uploadAddressProof.single("addressProof"),applyCertificate)


router.get("/userheader",userAuth,userHeader)
router.get("/fetchAllCertificate",fetchAllCertificate)
router.get("/fetchCertRequiredDetails/:certId",fetchSelectedCertDetails)

module.exports = router;