const mongoose = require("mongoose");

const appliedBrithCertSchema = new mongoose.Schema({
  dob: {
    type: String,
     required: true,
   
  },
  childName:{
    required: true,
    type: String
  },
  hospitalName:{
    required: true,
    type: String
  },
  nameOfFather: {
    required: true,
    type: String
  },
  nameOfMother: {
    required: true,
    type: String
  },
  address: {
    required: true,
    type: String
  },
  state: {
    required: true,
    type: String
  },
  post: {
    required: true,
    type: String
  },
  brithLocation: {
    required: true,
    type: String
  },
  addressProofImage: {
    required: true,
    type:Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  certName:{
    type:String,
    required:true
  },
  certStatus:{
    type:Boolean,
    default:false,

  }
  
});

module.exports = new mongoose.model("appliedBrithCert", appliedBrithCertSchema);
