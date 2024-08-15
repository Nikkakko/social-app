"use client";
import { useSession } from "@/app/(main)/session-provider";
import { cn } from "@/lib/utils";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import Link from "next/link";
import { LogOutIcon, UserIcon } from "lucide-react";
import { logoutAction } from "@/app/_actions/auth";

interface UserButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserButton: React.FC<UserButtonProps> = ({ ...props }) => {
  const { user } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", props.className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem>
            <UserIcon className={cn("w-5 h-5 mr-2")} />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logoutAction();
          }}
        >
          <LogOutIcon className={cn("w-5 h-5 mr-2")} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
