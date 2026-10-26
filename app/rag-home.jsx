'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
  X,
} from 'lucide-react'

const featureCards = [
  {
    number: '01',
    Icon: FileText,
    title: 'إجابات موثوقة بمراجع دقيقة',
    description: 'استكشف الإجابات مع إحالات واضحة إلى ملفات PDF والصفحات ذات الصلة، لتعود إلى المصدر وتراجع المعلومة بثقة.',
    detail: 'المصدر قريب من كل إجابة',
  },
  {
    number: '02',
    Icon: BookOpen,
    title: 'تغطية شاملة للمناهج',
    description: 'مساحة منظمة لمواد الإعلام الآلي، من الخوارزميات وهياكل البيانات إلى قواعد البيانات والشبكات.',
    detail: 'مواد علوم الحاسوب',
  },
  {
    number: '03',
    Icon: MessageCircle,
    title: 'تفاعل سريع وسهل',
    description: 'اسأل بالعربية، تنقّل ببساطة بين مواضيعك، وواصل المراجعة ضمن تجربة واضحة ومريحة.',
    detail: 'واجهة عربية من البداية',
  },
]

const universityDocuments = [
  'المحاضرات',
  'أرشيف الامتحانات',
  'المناهج الرسمية',
]

export function RagLanding({ onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function openAuth(mode) {
    setIsMobileMenuOpen(false)
    onNavigate('auth', mode)
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  const navigationLinks = [
    { href: '#home', label: 'الرئيسية' },
    { href: '#subjects', label: 'المواد المتاحة' },
    { href: '#about', label: 'عن المنصة' },
  ]

  return (
    <main dir="rtl" className="min-h-dvh overflow-hidden bg-[#F4F7FB] text-[#243247]">
      <header className="sticky top-0 z-30 border-b border-[#C9D7E8]/80 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="RAG-USTHB، الرئيسية">
            <img
              src="/usthb-logo.png"
              alt="شعار جامعة العلوم والتكنولوجيا هواري بومدين"
              width="100"
              height="99"
              className="size-11 shrink-0 object-contain sm:size-12"
            />
            <span className="min-w-0">
              <span dir="ltr" className="block text-left text-[15px] font-extrabold tracking-tight text-[#0B2D5C] sm:text-base">
                RAG-USTHB
              </span>
              <span className="mt-0.5 block truncate text-[10px] font-medium text-[#243247]/65 sm:text-[11px]">
                مساعدك الأكاديمي الذكي
              </span>
            </span>
          </a>

          <nav aria-label="التنقل الرئيسي" className="hidden items-center justify-center gap-8 lg:flex">
            {navigationLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="rounded-lg px-1 py-2 text-sm font-semibold text-[#243247]/75 transition hover:text-[#1565C0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1565C0]"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center justify-self-end gap-2.5 lg:flex">
            <button
              type="button"
              onClick={() => openAuth('login')}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1565C0]/35 bg-white px-4 text-sm font-bold text-[#0B2D5C] transition hover:border-[#1565C0] hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => openAuth('register')}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1565C0] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0B2D5C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
            >
              إنشاء حساب
            </button>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="landing-mobile-menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center justify-self-end rounded-xl border border-[#C9D7E8] bg-white text-[#0B2D5C] transition hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0] lg:hidden"
          >
            {isMobileMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div id="landing-mobile-menu" className="border-t border-[#C9D7E8] bg-white px-4 pb-4 pt-3 sm:px-6 lg:hidden">
            <nav aria-label="التنقل الرئيسي" className="flex flex-col gap-1">
              {navigationLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-[#243247] transition hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0]"
                >
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => openAuth('login')}
                className="min-h-11 rounded-xl border border-[#1565C0]/40 px-3 text-sm font-bold text-[#0B2D5C] transition hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0]"
              >
                تسجيل الدخول
              </button>
              <button
                type="button"
                onClick={() => openAuth('register')}
                className="min-h-11 rounded-xl bg-[#1565C0] px-3 text-sm font-bold text-white transition hover:bg-[#0B2D5C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0]"
              >
                إنشاء حساب
              </button>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative isolate scroll-mt-24 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-28 size-[420px] rounded-full bg-[#1565C0]/10 blur-[90px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 size-[380px] rounded-full bg-[#0B2D5C]/[0.06] blur-[90px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1565C0]/15 bg-white px-3.5 py-2 text-xs font-bold text-[#0B2D5C] shadow-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1565C0]">
                <Sparkles size={14} aria-hidden="true" />
              </span>
              منصة معرفية لطلاب USTHB
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.35] tracking-tight text-[#0B2D5C] sm:text-5xl lg:text-[3.45rem]">
              مساعدك الأكاديمي الذكي لطلاب{' '}
              <span className="text-[#1565C0]">جامعة العلوم والتكنولوجيا وهران</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#243247]/75 sm:text-lg">
              ابحث في المحاضرات، أرشيف الامتحانات والمناهج الرسمية عبر تجربة مبنية على الاسترجاع المعزز بالتوليد، مع إجابات تساعدك على الوصول إلى المعلومة ومصدرها.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onNavigate('chat')}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#1565C0] px-6 text-sm font-extrabold text-white shadow-[0_14px_30px_-14px_rgba(21,101,192,0.75)] transition hover:-translate-y-0.5 hover:bg-[#0B2D5C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
              >
                ابدأ استخدام المنصة الآن
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <a
                href="#subjects"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold text-[#0B2D5C] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
              >
                تعرّف على المزايا
                <ArrowLeft size={15} aria-hidden="true" />
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-[#243247]/70">
              {universityDocuments.map((document) => (
                <li key={document} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={15} className="shrink-0 text-[#1565C0]" aria-hidden="true" />
                  {document}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:me-0">
            <div aria-hidden="true" className="absolute -right-5 top-12 size-20 rounded-3xl border border-[#1565C0]/15 bg-white/80 rotate-12" />
            <div aria-hidden="true" className="absolute -bottom-5 -left-4 size-24 rounded-full border-[12px] border-[#1565C0]/10" />

            <div className="relative overflow-hidden rounded-[30px] border border-[#C9D7E8] bg-white shadow-[0_30px_80px_-38px_rgba(11,45,92,0.45)]">
              <div className="flex items-center justify-between gap-4 bg-[#0B2D5C] px-5 py-4 text-white sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                    <BookOpen size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">اسأل موادك الدراسية</p>
                    <p className="mt-0.5 text-[10px] text-white/65">بحث أكاديمي بمصادر واضحة</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/90">
                  مثال توضيحي
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 rounded-2xl border border-[#C9D7E8] bg-[#F4F7FB] px-4 py-3.5">
                  <Search size={18} className="shrink-0 text-[#1565C0]" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-[#243247]">
                    ما التعقيد الزمني لخوارزمية البحث الثنائي؟
                  </p>
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1565C0]">
                    <Sparkles size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-[#0B2D5C]">إجابة مرتبطة بالمصدر</p>
                    <p className="mt-1.5 text-xs leading-6 text-[#243247]/75">
                      يعمل البحث الثنائي على تقليص مجال البحث إلى النصف في كل خطوة، لذلك يكون تعقيده{' '}
                      <span dir="ltr" className="font-bold text-[#1565C0]">O(log n)</span>.
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#C9D7E8] pt-4">
                  <div className="mb-2.5 flex items-center justify-between gap-3">
                    <p className="text-[11px] font-bold text-[#0B2D5C]">مراجع مقترحة</p>
                    <span className="text-[10px] text-[#243247]/50">ملفات PDF</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span dir="ltr" className="inline-flex items-center gap-2 rounded-lg border border-[#C9D7E8] bg-white px-2.5 py-2 text-[10px] font-semibold text-[#243247]">
                      <FileText size={14} className="text-[#1565C0]" aria-hidden="true" />
                      Algorithms_L1.pdf · ص 12
                    </span>
                    <span dir="ltr" className="inline-flex items-center gap-2 rounded-lg border border-[#C9D7E8] bg-white px-2.5 py-2 text-[10px] font-semibold text-[#243247]">
                      <FileText size={14} className="text-[#1565C0]" aria-hidden="true" />
                      Ch3_Notes.pdf · ص 4
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="subjects" className="scroll-mt-24 border-y border-[#C9D7E8]/80 bg-white/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold tracking-wide text-[#1565C0]">لماذا RAG-USTHB؟</p>
              <h2 className="mt-2 text-2xl font-extrabold leading-9 text-[#0B2D5C] sm:text-3xl">
                مذاكرة أوضح، ومعلومة أقرب إلى مصدرها
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#243247]/70">
              أدوات بسيطة تساعدك على التركيز في محتوى تخصصك، وتنظيم رحلة المراجعة خطوة بخطوة.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            {featureCards.map(({ number, Icon, title, description, detail }, index) => (
              <article
                key={number}
                className={`group relative flex min-h-[270px] flex-col overflow-hidden rounded-[26px] border border-[#C9D7E8] bg-white p-6 shadow-[0_8px_28px_-22px_rgba(11,45,92,0.45)] transition hover:-translate-y-1 hover:border-[#1565C0]/45 hover:shadow-[0_18px_42px_-24px_rgba(11,45,92,0.38)] sm:p-7 ${
                  index === 0 ? 'lg:col-span-5' : index === 1 ? 'lg:col-span-4' : 'lg:col-span-3'
                }`}
              >
                <div aria-hidden="true" className="absolute -left-12 -top-12 size-36 rounded-full bg-[#EAF2FF] transition group-hover:bg-[#1565C0]/10" />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#EAF2FF] text-[#1565C0]">
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span dir="ltr" className="text-xs font-extrabold tracking-[0.18em] text-[#1565C0]/55">
                    {number}
                  </span>
                </div>
                <h3 className="relative mt-6 text-lg font-extrabold leading-8 text-[#0B2D5C]">{title}</h3>
                <p className="relative mt-2 text-sm leading-7 text-[#243247]/70">{description}</p>
                <div className="relative mt-auto flex items-center gap-2 pt-5 text-xs font-bold text-[#1565C0]">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  {detail}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[30px] bg-[#0B2D5C] p-6 text-white shadow-[0_26px_70px_-42px_rgba(11,45,92,0.75)] sm:p-9 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/90">
              <GraduationCap size={15} aria-hidden="true" />
              عن المنصة
            </div>
            <h2 className="mt-5 max-w-xl text-2xl font-extrabold leading-10 sm:text-3xl">
              معرفة جامعية منظمة، بتجربة صُممت لطلاب USTHB
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">
              يجمع RAG-USTHB بين سهولة السؤال والرجوع إلى المحتوى الدراسي، حتى تكون مراجعتك أكثر تركيزاً ووضوحاً.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('chat')}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-[#0B2D5C] transition hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              استكشف المنصة
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { step: '01', title: 'اختر المادة', text: 'ابدأ من تخصصك ومقرراتك.' },
              { step: '02', title: 'اطرح سؤالك', text: 'صغ ما تريد مراجعته بالعربية.' },
              { step: '03', title: 'راجع المصدر', text: 'تابع المعلومة إلى مرجعها.' },
            ].map(({ step, title, text }) => (
              <div key={step} className="rounded-2xl border border-white/15 bg-white/[0.07] p-4">
                <span dir="ltr" className="text-xs font-extrabold tracking-widest text-white/55">{step}</span>
                <h3 className="mt-5 text-sm font-extrabold">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#C9D7E8] bg-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center text-[11px] text-[#243247]/60 sm:flex-row sm:items-center sm:justify-between sm:text-right">
          <p>RAG-USTHB · مساعدك الأكاديمي الذكي</p>
          <p>جامعة العلوم والتكنولوجيا هواري بومدين</p>
        </div>
      </footer>
    </main>
  )
}
