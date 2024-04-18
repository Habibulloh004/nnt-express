import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import StatusDriver from "./status-driver";

export default function RootLayout({ children }) {
  return (
    <>
      <StatusDriver />
      <ScrollArea className="w-full h-[85%] rounded-md border mt-5 p-2 ">
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
