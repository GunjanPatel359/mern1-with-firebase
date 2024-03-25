const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    profilePicture:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfXpi1Nrns6Lg_qmU2V4jJ4kexQbqsgKyCxg&usqp=CAU',
    },
},{timestamps:true});


UserSchema.pre('save',async function(next){
    try {
        this.password= await bcryptjs.hashSync(this.password,10);
        next();
    } catch (err) {
        next(err)
    }
})

UserSchema.methods.createJWT=function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
}

const User=mongoose.model('User',UserSchema)
module.exports=User;