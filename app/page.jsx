'use client'

import { useState } from 'react'

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
  ['Ch3_Notes.pdf', 'PDF · 2.4 MB'],
  ['Algorithms_L1.pdf', 'PDF · 4.8 MB'],
  ['TD02_Exercises.pdf', 'PDF · 1.1 MB'],
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
  const tabs = [['subjects', 'Subjects', '◈'], ['history', 'Previous chats', '↺'], ['documents', 'Uploaded documents', '▤']]

  function submitQuestion(event) {
    event.preventDefault()
    if (input.trim()) setInput('')
  }

  return (
    <main dir="ltr" className="min-h-screen bg-slate-50 text-slate-700">
      <aside className="fixed inset-y-0 left-0 z-10 flex w-[280px] flex-col border-r border-slate-200 bg-white text-slate-700 max-md:w-[82px]">
        <div className="flex h-[82px] items-center gap-3 border-b border-slate-100 px-6 max-md:justify-center max-md:px-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-teal-600 text-lg font-bold text-white">R</div>
          <div className="max-md:hidden"><h1 className="text-[17px] font-bold">RAG-USTHB</h1><p className="text-[11px] text-slate-400">Your smart study assistant</p></div>
        </div>
        <nav aria-label="Main navigation" className="flex flex-col gap-1.5 p-4 max-md:p-2">
          {tabs.map(([id, label, icon]) => <button key={id} type="button" onClick={() => setActiveTab(id)} aria-current={activeTab === id ? 'page' : undefined} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors max-md:justify-center max-md:px-2 ${activeTab === id ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-500 hover:bg-teal-50 hover:text-teal-700'}`}><span className="text-lg" aria-hidden="true">{icon}</span><span className="max-md:hidden">{label}</span></button>)}
        </nav>
        <div className="sidebar-scroll flex-1 overflow-y-auto px-4 pb-5 max-md:px-2">
          {activeTab === 'subjects' && <section className="pt-5"><p className="mb-3 px-2 text-xs font-semibold text-slate-400 max-md:hidden">Your subjects</p><div className="flex flex-col gap-2.5">{subjects.map(([code, title, subtitle, color]) => <button key={title} type="button" className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left hover:border-teal-200 hover:bg-teal-50 max-md:justify-center max-md:p-2"><span className={`flex size-9 items-center justify-center rounded-lg text-xs font-bold ${color}`}>{code}</span><span className="max-md:hidden"><span className="block text-sm font-semibold">{subtitle}</span><span className="block text-[11px] text-slate-400">{title}</span></span></button>)}</div></section>}
          {activeTab === 'history' && <section className="pt-5"><p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400 max-md:hidden">Recent chats</p><div className="flex flex-col gap-2 max-md:hidden">{historyItems.map(([title, date]) => <button key={title} type="button" className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-left hover:border-teal-200 hover:bg-teal-50"><span className="block truncate text-sm font-medium text-slate-700">{title}</span><span className="mt-1 block text-[11px] text-slate-400">{date}</span></button>)}</div></section>}
          {activeTab === 'documents' && <section className="pt-5"><div className="mb-3 flex items-center justify-between px-2 max-md:hidden"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Your files</p><span className="text-xs text-teal-600">3 files</span></div><div className="flex flex-col gap-2 max-md:hidden">{documentItems.map(([name, meta]) => <button key={name} type="button" className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-left hover:border-teal-200 hover:bg-teal-50"><span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-sm text-amber-600">▤</span><span className="min-w-0"><span className="block truncate text-sm font-medium text-slate-700">{name}</span><span className="mt-1 block text-[11px] text-slate-400">{meta}</span></span></button>)}</div></section>}
        </div>
        <div className="border-t border-slate-100 px-6 py-4 text-center text-[11px] text-slate-400 max-md:hidden">Houari Boumediene University</div>
      </aside>

      <section className="ml-[280px] flex min-h-screen flex-col max-md:ml-[82px]">
        <header className="flex h-[82px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 max-md:px-4"><div className="w-10" /><div className="text-center"><h2 className="text-base font-bold text-slate-800">Algorithms L1</h2><p className="mt-0.5 text-xs text-slate-400">L1 الخوارزميات</p></div><img src="/profile-avatar.png" alt="Profile" className="size-10 rounded-full border-2 border-teal-200 object-cover" /></header>
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 pb-36 pt-8"><div className="flex flex-col gap-5">{messages.map((message, index) => <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className="flex max-w-[82%] flex-col gap-2"><div dir={message.role === 'user' ? 'rtl' : 'rtl'} className={`rounded-2xl px-5 py-3.5 text-[14px] leading-8 shadow-sm ${message.role === 'user' ? 'rounded-tr-md bg-teal-600 text-white' : 'rounded-tl-md border border-slate-200 bg-white text-slate-700'}`}>{message.text}</div>{message.citation && <button type="button" className="flex w-56 items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-left shadow-sm hover:border-amber-400"><span className="text-sm text-amber-600">▤</span><span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-600" dir="ltr">{message.citation}</span><span className="text-xs text-slate-400">↗</span></button>}</div></div>)}</div></div>
        <div className="fixed bottom-5 left-[280px] right-0 px-6 max-md:left-[82px] max-md:px-3"><form onSubmit={submitQuestion} className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_8px_30px_rgb(15,43,67,0.10)]"><button type="button" aria-label="Upload a file" className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-lg transition-colors ${activeTab === 'documents' ? 'bg-teal-50 text-teal-700 hover:bg-teal-100' : 'text-slate-300'}`} disabled={activeTab !== 'documents'}>＋</button><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about your subjects..." className="min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400" aria-label="Type your question" /><button type="submit" aria-label="Send message" disabled={!input.trim()} className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-lg text-white hover:bg-teal-600 disabled:opacity-50">➤</button></form></div>
      </section>
    </main>
  )
}

<style jsx global>{`
  .sidebar-scroll { scrollbar-color: #0f766e #f1f5f9; scrollbar-width: thin; }
  .sidebar-scroll::-webkit-scrollbar { width: 7px; }
  .sidebar-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 999px; }
  .sidebar-scroll::-webkit-scrollbar-thumb { background: #5eead4; border: 2px solid #f1f5f9; border-radius: 999px; }
  .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #0f766e; }
`}</style>
    
