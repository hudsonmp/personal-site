import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "hudson's blog",
  description: "Hudson Mitchell-Pullman's portfolio and projects",
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
