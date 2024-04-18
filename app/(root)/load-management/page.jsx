import { redirect } from "next/navigation";
import React from "react";

const LoadTrip = () => {
  redirect("/load-management/load-trip");
  return <div>LoadTrip </div>;
};

export default LoadTrip;
