import mongoose from "mongoose";

const loginSchema = mongoose.Schema({
    user: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String
})

let loginModel = mongoose.model('LoginCredentials', loginSchema)

export default loginModel