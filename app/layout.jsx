import './globals.css'

export const metadata = {
  title: 'RAG-USTHB',
  description: 'مساعدك الدراسي الذكي لجامعة العلوم والتكنولوجيا هواري بومدين',
}

export default function RootLayout({ children }) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>
}
