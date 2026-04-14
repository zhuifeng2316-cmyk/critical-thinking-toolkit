import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Critical Thinking Toolkit',
  description: 'AI时代最稀缺的能力是批判性思维 - 多视角阅读器 & 逻辑漏洞检测器',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  )
}
