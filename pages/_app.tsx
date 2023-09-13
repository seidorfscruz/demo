import '@/app/globals.css'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store'
import type { AppProps } from 'next/app'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())
  return(
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
    <Provider store={ store }>
      <Component {...pageProps} />
    </Provider>
     </SessionContextProvider>
)}
