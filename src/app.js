const express=require("express");
const mongoose=require("mongoose");
const port=3000;
const path=require("path");
const hbs=require("hbs");
const app=express();

//setting paths
const static_path=path.join(__dirname,"../public");
const partials_path=path.join(__dirname,"../views/partials");
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views","views");
hbs.registerPartials(partials_path);

// to read data sended from web in json formate
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// data base connection
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/LabourEmployeeDB",()=>{
    console.log("db connected");
//     detailmodel.create({                                  //detail model
//         brandName:"Dynamic",
//         brandIconUrl:"images/logo.png",
//         links:[
//         {
//             label:"Home",
//             url:"/"
//         },
//         {
//             label:"Services",
//             url:"/services"
//         },
//         {
//             label:"Gallery",
//             url:"/gallery"
//         },
//         {
//             label:"About",
//             url:"/about"
//         },
//         {
//             label:"Contact-Us",
//             url:"/contact"
//         },
//     ]
//     });      // only one time need to run this function --these are web site navbar data--


//     slidermodel.create([                                  //slider model
//         {               
//           title:"Labour and Employer",
//           subtitle:"We love to work together.Lets take a move toward devlopment.!!!!",
//           imageUrl:"images/1.jpg",
//           class:"active",
//         },
//         {               
//             title:"We are hear to Help",
//             subtitle:"You are happy if you trust us.!!!!",
//             imageUrl:"images/2.jpg",
//           },
//           {               
//             title:"Banana",
//             subtitle:"It is a fruit.It is used for many purpuse.!!!!",
//             imageUrl:"images/6.jpg",
//           },
//    ]);      // only one time need to run this function --these are web site slider data--


//     servicemodel.create([                                  //service model
//         {               
//           icon:"fa fa-medkit",
//           title:"Provide Best Facility",
//           description:"We provide best facility which you love",
//           linkText:"check",
//           link:"https://www.abhiakme.com",
//         },
//           {               
//             icon:"fa fa-address-book",
//             title:"Padh Bhai",
//             description:"We provide best facility which you love",
//             linkText:"check",
//             link:"https://www.abhiakme.com",
//           },
//           {               
//             icon:"fa fa-snowflake-o",
//             title:"thanda Hai",
//             description:"We provide best facility which you love",
//             linkText:"check",
//             link:"https://www.abhiakme.com",
//           },
//    ]);      
});
const formmodel=require("./models/form");

const detailmodel=require("./models/detail");
const slidermodel=require("./models/slider");
const servicemodel=require("./models/service");
const contactschema=require("./models/contact");
const labourschema=require("./models/labour");
const employeeschema=require("./models/employee");


var em="";

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.get("/login",(req,res)=>{
    res.render("login");
});


app.post("/login",async (req,res)=>{
    const email=req.body.e;
    em=email;
    const password=req.body.p;
    try{
        const detail=await formmodel.findOne({email:email});
        if(detail.password!=password){
            res.send("wrong password");
        }
        else{
            res.redirect("/mindex");
        }
    }catch(err){
        res.send("wrong email");
    }
});
    
app.post("/register",async (req,res)=>{
    const password=req.body.p;
    const repassword=req.body.r;
    const name=req.body.n;
    const email=req.body.e;
    em=email;
    const detail=await formmodel.findOne({email:email});
    try{
        if(detail){
            res.send("this email is alredy exist");
        }
    else if(password===repassword){
    const data=await formmodel.insertMany({
               name:name,
               email:email,
               password:password,
               repassword:repassword
            });
            res.redirect("mindex");
        }
        else{
                res.send("password not maching");
               }
    }catch(err){
        res.status(400).send("err");
    }       
});

app.get("/mindex",async(req,res)=>{
    const detail=await detailmodel.findOne({"_id":"63c8401b24ab0d5dd8fedc96"});
    // console.log(detail);
    const slider=await slidermodel.find();
    // console.log(slider);
    const service=await servicemodel.find();
    const data1=await formmodel.findOne({email:em});
    // console.log(data1);
    res.render("mindex",{
        detail:detail ,       // sending (detail) collection to views index -----we can use details on index page
        slider:slider ,       // sending (slider data) collection to views index -----we can use slider data on index page
        service:service,
        data1:data1,
    });
});

app.get("/gallery",async(req,res)=>{
    const detail=await detailmodel.findOne({"_id":"63c8401b24ab0d5dd8fedc96"});
    res.render("gallery",{
        detail:detail        // sending (detail) collection to views gallery -----we can use details on index page
    });
});

app.get("/labour",async(req,res)=>{
    const detail=await detailmodel.findOne({"_id":"63c8401b24ab0d5dd8fedc96"});
    res.render("labour",{
        detail:detail        // sending (detail) collection to views labour 
    });
});

app.get("/employee",async(req,res)=>{
    const detail=await detailmodel.findOne({"_id":"63c8401b24ab0d5dd8fedc96"});
    res.render("employee",{
        detail:detail        // sending (detail) collection to views employee 
    });
});
app.post("/labour",async(req,res)=>{
    console.log("submited");
    // console.log(req.body);
    try{
       const data=await labourschema.create(req.body);
       res.redirect("/mindex")
    }catch(e){
        console.log(e);
        res.redirect("/mindex");
    }
});
app.post("/employee",async(req,res)=>{
    console.log("submited");
    // console.log(req.body);
    try{
       const data=await employeeschema.create(req.body);
       res.redirect("/mindex")
    }catch(e){
        console.log(e);
        res.redirect("/mindex");
    }
});
app.post("/process",async(req,res)=>{
    console.log("submited");
    // console.log(req.body);
    try{
       const data=await contactschema.create(req.body);
       res.redirect("/mindex")
    }catch(e){
        console.log(e);
        res.redirect("/mindex");
    }
});

app.listen(port,()=>{
    console.log(`lisning on port : ${port}`);
});