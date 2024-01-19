const express=require("express");
const { adminLogin, adminHeader, userList, blockuser, addCertificate, addCertificateRequirement, fetchAppliedCertificate, fetchAppliedSpecificCert, verifyCertificate, getAllComplaints, fetchSpecificComplaint, changeComplantStatus } = require("../Controllers/adminControllers");
const adminAuth = require("../Middleware/adminAuth");
const { fetchAllCertificate } = require("../Controllers/certificateController");
const router=express.Router()



//POST METHOD


router.post("/login",adminLogin)
router.post('/blockuser/:userId',adminAuth,blockuser)
router.post("/addcertificate",adminAuth,addCertificate)
router.post("/addrequirement",adminAuth,addCertificateRequirement)
router.post("/verifyCertificate/:userId/:certId",adminAuth,verifyCertificate)

//GET METHOD

router.get("/adminHeader",adminAuth,adminHeader)
router.get("/userList",adminAuth,userList)
router.get("/fetchAllCertificate",adminAuth,fetchAllCertificate)
router.get("/fetchAppliedCert",adminAuth,fetchAppliedCertificate)
router.get("/fetchSpecificCert/:Id",adminAuth,fetchAppliedSpecificCert)
router.get("/fetchallComplaints",adminAuth,getAllComplaints)
router.get("/fetchSpecificComplaint/:id",adminAuth,fetchSpecificComplaint)
router.get("/changecomplaintstatus/:id",adminAuth,changeComplantStatus)
module.exports = router;