const mongoose=require("mongoose");
const formschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    repassword:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("formdatas",formschema);

