//middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    process.env.INPROGRESS == "true" &&
    !request.url.includes("waiting") &&
    !request.url.includes("_next")
  ) {
    return NextResponse.redirect(new URL("/waiting", request.url));
  }
  if (process.env.INPROGRESS == "false" && request.url.includes("waiting"))
    return NextResponse.redirect(new URL("/", request.url));
}
