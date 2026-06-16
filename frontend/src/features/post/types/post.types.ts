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
}

export interface Post {
    id: string;
    content: string | null;
    authorId: string;

    createdAt: string;
    updatedAt: string;

    author: Author;

    media: Media[];

    reactions: Reaction[];
}