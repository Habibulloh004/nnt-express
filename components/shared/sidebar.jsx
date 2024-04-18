"use client";
import { usePopup } from "@/app/context/popup-context";
import { sidebarItems } from "@/lib/utils";
import { LogoIcon, LogoTitle } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const Sidebar = () => {
  const { open, openDrop, setOpenDrop } = usePopup();
  const [dropDown, setDropDown] = useState(false);
  const path = usePathname();
  const asideControls = useAnimationControls();

  useEffect(() => {
    if (open) {
      asideControls.start("open");
    } else {
      asideControls.start("close");
    }
  }, [open]);

  const asideVariant = {
    close: {
      width: "33.33333%",
      transtition: {
        type: "spring",
        damping: 15,
        duration: 0.5,
      },
    },
    open: {
      width: "100%",
      transtition: {
        type: "spring",
        damping: 15,
        duration: 0.5,
      },
    },
  };
  return (
    <motion.aside
      animate={asideControls}
      variants={asideVariant}
      initial={open ? "open" : "close"}
      className={`h-full bg-primary dark:bg-primary-foreground text-white`}
    >
      <div className="img-container flex items-center gap-1 border-b-[1px] border-r-[1px] p-4 border-gray-50 border-opacity-10 max-h-[60px]">
        <Image src={LogoIcon} alt="Logo" className="max-w-12 min-w-5 " />{" "}
        <Image
          src={LogoTitle}
          alt="Logo"
          className={`${open ? "block" : "hidden"} max-w-32 min-w-20`}
        />{" "}
      </div>
      <div className="p-2">
        <ul className="flex flex-col gap-3">
          {sidebarItems.map((item) => {
            const findPath = path.startsWith(item.path);
            return (
              <li key={item.id}>
                {item.items ? (
                  <Accordion
                    type="single"
                    collapsible
                    className={`flex items-center gap-3 p-2 px-3 cursor-pointer rounded-md ${
                      findPath ? "bg-slate-50 bg-opacity-10" : ""
                    }`}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={`flex items-center gap-3 cursor-pointer`}
                        onClick={() => {
                          setDropDown((prev) => !prev);
                          setOpenDrop((prev) => !prev);
                        }}
                      >
                        <Image src={item.icon} alt="icon" />{" "}
                        <p
                          className={`${
                            open ? "flex" : "hidden"
                          } text-sm text-left items-center gap-2`}
                        >
                          {item.title}
                          <ChevronDown
                            className={`h-6 w-6 shrink-0 transition-transform duration-200 ${
                              dropDown ? "" : "rotate-180"
                            }`}
                          />
                        </p>
                      </AccordionTrigger>
                      {openDrop && (
                        <div className={`px-4`}>
                          {item.items.map((smallItem) => {
                            const findSmallPath = path.includes(smallItem.path);
                            const firstChild = item.items.find(
                              (item) => item.id === 1
                            );
                            return (
                              <AccordionContent
                                key={smallItem.id}
                                className={`${
                                  open && firstChild ? "mt-3" : ""
                                }`}
                              >
                                <Link
                                  href={smallItem.path}
                                  className={`flex gap-2 py-3 items-center ${
                                    open && findSmallPath
                                      ? "border-l-2"
                                      : "border-l-0"
                                  }  border-white px-3`}
                                >
                                  <Image src={smallItem.icon} className={`w-5 h-5`} alt="icon" />{" "}
                                  <p
                                    className={`text-[13px] text-left ${
                                      open ? "block" : "hidden"
                                    }`}
                                  >
                                    {smallItem.title}
                                  </p>
                                </Link>
                              </AccordionContent>
                            );
                          })}
                        </div>
                      )}
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 p-2 px-3 ${
                      findPath ? "bg-slate-50 bg-opacity-10" : ""
                    } rounded-md`}
                  >
                    <Image src={item.icon} alt="icon" />{" "}
                    <p className={`${open ? "block" : "hidden"} text-sm`}>
                      {item.title}
                    </p>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
