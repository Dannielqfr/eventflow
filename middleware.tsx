import { NextApiRequest } from "next";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";

export const config = {
    matcher: ["/login/:path*", "/admin/:path*"],
};

interface CustomApiRequest extends NextApiRequest {
    nextUrl: URL;
}

export function middleware(req: CustomApiRequest) {
    const cookies = req.cookies as unknown as RequestCookies;
    const mycookies = cookies.getAll();
    if (req.nextUrl.pathname.endsWith("/login")) {
        if ((mycookies.length >= 0)) {
            if (mycookies[0]?.name === "idperson") {
                return NextResponse.redirect(new URL("/admin/validate", req.url));
            }
        }

        return NextResponse.next();
    } else {
        if ((mycookies.length >= 0)) {
            if (mycookies[0]?.name === "idperson") {
                return NextResponse.next();
            }
        }

        return NextResponse.redirect(new URL("/login", req.url));
    }
}
