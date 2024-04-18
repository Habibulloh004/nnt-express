import Status from "./status";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function RootLayout({ children }) {
  return (
    <>
      <Status />
      <ScrollArea className="w-full h-[85%] rounded-md border mt-5 p-2 ">
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
