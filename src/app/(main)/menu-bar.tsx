import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {}

const MenuBar: React.FC<MenuBarProps> = ({ ...props }) => {
  const MenuBarList = [
    { title: "Home", icon: <Home />, href: "/" },
    { title: "Notifications", icon: <Bell />, href: "/notifications" },
    { title: "Messages", icon: <Mail />, href: "/messages" },
    { title: "Bookmarks", icon: <Bookmark />, href: "/bookmarks" },
  ];
  return (
    <div className={cn(props.className)}>
      {MenuBarList.map(item => (
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-3"
          title={item.title}
          asChild
          key={item.title}
        >
          <Link href={item.href}>
            {item.icon}
            <span className="hidden lg:inline">{item.title}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default MenuBar;
