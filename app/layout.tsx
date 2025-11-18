import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WanderNest - Student-Led Tourism',
  description: 'Connect with local students for authentic travel experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
