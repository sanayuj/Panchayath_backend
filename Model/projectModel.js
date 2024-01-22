const mongoose=require("mongoose")


const projectSchema=new mongoose.Schema({
    Date:{
        type:String,
        required:true,
    },
    projectName:{
        type:String,
        required:true,
    },
    projectDescription:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    projectImage:{
        type:Object,
        required:true
    }
})

module.exports=new mongoose.model("project",projectSchema)