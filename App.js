const express=require('express')
const app=express()
const dbConnection=require("./Config/dbConfig")
const cors=require("cors")
require('dotenv').config()
const userRouters=require("./Routers/userRouters")

//Backend and frontend connection
app.use(cors())

//Database Connection
dbConnection.dbConnection()

app.use(logger("dev"))
app.use(express.json())

//Router path
app.use("/",userRouters)

//server running port
app.listen(process.env.PORT,()=>{
console.log(`Backend is running in port ${process.env.PORT}`);
})