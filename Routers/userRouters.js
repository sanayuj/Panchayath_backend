const express = require("express");
const router = express.Router();
const {
  Signup,
  login,
  userHeader,
  Complaint,
  fetchSelectedCertDetails,
  applyCertificate,
  fetchUserAppliedCert,
  viewBrithCertDetails,
  viewComplaintStatus,
  fetchAllProject,
  uploadMarriageDetails,
  fetchAllAppliedMarriageCert,
  fetchSpecificMarriageCert,
} = require("../Controllers/userController");
const userAuth = require("../Middleware/userAuth");
const createMulterInstance = require("../Middleware/multer");
const { fetchAllCertificate } = require("../Controllers/certificateController");
const uploadComplaint = createMulterInstance("Complaints");
const uploadAddressProof = createMulterInstance("AddressProof");
const marriageFormDetails = createMulterInstance("MarriageForm");

router.post("/signup", Signup);
router.post("/login", login);
router.post(
  "/sendcomplaint",
  userAuth,
  uploadComplaint.single("image"),
  Complaint
);
router.post(
  "/applyCertificate",
  userAuth,
  uploadAddressProof.single("addressProof"),
  applyCertificate
);

router.post(
  "/sendMarriageCertDetails",
  userAuth,
  marriageFormDetails.fields([
    { name: "HusAadharImage", maxCount: 1 },
    { name: "HusbandImage", maxCount: 1 },
    { name: "WifeAadharImage", maxCount: 1 },
    { name: "WifeImage", maxCount: 1 },
  ]),
  uploadMarriageDetails
);

router.get("/userheader", userAuth, userHeader);
router.get("/fetchAllCertificate", fetchAllCertificate);
router.get("/fetchCertRequiredDetails/:certId", fetchSelectedCertDetails);
router.get("/fetchUserAppliedCert/:userId", userAuth, fetchUserAppliedCert);
router.get("/fetchBrithCert/:certId", userAuth, viewBrithCertDetails);
router.get("/viewcomplantStatus/:Id", userAuth, viewComplaintStatus);
router.get("/fetchprojectDetails", fetchAllProject);
router.get("/fetchmarriageCert/:userId",userAuth,fetchAllAppliedMarriageCert)
router.get("/fetchspecificmarriagecert/:certId/:userId",userAuth,fetchSpecificMarriageCert)

module.exports = router;
