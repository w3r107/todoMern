const express=require('express');
const app=express();
const mongoose=require("mongoose");   

const bodyParser = require('body-parser');
const todoSchema=new mongoose.Schema({
    record:String
   
})

const model=mongoose.model('firstApp',todoSchema);


// const item1=new model({
//     record:"Do your homework"
// })
// const item2=new model({
//     record:"Do your lunch"
// })
// const item3=new model({
//     record:"Do your dinner"
// })

// const d=[item1,item2,item3];

// model.insertMany(d,(err)=>{
//     console.log(err);
// })

mongoose.connect("mongodb://localhost/todoListDB");

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));



app.get('/',(req,res)=>{

    model.find({},function(err,f)
    {
       res.render("index",{frst:f});
       
    })
   
 })

app.post('/',async (req, res) => {
    try {
    var k="nothing";
	k = req.body.work;
    var x;
    x= await model.findOne({record: 'Hello There' }).exec();
    console.log(x.record);
    const item=new model({
        record:k
    });
    item.save();
    res.redirect("/");
    } 
    catch (error) {
        console.log(error);
    }
})

app.get('/delete/:id',(req,res)=>{
    var large;
    large=req.params.id;
    console.log(large);
    model.deleteOne({ _id: large }, 
        function (err) {
        if (err) return handleError(err);
      });
    res.redirect('/');

})

app.get('/update/:id',(req,res)=>{

    const id = req.params.id;
    model.findByIdAndUpdate(id, { record: req.body.work }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
})



app.listen(3000,()=>{
    console.log("Listening");
})