const mongoose=require("mongoose");
const labourschema=mongoose.Schema({
    fname:String,
    lname:String,
    Mname:String,
    Fname:String,
    add:String,
    gender:String,
    state:String,
    city:String,
    dob:String,
    pin:Number,
    phone:Number,
    adhar:Number,
    email:String,
});

module.exports=mongoose.model("labour",labourschema);