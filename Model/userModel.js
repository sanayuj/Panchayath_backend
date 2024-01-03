const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    BlockStatus:{
        type:Boolean,
        default:false
    }
})

userSchema.pre("save",async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  })

  module.exports=new mongoose.model("user",userSchema)