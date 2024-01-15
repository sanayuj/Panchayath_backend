const userModel = require("../Model/userModel");
const complaintModel = require("../Model/ComplaintModel");
const appliedCertModel = require("../Model/appliedCertModel");
const { json, response } = require("express");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const bcrypt = require("bcrypt");
const path = require("path");
const certRequirementModel = require("../Model/certRequirementModel");

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
      dom: req.body.dateOfBrith,
      nameOfFather: req.body.nameOfFather,
      nameOfMother: req.body.nameOfMother,
      address: req.body.permanentAddress,
      state: req.body.state,
      post: req.body.post,
      addressProofImage: extractImageUrl(req.file.path),
      brithLocation:req.body.locationOfBrith
    });

    await appliedCert.save()
    return res.json({message:"Form submitted successfully",status:true})
  } catch (error) {
console.log(error);
    res.json({ message: "Internal server error in apply certificate" ,status:false});
  }
};
