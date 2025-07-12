import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

//mongoose middleware for password hashing
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password
    } catch (error) {
        next(error)
    }
})
//JWT: registation
userSchema.methods.generateToken = async function () {
    {
        try {
           return jwt.sign({
                userId:this._id.toString(),
                email:this.email,
                isAdmin:this.isAdmin,
            },
            process.env.JWT_SECRET_TOKEN,
            {
                expiresIn:'30d',
            }
        )
        } catch (error) {
            console.error(error)
        }
    }
}
//login
userSchema.methods.isPasswordValid = async function(password) {
    return bcrypt.compare(password,this.password)
}

//defining the model
const User = mongoose.model("User", userSchema)
export default User