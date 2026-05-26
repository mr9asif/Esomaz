import { type Request, type Response } from 'express';
import app, { startServer } from './app.js';


app.get("/", (req:Request, res:Response)=>{
    res.send("server in working...")
})

app.listen(3000, ()=>{
    startServer();
    console.log("server running on port 3000")
})