import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.href.includes("statusCode")) {
    /**
     * https://localhost:3333/?statusCode=401
     * https://localhost:3333/?statusCode=404
     * https://localhost:3333/?statusCode=500
     */
    const status = Number(req.nextUrl.searchParams.get("statusCode"));
    console.log("Middleware should respond with status code:", status);
    return NextResponse.rewrite(req.url, {
      status,
      headers: {
        ...req.headers,
        "X-Status": String(status),
      },
    });
  }
  return NextResponse.rewrite(req.url, {
    status: 200,
    headers: {
      ...req.headers,
      "X-Status": String(200),
    },
  });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs.
    // The assets folder is also excluded. This is because we can't load /logo.svg, it needs to be /assets/logo.svg.
    "/((?!_next|assets|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
