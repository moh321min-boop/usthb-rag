'use client'

import { BookOpen, FileText, History, Search, X } from 'lucide-react'

const navigationItems = [
  { id: 'subjects', label: 'المواد', Icon: BookOpen },
  { id: 'history', label: 'محادثات سابقة', Icon: History },
  { id: 'documents', label: 'مستندات مرفوعة', Icon: FileText },
]

function EmptyState({ children }) {
  return (
    <p className="rounded-xl border border-dashed border-[#C9D7E8] bg-[#F4F7FB] px-3 py-4 text-center text-xs leading-6 text-[#243247]/75">
      {children}
    </p>
  )
}

export function RagSidebar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchQueryChange,
  subjects,
  conversations,
  documents,
  activeSubjectId,
  activeConversationId,
  onSelectSubject,
  onSelectConversation,
  onOpenDocument,
  isMobileOpen,
  onCloseMobile,
}) {
  const searchLabel = {
    subjects: 'ابحث عن مادة',
    history: 'ابحث في المحادثات',
    documents: 'ابحث عن مستند',
  }[activeTab]

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة الجانبية"
          className="fixed inset-0 z-40 bg-[#0B2D5C]/45 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="study-sidebar"
        dir="rtl"
        aria-label="قائمة الدراسة"
        className={`fixed inset-y-0 left-0 z-50 ${isMobileOpen ? 'flex' : 'hidden'} w-[min(88vw,272px)] flex-col border-r border-[#1565C0]/60 bg-[#0B2D5C] text-[#F4F7FB] lg:flex lg:w-[272px] ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 lg:translate-x-0`}
      >
        <div className="flex min-h-[76px] items-center gap-3 border-b border-[#1565C0]/60 px-4 py-3">
          <div
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#1565C0] text-[#FFFFFF]"
          >
            <BookOpen size={23} strokeWidth={1.8} />
          </div>
          <div className="min-w-0 flex-1">
            <p dir="ltr" className="truncate text-left text-sm font-bold tracking-wide text-[#FFFFFF]">
              RAG-USTHB
            </p>
            <p className="mt-0.5 truncate text-[11px] text-[#EAF2FF]/75">مساعدك الدراسي الذكي</p>
          </div>
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={onCloseMobile}
            className="rounded-lg p-2 text-[#F4F7FB] transition hover:bg-[#1565C0]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4F7FB] lg:hidden"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="التنقل الرئيسي" className="flex flex-col gap-1.5 border-b border-[#1565C0]/60 p-3">
          {navigationItems.map(({ id, label, Icon }) => {
            const isActive = activeTab === id

            return (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-right text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0] ${
                  isActive
                    ? 'bg-[#1565C0] text-[#FFFFFF] shadow-sm'
                    : 'text-[#EAF2FF] hover:bg-[#1565C0]/30'
                }`}
              >
                <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                <span>{label}</span>
              </button>
            )
          })}
        </nav>

        <div className="border-b border-[#1565C0]/60 p-3">
          <label className="relative block">
            <span className="sr-only">{searchLabel}</span>
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#1565C0]"
            />
            <input
              type="search"
              dir="rtl"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              placeholder={searchLabel}
              className="h-10 w-full rounded-xl border border-[#C9D7E8] bg-[#F4F7FB] pr-10 pl-3 text-xs text-[#243247] outline-none transition placeholder:text-[#243247]/55 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15"
            />
          </label>
        </div>

        <div className="app-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          {activeTab === 'subjects' && (
            <section aria-labelledby="subjects-heading">
              <h2 id="subjects-heading" className="mb-3 px-1 text-[11px] font-bold text-[#EAF2FF]/75">
                المواد الدراسية
              </h2>
              {subjects.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {subjects.map((subject) => {
                    const isActive = subject.id === activeSubjectId

                    return (
                      <li key={subject.id}>
                        <button
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => onSelectSubject(subject.id)}
                          className={`flex min-h-[58px] w-full items-center gap-3 rounded-xl border p-2.5 text-right transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0] ${
                            isActive
                              ? 'border-[#1565C0] bg-[#F4F7FB] shadow-sm'
                              : 'border-[#C9D7E8] bg-[#EAF2FF] hover:border-[#1565C0] hover:bg-[#F4F7FB]'
                          }`}
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0B2D5C] text-[10px] font-bold text-[#F4F7FB]">
                            {subject.code}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-semibold text-[#243247]">
                              {subject.nameAr}
                            </span>
                            <span dir="ltr" className="mt-0.5 block truncate text-left text-[10px] text-[#243247]/65">
                              {subject.nameEn}
                            </span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <EmptyState>لا توجد مادة تطابق عبارة البحث.</EmptyState>
              )}
            </section>
          )}

          {activeTab === 'history' && (
            <section aria-labelledby="history-heading">
              <h2 id="history-heading" className="mb-3 px-1 text-[11px] font-bold text-[#EAF2FF]/75">
                محادثاتك السابقة
              </h2>
              {conversations.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {conversations.map((conversation) => {
                    const isActive = conversation.id === activeConversationId

                    return (
                      <li key={conversation.id}>
                        <button
                          type="button"
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => onSelectConversation(conversation.id)}
                          className={`w-full rounded-xl border px-3 py-3 text-right transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0] ${
                            isActive
                              ? 'border-[#1565C0] bg-[#F4F7FB]'
                              : 'border-[#C9D7E8] bg-[#EAF2FF] hover:border-[#1565C0] hover:bg-[#F4F7FB]'
                          }`}
                        >
                          <span className="block truncate text-xs font-semibold text-[#243247]">
                            {conversation.title}
                          </span>
                          <span className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#243247]/65">
                            <History size={12} aria-hidden="true" />
                            {conversation.updatedAt}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <EmptyState>لا توجد محادثات تطابق عبارة البحث.</EmptyState>
              )}
            </section>
          )}

          {activeTab === 'documents' && (
            <section aria-labelledby="documents-heading">
              <div className="mb-3 flex items-center justify-between gap-2 px-1">
                <h2 id="documents-heading" className="text-[11px] font-bold text-[#EAF2FF]/75">
                  المستندات المتاحة
                </h2>
                <span className="text-[10px] font-semibold text-[#1565C0]">
                  {documents.length} {documents.length === 1 ? 'ملف' : 'ملفات'}
                </span>
              </div>
              {documents.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {documents.map((document) => (
                    <li key={document.id}>
                      <button
                        type="button"
                        onClick={() => onOpenDocument(document)}
                        className="flex min-h-[58px] w-full items-center gap-2.5 rounded-xl border border-[#C9D7E8] bg-[#EAF2FF] px-2.5 py-2.5 text-right transition hover:border-[#1565C0] hover:bg-[#F4F7FB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0]"
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#0B2D5C] text-[#F4F7FB]">
                          <FileText size={15} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span dir="ltr" className="block truncate text-left text-xs font-semibold text-[#243247]">
                            {document.name}
                          </span>
                          <span className="mt-1 block truncate text-[10px] text-[#243247]/65">
                            {document.fileType} · {document.sizeLabel}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState>لا توجد مستندات تطابق عبارة البحث.</EmptyState>
              )}
            </section>
          )}
        </div>

        <div className="border-t border-[#1565C0]/60 px-4 py-3 text-center text-[10px] leading-5 text-[#EAF2FF]/75">
          جامعة العلوم والتكنولوجيا هواري بومدين
          <span dir="ltr" className="mt-0.5 block">USTHB · Algiers</span>
        </div>
      </aside>
    </>
  )
}
