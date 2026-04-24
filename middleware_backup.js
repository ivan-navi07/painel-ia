import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.pathname;

  // permite acessar login
  if (url === "/login") {
    return NextResponse.next();
  }

  // bloqueia acesso ao painel (temporário)
  return NextResponse.redirect(new URL("/login", request.url));
}