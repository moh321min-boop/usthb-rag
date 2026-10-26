'use client'

import { useRef } from 'react'
import { Paperclip, Send } from 'lucide-react'

export function RagComposer({
  value,
  onChange,
  onSubmit,
  activeTab,
  onFilesSelected,
}) {
  const fileInputRef = useRef(null)

  function handleFileChange(event) {
    const files = Array.from(event.currentTarget.files ?? [])
    if (files.length > 0) onFilesSelected(files)
    event.currentTarget.value = ''
  }

  function handleKeyDown(event) {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing &&
      event.keyCode !== 229
    ) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-end gap-2 rounded-2xl border border-[#C9D7E8] bg-[#FFFFFF] p-2 shadow-sm focus-within:border-[#1565C0] focus-within:ring-2 focus-within:ring-[#1565C0]/10"
    >
      {activeTab === 'documents' && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.md,application/pdf,text/plain"
            multiple
            tabIndex={-1}
            aria-hidden="true"
            aria-label="اختيار ملفات لإرفاقها"
            className="sr-only"
            onChange={handleFileChange}
          />
          <button
            type="button"
            aria-label="إرفاق مستند"
            title="إرفاق مستند لهذه الجلسة"
            onClick={() => fileInputRef.current?.click()}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl text-[#0B2D5C] transition hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0]"
          >
            <Paperclip size={17} aria-hidden="true" />
          </button>
        </>
      )}

      <textarea
        dir="rtl"
        rows={1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="اكتب سؤالك عن المادة..."
        aria-label="اكتب سؤالك"
        className="app-scroll max-h-32 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-2 py-2.5 text-right text-[13px] leading-6 text-[#243247] outline-none placeholder:text-[#243247]/50"
      />

      <button
        type="submit"
        aria-label="إرسال السؤال"
        disabled={!value.trim()}
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1565C0] text-[#FFFFFF] transition hover:bg-[#0B2D5C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0] disabled:cursor-not-allowed disabled:opacity-45"
      >
        <Send size={16} aria-hidden="true" />
      </button>
    </form>
  )
}
