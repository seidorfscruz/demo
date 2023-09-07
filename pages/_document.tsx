import { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider } from '@/components/theme-provider'

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
      </Head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Main />
          <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  )
}
