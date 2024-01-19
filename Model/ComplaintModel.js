const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  ownerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required:true
  },
  wardnumber: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  complaintTopic: {
    type: String,
    required: true,
  },
  complaintDescription: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  complaintStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("userCompliant", ComplaintSchema);
