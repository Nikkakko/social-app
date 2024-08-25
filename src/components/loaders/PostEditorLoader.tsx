import * as React from "react";
import { Skeleton } from "../ui/skeleton";

interface PostEditorLoaderProps {}

const PostEditorLoader: React.FC<PostEditorLoaderProps> = ({}) => {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm w-full">
      <div className="flex gap-5">
        <Skeleton className="w-12 h-12 aspect-square" />
        <div className="flex flex-col w-full gap-5">
          <Skeleton className="w-full h-10" />
        </div>
      </div>

      <div className="flex justify-end">
        <Skeleton className="w-20 h-10" />
      </div>
    </div>
  );
};

export default PostEditorLoader;
