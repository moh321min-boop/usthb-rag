'use client'

import { useEffect, useRef } from 'react'
import { ExternalLink, FileText, X } from 'lucide-react'

export function RagDocumentDialog({ document, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (document && dialog && !dialog.open) dialog.showModal()
  }, [document])

  useEffect(() => {
    if (!document?.previewUrl) return undefined
    return () => URL.revokeObjectURL(document.previewUrl)
  }, [document?.previewUrl])

  if (!document) return null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="document-dialog-title"
      className="document-dialog m-auto w-[min(92vw,560px)] max-w-none rounded-2xl border border-[#C9D7E8] bg-[#FFFFFF] p-0 text-[#243247] shadow-2xl"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div className="app-scroll max-h-[86dvh] overflow-y-auto p-5 sm:p-6">
        <header className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#0B2D5C] text-[#F4F7FB]">
              <FileText size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2 id="document-dialog-title" dir="ltr" className="truncate text-left text-sm font-bold text-[#0B2D5C]">
                {document.name}
              </h2>
              <p className="mt-1 text-[11px] text-[#243247]/65">
                {document.fileType} · {document.sizeLabel}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="إغلاق معاينة المستند"
            onClick={() => dialogRef.current?.close()}
            className="rounded-lg p-2 text-[#0B2D5C] transition hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0]"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        {document.previewUrl ? (
          <div className="mt-5 rounded-xl border border-[#C9D7E8] bg-[#EAF2FF] p-5 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#0B2D5C] text-[#F4F7FB]">
              <FileText size={26} aria-hidden="true" />
            </div>
            <p className="mt-3 text-sm font-semibold text-[#243247]">ملف PDF مرفق لهذه الجلسة</p>
            <p className="mt-1 text-xs leading-6 text-[#243247]/70">
              لم يتم رفع الملف إلى خادم. افتحه في تبويب مستقل لعرض النسخة المحلية.
            </p>
            <a
              href={document.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0B2D5C] px-4 py-2.5 text-xs font-semibold text-[#F4F7FB] transition hover:bg-[#1565C0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
            >
              فتح ملف PDF
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        ) : document.previewText !== undefined ? (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold text-[#0B2D5C]">معاينة نصية محلية</p>
            <pre dir="auto" className="app-scroll max-h-[55dvh] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[#C9D7E8] bg-[#EAF2FF] p-4 text-xs leading-6 text-[#243247]">
              {document.previewError ? 'تعذرت قراءة محتوى الملف في هذه المعاينة.' : document.previewText || 'الملف لا يحتوي على نص للعرض.'}
            </pre>
            {document.previewTruncated && (
              <p className="mt-2 text-[11px] text-[#243247]/65">عُرضت بداية الملف فقط.</p>
            )}
          </div>
        ) : Array.isArray(document.pages) && document.pages.length > 0 ? (
          <div className="mt-5 space-y-3">
            <p className="text-xs font-semibold text-[#0B2D5C]">مقتطفات توضيحية من عينة تجريبية</p>
            {document.pages.map((page, index) => (
              <section key={`${document.id}-${index}`} className="rounded-xl border border-[#C9D7E8] bg-[#EAF2FF] p-4">
                <h3 dir="rtl" className="text-xs font-bold text-[#0B2D5C]">{page.title}</h3>
                <p dir="rtl" className="mt-2 text-xs leading-6 text-[#243247]/85">{page.text}</p>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-[#C9D7E8] bg-[#EAF2FF] p-5 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-[#F4F7FB] text-[#1565C0]">
              <FileText size={25} aria-hidden="true" />
            </div>
            <p className="mt-3 text-xs font-semibold text-[#243247]">المستند مرفق في هذه الجلسة فقط</p>
            <p className="mt-1 text-[11px] leading-5 text-[#243247]/70">
              لا تتضمن هذه المعاينة رفعاً إلى الخادم أو استخراجاً لمحتوى ملفات Word.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="mt-5 w-full rounded-xl bg-[#0B2D5C] py-3 text-xs font-semibold text-[#F4F7FB] transition hover:bg-[#1565C0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
        >
          إغلاق المعاينة
        </button>
      </div>
    </dialog>
  )
}
