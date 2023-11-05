const User= require("../Models/userModel");
const jwt= require("jsonwebtoken");
const asyncHandler=require("express-async-handler");

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        } catch(error){
			console.log(error);
            throw new Error("User Not Authorized");
        }
    } else{
        throw new Error("Authorization Failed .. Token Is Empty");
    }
});

module.exports= {authMiddleware};