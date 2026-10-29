'use client'

import { useState, useEffect } from 'react'
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  IdCard,
  Info,
  Loader2,
  LockKeyhole,
  Mail,
  UserRound,
} from 'lucide-react'

function AuthTextField({ id, label, icon: Icon, direction = 'ltr', ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold text-foreground">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={17}
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-link ${direction === 'rtl' ? 'right-3.5' : 'left-3.5'}`}
        />
        <input
          id={id}
          dir={direction}
          {...inputProps}
          className={`h-11 w-full rounded-xl border border-border bg-secondary/50 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-link focus:bg-card focus:ring-4 focus:ring-link/10 ${
            direction === 'rtl' ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'
          }`}
        />
      </div>
    </div>
  )
}

export function RagAuth({ initialMode = 'login', onNavigate, onOpenDemo, currentLang = 'en' }) {
  const [mode, setMode] = useState(initialMode === 'register' ? 'register' : 'login')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [status, setStatus] = useState('')

  // حقول النموذج للتجربة / الحكام
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')

  const isRtl = currentLang === 'ar'

  useEffect(() => {
    setMode(initialMode === 'register' ? 'register' : 'login')
    setStatus('')
    setIsPasswordVisible(false)
  }, [initialMode])

  const isRegister = mode === 'register'

  function changeMode(nextMode) {
    setMode(nextMode)
    setStatus('')
    setIsPasswordVisible(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setStatus('')

    window.setTimeout(() => {
      setIsSubmitting(false)
      onNavigate('chat')
    }, 500)
  }

  // تعبئة الحقول تلقائياً للحكام عند تسجيل الدخول
  function handleJudgeDemoFill() {
    setEmail('judge@usthb.dz')
    setPassword('usthb2026')
    if (isRegister) {
      setName('Judge Examiner')
      setStudentId('20260000')
    }
    setStatus(isRtl ? 'تم ملء الحقول ببيانات الحساب التجريبي بنجاح.' : 'Demo credentials filled successfully.')
  }

  function handleForgotPassword(e) {
    e.preventDefault()
    setStatus(isRtl ? 'تم إرسال تعليمات استعادة كلمة المرور.' : 'Password reset instructions sent.')
  }

  return (
    <main dir={isRtl ? 'rtl' : 'ltr'} className="relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden bg-background px-4 py-6 text-foreground sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-link/[0.05] blur-[90px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-deep-blue/[0.05] blur-[90px]" />

      <section aria-labelledby="auth-heading" className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_60px_-20px_rgba(11,45,92,0.15)]">
        <div className="grid lg:grid-cols-[1fr_0.9fr]">
          
          {/* الجانب الأيمن: نموذج الإدخال */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 text-xs font-bold text-deep-blue transition hover:bg-secondary hover:border-link/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-link"
              >
                <ArrowRight size={15} aria-hidden="true" className={isRtl ? '' : 'rotate-180'} />
                {isRtl ? 'العودة إلى الرئيسية' : 'Back to Home'}
              </button>
              <span dir="ltr" className="text-xs font-extrabold tracking-wide text-deep-blue lg:hidden">RAG-USTHB</span>
            </div>

            <div className="mx-auto mt-6 max-w-sm">
              <div role="group" aria-label="Account mode switch" className="grid grid-cols-2 rounded-xl bg-secondary p-1">
                <button
                  type="button"
                  aria-pressed={!isRegister}
                  onClick={() => changeMode('login')}
                  className={`min-h-10 rounded-lg px-3 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-link ${
                    !isRegister ? 'bg-card text-deep-blue shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isRtl ? 'تسجيل الدخول' : 'Sign In'}
                </button>
                <button
                  type="button"
                  aria-pressed={isRegister}
                  onClick={() => changeMode('register')}
                  className={`min-h-10 rounded-lg px-3 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-link ${
                    isRegister ? 'bg-card text-deep-blue shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isRtl ? 'حساب جديد' : 'Register'}
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold text-link">RAG-USTHB Portal</p>
                  <h1 id="auth-heading" className="mt-1 text-xl font-extrabold text-deep-blue sm:text-2xl">
                    {isRegister ? (isRtl ? 'أنشئ حسابك الجامعي' : 'Create Account') : (isRtl ? 'مرحباً بعودتك' : 'Welcome Back')}
                  </h1>
                </div>

                {/* زر التسجيل التجريبي: يظهر فقط عند تسجيل الدخول (ليس في حالة إنشاء حساب) */}
                {!isRegister && (
                  <button
                    type="button"
                    onClick={handleJudgeDemoFill}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-link/30 bg-secondary px-3 text-xs font-bold text-link transition hover:bg-link hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-link"
                    title={isRtl ? 'ملء الحقول ببيانات الحكم التجريبي' : 'Fill demo credentials'}
                  >
                    <GraduationCap size={15} aria-hidden="true" />
                    <span>{isRtl ? 'تجريبي (حكام)' : 'Demo Fill'}</span>
                  </button>
                )}
              </div>

              <form key={mode} onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
                {isRegister && (
                  <>
                    <AuthTextField
                      id="full-name"
                      label={isRtl ? 'الاسم الكامل' : 'Full Name'}
                      icon={UserRound}
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      direction={isRtl ? 'rtl' : 'ltr'}
                      placeholder={isRtl ? 'الاسم واللقب' : 'First & Last Name'}
                      required
                    />
                    <AuthTextField
                      id="student-id"
                      label={isRtl ? 'رقم الطالب / Matricule' : 'Student ID / Matricule'}
                      icon={IdCard}
                      type="text"
                      name="studentId"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      direction="ltr"
                      placeholder="202612345"
                      required
                    />
                    <div>
                      <label htmlFor="department" className="mb-1.5 block text-xs font-bold text-foreground">
                        {isRtl ? 'القسم' : 'Department'}
                      </label>
                      <div className="relative">
                        <GraduationCap
                          size={17}
                          aria-hidden="true"
                          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-link ${isRtl ? 'right-3.5' : 'left-3.5'}`}
                        />
                        <select
                          id="department"
                          name="department"
                          defaultValue="informatics"
                          className={`h-11 w-full appearance-none rounded-xl border border-border bg-secondary/50 text-sm text-foreground outline-none transition focus:border-link focus:bg-card focus:ring-4 focus:ring-link/10 ${
                            isRtl ? 'pr-11 pl-10 text-right' : 'pl-11 pr-10 text-left'
                          }`}
                        >
                          <option value="informatics">{isRtl ? 'قسم الإعلام الآلي' : 'Department of Computer Science'}</option>
                          <option value="mathematics">{isRtl ? 'قسم الرياضيات' : 'Department of Mathematics'}</option>
                          <option value="physics">{isRtl ? 'قسم الفيزياء' : 'Department of Physics'}</option>
                        </select>
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground/60 ${isRtl ? 'left-3.5' : 'right-3.5'}`}
                        />
                      </div>
                    </div>
                  </>
                )}

                <AuthTextField
                  id="university-email"
                  label={isRtl ? 'البريد الجامعي' : 'University Email'}
                  icon={Mail}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  direction="ltr"
                  placeholder="name@usthb.dz"
                  required
                />

                <div>
                  <label htmlFor="password" className="mb-1.5 block text-xs font-bold text-foreground">
                    {isRtl ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      aria-hidden="true"
                      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-link ${isRtl ? 'right-3.5' : 'left-3.5'}`}
                    />
                    <input
                      id="password"
                      dir="ltr"
                      type={isPasswordVisible ? 'text' : 'password'}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength={8}
                      placeholder="••••••••"
                      required
                      className={`h-11 w-full rounded-xl border border-border bg-secondary/50 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-link focus:bg-card focus:ring-4 focus:ring-link/10 ${
                        isRtl ? 'pr-11 pl-10 text-right' : 'pl-11 pr-10 text-left'
                      }`}
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setIsPasswordVisible((v) => !v)}
                      className={`absolute top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground ${
                        isRtl ? 'left-2' : 'right-2'
                      }`}
                    >
                      {isPasswordVisible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-link px-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-deep-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link disabled:cursor-wait disabled:opacity-75"
                >
                  {isSubmitting && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
                  {isSubmitting ? (isRtl ? 'جارٍ التحقق...' : 'Verifying...') : isRegister ? (isRtl ? 'إنشاء الحساب' : 'Create Account') : (isRtl ? 'تسجيل الدخول' : 'Sign In')}
                </button>
              </form>

              {status && (
                <div role="status" className="mt-3 flex items-start gap-2 rounded-xl border border-link/20 bg-secondary px-3 py-2.5 text-xs text-deep-blue">
                  <Info size={15} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
                  <p>{status}</p>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between text-xs">
                {!isRegister ? (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-bold text-link transition hover:underline"
                  >
                    {isRtl ? 'هل نسيت كلمة السر؟' : 'Forgot Password?'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => changeMode('login')}
                    className="font-bold text-muted-foreground transition hover:text-link"
                  >
                    {isRtl ? 'لديك حساب بالفعل؟' : 'Already have an account?'} <span className="text-link">{isRtl ? 'تسجيل الدخول' : 'Sign In'}</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={onOpenDemo}
                className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-xs font-bold text-deep-blue transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-link"
              >
                <BookOpen size={16} aria-hidden="true" />
                {isRtl ? 'استكشاف المنصة كزائر' : 'Explore Platform as Visitor'}
              </button>
            </div>
          </div>

          {/* الجانب الأيسر: الشعار والترحيب الأكاديمي */}
          <aside className="relative hidden flex-col justify-between bg-deep-blue p-8 text-white lg:flex">
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-link/30 blur-[70px]" />

            <div className="relative z-10 flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm">
                <img
                  src="/usthb-logo.png"
                  alt="USTHB Logo"
                  width="80"
                  height="79"
                  className="size-full object-contain"
                />
              </span>
              <div>
                <p dir="ltr" className="text-sm font-extrabold tracking-tight">RAG-USTHB</p>
                <p className="text-[10px] text-white/65">Houari Boumediene University</p>
              </div>
            </div>

            <div className="relative z-10 my-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 text-[11px] font-bold text-white/85">
                <GraduationCap size={14} aria-hidden="true" />
                {isRtl ? 'مساحة دراسية للطلاب' : 'Smart Student Workspace'}
              </span>
              <h2 className="mt-4 text-2xl font-extrabold leading-snug xl:text-3xl">
                {isRtl ? 'اجعل وقت المراجعة أكثر تركيزاً ووضوحاً.' : 'Make your study time focused & clear.'}
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-white/70">
                {isRtl ? 'اكتشف محتوى المقررات، راجع المفاهيم، واستفد من إجابات مدعومة بالمراجع.' : 'Explore course content, review concepts, and interact with citation-backed answers.'}
              </p>
            </div>

            <div className="relative z-10 rounded-2xl border border-white/15 bg-white/[0.07] p-3.5">
              <div className="flex items-center gap-3">
                <FileText size={16} className="shrink-0 text-white/80" aria-hidden="true" />
                <span className="text-xs text-white/80">{isRtl ? 'مستندات ومحاضرات رسمية' : 'Official Lectures & Syllabi'}</span>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </main>
  )
}