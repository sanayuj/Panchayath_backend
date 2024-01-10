const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certificateName: {
    type: String,
    required: true,
  },
  Disable: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("certificate", certificateSchema);
