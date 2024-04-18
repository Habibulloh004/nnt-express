import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const session = cookies().get('session')?.value;
  if(!session) {
    redirect("/login")
  } else {
    redirect("/load-management/load-trip")
  }
  return (
    <>Hello world</>
  );
}
