import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LifeKey - Digital Will Creation',
  description: 'Create a legally binding Digital Will using National ID and AI verification',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden' }}>{children}</body>
    </html>
  )
}

