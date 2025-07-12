const adminMiddleware = async(req,res,next)=>{
   try {
     console.log(req.user);
    const isAdmin = req.user.isAdmin
    if (!isAdmin) {
        return res.status(403).json({message:"Access is denied, user is not an Admin"})
    }
    //for postman
     //res.status(200).json({msg:req.user.isAdmin})
     
     next()//if user is admin then it proceed to the next
   } catch (error) {
        next(error)
   }
    
}

export default adminMiddleware