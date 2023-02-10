const express = require("express");
const mongoose = require("mongoose");
const customerRouter = require("./routes/customerRoute")
const cardRouter = require("./routes/cardRoute")


const app = express();

app.use(express.json());

app.use('/',customerRouter);
app.use('/', cardRouter);


mongoose.set('strictQuery',false)
mongoose.connect("mongodb+srv://Vikas:pAeAi3B.8Rhcfa2@cluster0.tnyfk.mongodb.net/basiccrudapp")
.then(()=>{
    console.log("mongoDb is connected ")
})
.catch(error=>{
    console.log(error)
})

app.listen(3000, function (){
    console.log("express is runnig.....")
})