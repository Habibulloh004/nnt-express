"use client";
import { usePopup } from "@/app/context/popup-context";

export const Stepper = () => {
  const { stepper } = usePopup();
  console.log(stepper);
  return (
    <ol className="flex items-center w-full">
      <li
        className={`flex w-full items-center after:content-[''] after:w-full after:border-4 after:h-1 after:border-b  after:inline-block  ${
          stepper > 0
            ? "after:border-primary/50"
            : "after:border-gray-200 text-primary-foreground dark:after:border-gray-700"
        }`}
      >
        <span className="flex items-center font-bold justify-center w-10 h-10 bg-primary/50 rounded-full lg:h-12 lg:w-12 shrink-0">
          1
        </span>
      </li>
      <li
        className={`flex w-full items-center after:content-[''] after:h-1 after:border-b after:w-full after:border-4 after:inline-block  ${
          stepper == 1
            ? ""
            : "after:border-gray-200 text-primary dark:after:border-gray-700"
        }`}
      >
        <span
          className={`flex items-center font-bold justify-center w-10 h-10 ${
            stepper == 1 ? "bg-primary/50" : "dark:bg-gray-700"
          } rounded-full lg:h-12 lg:w-12  shrink-0`}
        >
          2
        </span>
      </li>
      <li className="flex items-center w-full">
        <span className="flex items-center font-bold justify-center w-10 h-10 bg-gray-200 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
          3
        </span>
      </li>
    </ol>
  );
};
