import Image from "next/image";
import * as React from "react";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";

interface UserAvatarProps extends React.HTMLAttributes<HTMLImageElement> {
  avatarUrl: string | null | undefined;
  size?: number;
}
const UserAvatar: React.FC<UserAvatarProps> = ({
  avatarUrl,
  size = 42,
  ...props
}) => {
  return (
    <Image
      src={avatarUrl || avatarPlaceholder}
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        props.className
      )}
      alt="User avatar"
      {...props}
    />
  );
};

export default UserAvatar;
