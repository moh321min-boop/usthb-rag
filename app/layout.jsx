import './globals.css'
import { Noto_Sans_Arabic } from 'next/font/google'

const arabicFont = Noto_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-arabic',
})

export const metadata = {
  title: 'RAG-USTHB | المساعد الدراسي',
  description: 'مساعد دراسي تجريبي لطلاب جامعة العلوم والتكنولوجيا هواري بومدين، مع محادثات ومواد ومستندات توضيحية.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4F7FB',
  colorScheme: 'light',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${arabicFont.variable} min-h-dvh bg-[#F4F7FB] text-[#243247] antialiased`}>{children}</body>
    </html>
  )
}
