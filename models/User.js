var mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    name: {
        type: String , 
        trim: true , 
        required : true
    } ,
    email: {
        type: String , 
        trim: true , 
        required : true , 
        unique:true
    } , 
    // password: {
    //     type: String , 
    //     required : true
    // } ,
    // avatar :{
    //     type: String
    // } ,
    salt: String , 
    created :{
        type :Date,
        default : Date.now 
    } , 
    
    updated: Date
})

const User=mongoose.model('User' , userSchema);

module.exports = User;