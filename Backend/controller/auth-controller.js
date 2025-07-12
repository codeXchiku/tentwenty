import User from "../models/user-model.js";

const Home = async(req, res) => {
    try {
        res.send('say Hello to Home page')
    } catch (error) {
        console.log(error);
        
    }
  }

  const about = async(req, res) => {
    try {
        res
        .status(200)
        .send('say Hello to About page')
    } catch (error) {
        console.log(error);
        
    }
  }

  const register = async(req, res) => { 
    try {
        //console.log(req.body);
        const{username,email,phone,password} = req.body;
        const userExsit =await User.findOne({email:email});

        if (userExsit) {
            return res.status(400).json({extraDetails:"email already exists"})
        }

        const newUser = await User.create({username,email,phone,password})

        res.status(201).json({
            message: "Registration successful", 
            token:await newUser.generateToken(),
            userId:newUser._id.toString()
        })
    } catch (error) {
        return res.status(500).json("internal server error")
        
    }
  }

  const login = async(req,res)=>{
    try {
        const{email,password} = req.body;
        const userExist = await User.findOne({email:email});
        if (!userExist) {
            return res.status(500).json({extraDetails:"email not registered yet"})
        }

        const isPasswordValid = await userExist.isPasswordValid(password);

        if (isPasswordValid) { 
            res.status(200).json({
                message: "Login successful", 
                token:await userExist.generateToken(),
                userId:userExist._id.toString()
            })
        }else{
            res.status(401).json({extraDetails:"Invalid email or password"})
        }
        
    } catch (error) {
        res.status(500).json("internal server error")
    }
  }

  const userDatas = async(req,res)=>{
    try {
        const userData = req.user
        console.log(userData);
        return res.status(200).json({userData})
    } catch (error) {
        console.log("error from the user routes: ",error);
    }
  }

  export default {Home,about,register,login,userDatas}