import "dotenv/config";
import express from 'express';
import { prisma } from './config/prisma.js';
import authRouter from "./modules/auth/auth.routes.js";
const app =express();
app.use(express.json());

export const startServer=async()=> {
  try {
    await prisma.$connect();

    console.log("✅ PostgreSQL Connected");


  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);

    process.exit(1);
  }
}

app.use('/api/v1/auth', authRouter  )


export default app;