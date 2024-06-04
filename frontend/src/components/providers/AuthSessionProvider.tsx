'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const AuthSessionProvider = ({children}:{children:ReactNode}) => {
  return (
    <SessionProvider> {children}</SessionProvider>
  )
}

export default AuthSessionProvider
