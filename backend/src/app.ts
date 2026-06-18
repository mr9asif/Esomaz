import cookieParser from "cookie-parser";
import cors from 'cors';
import "dotenv/config";
import express from 'express';
import { prisma } from './config/prisma.js';
import authRouter from "./modules/auth/auth.routes.js";
import bookmarkRoutes from "./modules/bookmark/bookmark.route.js";
import commentRoutes from './modules/comments/comment.route.js';
import postRouter from './modules/post/post.route.js';
import ReactionRoutes from "./modules/reaction/reaction.route.js";
import userRouter from './modules/user/user.route.js';

const app =express(); 

// middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());
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


// routes
app.use('/api/v1/auth', authRouter  )
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use("/api/reactions", ReactionRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/comments", commentRoutes);


export default app;