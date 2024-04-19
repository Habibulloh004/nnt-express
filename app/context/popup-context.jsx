"use client";
import React, { createContext, useContext, useState } from "react";

// Step 1: Create a context
const Popup = createContext();

// Step 2: Create a provider component
export const PopupProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [filtering, setFiltering] = useState("");
  const [openDrop, setOpenDrop] = useState(false);
  const [stepper, setStepper] = useState(0);
  const [loading, setLoading] = useState(false);

  const togglePopup = () => {
    setOpen((prev) => !prev);
  };
  const toggleDrop = () => {
    setOpenDrop((prev) => !prev);
  };

  return (
    <Popup.Provider
      value={{
        loading,
        setLoading,
        open,
        togglePopup,
        toggleDrop,
        filtering,
        setFiltering,
        openDrop,
        setOpenDrop,
        stepper,
        setStepper,
      }}
    >
      {children}
    </Popup.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(Popup);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};
