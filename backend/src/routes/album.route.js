import { Router } from "express";


const router = Router();

router.get("/",(req,res)=>{
    res.send("hilo from album route");
})

export default router;