import { clerkClient } from "@clerk/express";

export  const  protectRoute = async (req,res,next) =>{
 if(!req.auth.userId){
    res.status(401).json({message:"Unauthorized you must be logged in"});
    return;
 }
 next();
};

export const requireAdmin = async (req,res,next) =>{
    try{
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL == currentUser.primaryEmailAddress?.emailAddress;
        if(!isAdmin) {
            res.status(403).json({message:"unauthorized- you must be  an admin"});
        }
         next();
    } catch(error){
      console.log("error in the auth miiddleware",error);
      res.status(401).json({message:"internal server error",error});
      
    }
}