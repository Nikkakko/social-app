"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/db";
import { postDataInclude } from "@/lib/types";
import { CreatePostInput, createPostSchema } from "@/lib/validation";

export async function submitPost(input: CreatePostInput) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { content } = createPostSchema.parse(input);

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
    include: postDataInclude,
  });

  return newPost;
}

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }
  if (!post || post.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
    include: postDataInclude,
  });

  return deletedPost;
}
