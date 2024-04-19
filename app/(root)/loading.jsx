"use client";
import React from "react";
import { MultiStepLoader as Loader } from "../../components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { usePopup } from "../context/popup-context";

const loadingStates = [
  {
    text: "Buying a condo",
  },
  {
    text: "Travelling in a flight",
  },
  {
    text: "Meeting Tyler Durden",
  },
  {
    text: "He makes soap",
  },
  {
    text: "We goto a bar",
  },
  {
    text: "Start a fight",
  },
  {
    text: "We like it",
  },
  {
    text: "Welcome to F**** C***",
  },
];

function Loading() {
  const { loading, setLoading } = usePopup();

  return (
    <>loading</>
    // <div className="w-full h-[60vh] flex items-center justify-center">
    //   {/* Core Loader Modal */}
    //   <Loader loadingStates={loadingStates} loading={loading} duration={2000} />

    //   {/* The buttons are for demo only, remove it in your actual code ⬇️ */}

    //   {loading && (
    //     <button
    //       className="fixed top-4 right-4 text-black dark:text-white z-[120]"
    //       onClick={() => setLoading(false)}
    //     >
    //       <IconSquareRoundedX className="h-10 w-10" />
    //     </button>
    //   )}
    // </div>
  );
}

export default Loading;
