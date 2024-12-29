import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config(
    {path:'./.env'}
)
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(express.static("public"))
app.use(cookieParser())


// Routes declaration
import adminRoute from "./routes/Admin.routes.js";
import userRoute from "./routes/User.routes.js";


app.use("/api/v1/admin",adminRoute);
app.use("/api/v1/user",userRoute);

export { app }