const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
        });
        // Send a success response
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        // Handle errors
        console.error("Error in signup:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(401).json({ msg: "user not found" });
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({ msg: "wrong credential" });
        }
        const token = validUser.createJWT();
        const { password: hashedPassword, ...user } = validUser._doc;
        const expiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        const tokenOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + expiresIn), // Set expiration 7 days from now
        };

        res.cookie("access_token", token, tokenOptions).status(200).json(user);
    } catch (err) {
        console.error("Error in signin:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const google=async (req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email}).select('-password');
        if(user){
            const token = user.createJWT();
            const expiryDate= new Date(Date.now()+360000);
            res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(user);
        }else{
            const generatedPassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); 
            const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),email:req.body.email,password,profilePicture:req.body.photo})
            await newUser.save();
            const token = newUser.createJWT();
            const { password , ...user } = newUser._doc;
            const expiryDate= new Date(Date.now()+360000);
            res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(user); 
        }
    }catch(err){
        console.error("Error in signin:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { signup,signin,google };
