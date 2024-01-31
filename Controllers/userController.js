const { json, response } = require("express");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const bcrypt = require("bcrypt");
const path = require("path");
const userModel = require("../Model/userModel");
const complaintModel = require("../Model/ComplaintModel");
const appliedCertModel = require("../Model/appliedCertModel");
const certRequirementModel = require("../Model/certRequirementModel");
const projectModel = require("../Model/projectModel");
const marriageDetailsModel=require("../Model/marriageCertModel")
//JWT
const createToken = (id) => {
  return jwt.sign({ id }, "JWT", {
    expiresIn: maxAge,
  });
};

//SIGNUP
module.exports.Signup = async (req, res, next) => {
  const { username, phoneNumber, email, password, confirmpassword } = req.body;

  try {
    const phoneExists = await userModel.findOne({ phoneNumber: phoneNumber });

    if (phoneExists) {
      return res.json({
        message: "Phone number already exists",
        status: false,
      });
    }

    const emailExists = await userModel.findOne({ email: email });

    if (emailExists) {
      return res.json({ message: "Email already exists", status: false });
    }

    const newUser = new userModel({
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    });
    await newUser.save();
    const token = createToken(userModel._id);
    return res.json({ message: "Submited successfully", status: true, token });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in sign up",
      status: false,
    });
  }
};

//LOGIN
module.exports.login = async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await userModel.findOne({ phoneNumber });

    if (user.BlockStatus) {
      return res.json({
        message: "Admin temporay blocked you!",
        success: false,
      });
    }

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        const token = createToken(user._id);
        return res.json({
          message: "Login successfully",
          user: user,
          status: true,
          token,
        });
      } else {
        return res.json({ message: "Invaild password", status: false });
      }
    } else {
      return res.json({ message: "User not found", status: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server in login", status: false });
  }
};

//fetching user details
module.exports.userHeader = async (req, res, next) => {
  try {
    console.log(req.user, "**");
    const userDetails = req.user;
    return res.json({ userDetails: userDetails, status: true });
  } catch (error) {
    return res.json({ message: "Internal sever error", status: false });
  }
};

module.exports.Complaint = async (req, res, next) => {
  try {
    console.log(req.body);
    const extractImageUrl = (fullPath) => {
      const relativePath = path.relative("public/images", fullPath);
      const imageUrl = relativePath.replace(/\\/g, "/");
      return imageUrl;
    };

    const newComplaint = new complaintModel({
      username: req.body.username,
      phonenumber: req.body.phonenumber,
      imageUrl: extractImageUrl(req.file.path),
      wardnumber: req.body.wardNumber,
      email: req.body.email,
      complaintTopic: req.body.complaintTopic,
      complaintDescription: req.body.complaintDescription,
      ownerId: req.body.userId,
    });

    await newComplaint.save();
    return res.json({ message: "Form submitted successfully", status: true });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in complaint",
      status: false,
    });
  }
};

module.exports.fetchSelectedCertDetails = async (req, res, next) => {
  try {
    const certificateId = req.params.certId;
    const certificateDetails = await certRequirementModel.find({
      certificateId,
    });
    return res.json({ status: true, certDetails: certificateDetails });
  } catch (error) {
    return res.json({
      message: "Internal server error in fetech document details",
      status: false,
    });
  }
};

module.exports.applyCertificate = async (req, res, next) => {
  try {
    console.log(req.body, "$$$");
    const extractImageUrl = (fullPath) => {
      const relativePath = path.relative("public/images", fullPath);
      const imageUrl = relativePath.replace(/\\/g, "/");
      return imageUrl;
    };
    const appliedCert = new appliedCertModel({
      dob: req.body.dateOfBrith,
      childName: req.body.childName,
      hospitalName: req.body.hospitalName,
      nameOfFather: req.body.nameOfFather,
      nameOfMother: req.body.nameOfMother,
      address: req.body.permanentAddress,
      state: req.body.state,
      post: req.body.post,
      addressProofImage: extractImageUrl(req.file.path),
      brithLocation: req.body.locationOfBrith,
      userId: req.body.userId,
      certName: "Brith Certificate",
    });

    await appliedCert.save();
    return res.json({ message: "Form submitted successfully", status: true });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in apply certificate",
      status: false,
    });
  }
};

