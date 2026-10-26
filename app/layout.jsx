import './globals.css'
import { Noto_Sans_Arabic } from 'next/font/google'

const arabicFont = Noto_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-arabic',
})

export const metadata = {
  title: 'RAG-USTHB | مساعدك الأكاديمي الذكي',
  description: 'منصة عربية لطلاب جامعة العلوم والتكنولوجيا هواري بومدين، تساعد على البحث في المحاضرات وأرشيف الامتحانات والمناهج الرسمية.',
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
