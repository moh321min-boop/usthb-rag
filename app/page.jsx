'use client'

import { useState } from 'react'
import {
  BookOpen,
  ChevronDown,
  FileText,
  History,
  Paperclip,
  Search,
  Send,
  X,
} from 'lucide-react'

const subjects = [
  ['L1', 'الخوارزميات', 'Algorithms', 'bg-teal-50 text-teal-700'],
  ['L1', 'التحليل 1', 'Analysis 1', 'bg-slate-100 text-slate-700'],
  ['L1', 'الجبر 1', 'Algebra 1', 'bg-teal-50 text-teal-700'],
  ['L1', 'الفيزياء 1', 'Physics 1', 'bg-slate-100 text-slate-700'],
]

const historyItems = [
  ['Binary search complexity', 'Today, 10:42 AM'],
  ['Recursion exercises', 'Yesterday, 6:18 PM'],
  ['Sorting algorithms review', 'Mar 12, 2:05 PM'],
]

const documentItems = [
  ['Ch3_Notes.pdf', 'PDF · 2.4 MB', 'Lecture notes covering algorithmic complexity and search methods.'],
  ['Algorithms_L1.pdf', 'PDF · 4.8 MB', 'Course handbook for first-year algorithms and data structures.'],
  ['TD02_Exercises.pdf', 'PDF · 1.1 MB', 'Tutorial exercises with guided solutions for week two.'],
]

