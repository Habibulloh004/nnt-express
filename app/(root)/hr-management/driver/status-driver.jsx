"use client";
import { statusDriverPath } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, MoveLeftIcon, Plus, UserPlus } from "lucide-react";
// import Filter from "@/components/shared/filter-function";

const StatusDriver = () => {
  const path = usePathname();
  const create = path === "/hr-management/driver/create-driver";
  const router = useRouter();
  return (
    <main className="shadow-3xl rounded-md dark:bg-primary-foreground">
      <div className="wrapper flex items-center justify-between py-3 px-5">
        <div className="flex gap-3">
          {create ? (
            <div onClick={() => router.back()} className="ml-1 cursor-pointer">
              <MoveLeftIcon />
            </div>
          ) : (
            statusDriverPath.map((item, idx) => {
              const findPath = item.path.startsWith(path);
              return (
                <Link
                  key={idx}
                  href={`${item.path}`}
                  className={`text-sm p-2 px-3 rounded-md relative ${
                    findPath
                      ? "bg-primary text-primary-foreground"
                      : "border-[1px] border-primary"
                  }`}
                >
                  <p className="relative z-50">{item.title}</p>

                  {findPath && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute w-full h-full inset-0 rounded-md bg-primary z-10"
                    />
                  )}
                </Link>
              );
            })
          )}
        </div>
        <div>
          {create ? (
            ""
          ) : (
            <Link href="/hr-management/driver/create-driver">
              <Button className="flex items-center px-3 bg-primary text-primary-foreground rounded-md">
                <UserPlus /> <p className="py-2 px-2">Create driver</p>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export default StatusDriver;
