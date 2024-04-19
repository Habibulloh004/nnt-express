import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = (request) => {
  const session = cookies().get("session");
  if (session) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", request.url));
};

export const config = {
  matcher: ["/"],
};
