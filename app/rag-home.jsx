'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  LibraryBig,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
  X,
  Languages,
} from 'lucide-react'
import { RagThemeToggle } from './rag-theme-provider'

const translations = {
  en: {
    nav: {
      login: 'Sign In',
      register: 'Get Started',
      langToggle: 'العربية',
      theme: 'Theme',
      mobileMenu: 'Menu',
      closeMenu: 'Close Menu',
    },
    hero: {
      badge: 'USTHB Computer Science Knowledge Platform',
      title1: 'Your AI-Powered Academic Assistant at',
      titleHighlight: 'USTHB',
      description: 'Search official curricula, timetables, exam schedules, and academic resources through an advanced RAG experience with precise source attribution.',
      getStarted: 'Get Started Now',
      explore: 'Explore Features',
      documents: ['Official Curricula & Canevas', 'Timetables & Exams', 'Academic Archives'],
      previewTitle: 'Study Assistant',
      previewSub: 'Instant academic search',
      previewQuery: 'What is the time complexity of binary search?',
      previewAnswerTitle: 'Trusted Academic Answer',
      previewAnswerText: 'Binary search halves the search space at each step, resulting in a time complexity of',
      previewRefsTitle: 'Related Courses',
      previewRefsSub: 'Computer Science Dept',
    },
    features: {
      tag: 'Why RAG-USTHB?',
      title: 'Smarter Review & Easier Access to Curricula',
      description: 'Interactive tools designed specifically to help Computer Science students organize their study journey and achieve top results.',
      cards: [
        {
          number: '01',
          title: 'Official Curriculum Coverage',
          description: 'Computer Science courses and lectures at USTHB, from algorithms and data structures to databases and networks.',
          detail: 'Computer Science Dept',
        },
        {
          number: '02',
          title: 'Direct & Smart Chat',
          description: 'Ask freely about your lessons and study topics, and get clear, accurate explanations tailored for students.',
          detail: 'Fast Academic Interaction',
        },
        {
          number: '03',
          title: 'Lectures & Exam Archives',
          description: 'Instant and easy access to lecture content and past exam topics for effective test preparation.',
          detail: 'Verified Academic Content',
        },
      ],
    },
    about: {
      badge: 'About Platform',
      title: 'Integrated Knowledge Platform for USTHB Students',
      description: 'RAG-USTHB combines AI with official course content, ensuring a clear, reliable, and distraction-free study experience.',
      cta: 'Explore Platform Now',
      steps: [
        { step: '01', title: 'Select Subject', text: 'Choose your study courses.' },
        { step: '02', title: 'Ask Your Question', text: 'Inquire in English or Arabic.' },
        { step: '03', title: 'Get the Answer', text: 'Review accurate answers.' },
      ],
    },
    links: {
      tag: 'Selected Links',
      title: 'Useful University Resources',
      description: 'Navigate directly to the official website, university library, or campus location.',
      items: [
        {
          href: 'https://www.usthb.dz',
          label: 'Official University Website',
          detail: 'News and university services',
          Icon: Globe,
        },
        {
          href: 'https://bu.usthb.dz',
          label: 'University Library',
          detail: 'Catalog and library services',
          Icon: LibraryBig,
        },
        {
          href: 'https://www.google.com/maps/search/?api=1&query=USTHB%20Bab%20Ezzouar%20Algiers',
          label: 'University Map Location',
          detail: 'Bab Ezzouar, Algiers',
          Icon: MapPin,
        },
      ],
    },
    footer: {
      left: 'RAG-USTHB · Smart Academic AI Assistant',
      right: 'University of Science and Technology Houari Boumediene',
    },
  },
  ar: {
    nav: {
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      langToggle: 'English',
      theme: 'المظهر',
      mobileMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
    },
    hero: {
      badge: 'منصة المعرفة لطلاب إعلام آلي USTHB',
      title1: 'مساعدك الأكاديمي الذكي المدعوم بالذكاء الاصطناعي في',
      titleHighlight: 'USTHB',
      description: 'ابحث في المحاضرات، أرشيف الامتحانات والمناهج الرسمية عبر تجربة ذكية للاسترجاع المعزز بالتوليد، لإجابات دقيقة ومباشرة.',
      getStarted: 'ابدأ الآن',
      explore: 'استكشف المزايا',
      documents: ['المناهج والمقررات الرسمية', 'أرشيف الامتحانات والمحاضرات', 'المراجع الأكاديمية'],
      previewTitle: 'مساعد المواد الدراسية',
      previewSub: 'استفسار أكاديمي فوري',
      previewQuery: 'ما هو التعقيد الزمني لخوارزمية البحث الثنائي؟',
      previewAnswerTitle: 'إجابة أكاديمية موثوقة',
      previewAnswerText: 'يعمل البحث الثنائي على تقليص مجال البحث إلى النصف في كل خطوة، لذلك يكون تعقيده الزمني',
      previewRefsTitle: 'المقررات المرتبطة',
      previewRefsSub: 'قسم الإعلام الآلي',
    },
    features: {
      tag: 'لماذا RAG-USTHB؟',
      title: 'مراجعة أذكى ومقررات أسهل للوصول',
      description: 'أدوات تفاعلية صُممت خصيصاً لمساعدة طلاب كلية الإعلام الآلي في تنظيم رحلة المراجعة وتحصيل أفضل النتائج.',
      cards: [
        {
          number: '01',
          title: 'تغطية شاملة للمناهج الرسمية',
          description: 'مقررات ومحاضرات علوم الحاسوب والإعلام الآلي في USTHB، من الخوارزميات وهياكل البيانات إلى قواعد البيانات والشبكات.',
          detail: 'مقررات قسم الإعلام الآلي',
        },
        {
          number: '02',
          title: 'دردشة ذكية ومباشرة',
          description: 'اسأل واستفسر بحرية عن دروسك ومواضيعك الدراسية، واحصل على شروحات واضحة ودقيقة مصممة خصيصاً للطلاب.',
          detail: 'تفاعل أكاديمي سريع',
        },
        {
          number: '03',
          title: 'أرشيف المحاضرات والامتحانات',
          description: 'وصول فوري وسهل إلى محتوى المحاضرات وامتحانات السنوات السابقة لمراجعة شاملة وفعالة قبل الامتحانات.',
          detail: 'محتوى أكاديمي موثوق',
        },
      ],
    },
    about: {
      badge: 'عن المنصة',
      title: 'منصة معرفية متكاملة لطلاب USTHB',
      description: 'يجمع RAG-USTHB بين قوة الذكاء الاصطناعي ومحتوى المقررات الرسمية، لتستمتع بتجربة دراسية واضحة وخالية من التشتت.',
      cta: 'استكشف المنصة الآن',
      steps: [
        { step: '01', title: 'اختر المادة', text: 'حدد مقرراتك الدراسية.' },
        { step: '02', title: 'اطرح سؤالك', text: 'استفسر بالعربية أو الإنجليزية.' },
        { step: '03', title: 'احصل على الإجابة', text: 'راجع إجابات دقيقة وموثوقة.' },
      ],
    },
    links: {
      tag: 'روابط مختارة',
      title: 'موارد جامعية مفيدة',
      description: 'انتقل مباشرة إلى الموقع الرسمي، مكتبة الجامعة، أو موقع الحرم الجامعي.',
      items: [
        {
          href: 'https://www.usthb.dz',
          label: 'الموقع الرسمي للجامعة',
          detail: 'الأخبار والخدمات الجامعية',
          Icon: Globe,
        },
        {
          href: 'https://bu.usthb.dz',
          label: 'المكتبة الجامعية',
          detail: 'الفهرس والخدمات المكتبية',
          Icon: LibraryBig,
        },
        {
          href: 'https://www.google.com/maps/search/?api=1&query=USTHB%20Bab%20Ezzouar%20Algiers',
          label: 'موقع الجامعة على الخريطة',
          detail: 'باب الزوار، الجزائر العاصمة',
          Icon: MapPin,
        },
      ],
    },
    footer: {
      left: 'RAG-USTHB · مساعدك الأكاديمي الذكي',
      right: 'جامعة العلوم والتكنولوجيا هواري بومدين',
    },
  },
}

