const mongoose=require("mongoose")

const marriageCertDetailsSchema=new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      certName:{
        type:String,
        default:"Marriage Certificate"
      },
      certStatus: {
        type: Boolean,
        default: false,
      },
      dateOfMarriage: {
        type: String,
        required: true,
      },
      placeOfMarriage: {
        type: String,
        required: true,
      },
      husbandName: {
        type: String,
        required: true,
      },
      husbandNationality: {
        type: String,
        required: true,
      },
      husbandDOB: {
        type: String,
        required: true,
      },
      husbandAddress: {
        type: String,
        required: true,
      },
      husMaritalStatus: {
        type: String,
        required: true,
      },
      husbandAadhar: {
        type: Object,
        required: true,
      },
      husbandImage: {
        type: Object,
        required: true,
      },
      wifeName: {
        type: String,
        required: true,
      },
      wifeNationality: {
        type: String,
        required: true,
      },
      wifeDOB: {
        type: String,
        required: true,
      },
      wifeAddress: {
        type: String,
        required: true,
      },
      wifeMaritalStatus: {
        type: String,
        required: true,
      },
      wifeAadhar: {
        type: Object,
        required: true,
      },
      wifeImage: {
        type: Object,
        required: true,
      }
    
})



module.exports=new mongoose.model("MarriageCertDetails",marriageCertDetailsSchema)