import express from "express";
import dotenv from "dotenv";
import {clerkMiddleware} from '@clerk/express'
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import { connectDB } from "./lib/db.js";


dotenv.config();

//middlewares
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); //to parse req.body or any json data.
app.use(clerkMiddleware()); //add auth to reqest object.

//routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",statRoutes);


app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`);
    connectDB();
    
})