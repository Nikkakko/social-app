import PostEditorLoader from "@/components/loaders/PostEditorLoader";
import dynamic from "next/dynamic";
import Image from "next/image";

const PostEditor = dynamic(() => import("@/components/posts/post-editor"), {
  loading: () => <PostEditorLoader />,
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-[200vh] w-full">
      <div className="w-full">
        <PostEditor />
      </div>
    </main>
  );
}
