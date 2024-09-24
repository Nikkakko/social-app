"use client";

import { Button } from "@/components/ui/button";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./styles.css";
import { submitPost } from "@/app/_actions/posts";
import { useSession } from "@/app/(main)/session-provider";
import UserAvatar from "../user-avatar";
import { cn } from "@/lib/utils";
import { useSubmitPostMutation } from "./mutation";

export default function PostEditor() {
  const { user } = useSession();
  const mutation = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's crack-a-lackin'?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate(
      {
        content: input,
        // mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          // resetMediaUploads();
        },
      }
    );
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          className="hidden sm:inline rounded-full"
        />
        <div className="w-full">
          <EditorContent
            editor={editor}
            className={cn(
              "max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3"
            )}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          disabled={!input.trim() || mutation.isPending}
          className="min-w-20"
        >
          Post
        </Button>
      </div>
    </div>
  );
}
