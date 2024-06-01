'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function ReactQueryProviders({ children }:{children:React.ReactNode}) {
  const [queryClient] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }) // 5 sec
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}