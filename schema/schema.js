import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone:String,
    gender:String,
    address:String,
    role:String
   
});



const user = mongoose.model("User", userSchema);

export default user;