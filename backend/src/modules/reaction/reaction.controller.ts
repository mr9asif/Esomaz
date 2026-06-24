import type { Request, Response } from "express";
import { toggleReactionService } from "./reaction.service.js";

export const toggleReactionController = async (
    req: Request,
    res: Response
) => {

    const userId = req.user.id;

    const postId = req.params.postId as string;

    const result = await toggleReactionService(
        userId,
        postId
    );

    res.status(200).json({

        success: true,

        message: result.message,

        data: result.data,

    });

};



