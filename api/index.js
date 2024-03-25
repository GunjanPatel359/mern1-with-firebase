const express=require('express');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
require('dotenv').config();

const app=express();
app.use(express.json());
app.use(cookieParser())

const userRoutes=require('./routes/user.route');
const authRoutes=require('./routes/auth.route');

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("conected to db");
}).catch((err)=>{
    console.log(err);
})

app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)


app.listen(3000,()=>{
    console.log('Server listening on port 3000!')
})

