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
  XCircle,
  Loader2,
  LockKeyhole,
  Mail,
  UserRound,
  Globe,
} from 'lucide-react'

function AuthTextField({ id, label, icon: Icon, direction = 'ltr', isValid, errorText, ...inputProps }) {
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
              <XCircle size={15} className="text-destructive inline" aria-hidden="true" />
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
          className={`h-10 w-full rounded-xl border bg-secondary/50 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:bg-card focus:ring-4 focus:ring-link/10 ${
            isValid === false ? 'border-destructive focus:border-destructive' : 'border-border focus:border-link'
          } ${direction === 'rtl' ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'}`}
        />
      </div>
      {errorText && <p className="mt-1 text-[10px] text-destructive">{errorText}</p>}
    </div>
  )
}

export function RagAuth({ initialMode = 'login', onNavigate, onOpenDemo, initialLang = 'en' }) {
  const [mode, setMode] = useState(initialMode === 'register' ? 'register' : 'login')
  const [lang, setLang] = useState(initialLang)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [status, setStatus] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false)

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
    setShowErrors(false)
    setForgotPasswordSent(false)
  }, [initialMode])

  function changeMode(nextMode) {
    setMode(nextMode)
    setStatus('')
    setShowErrors(false)
    setForgotPasswordSent(false)
    setIsPasswordVisible(false)
    setIsConfirmPasswordVisible(false)
  }

  function toggleLanguage() {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }

  // Validations
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
  const isPasswordValid = hasMinLength && hasUpperCase && hasNumber && hasSpecialChar

  const isEmailValid = email.includes('@') && email.includes('.')
  const isNameValid = name.trim().length > 2
  const isStudentIdValid = /^\d{8}$/.test(studentId)
  const passwordsMatch = password === confirmPassword && confirmPassword !== ''

  function handleSubmit(event) {
    event.preventDefault()
    setShowErrors(true)
    if (isSubmitting) return

    if (!isEmailValid) {
      setStatus(isRtl ? 'يرجى كتابة البريد الجامعي بشكل صحيح.' : 'Please enter a valid university email.')
      return
    }

    if (isRegister) {
      if (!isNameValid) {
        setStatus(isRtl ? 'يرجى إدخال الاسم الكامل.' : 'Please enter full name.')
        return
      }
      if (!isStudentIdValid) {
        setStatus(isRtl ? 'رقم الطالب (الباك) يجب أن يتكون من 8 أرقام بالضبط.' : 'Student ID must be exactly 8 digits.')
        return
      }
      if (!isPasswordValid) {
        setStatus(isRtl ? 'يرجى استيفاء جميع شروط كلمة المرور.' : 'Please meet all password requirements.')
        return
      }
      if (!passwordsMatch) {
        setStatus(isRtl ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.')
        return
      }
    }

    setIsSubmitting(true)
    setStatus('')

    // محاكاة الاتصال بالخلفية لمدة 3 ثوانٍ ثم التوجيه للدردشة
    window.setTimeout(() => {
      setIsSubmitting(false)
      onNavigate('chat')
    }, 3000)
  }

  // Judge Demo Fill
  function handleJudgeDemoFill() {
    setEmail('judge@usthb.dz')
    setPassword('Usthb@2026')
    if (isRegister) {
      setName('Judge Examiner')
      setStudentId('20260000')
      setConfirmPassword('Usthb@2026')
    }
    setStatus('')
    setShowErrors(false)
  }

  function handleForgotPasswordClick(e) {
    e.preventDefault()
    setForgotPasswordSent(true)
  }

  return (
    <main dir={isRtl ? 'rtl' : 'ltr'} className="relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden bg-background px-4 py-4 text-foreground sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-link/[0.05] blur-[80px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-deep-blue/[0.05] blur-[80px]" />

      <section aria-labelledby="auth-heading" className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        {/* تم تعديل شبكة العرض ليتجاوب القسم الأيسر والأيمن بمرونة على كافة الشاشات */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Form Side */}
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
                  title="Toggle Language"
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
                      isValid={showErrors ? isNameValid : undefined}
                      errorText={showErrors && !isNameValid ? (isRtl ? 'يرجى كتابة الاسم الكامل' : 'Please enter full name') : undefined}
                      required
                    />
                    <AuthTextField
                      id="student-id"
                      label={isRtl ? 'رقم الطالب / الباك (8 أرقام)' : 'Student ID / Matricule (8 digits)'}
                      icon={IdCard}
                      type="text"
                      name="studentId"
                      value={studentId}
                      maxLength={8}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 8)
                        setStudentId(val)
                      }}
                      direction="ltr"
                      placeholder="20261234"
                      isValid={showErrors ? isStudentIdValid : undefined}
                      errorText={showErrors && !isStudentIdValid ? (isRtl ? 'يجب أن يتكون رقم الباك من 8 أرقام بالضبط' : 'Must be exactly 8 digits') : undefined}
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
                  isValid={showErrors ? isEmailValid : undefined}
                  errorText={showErrors && !isEmailValid ? (isRtl ? 'يرجى كتابة البريد الجامعي بشكل صحيح' : 'Valid university email required') : undefined}
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
                      className={`h-10 w-full rounded-xl border bg-secondary/50 text-xs text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:bg-card ${
                        showErrors && !isPasswordValid ? 'border-destructive focus:border-destructive' : 'border-border focus:border-link'
                      } ${isRtl ? 'pr-11 pl-9 text-right' : 'pl-11 pr-9 text-left'}`}
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
                      <span className={hasMinLength ? 'text-emerald-600 font-semibold' : 'text-destructive'}>
                        {hasMinLength ? '✓' : '✗'} {isRtl ? '8 أحرف على الأقل' : 'Min 8 chars'}
                      </span>
                      <span className={hasUpperCase ? 'text-emerald-600 font-semibold' : 'text-destructive'}>
                        {hasUpperCase ? '✓' : '✗'} {isRtl ? 'حرف كبير (A-Z)' : 'Uppercase letter'}
                      </span>
                      <span className={hasNumber ? 'text-emerald-600 font-semibold' : 'text-destructive'}>
                        {hasNumber ? '✓' : '✗'} {isRtl ? 'رقم (0-9)' : 'Number'}
                      </span>
                      <span className={hasSpecialChar ? 'text-emerald-600 font-semibold' : 'text-destructive'}>
                        {hasSpecialChar ? '✓' : '✗'} {isRtl ? 'رمز خاص (!@#...)' : 'Special char'}
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
                        className={`h-10 w-full rounded-xl border bg-secondary/50 text-xs text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:bg-card ${
                          showErrors && !passwordsMatch ? 'border-destructive focus:border-destructive' : 'border-border focus:border-link'
                        } ${isRtl ? 'pr-11 pl-9 text-right' : 'pl-11 pr-9 text-left'}`}
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
                    {showErrors && !passwordsMatch && (
                      <p className="mt-1 text-[10px] text-destructive">
                        {isRtl ? '✗ كلمتا المرور غير متطابقتين' : '✗ Passwords do not match'}
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
                  {isSubmitting ? (isRtl ? 'جارٍ التحقق والاتصال بالخادم...' : 'Verifying & connecting...') : isRegister ? (isRtl ? 'إنشاء الحساب' : 'Create Account') : (isRtl ? 'تسجيل الدخول' : 'Sign In')}
                </button>
              </form>

              {status && (
                <div role="status" className="mt-2 text-[11px] text-destructive font-medium">
                  <p>{status}</p>
                </div>
              )}

              {/* استعادة كلمة المرور تفاعلية عند تسجيل الدخول */}
              {!isRegister && (
                <div className="mt-2.5 text-center">
                  <button
                    type="button"
                    onClick={handleForgotPasswordClick}
                    className="text-[11px] font-bold text-link transition hover:underline"
                  >
                    {isRtl ? 'هل نسيت كلمة السر؟' : 'Forgot password?'}
                  </button>
                  {forgotPasswordSent && (
                    <p className="mt-1 text-[10px] text-emerald-600 font-semibold">
                      {isRtl ? 'يرجى الاطلاع على البريد الجامعي، لقد تم إرسال بريد إعادة ضبط كلمة المرور.' : 'Please check your university email; password reset instructions have been sent.'}
                    </p>
                  )}
                </div>
              )}

              {/* ضبط محاذاة Already have an account? Sign In */}
              <div className="mt-3 flex items-center justify-center text-xs">
                {isRegister && (
                  <button
                    type="button"
                    onClick={() => changeMode('login')}
                    className="font-bold text-muted-foreground transition hover:text-link"
                  >
                    {isRtl ? 'لديك حساب بالفعل؟' : 'Already have an account?'} <span className="text-link underline">{isRtl ? 'تسجيل الدخول' : 'Sign In'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Left: Dark Blue Section (Aside) - ظاهر بشكل متناسق ومستجيب على الشاشات الكبيرة والصغيرة */}
          <aside className="relative flex flex-col justify-between bg-deep-blue p-6 text-white">
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 size-60 rounded-full bg-link/30 blur-[60px]" />

            {/* 1. Header / Logo Section */}
            <div className="relative z-10 flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm">
                <img
                  src="/usthb-logo.png"
                  alt="USTHB Logo"
                  width="70"
                  height="69"
                  className="size-full object-contain"
                />
              </span>
              <div className="flex flex-col text-left" dir="ltr">
                <p className="text-xs font-extrabold tracking-tight text-white">RAG-USTHB</p>
                <p className="text-[9px] text-white/70">Houari Boumediene University</p>
              </div>
            </div>

            {/* 2. Middle Content Section */}
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

            {/* 3. Lower Section */}
            <div className="relative z-10 flex flex-col gap-3">
              {!isRegister && (
                <button
                  type="button"
                  onClick={handleJudgeDemoFill}
                  className="inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-3 text-xs font-bold text-white transition hover:bg-white hover:text-deep-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-white shadow-sm"
                  title="Demo account for judges"
                >
                  <GraduationCap size={16} aria-hidden="true" />
                  <span>{isRtl ? 'حساب تجريبي (للحكام)' : 'Judge Demo Account'}</span>
                </button>
              )}

              <div className="rounded-xl border border-white/15 bg-white/[0.07] p-3">
                <div className="flex items-center gap-2.5">
                  <FileText size={15} className="shrink-0 text-white/80" aria-hidden="true" />
                  <span className="text-[11px] text-white/80">{isRtl ? 'مستندات ومحاضرات رسمية' : 'Official Lectures & Syllabi'}</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </main>
  )
}