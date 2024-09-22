import { Prisma } from "@prisma/client";
export const userDataSelect = {
  userName: true,
  displayName: true,
  avatarUrl: true,
  id: true,
} satisfies Prisma.UserSelect;

export type UserData = Prisma.UserGetPayload<{
  select: typeof userDataSelect;
}>;

export const postDataInclude = {
  user: {
    select: userDataSelect,
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;
