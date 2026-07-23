import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

name: {type: String, required: [true, 'Name is required']},
password: {type: String, required: [true, 'Password is required']},
email: {type: String, required: [true, 'Email is required'], unique: true},
image: {type: String},
photo: {type: String},
address: {type: String},
dob: {type: String},
gender: {type: String},
phone: { type: String },
isAdmin:{type: Boolean, default: false}
},{timestamps:true});

const userModel = mongoose.model('user', userSchema);

export default userModel;