export function RagLanding({ onNavigate }) {
  const [lang, setLang] = useState('en')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const t = translations[lang]
  const isRtl = lang === 'ar'

  function toggleLanguage() {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }

  function openAuth(mode) {
    setIsMobileMenuOpen(false)
    onNavigate('auth', mode)
  }

  const featureIcons = [BookOpen, MessageCircle, FileText]

  return (
    <main dir={isRtl ? 'rtl' : 'ltr'} className="min-h-dvh overflow-hidden bg-background text-foreground">
      {/* Navbar Header */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="RAG-USTHB, Home">
            <img
              src="/usthb-logo.png"
              alt="USTHB Logo"
              width="100"
              height="99"
              className="size-11 shrink-0 object-contain sm:size-12"
            />
            <span className="min-w-0">
              <span dir="ltr" className="block text-left text-[15px] font-extrabold tracking-tight text-deep-blue sm:text-base">
                RAG-USTHB
              </span>
              <span className="mt-0.5 block truncate text-[10px] font-medium text-muted-foreground/65 sm:text-[11px]">
                {lang === 'en' ? 'Smart Academic Assistant' : 'مساعدك الأكاديمي الذكي'}
              </span>
            </span>
          </a>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3.5 text-xs font-bold text-deep-blue transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Languages size={15} aria-hidden="true" />
              {t.nav.langToggle}
            </button>
            <RagThemeToggle />
            <button
              type="button"
              onClick={() => openAuth('login')}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-link/35 bg-card px-4 text-sm font-bold text-deep-blue transition hover:border-link hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t.nav.login}
            </button>
            <button
              type="button"
              onClick={() => openAuth('register')}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t.nav.register}
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.mobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="landing-mobile-menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-deep-blue transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
          >
            {isMobileMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div id="landing-mobile-menu" className="border-t border-border bg-card px-4 pb-4 pt-3 sm:px-6 lg:hidden">
            <div className="flex items-center justify-between gap-2 rounded-xl border border-border bg-background px-3 py-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground"
              >
                <Languages size={14} aria-hidden="true" />
                {t.nav.langToggle}
              </button>
              <RagThemeToggle />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => openAuth('login')}
                className="min-h-11 rounded-xl border border-link/40 px-3 text-sm font-bold text-deep-blue transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                {t.nav.login}
              </button>
              <button
                type="button"
                onClick={() => openAuth('register')}
                className="min-h-11 rounded-xl bg-primary px-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                {t.nav.register}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative isolate scroll-mt-24 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-28 size-[420px] rounded-full bg-link/10 blur-[90px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 size-[380px] rounded-full bg-sidebar/[0.06] blur-[90px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-link/15 bg-card px-3.5 py-2 text-xs font-bold text-deep-blue shadow-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-link">
                <Sparkles size={14} aria-hidden="true" />
              </span>
              {t.hero.badge}
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.35] tracking-tight text-deep-blue sm:text-5xl lg:text-[3.45rem]">
              {t.hero.title1}{' '}
              <span className="mt-1 block text-link">{t.hero.titleHighlight}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground/75 sm:text-lg">
              {t.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onNavigate('chat')}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-primary px-6 text-sm font-extrabold text-primary-foreground shadow-[0_14px_30px_-14px_rgba(21,101,192,0.75)] transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t.hero.getStarted}
                <ArrowLeft size={18} aria-hidden="true" className={isRtl ? 'rotate-180' : ''} />
              </button>

              <a
                href="#features"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-link/35 bg-card px-6 text-sm font-bold text-deep-blue transition hover:border-link hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t.hero.explore}
                <ArrowLeft size={15} aria-hidden="true" className={isRtl ? 'rotate-180' : ''} />
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-muted-foreground/70">
              {t.hero.documents.map((document) => (
                <li key={document} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={15} className="shrink-0 text-link" aria-hidden="true" />
                  {document}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:me-0">
            <div aria-hidden="true" className="absolute -right-5 top-12 size-20 rounded-3xl border border-link/15 bg-card/80 rotate-12" />
            <div aria-hidden="true" className="absolute -bottom-5 -left-4 size-24 rounded-full border-[12px] border-link/10" />

            {/* معاينة التطبيق تماماً كما في الصورة المرفقة */}
            <div className="relative overflow-hidden rounded-[30px] border border-border bg-card shadow-[0_30px_80px_-38px_rgba(11,45,92,0.45)]">
              <div className="flex items-center justify-between gap-4 bg-sidebar px-5 py-4 text-sidebar-foreground sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-sidebar-foreground/10 text-sidebar-foreground ring-1 ring-sidebar-foreground/15">
                    <BookOpen size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{t.hero.previewTitle}</p>
                    <p className="mt-0.5 text-[10px] text-sidebar-foreground/65">{t.hero.previewSub}</p>
                  </div>
                </div>
                <span className="rounded-full border border-sidebar-foreground/20 bg-sidebar-foreground/10 px-2.5 py-1 text-[10px] font-semibold text-sidebar-foreground/90">
                  {lang === 'en' ? 'Live Demo' : 'مثال توضيحي'}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5">
                  <Search size={18} className="shrink-0 text-link" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-foreground">
                    {t.hero.previewQuery}
                  </p>
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-link">
                    <Sparkles size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-deep-blue">{t.hero.previewAnswerTitle}</p>
                    <p className="mt-1.5 text-xs leading-6 text-muted-foreground/75">
                      {t.hero.previewAnswerText}{' '}
                      <span dir="ltr" className="font-bold text-link">O(log n)</span>.
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-border pt-4">
                  <div className="mb-2.5 flex items-center justify-between gap-3">
                    <p className="text-[11px] font-bold text-deep-blue">{t.hero.previewRefsTitle}</p>
                    <span className="text-[10px] text-muted-foreground/50">{t.hero.previewRefsSub}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span dir="ltr" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-2 text-[10px] font-semibold text-foreground">
                      <FileText size={14} className="text-link" aria-hidden="true" />
                      Algorithms_L1
                    </span>
                    <span dir="ltr" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-2 text-[10px] font-semibold text-foreground">
                      <FileText size={14} className="text-link" aria-hidden="true" />
                      DataStructures_L2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (3 Equal Columns Grid) */}
      <section id="features" className="scroll-mt-24 border-y border-border/80 bg-card/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold tracking-wide text-link">{t.features.tag}</p>
              <h2 className="mt-2 text-2xl font-extrabold leading-9 text-deep-blue sm:text-3xl">
                {t.features.title}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground/70">
              {t.features.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.features.cards.map(({ number, title, description, detail }, index) => {
              const Icon = featureIcons[index] || BookOpen
              return (
                <article
                  key={number}
                  className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-[24px] border border-border bg-card p-6 shadow-[0_8px_28px_-22px_rgba(11,45,92,0.45)] transition hover:-translate-y-1 hover:border-link/45 hover:shadow-[0_18px_42px_-24px_rgba(11,45,92,0.38)] sm:p-7"
                >
                  <div aria-hidden="true" className="absolute -left-12 -top-12 size-36 rounded-full bg-secondary transition group-hover:bg-link/10" />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-link">
                      <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span dir="ltr" className="text-xs font-extrabold tracking-[0.18em] text-link/55">
                      {number}
                    </span>
                  </div>
                  <h3 className="relative mt-6 text-lg font-extrabold leading-8 text-deep-blue">{title}</h3>
                  <p className="relative mt-2 text-sm leading-7 text-muted-foreground/70">{description}</p>
                  <div className="relative mt-auto flex items-center gap-2 pt-5 text-xs font-bold text-link">
                    <CheckCircle2 size={15} aria-hidden="true" />
                    {detail}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[30px] bg-sidebar p-6 text-sidebar-foreground shadow-[0_26px_70px_-42px_rgba(11,45,92,0.75)] sm:p-9 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sidebar-foreground/20 bg-sidebar-foreground/10 px-3 py-1.5 text-[11px] font-bold text-sidebar-foreground/90">
              <GraduationCap size={15} aria-hidden="true" />
              {t.about.badge}
            </div>
            <h2 className="mt-5 max-w-xl text-2xl font-extrabold leading-10 sm:text-3xl">
              {t.about.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-sidebar-foreground/75">
              {t.about.description}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('chat')}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-card px-5 text-sm font-extrabold text-deep-blue transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring"
            >
              {t.about.cta}
              <ArrowLeft size={16} aria-hidden="true" className={isRtl ? 'rotate-180' : ''} />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {t.about.steps.map(({ step, title, text }) => (
              <div key={step} className="rounded-2xl border border-sidebar-foreground/15 bg-sidebar-foreground/[0.07] p-4 text-center sm:text-start">
                <span dir="ltr" className="text-xs font-extrabold tracking-widest text-sidebar-foreground/55">{step}</span>
                <h3 className="mt-3 text-sm font-extrabold">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-sidebar-foreground/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Useful Links Section */}
      <section aria-labelledby="useful-links-heading" className="border-t border-border bg-secondary/45 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="text-xs font-extrabold text-link">{t.links.tag}</p>
            <h2 id="useful-links-heading" className="mt-2 text-2xl font-extrabold text-deep-blue">{t.links.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground/70">{t.links.description}</p>
          </div>
          <ul className="grid gap-3 md:grid-cols-3">
            {t.links.items.map(({ href, label, detail, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-[96px] items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-link/50 hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-link transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-deep-blue">{label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground/65">{detail}</span>
                  </span>
                  <ExternalLink size={15} className="shrink-0 text-link" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center text-[11px] text-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:text-right">
          <p>{t.footer.left}</p>
          <p>{t.footer.right}</p>
        </div>
      </footer>
    </main>
  )
}