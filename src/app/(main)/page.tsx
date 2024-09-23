import ForYouFeed from "@/components/ForYouFeed";
import PostEditorLoader from "@/components/loaders/PostEditorLoader";
import Post from "@/components/posts/Post";
import TrendsSidebar from "@/components/TrendsSidebar";
import prisma from "@/lib/db";
import { postDataInclude } from "@/lib/types";
import dynamic from "next/dynamic";
import Image from "next/image";

const PostEditor = dynamic(() => import("@/components/posts/post-editor"), {
  loading: () => <PostEditorLoader />,
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  );
}
