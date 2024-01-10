const certifivcateModel=require("../Model/certificateModel")



module.exports.fetchAllCertificate=async(req,res,next)=>{
    try{
        const certificateData=await certifivcateModel.find({})
        if(certificateData){
            return res.json({certificate:certificateData,status:true})
        }else{
            return res.json({status:false})
        }

    }catch(Error){
        return res.json({message:"Internal server error",status:false})
    }
}