module.exports.fetchUserAppliedCert = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userCert = await appliedCertModel.find({ userId: userId });
    if (userCert) {
      return res.json({ data: userCert, status: true });
    } else {
      return res.json({ status: false, message: "No certificate found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in applied user cert",
      status: false,
    });
  }
};

module.exports.viewBrithCertDetails = async (req, res, next) => {
  try {
    const certificateId = req.params.certId;
    const certificateDetails = await appliedCertModel.find({
      _id: certificateId,
    });
    return res.json({ status: true, certDetails: certificateDetails });
  } catch (error) {
    return res.json({
      message: "Internal server error in fetech document details",
      status: false,
    });
  }
};

module.exports.viewComplaintStatus = async (req, res) => {
  try {
    const userId = req.params.Id;
    const complaintDetails = await complaintModel.find({ ownerId: userId });
    return res.json({
      message: "Success",
      status: true,
      Details: complaintDetails,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in view Complaint status",
      status: false,
    });
  }
};

module.exports.fetchAllProject = async (req, res) => {
  try {
    const data = await projectModel.find({});
    if (data) {
      return res.json({ message: "Project found", status: true, data });
    } else {
      return res.json({ message: "No Project found", status: false });
    }
  } catch (err) {
    return res.json({
      message: "Internal server error in fetch project",
      status: false,
    });
  }
};

module.exports.uploadMarriageDetails = async (req, res) => {
  try {
    const extractImageUrl = (fullPath) => {
      const relativePath = path.relative("public/images", fullPath);
      const imageUrl = relativePath.replace(/\\/g, "/");
      return imageUrl;
    };

    const wifeAadharPath=req.files.WifeAadharImage.map(file => file.path)
    const wifeImagePath=req.files.WifeImage.map(file => file.path)
    const husbandAadharPath=req.files.HusAadharImage.map(file => file.path)
    const husbandImagePath=req.files.HusbandImage.map(file => file.path)

    const newMarriageCertDetails = new marriageDetailsModel({
      userId: req.body.userId,
      dateOfMarriage:req.body.DateOfMarriage,
      placeOfMarriage:req.body.PlaceOfMarriage,
      husbandName:req.body.HusbandName,
      husbandNationality:req.body.HusbandNationality,
      husbandDOB:req.body.HusbandDateOfBrith,
      husbandAddress:req.body.HusbandAddress,
      husMaritalStatus:req.body.HusbandPreviousMaritalStatus,
      wifeName:req.body.WifeName,
      wifeNationality:req.body.WifeNationality,
      wifeDOB:req.body.WifeDateOfBrith,
      wifeAddress:req.body.WifeAddress,
      wifeMaritalStatus:req.body.WifePreviousMaritalStatus,
      wifeAadhar:extractImageUrl(wifeAadharPath[0]),
      wifeImage: extractImageUrl(wifeImagePath[0]),
      husbandAadhar:extractImageUrl( husbandAadharPath[0]), 
      husbandImage: extractImageUrl(husbandImagePath[0])
});

await newMarriageCertDetails.save()
return res.json({message:"Submitted Successfully",status:true})
  } catch (error) {
    console.log(error);
    res.json({ error, status: false });
  }
};


module.exports.fetchAllAppliedMarriageCert=async(req,res)=>{
  try{
    const userId=req.params.userId;
    const marriageCert=await marriageDetailsModel.find({userId:userId})
    if(marriageCert){
      return res.json({message:"Succes",status:true,data:marriageCert})
    }else{
      return res.json({message:"Failed",status:false})
    }

  }catch(error){
    return res.json({message:"Internal server error",status:false})
  }
}

module.exports.fetchSpecificMarriageCert=async(req,res)=>{
  try {
    const userId=req.params.userId;
    const certId=req.params.certId;
    const marriageCertDetails=await marriageDetailsModel.find({userId:userId,_id:certId})
    if(marriageCertDetails){
      return res.json({message:"Success",status:true,data:marriageCertDetails})
    }else{
      return res.json({message:"Failed to fetch",status:false})
    }
    
  } catch (error) {
    return res.json({message:"Internal server error in fetch marrriage cert",status:false})
  }
}