const messages = [
  { role: 'user', text: 'ما هو التعقيد الزمني لخوارزمية البحث الثنائي؟' },
  { role: 'assistant', text: 'التعقيد الزمني لخوارزمية البحث الثنائي هو O(log n)، لأنها تقلل مساحة البحث إلى النصف في كل خطوة. يجب أن تكون البيانات مرتبة مسبقاً حتى تعمل الخوارزمية بشكل صحيح.', citation: 'Ch3_Notes.pdf' },
  { role: 'user', text: 'هل يمكنك توضيح الفرق بينها وبين البحث الخطي؟' },
  { role: 'assistant', text: 'بالتأكيد. البحث الخطي يفحص العناصر واحداً تلو الآخر وتعقيده O(n)، بينما البحث الثنائي أسرع بكثير بتعقيد O(log n)، لكنه يتطلب مصفوفة مرتبة. عملياً، نختار البحث الثنائي عند توفر ترتيب مسبق وحجم بيانات كبير، ونستخدم البحث الخطي عندما تكون البيانات غير مرتبة أو عندما يكون عدد العناصر صغيراً.', citation: 'Algorithms_L1.pdf' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('subjects')
  const [input, setInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDocument, setSelectedDocument] = useState(null)
  const tabs = [
    ['subjects', 'Subjects', BookOpen],
    ['history', 'Previous chats', History],
    ['documents', 'Uploaded documents', FileText],
  ]

  const filteredItems = activeTab === 'history'
    ? historyItems.filter(([title]) => title.toLowerCase().includes(searchQuery.toLowerCase()))
    : documentItems.filter(([name]) => name.toLowerCase().includes(searchQuery.toLowerCase()))

  function submitQuestion(event) {
    event.preventDefault()
    if (input.trim()) setInput('')
  }

  function openDocument(name) {
    const document = documentItems.find(([fileName]) => fileName === name)
    if (document) setSelectedDocument({ name: document[0], meta: document[1], description: document[2] })
  }

  return (
    <main dir="ltr" className="min-h-screen bg-slate-50 text-slate-700">
      <aside className="fixed inset-y-0 left-0 z-10 flex w-[264px] flex-col border-r border-slate-200 bg-white text-slate-700 max-md:w-[72px]">
        <div className="flex h-[74px] items-center gap-3 border-b border-slate-100 px-5 max-md:justify-center max-md:px-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-teal-600 text-base font-bold text-white">R</div>
          <div className="max-md:hidden"><h1 className="text-[16px] font-bold">RAG-USTHB</h1><p className="text-[10px] text-slate-400">Your smart study assistant</p></div>
        </div>
        <nav aria-label="Main navigation" className="flex flex-col gap-1 p-3 max-md:p-2">
          {tabs.map(([id, label, Icon]) => <button key={id} type="button" onClick={() => { setActiveTab(id); setSearchQuery('') }} aria-current={activeTab === id ? 'page' : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors max-md:justify-center max-md:px-2 ${activeTab === id ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-500 hover:bg-teal-50 hover:text-teal-700'}`}><Icon size={17} strokeWidth={1.8} aria-hidden="true" /><span className="max-md:hidden">{label}</span></button>)}
        </nav>
        <div className="sidebar-scroll flex-1 overflow-y-auto px-3 pb-4 max-md:px-2">
          {activeTab !== 'subjects' && <div className="relative mb-3 pt-3"><Search size={15} className="absolute left-3 top-[23px] text-slate-400" aria-hidden="true" /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={`Search ${activeTab === 'history' ? 'chats' : 'files'}...`} aria-label={`Search ${activeTab === 'history' ? 'previous chats' : 'uploaded documents'}`} className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-2 text-xs outline-none transition focus:border-teal-400 focus:bg-white" /></div>}
          {activeTab === 'subjects' && <section className="pt-4"><p className="mb-2 px-2 text-[11px] font-semibold text-slate-400 max-md:hidden">Your subjects</p><div className="flex flex-col gap-2">{subjects.map(([code, title, subtitle, color]) => <button key={title} type="button" className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50 p-2.5 text-left transition hover:border-teal-200 hover:bg-teal-50 max-md:justify-center max-md:p-2"><span className={`flex size-8 items-center justify-center rounded-md text-[10px] font-bold ${color}`}>{code}</span><span className="max-md:hidden"><span className="block text-[13px] font-semibold">{subtitle}</span><span className="block text-[10px] text-slate-400">{title}</span></span></button>)}</div></section>}
          {activeTab === 'history' && <section className="pt-2"><p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400 max-md:hidden">Recent chats</p><div className="flex flex-col gap-1.5 max-md:hidden">{filteredItems.map(([title, date]) => <button key={title} type="button" className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2.5 text-left transition hover:border-teal-200 hover:bg-teal-50"><span className="block truncate text-xs font-medium text-slate-700">{title}</span><span className="mt-1 block text-[10px] text-slate-400">{date}</span></button>)}</div></section>}
          {activeTab === 'documents' && <section className="pt-2"><div className="mb-2 flex items-center justify-between px-2 max-md:hidden"><p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Your files</p><span className="text-[10px] text-teal-600">{filteredItems.length} files</span></div><div className="flex flex-col gap-1.5 max-md:hidden">{filteredItems.map(([name, meta, description]) => <button key={name} type="button" onClick={() => setSelectedDocument({ name, meta, description })} className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2.5 text-left transition hover:border-teal-200 hover:bg-teal-50"><span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600"><FileText size={14} strokeWidth={1.8} /></span><span className="min-w-0"><span className="block truncate text-xs font-medium text-slate-700">{name}</span><span className="mt-1 block text-[10px] text-slate-400">{meta}</span></span></button>)}</div></section>}
        </div>
        <div className="border-t border-slate-100 px-4 py-3 text-center text-[10px] text-slate-400 max-md:hidden">Houari Boumediene University</div>
      </aside>

      <section className="ml-[264px] flex min-h-screen flex-col max-md:ml-[72px]">
        <header className="flex h-[74px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-7 max-md:px-3"><div className="w-8" /><div className="text-center"><h2 className="text-sm font-bold text-slate-800">Algorithms L1</h2><p className="mt-0.5 text-[11px] text-slate-400">L1 الخوارزميات</p></div><img src="/profile-avatar.png" alt="Profile" className="size-9 rounded-full border-2 border-teal-200 object-cover" /></header>
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 pb-32 pt-6 sm:px-7"><div className="flex flex-col gap-4">{messages.map((message, index) => <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className="flex max-w-[84%] flex-col gap-1.5"><div dir="rtl" className={`rounded-xl px-4 py-3 text-[13px] leading-7 shadow-sm ${message.role === 'user' ? 'rounded-tr-md bg-teal-600 text-white' : 'rounded-tl-md border border-slate-200 bg-white text-slate-700'}`}>{message.text}</div>{message.citation && <button type="button" onClick={() => openDocument(message.citation)} className="flex w-52 items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-2 text-left shadow-sm transition hover:border-indigo-400"><FileText size={14} className="shrink-0 text-indigo-600" /><span className="min-w-0 flex-1 truncate text-[11px] font-medium text-slate-600" dir="ltr">{message.citation}</span><ChevronDown size={13} className="rotate-[-90deg] text-slate-400" /></button>}</div></div>)}</div></div>
        <div className="fixed bottom-4 left-[264px] right-0 px-5 max-md:left-[72px] max-md:px-2"><form onSubmit={submitQuestion} className="mx-auto flex max-w-2xl items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_8px_24px_rgb(15,43,67,0.10)]"><button type="button" aria-label="Upload a file" className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors ${activeTab === 'documents' ? 'bg-teal-50 text-teal-700 hover:bg-teal-100' : 'text-slate-300'}`} disabled={activeTab !== 'documents'}><Paperclip size={16} /></button><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about your subjects..." className="min-w-0 flex-1 bg-transparent px-2 text-xs text-slate-700 outline-none placeholder:text-slate-400" aria-label="Type your question" /><button type="submit" aria-label="Send message" disabled={!input.trim()} className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-teal-600 disabled:opacity-50"><Send size={15} /></button></form></div>
      </section>

      {selectedDocument && <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/35 p-4" role="dialog" aria-modal="true" aria-label={`Preview ${selectedDocument.name}`} onClick={() => setSelectedDocument(null)}><div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><FileText size={20} /></div><div><h3 className="text-sm font-bold text-slate-800">{selectedDocument.name}</h3><p className="mt-0.5 text-[11px] text-slate-400">{selectedDocument.meta}</p></div></div><button type="button" onClick={() => setSelectedDocument(null)} aria-label="Close preview" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={17} /></button></div><div className="mt-5 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/60 p-5"><div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm"><FileText size={26} /></div><p className="mt-3 text-center text-xs font-semibold text-slate-700">Document preview</p><p className="mt-1 text-center text-[11px] leading-5 text-slate-500">{selectedDocument.description}</p></div><button type="button" onClick={() => setSelectedDocument(null)} className="mt-4 w-full rounded-lg bg-teal-600 py-2.5 text-xs font-semibold text-white hover:bg-teal-700">Close preview</button></div></div>}
    </main>
  )
}

