import { authConfig } from '@/utils/auth/auth.config';
import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';
import { adminPages } from '../constants/PrivatePages';
import { ROLES } from '../constants/Roles';


export default withAuth(
  function middleware(req) {
    let pathname = req.nextUrl.pathname;
    let userRole = req.nextauth.token?.user.role;

    console.log(pathname);
    // if user tries to access admin pages
    if(userRole === ROLES.USER && adminPages.includes(pathname)){
      return NextResponse.redirect(new URL('/denied', req.url));
    }
    console.log(!adminPages.includes(pathname), "pathanme");
    // if admin tries to access user pages
    if(userRole === ROLES.ADMIN && !adminPages.includes(pathname)){
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