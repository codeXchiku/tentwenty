
//this is Zod validation functionality which is used in auth-router
const validate = (schema)=>async(req,res,next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 400;
        const message = "fill the input properly";
        const extraDetails = err.errors[0].message;

            const errors={
                status,
                message,
                extraDetails,
            };

        console.log(errors)
        // res.status(400).json({msg:message})
        next(errors);
    }
}

export default validate;