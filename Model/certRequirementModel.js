const mongoose=require("mongoose")

const certificateRequirementSchema=new mongoose.Schema({
 certificateName:{
    type:String,
    required:true
 },
 Requirements:{
    type:String,
    required:true
 },
 certificateId:{
    type:String,
    required:true
 }
})


module.exports =new mongoose.model("certificateRequirement",certificateRequirementSchema)