'use client'

import { useState, useEffect } from 'react'
import {
  ArrowRight,
  ChevronDown,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  IdCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LockKeyhole,
  Mail,
  UserRound,
  Globe,
} from 'lucide-react'

function AuthTextField({ id, label, icon: Icon, direction = 'ltr', isValid, ...inputProps }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="block text-xs font-bold text-foreground">
          {label}
        </label>
        {isValid !== undefined && (
          <span className="text-xs">
            {isValid ? (
              <CheckCircle2 size={15} className="text-emerald-500 inline" aria-hidden="true" />
            ) : (
              <AlertCircle size={15} className="text-amber-500 inline" aria-hidden="true" />
            )}
          </span>
        )}
      </div>
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
          className={`h-10 w-full rounded-xl border border-border bg-secondary/50 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-link focus:bg-card focus:ring-4 focus:ring-link/10 ${
            direction === 'rtl' ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'
          }`}
        />
      </div>
    </div>
  )
}

export function RagAuth({ initialMode = 'login', onNavigate, onOpenDemo, initialLang = 'en' }) {
  const [mode, setMode] = useState(initialMode === 'register' ? 'register' : 'login')
  const [lang, setLang] = useState(initialLang) // English primary, Arabic secondary
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [status, setStatus] = useState('')

  // Form fields state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')

  const isRtl = lang === 'ar'
  const isRegister = mode === 'register'

  useEffect(() => {
    setMode(initialMode === 'register' ? 'register' : 'login')
    setStatus('')
  }, [initialMode])

  function changeMode(nextMode) {
    setMode(nextMode)
    setStatus('')
    setIsPasswordVisible(false)
    setIsConfirmPasswordVisible(false)
  }

  function toggleLanguage() {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }

  // Password strict validation rules
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
  const passwordsMatch = isRegister ? password === confirmPassword && confirmPassword !== '' : true

  const isEmailValid = email.includes('@') && email.includes('.')
  const isNameValid = name.trim().length > 2
  const isStudentIdValid = studentId.trim().length >= 5

  function handleSubmit(event) {
    event.preventDefault()
    if (isSubmitting) return

    if (isRegister) {
      if (!hasMinLength || !hasUpperCase || !hasNumber || !hasSpecialChar) {
        setStatus(isRtl ? 'يرجى استيفاء جميع شروط كلمة المرور (أحرف كبيرة، أرقام، رموز).' : 'Please meet all password requirements.')
        return
      }
      if (!passwordsMatch) {
        setStatus(isRtl ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.')
        return
      }
    }

    setIsSubmitting(true)
    setStatus('')

    window.setTimeout(() => {
      setIsSubmitting(false)
      onNavigate('chat')
    }, 500)
  }

  // Judge Demo Fill for Login mode
  function handleJudgeDemoFill() {
    setEmail('judge@usthb.dz')
    setPassword('Usthb@2026')
    setStatus('')
  }

  return (
    <main dir={isRtl ? 'rtl' : 'ltr'} className="relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden bg-background px-4 py-4 text-foreground sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-link/[0.05] blur-[80px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-deep-blue/[0.05] blur-[80px]" />

      <section aria-labelledby="auth-heading" className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Right/Left: Form Side */}
          <div className="p-5 sm:p-6 lg:p-7">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-flex min-h-8 items-center gap-1.5 rounded-xl border border-border bg-secondary/60 px-2.5 text-xs font-bold text-deep-blue transition hover:bg-secondary hover:border-link/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-link"
              >
                <ArrowRight size={14} aria-hidden="true" className={isRtl ? '' : 'rotate-180'} />
                {isRtl ? 'العودة إلى الرئيسية' : 'Back to Home'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-border bg-secondary px-2.5 text-xs font-semibold text-deep-blue transition hover:bg-secondary/80"
                  title="Toggle Language / تغيير اللغة"
                >
                  <Globe size={14} aria-hidden="true" />
                  <span>{lang === 'en' ? 'العربية' : 'English'}</span>
                </button>
                <span dir="ltr" className="text-xs font-extrabold tracking-wide text-deep-blue lg:hidden">RAG-USTHB</span>
              </div>
            </div>

            <div className="mx-auto mt-4 max-w-sm">
              <div role="group" aria-label="Account mode switch" className="grid grid-cols-2 rounded-xl bg-secondary p-1">
                <button
                  type="button"
                  aria-pressed={!isRegister}
                  onClick={() => changeMode('login')}
                  className={`min-h-9 rounded-lg px-3 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-link ${
                    !isRegister ? 'bg-card text-deep-blue shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isRtl ? 'تسجيل الدخول' : 'Sign In'}
                </button>
                <button
                  type="button"
                  aria-pressed={isRegister}
                  onClick={() => changeMode('register')}
                  className={`min-h-9 rounded-lg px-3 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-link ${
                    isRegister ? 'bg-card text-deep-blue shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isRtl ? 'حساب جديد' : 'Register'}
                </button>
              </div>

              <div className="mt-4">
                <p className="text-[10px] font-extrabold text-link">RAG-USTHB Portal</p>
                <h1 id="auth-heading" className="mt-0.5 text-lg font-extrabold text-deep-blue sm:text-xl">
                  {isRegister ? (isRtl ? 'أنشئ حسابك الجامعي' : 'Create Account') : (isRtl ? 'مرحباً بعودتك' : 'Welcome Back')}
                </h1>
              </div>

              <form key={mode} onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
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
                      isValid={isNameValid}
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
                      isValid={isStudentIdValid}
                      required
                    />
                    <div>
                      <label htmlFor="department" className="mb-1 block text-xs font-bold text-foreground">
                        {isRtl ? 'القسم' : 'Department'}
                      </label>
                      <select
                        id="department"
                        name="department"
                        defaultValue="informatics"
                        className="h-10 w-full rounded-xl border border-border bg-secondary/50 px-3 text-xs text-foreground outline-none transition focus:border-link focus:bg-card"
                      >
                        <option value="informatics">{isRtl ? 'قسم الإعلام الآلي' : 'Computer Science'}</option>
                        <option value="mathematics">{isRtl ? 'قسم الرياضيات' : 'Mathematics'}</option>
                        <option value="physics">{isRtl ? 'قسم الفيزياء' : 'Physics'}</option>
                      </select>
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
                  isValid={isEmailValid}
                  required
                />

                <div>
                  <label htmlFor="password" className="mb-1 block text-xs font-bold text-foreground">
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
                      className={`h-10 w-full rounded-xl border border-border bg-secondary/50 text-xs text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-link focus:bg-card ${
                        isRtl ? 'pr-11 pl-9 text-right' : 'pl-11 pr-9 text-left'
                      }`}
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setIsPasswordVisible((v) => !v)}
                      className={`absolute top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground ${
                        isRtl ? 'left-2' : 'right-2'
                      }`}
                    >
                      {isPasswordVisible ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
                    </button>
                  </div>
                  {isRegister && (
                    <div className="mt-1.5 grid grid-cols-2 gap-1 text-[10px]">
                      <span className={hasMinLength ? 'text-emerald-600 font-semibold' : 'text-muted-foreground'}>
                        ✓ {isRtl ? '8 أحرف على الأقل' : 'Min 8 chars'}
                      </span>
                      <span className={hasUpperCase ? 'text-emerald-600 font-semibold' : 'text-muted-foreground'}>
                        ✓ {isRtl ? 'حرف كبير (A-Z)' : 'Uppercase letter'}
                      </span>
                      <span className={hasNumber ? 'text-emerald-600 font-semibold' : 'text-muted-foreground'}>
                        ✓ {isRtl ? 'رقم (0-9)' : 'Number'}
                      </span>
                      <span className={hasSpecialChar ? 'text-emerald-600 font-semibold' : 'text-muted-foreground'}>
                        ✓ {isRtl ? 'رمز خاص (!@#...)' : 'Special char'}
                      </span>
                    </div>
                  )}
                </div>

                {isRegister && (
                  <div>
                    <label htmlFor="confirm-password" className="mb-1 block text-xs font-bold text-foreground">
                      {isRtl ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                    </label>
                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        aria-hidden="true"
                        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-link ${isRtl ? 'right-3.5' : 'left-3.5'}`}
                      />
                      <input
                        id="confirm-password"
                        dir="ltr"
                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className={`h-10 w-full rounded-xl border border-border bg-secondary/50 text-xs text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-link focus:bg-card ${
                          isRtl ? 'pr-11 pl-9 text-right' : 'pl-11 pr-9 text-left'
                        }`}
                      />
                      <button
                        type="button"
                        aria-label="Toggle confirm password visibility"
                        onClick={() => setIsConfirmPasswordVisible((v) => !v)}
                        className={`absolute top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground ${
                          isRtl ? 'left-2' : 'right-2'
                        }`}
                      >
                        {isConfirmPasswordVisible ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
                      </button>
                    </div>
                    {confirmPassword && (
                      <p className={`mt-1 text-[10px] ${passwordsMatch ? 'text-emerald-600 font-semibold' : 'text-destructive'}`}>
                        {passwordsMatch ? (isRtl ? '✓ كلمتا المرور متطابقتان' : '✓ Passwords match') : (isRtl ? '✗ كلمتا المرور غير متطابقتين' : '✗ Passwords do not match')}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-link px-4 text-xs font-extrabold text-white shadow-sm transition hover:bg-deep-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-link disabled:cursor-wait disabled:opacity-75"
                >
                  {isSubmitting && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
                  {isSubmitting ? (isRtl ? 'جارٍ التحقق...' : 'Verifying...') : isRegister ? (isRtl ? 'إنشاء الحساب' : 'Create Account') : (isRtl ? 'تسجيل الدخول' : 'Sign In')}
                </button>
              </form>

              {status && (
                <div role="status" className="mt-2.5 flex items-start gap-2 rounded-xl border border-link/20 bg-secondary px-3 py-2 text-xs text-deep-blue">
                  <AlertCircle size={15} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
                  <p>{status}</p>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between text-xs">
                {!isRegister ? (
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setStatus(isRtl ? 'تم إرسال تعليمات استعادة كلمة المرور.' : 'Password reset instructions sent.'); }}
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
            </div>
          </div>

          {/* Left: Dark Blue Section (Aside) with Judge Demo Button (Visible ONLY on Login mode) */}
          <aside className="relative hidden flex-col justify-between bg-deep-blue p-6 text-white lg:flex">
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 size-60 rounded-full bg-link/30 blur-[60px]" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-sm">
                  <img
                    src="/usthb-logo.png"
                    alt="USTHB Logo"
                    width="60"
                    height="59"
                    className="size-full object-contain"
                  />
                </span>
                <div>
                  <p dir="ltr" className="text-xs font-extrabold tracking-tight">RAG-USTHB</p>
                  <p className="text-[9px] text-white/65">Houari Boumediene University</p>
                </div>
              </div>

              {/* زر بيانات الحكام في القسم الأيسر ذو اللون الأزرق الداكن - يظهر فقط عند تسجيل الدخول (!isRegister) */}
              {!isRegister && (
                <button
                  type="button"
                  onClick={handleJudgeDemoFill}
                  className="inline-flex min-h-8 items-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-3 text-xs font-bold text-white transition hover:bg-white hover:text-deep-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  title={isRtl ? 'ملء بيانات الحكم التجريبي في الحقول' : 'Fill judge demo credentials'}
                >
                  <GraduationCap size={15} aria-hidden="true" />
                  <span>{isRtl ? 'تعبئة بيانات الحكام' : 'Judge Demo Fill'}</span>
                </button>
              )}
            </div>

            <div className="relative z-10 my-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-2.5 py-0.5 text-[10px] font-bold text-white/85">
                <GraduationCap size={13} aria-hidden="true" />
                {isRtl ? 'مساحة دراسية للطلاب' : 'Smart Student Workspace'}
              </span>
              <h2 className="mt-3 text-xl font-extrabold leading-snug">
                {isRtl ? 'اجعل وقت المراجعة أكثر تركيزاً ووضوحاً.' : 'Make your study time focused & clear.'}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                {isRtl ? 'اكتشف محتوى المقررات، راجع المفاهيم، واستفد من إجابات مدعومة بالمراجع.' : 'Explore course content, review concepts, and interact with citation-backed answers.'}
              </p>
            </div>

            <div className="relative z-10 rounded-xl border border-white/15 bg-white/[0.07] p-3">
              <div className="flex items-center gap-2.5">
                <FileText size={15} className="shrink-0 text-white/80" aria-hidden="true" />
                <span className="text-[11px] text-white/80">{isRtl ? 'مستندات ومحاضرات رسمية' : 'Official Lectures & Syllabi'}</span>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </main>
  )
}