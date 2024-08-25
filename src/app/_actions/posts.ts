"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/db";
import { CreatePostInput, createPostSchema } from "@/lib/validation";

export async function submitPost(input: CreatePostInput) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { content } = createPostSchema.parse(input);

  await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
  });
}
