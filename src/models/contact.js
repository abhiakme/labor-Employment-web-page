const mongoose=require("mongoose");
const contactschema=mongoose.Schema({
    email:String,
    phone:String,
    query:String,
});

module.exports=mongoose.model("contacts",contactschema);