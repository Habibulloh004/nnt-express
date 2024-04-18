"use client";
import React from "react";
import ModeToggle from "./mode-toggle";
import { redirect, usePathname, useRouter } from "next/navigation";
import { sidebarItems, statusPath } from "@/lib/utils";
import {
  BellRing,
  ChevronDown,
  CircleHelp,
  Menu,
  MessageSquareMore,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePopup } from "@/app/context/popup-context";

const Header = () => {
  const path = usePathname();
  const router = useRouter();
  // const { filtering, setFiltering } = usePopup();
  const { togglePopup, toggleDrop } = usePopup();
  const findPath = sidebarItems.find((p) => path.startsWith(p.path));
  const findPath2 = statusPath.find((p) => p.path === path);

  function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  return (
    <header className="h-full w-full flex justify-between items-center px-6 bg-primary dark:bg-primary-foreground text-white">
      <div className="flex items-center gap-3">
        <span>
          <Menu
            onClick={() => {
              togglePopup();
              toggleDrop()
            }}
            className="cursor-pointer"
          />
        </span>
        <span>
          {findPath?.headTitle} {findPath2 && `/ ${findPath2?.headTitle}`}
        </span>
      </div>
      <ul className="flex items-center gap-8">
        <li className="relative">
          <Input
            placeholder="Search"
            type="number"
            className="w-80 text-primary"
            // value={filtering}
            // onChange={(e) => setFiltering(e.target.value)}
          />{" "}
          <Search className="absolute top-1/2 -translate-y-1/2 right-3" />
        </li>
        <li>
          <Button
            className="flex items-center gap-2 dark:bg-primary-foreground dark:text-foreground text-primary"
            variant="outline"
          >
            <Plus />
            <p>Create new</p>
          </Button>
        </li>
        <li>
          <ul className="flex items-center gap-5">
            <li>
              <ModeToggle />
            </li>
            <li>
              <BellRing className="h-[1.2rem] w-[1.2rem]" />
            </li>
            <li>
              <MessageSquareMore className="h-[1.2rem] w-[1.2rem]" />
            </li>
            <li>
              <CircleHelp className="h-[1.2rem] w-[1.2rem]" />
            </li>
          </ul>
        </li>
        <li
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            clearCookie("session");
            router.push("/login");
          }}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm">Admin Account</p>
          <ChevronDown />
        </li>
      </ul>
    </header>
  );
};

export default Header;
