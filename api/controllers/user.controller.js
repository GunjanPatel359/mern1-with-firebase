const bcryptjs=require("bcryptjs")
const User=require("../models/user.model.js")


const updateUser= async(req,res)=>{
    if(req.user.id!==req.params.id){
        return res.status(401).json({msg:"you can update only your account"})
    }
    try {
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }

        const updateUser=await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.password,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture,
                }
            },
            {new:true}
        )
        const {password,...rest}=updatedUser._doc;
        res.status(200).json(rest)
    } catch (err) {
        return res.status(404).json({msg:"somthing went wrong"})
    }
}
module.exports={updateUser}