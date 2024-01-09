const express=require('express')
const app=express()
const dbConnection=require("./Config/dbConfig")
const cors=require("cors")
const logger = require("morgan");
require('dotenv').config()
const userRouters=require("./Routers/userRouters");
const adminRouters=require("./Routers/adminRouter")


//Backend and frontend connection
app.use(cors())

//Database Connection
dbConnection.dbConnection()

app.use(logger("dev"))
app.use(express.json())

//Router path
app.use("/",userRouters)
app.use("/admin",adminRouters)

//server running port
app.listen(process.env.PORT,()=>{
console.log(`Backend is running in port ${process.env.PORT}`);
})