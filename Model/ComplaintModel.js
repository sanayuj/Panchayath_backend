const mongoose=require("mongoose")

const ComplaintSchema=new mongoose.Schema({
username:{
    type:String,
    required:true
},
wardnumber:{
    type:String,
    required:true
},
phonenumber:{
    type:String,
    required:true
},email:{
    type:String,
    required:true
},
complaintTopic:{
    type:String,
    required:true
},complaintDescription:{
    type:String,
    required:true
},imageUrl:{
    type:Object,
    required:true
},

})


module.exports = new mongoose.model("userCompliant", ComplaintSchema);