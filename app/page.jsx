'use client'

import { useState } from 'react'
import { Home as HomeIcon, Menu } from 'lucide-react'
import { RagAuth } from './rag-auth'
import { RagChatFeed } from './rag-chat-feed'
import { RagLanding } from './rag-home'
import { RagComposer } from './rag-composer'
import { RagSidebar } from './rag-sidebar'
import { useChatManager } from './useChatManager'

export default function Home() {
  // 1. حالات التحكم بالتنقل بين الشاشات
  const [currentView, setCurrentView] = useState('home') // 'home' | 'auth' | 'chat'
  const [authMode, setAuthMode] = useState('login')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // 2. استدعاء منطق وحالات الدردشة بالكامل من الـ Custom Hook
  const {
    subjects,
    conversations,
    activeConversation,
    activeMessages,
    input,
    setInput,
    handleSelectConversation,
    handleQuestionSubmit,
  } = useChatManager()

  // 3. دالة التنقل بين الشاشات
  function handleViewNavigation(view, mode = 'login') {
    if (view === 'auth') setAuthMode(mode)
    setCurrentView(view)
  }

  // --- الشروط الخاصة بالتنقل بين الشاشات ---

  // الشاشة الأولى: الصفحة الرئيسية (Landing Page)
  if (currentView === 'home') {
    return <RagLanding onNavigate={handleViewNavigation} />
  }

  // الشاشة الثانية: صفحة المصادقة وتأكيد الدخول (Auth Page)
  if (currentView === 'auth') {
    return (
      <RagAuth
        initialMode={authMode}
        onNavigate={handleViewNavigation}
        onOpenDemo={() => setCurrentView('chat')}
      />
    )
  }

  // الشاشة الثالثة: واجهة الدردشة الأكاديمية (Chat Dashboard)
  return (
    <main dir="ltr" className="flex h-dvh min-h-dvh overflow-hidden bg-[#F4F7FB] text-[#243247]">
      {/* 1. الشريط الجانبي للمحادثات والمقاييس */}
      <RagSidebar
        subjects={subjects}
        conversations={conversations}
        activeSubjectId={activeSubject?.id}
        activeConversationId={activeConversation?.id}
        onSelectSubject={(id) => handleSelectSubject(id, () => setIsMobileSidebarOpen(false))}
        onSelectConversation={(id) => handleSelectConversation(id, () => setIsMobileSidebarOpen(false))}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. منطقة الشات الرئيسية */}
      <section aria-labelledby="chat-heading" className="flex h-dvh min-w-0 flex-1 flex-col overflow-hidden bg-[#F4F7FB] lg:ml-[272px]">
        {/* هيدر الدردشة العلوي */}
        <header className="flex h-[70px] shrink-0 items-center justify-between gap-3 border-b border-[#C9D7E8] bg-[#FFFFFF] px-3 sm:px-5">
          <button
            type="button"
            aria-label="Open sidebar menu"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl text-[#0B2D5C] transition hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0] lg:hidden"
          >
            <Menu size={20} aria-hidden="true" />
          </button>

          <div className="min-w-0 flex-1 text-center">
            <h1 id="chat-heading" className="truncate text-sm font-bold text-[#0B2D5C]">
              {activeSubject?.nameEn}
            </h1>
            <p className="mt-0.5 truncate text-[11px] text-[#243247]/65">
              {activeSubject?.nameAr} <span aria-hidden="true">·</span> Academic Chat
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden rounded-full border border-[#C9D7E8] bg-[#EAF2FF] px-2.5 py-1 text-[10px] font-semibold text-[#0B2D5C] sm:inline-flex">
              MVP Edition
            </span>
            <button
              type="button"
              aria-label="Back to landing page"
              title="Back to landing page"
              onClick={() => setCurrentView('home')}
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-[#C9D7E8] bg-white px-2.5 text-[11px] font-semibold text-[#0B2D5C] transition hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
            >
              <HomeIcon size={15} aria-hidden="true" />
              <span className="hidden md:inline">Home</span>
            </button>
            <img
              src="/profile-avatar.png"
              alt="Student user avatar"
              className="size-9 rounded-full border-2 border-[#C9D7E8] bg-[#EAF2FF] object-cover"
            />
          </div>
        </header>

        {/* 3. مكون عرض فقاعات المحادثة */}
        <div className="min-h-0 flex-1">
          <RagChatFeed
            conversationId={activeConversation?.id}
            messages={activeMessages}
            subject={activeSubject}
          />
        </div>

        {/* 4. فوتر إدخال الأسئلة */}
        <footer className="shrink-0 border-t border-[#C9D7E8] bg-[#FFFFFF] px-3 py-3 sm:px-5 sm:py-4">
          <div className="mx-auto w-full max-w-3xl">
            <RagComposer
              value={input}
              onChange={setInput}
              onSubmit={handleQuestionSubmit}
            />
            <p className="mt-2 text-center text-[10px] text-[#243247]/55">
              Press Enter to send · Shift + Enter for a new line
            </p>
          </div>
        </footer>
      </section>
    </main>
  )
}