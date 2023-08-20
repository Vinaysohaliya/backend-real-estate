import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRouter from "./routes/userRoutes.js";
import resicencyRouter from './routes/residencyRoute.js'
dotenv.config()

const app=express()
const PORT=process.env.PORT||5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT,()=>{
    console.log(`server running! ${PORT}`);
})
app.use("/api/user",userRouter)
app.use("/api/recidency",resicencyRouter)
