const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require("../Model/adminModel");
const userModel = require("../Model/userModel");
const certificateModel = require("../Model/certificateModel");
const certRequirementModel = require("../Model/certRequirementModel");
const appliedBrithCertModel = require("../Model/appliedCertModel");
const complaintModel = require("../Model/ComplaintModel");
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

module.exports.blockuser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(userId, "Hiii");
    const userDetails = await userModel.findById(userId);
    console.log(userDetails, "===");

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
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server in block user",
      status: false,
    });
  }
};

module.exports.addCertificate = async (req, res, next) => {
  try {
    console.log(req.body);
    const newCertificate = new certificateModel({
      certificateName: req.body.certName,
    });
    await newCertificate.save();
    return res.json({
      message: "Certificate Added successfully",
      status: true,
    });
  } catch (error) {
    res.json({
      message: "Internal server error in add certificate",
      status: false,
    });
  }
};

module.exports.addCertificateRequirement = async (req, res, next) => {
  const { certRequirement, certificateId, certificateName } = req.body;
  try {
    const certRequirementDetails = new certRequirementModel({
      certificateName: certificateName,
      certificateId: certificateId,
      Requirements: certRequirement,
    });
    await certRequirementDetails.save();
    return res.json({ message: "Form submitted successfully", status: true });
  } catch (error) {
    return res.json({
      message: "Internal server error in add requirement",
      status: false,
    });
  }
};

module.exports.fetchAppliedCertificate = async (req, res, next) => {
  try {
    const appliedBrithCert = await appliedBrithCertModel.find({}).populate({
      path: "userId",
      model: "user",
      select: "userName email username",
    });
    console.log(appliedBrithCert, ")))");
    if (appliedBrithCert) {
      return res.json({ data: appliedBrithCert, status: true });
    }
    return res.json({ message: "No certificate details" });
  } catch (error) {
    res.json({
      message: "Internal server error in fetch applied certificate",
      status: false,
    });
  }
};

module.exports.fetchAppliedSpecificCert = async (req, res, next) => {
  try {
    const certId = req.params.Id;
    const certDetails = await appliedBrithCertModel
      .findOne({ _id: certId })
      .populate({
        path: "userId",
        model: "user",
        select: "userName email username",
      });
    if (certDetails) {
      return res.json({ certificateDetails: certDetails, status: true });
    } else {
      return res.json({ message: "No Certificate Found!", status: false });
    }
  } catch (error) {
    res.json({ message: "Internal server error in fetch cert", status: false });
  }
};

module.exports.verifyCertificate = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const certId = req.params.certId;
    const specificCert = await appliedBrithCertModel.find({
      userId: userId,
      _id: certId,
    });
    console.log(specificCert, "**");

    if (specificCert) {
      await appliedBrithCertModel.updateOne(
        { _id: certId },
        { $set: { certStatus: true } }
      );
    }
    return res.json({
      message: "Verified successfully",
      status: true,
      details: specificCert,
    });
  } catch (error) {
    return res.json({
      message: "Internal server in verify cerificate",
      status: false,
    });
  }
};

module.exports.getAllComplaints=async(req,res)=>{
  try{
    const complaintDetails=await complaintModel.find({})
    if(complaintDetails){
      return res.json({message:"Success",Data:complaintDetails,status:true})
    }else{
      return res.json({message:"No Complaint Found",status:false})
    }

  }catch(error){
    return res.json({message:"Internal server error in get all complaints",status:false})
  }
}


module.exports.fetchSpecificComplaint=async(req,res)=>{
  try{
    const complaintId=req.params.id
    const complaintData=await complaintModel.find({_id:complaintId})
    if(complaintData){
      return res.json({message:"Success",data:complaintData,status:true})
    }else{
      return res.json({message:"Unable to fetch",status:false})
    }
  }catch(error){
    return res.json({message:"Internal server error in fetch specific complaint",status:false})
  }
}