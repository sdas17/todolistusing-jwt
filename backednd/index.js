const express = require('express');
const mongoose = require('mongoose')
const router= require('../backednd/route/dodata')
const cors = require('cors');
const app=express();
app.use(cors());
app.use(express.json());
app.use("/todo-list",router)

mongoose.connect("mongodb://localhost:27017/todolist", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((data)=>{
    console.log('data connected sucessfully')
}).catch((err)=>{
    console.log("data is not connected",err)
})

app.listen(3000,()=>{
    console.log('server start')
})