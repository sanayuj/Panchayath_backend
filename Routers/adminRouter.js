const express=require("express");
const { adminLogin, adminHeader, userList, blockuser, addCertificate, addCertificateRequirement, fetchAppliedCertificate } = require("../Controllers/adminControllers");
const adminAuth = require("../Middleware/adminAuth");
const { fetchAllCertificate } = require("../Controllers/certificateController");
const router=express.Router()



//POST METHOD


router.post("/login",adminLogin)
router.post('/blockuser/:userId',adminAuth,blockuser)
router.post("/addcertificate",adminAuth,addCertificate)
router.post("/addrequirement",adminAuth,addCertificateRequirement)


//GET METHOD

router.get("/adminHeader",adminAuth,adminHeader)
router.get("/userList",adminAuth,userList)
router.get("/fetchAllCertificate",adminAuth,fetchAllCertificate)
router.get("/fetchAppliedCert",adminAuth,fetchAppliedCertificate)


module.exports = router;