
const mongoose = require('mongoose');
// const connectstring = mongoose.connect("mongodb+srv://muthurajcrudmern:muthurajcrudmern@cluster0.c9yffce.mongodb.net/")
//!  schema for database 

const Userschema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
},{timestamps:true})
const Usermodel = new mongoose.model("Users", Userschema)
module.exports = Usermodel