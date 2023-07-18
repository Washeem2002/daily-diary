const express=require("express");
const path=require('path');
const bodyParser=require("body-parser");
const app=express();
//setting view engine
app.set("view engine","ejs");
//setting views-(i.e app looks for what to render)
app.set("views","views");
app.use(bodyParser.urlencoded({encoded:true}));
app.use (express.static(path.join(__dirname,'public')));

// mongoose connection start
const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/diary");
const schema=mongoose.Schema({Title:String,Value:String,Date:String},{versionKey:false});
const DiaryData=new mongoose.model("DiaryData",schema);
//mongoose conection end
app.get("/",async (req,res)=>{
    
    //diary data
    const item=await DiaryData.find();
    
    res.render("1st.ejs",{newListItem:item});
    res.end(); 
});
// rendring the post webpage
app.get("/add",(req,res)=>{
        res.render("2nd.ejs");
        res.end;
})
// posting the data
app.post("/",function(req,res){
   var item=req.body.newItem;
   var item2=req.body.w3review;
   var today=new Date();
    var option ={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    var day=today.toLocaleDateString("en-US",option);
   const temp=new DiaryData({Title:item,Value:item2,Date:day});
   temp.save();
   res.redirect("/");
});
// opening the post
app.get("/:postid",async (req,res)=>{
  const postId=req.params.postid.replace(/\s+/g,'');
  
  const post=await DiaryData.findById(postId);
  
  res.render("3rd.ejs",{post:post});
  res.end();
});
app.listen(3000,()=>{
    console.log("server started at porst 3001");
});




//res.sendFile(__dirname+"/index.html"); to send html