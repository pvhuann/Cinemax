import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate:{
            validator: (value:any) => /\S+@\S+\.\S+/.test(value), // Xác thực email hợp lệ
            message:"Invalid email format"
        },
    },
    password:{
        type: String,
        required: true,
    }, 
    favorites:{
        type: [{type: Number}],
        default:[],
    }
}) 

const User= mongoose.models.User || mongoose.model("User", UserSchema)

export default User