import express from "express";
import cors from "cors";
import{ connectDB } from './config/db.js'
import 'dotenv/config';
import brandRouter from './routes/brandRoutes.js'
import modelRouter from "./routes/modelRoutes.js";
import carRouter from './routes/carRoutes.js'
import userRouter from "./routes/userRoutes.js";

//app config
const app = express()
const port =4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints

app.use('/api/brand',brandRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/model',modelRouter)
app.use('/api/car',carRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`) 
})
