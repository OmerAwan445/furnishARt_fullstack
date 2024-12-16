import { authConfig } from '@/utils/auth/auth.config';
import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';
import { adminPages } from '../constants/PrivatePages';


export default withAuth(
  function middleware(req) {
    let pathname = req.nextUrl.pathname;
    let userRole = req.nextauth.token?.user.role;
    console.log(pathname);
    // if user tries to access admin pages
    if(userRole === 'user' && adminPages.includes(pathname)){
      return NextResponse.redirect(new URL('/denied', req.url));
    }
    // if admin tries to access user pages
    if(userRole === 'admin' && !adminPages.includes(pathname)){
      return NextResponse.redirect(new URL('/denied', req.url));
    }
  },
  {
    ...authConfig,
    callbacks: {
    authorized: ({ req, token }) =>  !!token
    },
  }
);