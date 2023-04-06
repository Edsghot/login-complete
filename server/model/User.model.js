import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a unique username"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String },
});

export default mongoose.model("User", UserSchema);
