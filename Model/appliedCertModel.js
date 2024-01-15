const mongoose = require("mongoose");

const appliedCertSchema = new mongoose.Schema({
  dom: {
    type: String,
     required: true,
   
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
});

module.exports = new mongoose.model("appliedCert", appliedCertSchema);
