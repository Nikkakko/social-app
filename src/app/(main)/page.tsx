import PostEditorLoader from "@/components/loaders/PostEditorLoader";
import Post from "@/components/posts/Post";
import prisma from "@/lib/db";
import { postDataInclude } from "@/lib/types";
import dynamic from "next/dynamic";
import Image from "next/image";

const PostEditor = dynamic(() => import("@/components/posts/post-editor"), {
  loading: () => <PostEditorLoader />,
  ssr: false,
});

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: postDataInclude,
  });
  return (
    <main className="w-fill min-w-0">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
