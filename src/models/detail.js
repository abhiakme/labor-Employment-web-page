const mongoose=require("mongoose");
const detailschema=mongoose.Schema({
    brandName:String,
    brandIconUrl:String,
    links:[{
        label:String,
        url:String
    }]
});

module.exports=mongoose.model("web_data",detailschema);