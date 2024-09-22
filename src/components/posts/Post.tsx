import { PostData } from "@/lib/types";
import Link from "next/link";
import * as React from "react";
import UserAvatar from "../user-avatar";
import { formatRelativeDate } from "@/lib/utils";

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <article className="spacey-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Link href={`/users/${post.user.userName}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl} />
        </Link>
        <div>
          <Link
            href={`/users/${post.user.userName}`}
            className="block font-medium hover:underline"
          >
            {post.user.displayName}
          </Link>
          <Link
            href={`/posts/${post.id}`}
            className="block text-sm text-muted-foreground hover:underline"
          >
            {formatRelativeDate(post.createdAt)}
            {post.content}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Post;
