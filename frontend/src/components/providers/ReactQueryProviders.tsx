'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function ReactQueryProviders({ children }:{children:React.ReactNode}) {
  const [queryClient] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 10000 } } }) // 10 sec
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}