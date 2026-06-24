import type { Request, Response } from "express";
import type { AuthRequest } from "../../middleware/protect.js";
import { createPostService, deletePostService, getPostByIdService, getPostsService, getTrendingPostsService, updatePostService } from "./post.service.js";

export const createPost = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { content } = req.body;
    const files = req.files as {
  images?: Express.Multer.File[];
  video?: Express.Multer.File[];
};
console.log("files", files)

const images =
  files?.images;

const video =
  files?.video?.[0];

    const post = await createPostService(
    userId,
    content,
    images,
    video
    );

    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

export const getPosts = async (
  req: AuthRequest, 
  res: Response
) => {
  try {
    const posts = await getPostsService(  req.user!.id);
    console.log(req.user)

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get posts",
    });
  }
};

export const getPostById = async (
  req: Request,
  res: Response
) => {
  try {
    const  id  = req.params.id;
    const post = await getPostByIdService(id as string,   req.user.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get post",
    });
  }
};

export const deletePost = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await deletePostService(id as string, userId);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

// edit or update post

export const updatePostController = async (req:Request, res:Response) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const payload = req.body;

  const result = await updatePostService(
    userId,
    postId as string,
    payload
  );

  res.json({
    success: true,
    data: result,
  });
};


// trending posts
export const getTrendingPosts =
  async (
    req: Request,
    res: Response
  ) => {

    const posts =
      await getTrendingPostsService();

    res.status(200).json({
      success: true,
      data: posts,
    });

  };