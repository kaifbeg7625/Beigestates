import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Being logged in isn't enough — the email has to be in the admins
  // table. RLS enforces this at the database too; this just keeps
  // non-admins out of the panel UI instead of showing them empty pages.
  let isAdmin = false;
  if (user) {
    const { data } = await supabase.rpc("is_admin");
    isAdmin = data === true;
  }

  const isLoginRoute = request.nextUrl.pathname === "/admin/login";

  if (!isLoginRoute && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    // Logged in but not on the list — say so instead of silently
    // bouncing them back to a login form they just used.
    if (user) url.searchParams.set("denied", "1");
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
