import dbConnection from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js"
dotenv.config({
    path : "./.env"
})

dbConnection()
    .then(()=>{
        app.listen(process.env.PORT ,()=>{
            console.log(`server is running on Port ${process.env.PORT || 8000}`)
        })
    })
    .catch((error)=>{
        console.log("mongoose connection error" , error);
    })