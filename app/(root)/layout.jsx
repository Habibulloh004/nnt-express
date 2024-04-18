"use client";
import { Manrope } from "next/font/google";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import { usePopup } from "../context/popup-context";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const navControls = useAnimationControls();
  const { open } = usePopup();
  useEffect(() => {
    if (open) {
      navControls.start("open");
    } else {
      navControls.start("close");
    }
  }, [open]);

  const navVariant = {
    close: {
      width: "95%",
      transtition: {
        type: "spring",
        damping: 15,
        duration: 0.5,
      },
    },
    open: {
      width: "85%",
      transtition: {
        type: "spring",
        damping: 15,
        duration: 0.5,
      },
    },
  };

  return (
    <main className="w-screen h-screen flex justify-between items-center relative overflow-hidden">
      <div className="w-[15%] sticky left-0 top-0 h-screen">
        <Sidebar />
      </div>
      <motion.div
        animate={navControls}
        variants={navVariant}
        initial={open ? "open" : "close"}
        className={`content flex flex-col h-full absolute right-0 top-0`}
      >
        <div className="header absolute w-full h-[60px] flex items-center">
          <Header />
        </div>
        <div className="child grow w-full h-[85%] mt-[60px] p-4">{children}</div>
      </motion.div>
    </main>
  );
}
