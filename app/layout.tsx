import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'


export const metadata: Metadata = {
  title: 'FileFly',
  description: 'A File Sharing App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300'>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
