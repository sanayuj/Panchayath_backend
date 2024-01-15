
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require("../Model/adminModel");
const userModel = require("../Model/userModel");
const certificateModel=require("../Model/certificateModel")
const certRequirementModel=require("../Model/certRequirementModel")
const createAdminToken = (id) => {
  return jwt.sign({ id }, "adminJWT", {
    expiresIn: maxAge,
  });
};

module.exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (admin) {
      const adminAuth = await bcrypt.compare(password, admin.password);
      if (adminAuth) {
        const adminToken = createAdminToken(admin._id);
        return res.json({
          message: "login successfully",
          status: true,
          token: adminToken,
          adminDetails: admin,
        });
      }
      return res.json({ message: "Invaild password", status: false });
    }
    return res.json({ message: "Admin not found", status: false });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", status: false });
  }
};

module.exports.adminHeader = async (req, res, next) => {
  try {
    const user = req.admin;
    return res.json({ adminDetails: user, status: false });
  } catch (error) {
    return res.json({
      message: "Internal server error in fetech admin details",
      status: false,
    });
  }
};

module.exports.userList = async (req, res, next) => {
  try {
    const userDetails = await userModel.find({});
    if (userDetails) {
      return res.json({ userDetails, status: true });
    } else {
      return res.json({ message: "User not found", status: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error in list user", status: false });
  }
};

module.exports.blockuser=async(req,res,next)=>{

try{
const userId = req.params.userId;
console.log(userId,"Hiii");
    const userDetails = await userModel.findById(userId);
    console.log(userDetails,"===");

    userDetails.BlockStatus = !userDetails.BlockStatus;
    await userDetails.save();

    if (userDetails.BlockStatus) {
      return res.json({
        message: "User blocked successfully",
        status: userDetails.BlockStatus,
      });
    } else {
      return res.json({
        message: "User unblocked successfully",
        status: userDetails.BlockStatus,
      });
    }
}catch(error){
  console.log(error);
  return res.json({message:"Internal server in block user",status:false})
}
}


module.exports.addCertificate=async(req,res,next)=>{
  try{
console.log(req.body);
const newCertificate=new certificateModel({
  certificateName:req.body.certName
})
await newCertificate.save()
return res.json({message:"Certificate Added successfully",status:true})
  }catch(error){
    res.json({message:"Internal server error in add certificate",status:false})
  }
}

module.exports.addCertificateRequirement=async(req,res,next)=>{
  const {certRequirement,certificateId,certificateName}=req.body
  try{
    const certRequirementDetails=new certRequirementModel({
      certificateName:certificateName,
      certificateId:certificateId,
      Requirements:certRequirement
    })
    await certRequirementDetails.save()
    return res.json({message:"Form submitted successfully",status:true})
  }catch(error){
    return res.json({message:"Internal server error in add requirement",status:false})
  }
}

module.exports.fetchAppliedCertificate=async(req,res,next)=>{
  try{

  }catch(error){
    res.json({message:"Internal server error in fetch applied certificate",status:false})
  }
}