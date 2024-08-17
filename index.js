const express=require('express');
const { connection } = require('./config/db');
// const {UserRouter}=require("./routers/User.Router");
const {UserRouter}= require("./routers/User.Router")
const app=express();
const cors=require("cors");



app.use(express.json());
app.use(cors());
app.use('/api',UserRouter);


const server=app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected",error)
    }
    console.log(`http://localhost:${process.env.port}`)
})


