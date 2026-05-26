import express, { type Request, type Response } from 'express';

const app =express();

app.get("/", (req:Request, res:Response)=>{
    res.send("server in working...")
})

app.listen(3000, ()=>{
    console.log("server running on port 3000")
})