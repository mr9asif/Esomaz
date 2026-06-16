import type { Post } from "../../types/post.types";

interface Props {

    post: Post;

}

export default function PostCard({

    post,

}: Props) {

    return (

        <div className="bg-white rounded-xl shadow border p-4">

            <div className="flex items-center gap-3">

                <img

                    src={post.author.avatar}

                    className="w-10 h-10 rounded-full"

                />

                <div>

                    <h3 className="font-semibold">

                        {post.author.name}

                    </h3>

                    <p className="text-sm text-gray-500">

                        @{post.author.username}

                    </p>

                </div>

            </div>

            {

                post.content && (

                    <p className="mt-4">

                        {post.content}

                    </p>

                )

            }

            {

                post.media.length > 0 && (

                    <div className="mt-4 space-y-2">

                        {

                            post.media.map((media) => (

                                media.type === "IMAGE"

                                    ?

                                    <img

                                        key={media.id}

                                        src={media.url}

                                        className="rounded-lg w-full"

                                    />

                                    :

                                    <video

                                        key={media.id}

                                        src={media.url}

                                        controls

                                        className="rounded-lg w-full"

                                    />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}