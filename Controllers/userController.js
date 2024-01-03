const userModel = require("../Model/userModel");
const { json, response } = require("express");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

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
     return res.json({ message: "Phone number already exists", status: false });
    }

    const emailExists = await userModel.findOne({ email: email });

    if (emailExists) {
    return  res.json({ message: "Email already exists", status: false });
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
  return  res.json({ message: "Internal server error in sign up", status: false });
  }
};
