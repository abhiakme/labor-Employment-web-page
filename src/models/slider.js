const mongoose=require("mongoose");
const sliderschema=mongoose.Schema({
    title:String,
    subtitle:String,
    imageUrl:String,
    class:String,
});

module.exports=mongoose.model("slider",sliderschema);