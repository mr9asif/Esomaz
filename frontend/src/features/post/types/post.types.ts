export interface Author {
    id: string;
    name: string;
    username: string;
    avatar: string;
}

export interface Media {
    id: string;
    url: string;
    type: "IMAGE" | "VIDEO";
    postId: string;
}

export interface Reaction {
    id?: string;
    userId?: string;
    type?: string;
    postId:string;
}

export interface Post {
    id: string;
    content: string | null;
    authorId: string;

    createdAt: string;
    updatedAt: string;

    author: {
  id: string;
  name: string;
  username: string;
  avatar?: string;

  isFollowing: boolean;
  _count?: {
  reactions: number;
  comments: number;
};
};

    media: Media[];

    reactions: Reaction[];
      isBookmarked: boolean;
      _count: {
    comments: number;
  };
}
export interface CommentUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  parentId: string | null;

  createdAt: string;
  updatedAt: string;

  user: CommentUser;

  replies: Comment[];
}

export interface Reply {
    id:string;
    content:string;
    user:{
        avatar:string;
        name:string;
    }
}