const errorMiddleWare = (err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "internal server error"
    const extraDetails = err.extraDetails || "Backend problem"
    
    return res.status(status).json({message,extraDetails});
}

export default errorMiddleWare;