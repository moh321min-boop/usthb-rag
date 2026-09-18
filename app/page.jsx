'use client'

import { useState } from 'react'

const subjects = [
  ['L1', 'الخوارزميات', 'Algorithms', 'bg-teal-50 text-teal-600'],
  ['L1', 'التحليل 1', 'Analysis 1', 'bg-slate-100 text-slate-700'],
  ['L1', 'الجبر 1', 'Algebra 1', 'bg-teal-50 text-teal-600'],
  ['L1', 'الفيزياء 1', 'Physics 1', 'bg-slate-100 text-slate-700'],
]

const messages = [
  { role: 'user', text: 'ما هو التعقيد الزمني لخوارزمية البحث الثنائي؟' },
  { role: 'assistant', text: 'التعقيد الزمني لخوارزمية البحث الثنائي هو O(log n)، لأنها تقلل مساحة البحث إلى النصف في كل خطوة. يجب أن تكون البيانات مرتبة مسبقاً حتى تعمل الخوارزمية بشكل صحيح.', citation: 'Ch3_Notes.pdf' },
  { role: 'user', text: 'هل يمكنك توضيح الفرق بينها وبين البحث الخطي؟' },
  { role: 'assistant', text: 'بالتأكيد. البحث الخطي يفحص العناصر واحداً تلو الآخر وتعقيده O(n)، بينما البحث الثنائي أسرع بكثير بتعقيد O(log n)، لكنه يتطلب مصفوفة مرتبة.', citation: 'Algorithms_L1.pdf' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('subjects')
  const [input, setInput] = useState('')
  const tabs = [['subjects', 'المواد', '◈'], ['history', 'محادثات سابقة', '↺'], ['documents', 'مستندات مرفوعة', '▤']]

  function submitQuestion(event) {
    event.preventDefault()
    if (input.trim()) setInput('')
  }

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-700">
      <aside className="fixed inset-y-0 right-0 z-10 flex w-[280px] flex-col border-l border-slate-200 bg-white text-slate-700 max-md:w-[82px]">
        <div className="flex h-[82px] items-center gap-3 border-b border-white/10 px-6 max-md:justify-center max-md:px-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-teal-600 text-lg font-bold text-white">R</div>
          <div className="max-md:hidden"><h1 className="text-[17px] font-bold">RAG-USTHB</h1><p className="text-[11px] text-slate-300">مساعدك الدراسي الذكي</p></div>
        </div>
        <nav aria-label="التنقل الرئيسي" className="flex flex-col gap-1.5 p-4 max-md:p-2">
          {tabs.map(([id, label, icon]) => <button key={id} type="button" onClick={() => setActiveTab(id)} aria-current={activeTab === id ? 'page' : undefined} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition max-md:justify-center max-md:px-2 ${activeTab === id ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}><span className="text-lg" aria-hidden="true">{icon}</span><span className="max-md:hidden">{label}</span></button>)}
        </nav>
        <div className="flex-1 overflow-y-auto px-4 pb-5 max-md:px-2">
          {activeTab === 'subjects' ? <section className="pt-5"><p className="mb-3 px-2 text-xs font-semibold text-slate-400 max-md:hidden">موادك الدراسية</p><div className="flex flex-col gap-2.5">{subjects.map(([code, title, subtitle, color]) => <button key={title} type="button" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-right hover:bg-white/10 max-md:justify-center max-md:p-2"><span className={`flex size-9 items-center justify-center rounded-lg text-xs font-bold ${color}`}>{code}</span><span className="max-md:hidden"><span className="block text-sm font-semibold">{title}</span><span className="block text-[11px] text-slate-400">{subtitle}</span></span></button>)}</div></section> : <div className="flex flex-col items-center gap-2 px-3 pt-20 text-center max-md:hidden"><span className="text-2xl text-slate-400">▤</span><p className="text-sm font-medium text-slate-200">{activeTab === 'history' ? 'لا توجد محادثات سابقة' : 'لا توجد مستندات'}</p><p className="text-xs text-slate-400">{activeTab === 'history' ? 'ستظهر محادثاتك هنا' : 'ارفع ملفاتك الدراسية للبدء'}</p></div>}
        </div>
        <div className="border-t border-white/10 px-6 py-4 text-center text-[11px] text-slate-400 max-md:hidden">جامعة العلوم والتكنولوجيا هواري بومدين</div>
      </aside>

      <section className="mr-[280px] flex min-h-screen flex-col max-md:mr-[82px]">
        <header className="flex h-[82px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 max-md:px-4"><div className="w-10" /><div className="text-center"><h2 className="text-base font-bold text-slate-800">L1 الخوارزميات</h2><p className="mt-0.5 text-xs text-slate-400">Algorithms L1</p></div><img src="/profile-avatar.png" alt="صورة الملف الشخصي" className="size-10 rounded-full border-2 border-teal-200 object-cover" /></header>
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 pb-36 pt-8"><div className="flex flex-col gap-5">{messages.map((message, index) => <div key={index} className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}><div className="flex max-w-[78%] flex-col gap-2"><div className={`rounded-2xl px-5 py-3.5 text-[14px] leading-7 shadow-sm ${message.role === 'user' ? 'rounded-tr-md bg-teal-600 text-white' : 'rounded-tl-md border border-slate-200 bg-slate-100 text-slate-700'}`}>{message.text}</div>{message.citation && <button type="button" className="flex w-56 items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-right shadow-sm hover:border-teal-600"><span className="text-sm text-rose-500">▤</span><span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-600" dir="ltr">{message.citation}</span><span className="text-xs text-slate-400">↗</span></button>}</div></div>)}</div></div>
        <div className="fixed bottom-5 left-0 right-[280px] px-6 max-md:right-[82px] max-md:px-3"><form onSubmit={submitQuestion} className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_8px_30px_rgb(15,43,67,0.10)]"><button type="button" aria-label="إرفاق ملف" className="flex size-10 shrink-0 items-center justify-center rounded-xl text-lg text-slate-400 hover:bg-slate-100">⌕</button><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="...اسأل عن موادك الدراسية" className="min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400" aria-label="اكتب سؤالك" /><button type="submit" aria-label="إرسال الرسالة" disabled={!input.trim()} className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-lg text-white hover:bg-teal-600 disabled:opacity-50">➤</button></form></div>
      </section>
    </main>
  )
}
