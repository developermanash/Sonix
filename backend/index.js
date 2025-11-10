import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./src/routes/user.route.js";
import adminRoutes from "./src/routes/admin.route.js";
import authRoutes from "./src/routes/auth.route.js";
import songRoutes from "./src/routes/song.route.js";
import albumRoutes from "./src/routes/album.route.js";
import statRoutes from "./src/routes/stat.route.js";
import { connectDB } from "./src/lib/db.js";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url"; //  Add this import

// Recreate __dirname and __filename for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Middlewares
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse req.body or any json data
app.use(clerkMiddleware()); // add auth to request object

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"), //  works now
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

//error handler 
app.use((err,req,res,next)=>{
  res.status(500).json({message: process.env.NODE_ENV === "production"? "Internal Server Error": err.message});
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
