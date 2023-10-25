import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './assets/components/ThemeProvider'
import TitleBar from './assets/components/TitleBar'


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
            <div className="flex flex-col h-full">
            <TitleBar />
            {children}
            </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
