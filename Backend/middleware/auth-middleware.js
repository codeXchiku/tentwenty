import jwt from 'jsonwebtoken'
import User from '../models/user-model.js';

const userMiddleware = async (req, res, next) => {
    //getting jwt token from frontend which was passed by header
    const token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({ msg: "unauthorized Http,Token not provided" });
    }
    //it removes bearer and spaces from token
    const jwtToken = token.replace('Bearer ', "").trim();
    console.log("token recived from frontend: ", jwtToken);

    try {
        //isVerified returns decoded user value;
        const  isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_TOKEN)
        console.log(isVerified);

        const userData =await User.findOne({email:isVerified.email}).select(
            {
                password:0,
            }
        )
        console.log(userData);
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next()
    } catch (error) {
        return res.status(401).json({ msg: "unauthorized ,invalid token" });
    }
}


export default userMiddleware;