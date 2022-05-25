const mongoose=require("mongoose");   

const todoSchema=new mongoose.Schema({
    record:{type:String},
   
})

const model=mongoose.model('firstApp',todoSchema);


module.exports=model;