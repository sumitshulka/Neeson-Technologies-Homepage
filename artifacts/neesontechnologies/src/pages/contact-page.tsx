import { useEffect, useState, type ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'wouter';
import {
  ArrowDownRight, ArrowRight, CalendarDays, Check, Clock3, FileText, Mail,
  MessageCircle, ShieldCheck, UserRound, Linkedin, PhoneCall, LoaderCircle,
} from 'lucide-react';
import { getContactCaptchaConfig, submitContactEnquiry, type ContactCaptchaConfig } from '@workspace/api-client-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { contactConfig, getBookingUrl } from './contact-config';
import './contact-page.css';

const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.'),
  email: z.string().trim().email('Enter a valid work email.'),
  company: z.string().trim().min(1, 'Enter your company.'),
  role: z.string().optional(),
  question: z.string().trim().min(10, 'Please add at least 10 characters.'),
  timing: z.string().optional(),
  website: z.string().optional(),
});
type EnquiryValues = z.infer<typeof enquirySchema>;
const callbackSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.'),
  phone: z.string().trim().min(7, 'Enter a phone number including country code.'),
  preferredTime: z.string().trim().min(1, 'Add a preferred time.'),
  reason: z.string().trim().min(1, 'Add a short reason for the callback.'),
});
type CallbackValues = z.infer<typeof callbackSchema>;

type CaptchaStatus = 'loading' | 'ready' | 'error';
type GoogleRecaptchaApi = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: GoogleRecaptchaApi;
  }
}

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (window.grecaptcha) return Promise.resolve();

  return new Promise((resolve, reject) => {
    let existing = document.getElementById('neeson-recaptcha-v3-script') as HTMLScriptElement | null;
    if (existing && (existing.dataset.siteKey !== siteKey || existing.dataset.failed === 'true')) {
      existing.remove();
      existing = null;
    }
    const script = existing ?? document.createElement('script');
    let timeoutId = 0;

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
    const handleLoad = () => {
      script.dataset.loaded = 'true';
      cleanup();
      if (window.grecaptcha) resolve();
      else reject(new Error('Google reCAPTCHA did not initialize.'));
    };
    const handleError = () => {
      script.dataset.failed = 'true';
      cleanup();
      reject(new Error('Google reCAPTCHA failed to load.'));
    };

    if (existing?.dataset.loaded === 'true') {
      reject(new Error('Google reCAPTCHA did not initialize.'));
      return;
    }

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });
    timeoutId = window.setTimeout(() => {
      script.dataset.failed = 'true';
      cleanup();
      reject(new Error('Google reCAPTCHA script timed out.'));
    }, 12_000);

    if (!existing) {
      script.id = 'neeson-recaptcha-v3-script';
      script.dataset.siteKey = siteKey;
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
}

function executeRecaptcha(siteKey: string): Promise<string> {
  return loadRecaptchaScript(siteKey).then(
    () =>
      new Promise((resolve, reject) => {
        const recaptcha = window.grecaptcha;
        if (!recaptcha) {
          reject(new Error('Google reCAPTCHA is unavailable.'));
          return;
        }

        const timeoutId = window.setTimeout(
          () => reject(new Error('Google reCAPTCHA timed out.')),
          12_000,
        );
        recaptcha.ready(() => {
          recaptcha
            .execute(siteKey, { action: 'contact_enquiry' })
            .then((token) => {
              window.clearTimeout(timeoutId);
              if (token) resolve(token);
              else reject(new Error('Google reCAPTCHA returned an empty token.'));
            })
            .catch((error: unknown) => {
              window.clearTimeout(timeoutId);
              reject(error);
            });
        });
      }),
  );
}

function readApiError(error: unknown): { status?: number; code?: string } {
  if (!error || typeof error !== 'object') return {};
  const candidate = error as { status?: unknown; data?: unknown };
  const data = candidate.data;
  const code = data && typeof data === 'object' && 'error' in data
    ? (data as { error?: unknown }).error
    : undefined;

  return {
    status: typeof candidate.status === 'number' ? candidate.status : undefined,
    code: typeof code === 'string' ? code : undefined,
  };
}

function ContactAction({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a className={`cp-action ${className}`} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{children}<ArrowRight size={15} /></a>;
}

function EnquiryForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'setup' | 'success' | 'error'>('idle');
  const [captchaConfig, setCaptchaConfig] = useState<ContactCaptchaConfig | null>(null);
  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>('loading');
  const [captchaMessage, setCaptchaMessage] = useState('');
  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: '', email: '', company: '', role: '', question: '', timing: '', website: '' },
  });

  useEffect(() => {
    let active = true;
    getContactCaptchaConfig()
      .then((config) => {
        if (!active) return;
        setCaptchaConfig(config);
        if (!config.captchaConfigured || !config.siteKey) {
          setCaptchaStatus('error');
          setCaptchaMessage('Google reCAPTCHA is not configured yet. Enquiries are disabled.');
        } else {
          setCaptchaStatus('ready');
        }
      })
      .catch((error: unknown) => {
        if (!active) return;
        const { code } = readApiError(error);
        setCaptchaStatus('error');
        setCaptchaMessage(
          code === 'captcha_not_configured'
            ? 'Google reCAPTCHA is not configured yet. Enquiries are disabled.'
            : 'Google reCAPTCHA configuration is unavailable. Please try again later.',
        );
      });

    return () => {
      active = false;
    };
  }, []);

  async function submit(values: EnquiryValues) {
    if (!captchaConfig?.captchaConfigured || !captchaConfig.siteKey) {
      setCaptchaMessage('Google reCAPTCHA is not configured yet. Enquiries are disabled.');
      return;
    }
    if (!captchaConfig.deliveryConfigured) { setState('setup'); return; }

    setState('sending');
    setCaptchaStatus('loading');
    setCaptchaMessage('');
    try {
      const recaptchaToken = await executeRecaptcha(captchaConfig.siteKey);
      await submitContactEnquiry({
        ...values,
        recaptchaToken,
      });
      setState('success');
      form.reset();
    } catch (error: unknown) {
      const { code, status } = readApiError(error);
      if (code === 'captcha_invalid') {
        setState('idle');
        setCaptchaStatus('ready');
        setCaptchaMessage('Google reCAPTCHA could not verify this submission. Please try again.');
      } else if (code === 'captcha_verification_unavailable') {
        setState('idle');
        setCaptchaStatus('ready');
        setCaptchaMessage('Google reCAPTCHA is temporarily unavailable. Please try again.');
      } else if (code === 'captcha_not_configured') {
        setState('idle');
        setCaptchaStatus('error');
        setCaptchaMessage('Google reCAPTCHA is not configured yet. Enquiries are disabled.');
      } else if (code === 'contact_delivery_not_configured') {
        setState('setup');
        setCaptchaStatus('ready');
      } else if (status === undefined) {
        setState('idle');
        setCaptchaStatus('ready');
        setCaptchaMessage('Google reCAPTCHA could not load or issue a token. Please try again.');
      } else {
        setState('error');
        setCaptchaStatus('ready');
      }
    }
  }
  return <Form {...form}>
    <form className="cp-form" onSubmit={form.handleSubmit(submit)} noValidate>
      {state === 'success' ? <div className="cp-form-result success" role="status"><Check size={20} /><div><strong>Thank you. Your enquiry has been received.</strong><p>{contactConfig.typicalResponse}</p></div></div> : <>
        <div className="cp-field-grid">
          <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Your name <span>*</span></FormLabel><FormControl><input autoComplete="name" placeholder="Name" {...field} /></FormControl><FormMessage role="alert" /></FormItem>} />
          <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Work email <span>*</span></FormLabel><FormControl><input type="email" autoComplete="email" placeholder="you@company.com" {...field} /></FormControl><FormMessage role="alert" /></FormItem>} />
          <FormField control={form.control} name="company" render={({ field }) => <FormItem><FormLabel>Company <span>*</span></FormLabel><FormControl><input autoComplete="organization" placeholder="Company name" {...field} /></FormControl><FormMessage role="alert" /></FormItem>} />
          <FormField control={form.control} name="role" render={({ field }) => <FormItem><FormLabel>Role <small>Optional</small></FormLabel><FormControl><input autoComplete="organization-title" placeholder="Your role" {...field} /></FormControl><FormMessage role="alert" /></FormItem>} />
          <FormField control={form.control} name="question" render={({ field }) => <FormItem className="cp-full"><FormLabel>Your question, in one or two sentences <span>*</span></FormLabel><FormControl><textarea rows={3} placeholder="What decision is your team facing?" {...field} /></FormControl><FormMessage role="alert" /></FormItem>} />
          <FormField control={form.control} name="timing" render={({ field }) => <FormItem className="cp-full"><FormLabel>Decision timing <small>Optional</small></FormLabel><FormControl><input placeholder="When does the decision need to be made?" {...field} /></FormControl><FormMessage role="alert" /></FormItem>} />
          <FormField control={form.control} name="website" render={({ field }) => <FormItem className="cp-honeypot" aria-hidden="true"><FormLabel>Website</FormLabel><FormControl><input tabIndex={-1} autoComplete="off" {...field} /></FormControl></FormItem>} />
        </div>
        <div className="cp-confidential" role="note"><ShieldCheck size={19} /><p><strong>Please do not include confidential technical details or upload documents at this stage.</strong><span>Document review and substantive technical advice are undertaken through an agreed paid engagement.</span></p></div>
        <div className="cp-captcha" aria-live="polite">
          {captchaConfig?.captchaConfigured && captchaConfig.siteKey ? <>
            {captchaStatus === 'loading' && <p className="cp-captcha-message">Google reCAPTCHA is checking this submission…</p>}
            {captchaStatus === 'ready' && <p className="cp-captcha-message">Google reCAPTCHA v3 runs in the background when you send this enquiry.</p>}
            {captchaMessage && <p className={`cp-captcha-message ${captchaStatus === 'error' ? 'error' : ''}`} role={captchaStatus === 'error' ? 'alert' : 'status'}>{captchaMessage}</p>}
            <p className="cp-captcha-legal">This site is protected by reCAPTCHA. Google <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.</p>
            {!captchaConfig.deliveryConfigured && <p className="cp-captcha-message warning" role="status">Google reCAPTCHA is configured, but email delivery is not connected. No enquiry can be sent yet.</p>}
          </> : <>
            <p className={`cp-captcha-message ${captchaStatus === 'error' ? 'error' : ''}`} role={captchaStatus === 'error' ? 'alert' : 'status'}>
              {captchaMessage || 'Loading Google reCAPTCHA…'}
            </p>
            {captchaConfig && !captchaConfig.deliveryConfigured && <p className="cp-captcha-message warning" role="status">Email delivery is not connected. No enquiry can be sent yet.</p>}
          </>}
        </div>
        {state === 'setup' && <p className="cp-form-result setup" role="status"><strong>Delivery setup required.</strong> No information was sent. Email delivery is not connected yet.</p>}
        {state === 'error' && <p className="cp-form-result error" role="alert">We could not submit this enquiry. Please try again later.</p>}
        <button className="button button-gold cp-submit" type="submit" disabled={state === 'sending' || captchaStatus !== 'ready' || !captchaConfig?.captchaConfigured || !captchaConfig?.deliveryConfigured}>{state === 'sending' ? <><LoaderCircle size={16} className="cp-spin" />Sending…</> : <>Send enquiry <ArrowRight size={16} /></>}</button>
        <p className="cp-privacy">By submitting an enquiry, you agree to our <Link href="/privacy">privacy notice <ArrowRight size={12} /></Link></p>
        <p className="cp-response">{contactConfig.typicalResponse}</p>
      </>}
    </form>
  </Form>;
}

function CallbackForm() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const form = useForm<CallbackValues>({ resolver: zodResolver(callbackSchema), defaultValues: { name: '', phone: '', preferredTime: '', reason: '' } });
  async function submit(values: CallbackValues) {
    if (!contactConfig.forms.endpoint) { setMessage('Callback setup required. Nothing was sent.'); return; }
    setBusy(true); setMessage('');
    try {
      const response = await fetch(contactConfig.forms.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, type: 'callback' }) });
      if (!response.ok) throw new Error();
      form.reset(); setMessage('Callback request received.');
    } catch { setMessage('We could not submit this request. Please try again later.'); }
    finally { setBusy(false); }
  }
  return <div className="cp-callback">
    <button className="cp-callback-toggle" type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}><span><PhoneCall size={19} /><strong>Prefer a callback?</strong></span><span>{open ? 'Close' : 'Request a callback'} <ArrowDownRight size={15} /></span></button>
    {open && <Form {...form}><form className="cp-callback-form" onSubmit={form.handleSubmit(submit)} noValidate>
      <div className="cp-field-grid">
        <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><input autoComplete="name" {...field} /></FormControl><FormMessage role="alert" /></FormItem>} />
        <FormField control={form.control} name="phone" render={({ field }) => <FormItem><FormLabel>Phone number</FormLabel><FormControl><input type="tel" autoComplete="tel" placeholder="+ country code" {...field} /></FormControl><FormMessage role="alert" /></FormItem>} />
        <FormField control={form.control} name="preferredTime" render={({ field }) => <FormItem><FormLabel>Preferred time</FormLabel><FormControl><input placeholder="Your preferred time" {...field} /></FormControl><FormMessage role="alert" /></FormItem>} />
        <FormField control={form.control} name="reason" render={({ field }) => <FormItem><FormLabel>Short reason</FormLabel><FormControl><input placeholder="What is the question about?" {...field} /></FormControl><FormMessage role="alert" /></FormItem>} />
      </div>
      <button className="button button-gold" disabled={busy} type="submit">{busy ? 'Sending…' : <>Request a callback <ArrowRight size={15} /></>}</button>
      {message && <p className="cp-response" role="status">{message}</p>}
    </form></Form>}
  </div>;
}

export function ContactPageContent() {
  const email = contactConfig.contact.email;
  const whatsapp = contactConfig.contact.whatsappNumber.replace(/\D/g, '');
  const linkedin = contactConfig.contact.linkedinUrl;
  const bookingUrl = getBookingUrl();
  const options = [
    { icon: CalendarDays, title: 'BOOK A CALL', text: '30-minute discovery call', action: 'Choose a time', href: bookingUrl || '#booking', tone: 'blue', disabled: !bookingUrl },
    { icon: Mail, title: 'EMAIL', text: 'Send a brief enquiry', action: 'Email Neeson', href: email ? `mailto:${email}` : '', tone: 'purple', disabled: !email },
    { icon: MessageCircle, title: 'WHATSAPP', text: 'Quick conversation', action: 'Connect on WhatsApp', href: whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Neeson Technologies, I would like to discuss a technical/business question and understand whether Neeson may be the right fit.')}` : '', tone: 'pink', disabled: !whatsapp },
    { icon: Linkedin, title: 'LINKEDIN', text: 'Professional connection', action: 'Visit LinkedIn', href: linkedin, tone: 'orange', disabled: !linkedin },
  ];
  return <div className="neeson-contact-page">
    <section className="cp-hero">
      <div className="wrap cp-hero-grid">
        <div className="cp-hero-copy">
          <p className="eyebrow">CONTACT &amp; BOOKING</p>
          <h1>Book a <span>30-minute</span><br />discovery call</h1>
          <p className="cp-hero-lede">Tell us the decision your team is facing and when it needs to be made.</p>
          <p className="cp-hero-detail">The call establishes whether Neeson is the right fit and what a scoped next step could involve.</p>
          <p className="cp-hero-boundary">Document review and substantive technical advice are undertaken through an agreed paid engagement.</p>
          <div className="cp-hero-actions"><a className="button button-gold" href="#booking">Choose a time <ArrowRight size={15} /></a><a className="cp-text-link" href="#enquiry">Prefer email? Send an enquiry <ArrowRight size={14} /></a></div>
        </div>
        <div className="cp-hero-visual">
          <img src={`${import.meta.env.BASE_URL}contact-hero.jpg`} alt="Two people reviewing a cable sample beside a notebook during a technical discussion" />
          <div className="cp-visual-shade" />
          <span className="cp-visual-label">MATERIAL RESPONSE / E-BEAM</span>
          <div className="cp-visual-flow"><span>QUESTION</span><i /><span>EVIDENCE</span><i /><span>DECISION</span></div>
          <div className="cp-target" aria-hidden="true"><span /></div>
        </div>
      </div><div className="cp-hero-rule" />
    </section>

    <section className="cp-conversion" id="booking">
      <div className="wrap">
        <div className="cp-conversion-heading"><p className="eyebrow">START WITH ONE LIVE QUESTION</p><h2>Find the right next step.</h2><p>Speak directly with Dr Sonia Tikku Suresh. The first conversation is about fit, the decision ahead and appropriate scope.</p></div>
        <div className="cp-main-grid">
          <article className="cp-panel cp-booking">
            <div className="cp-panel-heading"><span className="cp-panel-index">01 / BOOK A CALL</span><h2>Choose a time</h2><p>Any available times will be shown in Asia/Kolkata (IST).</p></div>
            {bookingUrl ? <div className="cp-scheduler"><p>Choose a time for a 30-minute discovery call.</p><a className="button button-gold" href={bookingUrl} target="_blank" rel="noreferrer">Open booking calendar <ArrowRight size={15} /></a></div> : <div className="cp-scheduler cp-scheduler-empty"><div className="cp-calendar-mark"><CalendarDays size={28} /></div><span className="cp-status-pill">BOOKING LINK PENDING</span><h3>Online booking is being configured.</h3><p>Prefer to contact us directly?</p><div className="cp-scheduler-channels">{email ? <a href={`mailto:${email}`}><Mail size={15} />Email Neeson</a> : <span aria-disabled="true"><Mail size={15} />Email coming soon</span>}{whatsapp ? <a href={`https://wa.me/${whatsapp}`}><MessageCircle size={15} />WhatsApp</a> : <span aria-disabled="true"><MessageCircle size={15} />WhatsApp coming soon</span>}</div></div>}
            <ul className="cp-call-facts"><li><Clock3 size={16} /><span>30 minutes</span></li><li><UserRound size={16} /><span>Discovery call with Dr Sonia Tikku Suresh</span></li><li><FileText size={16} /><span>One live question</span></li><li><ShieldCheck size={16} /><span>No document review or substantive technical advice</span></li></ul>
            <p className="cp-confidential-inline">Please do not send confidential technical details at this stage.</p>
          </article>
          <article className="cp-panel cp-enquiry" id="enquiry">
            <div className="cp-panel-heading"><span className="cp-panel-index">02 / SEND AN ENQUIRY</span><h2>Tell us about your question</h2><p>Keep it brief. One or two sentences are enough for the first conversation.</p></div>
            <EnquiryForm />
          </article>
        </div>
        <CallbackForm />
      </div>
    </section>

    <section className="cp-options">
      <div className="wrap">
        <div className="cp-section-head"><p className="eyebrow">OTHER WAYS TO CONNECT</p><h2>Choose the way that works for you.</h2><p>Direct channels are shown when verified contact details are configured.</p></div>
      <div className="cp-options-grid">{options.map(({ icon: Icon, title, text, action, href, tone, disabled }) => <article className={`cp-option cp-${tone}`} key={title}><div className="cp-option-top"><span className="cp-option-icon"><Icon size={20} /></span><span>{title}</span></div><h3>{text}</h3>{disabled ? <span className="cp-disabled" aria-disabled="true">{title === 'BOOK A CALL' ? 'Booking coming soon' : title === 'LINKEDIN' ? 'LinkedIn profile coming soon' : title === 'WHATSAPP' ? 'WhatsApp coming soon' : 'Email coming soon'}</span> : <ContactAction href={href}>{action}</ContactAction>}</article>)}</div>
      </div>
    </section>

    <section className="cp-next">
      <div className="wrap">
        <div className="cp-section-head"><p className="eyebrow">WHAT HAPPENS NEXT</p><h2>A simple first step.</h2></div>
        <div className="cp-timeline">
          {[
            ['01', 'YOU SHARE THE QUESTION', 'One or two sentences are enough.'],
            ['02', 'WE ESTABLISH THE FIT', 'We discuss whether Neeson is the right fit for the question.'],
            ['03', 'WE DEFINE THE NEXT STEP', 'If appropriate, we outline a scoped engagement.'],
            ['04', 'WORK STARTS WITH AGREED SCOPE', 'Paid technical work begins only after scope, timing and fees are agreed.'],
          ].map(([number, title, text]) => <article className="cp-timeline-item" key={number}><span className="cp-step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </div>
    </section>

    <section className="cp-boundaries">
      <div className="wrap">
        <div className="cp-section-head"><p className="eyebrow">CLEAR EXPECTATIONS</p><h2>What the call is not.</h2></div>
        <div className="cp-boundary-grid">
          <article><FileText size={20} /><span>01</span><h3>NO DOCUMENT REVIEW</h3><p>We do not review documents during the discovery call.</p></article>
          <article><ShieldCheck size={20} /><span>02</span><h3>NO SUBSTANTIVE TECHNICAL ADVICE</h3><p>Detailed technical advice is undertaken through an agreed paid engagement.</p></article>
          <article><MessageCircle size={20} /><span>03</span><h3>NO CONFIDENTIAL MATERIAL</h3><p>Please do not send confidential technical details at this stage.</p></article>
        </div>
        <p className="cp-role-boundary">Neeson does not provide equipment supply, plant operation, radiation safety, regulatory submissions or formal technical sign-off.</p>
      </div>
    </section>

    <section className="cp-location">
      <div className="wrap cp-location-inner"><div><p className="eyebrow">NEESON TECHNOLOGIES</p><h2>Independent advisory on radiation processing of materials.</h2><p>Bengaluru, India.</p></div><div className="cp-location-mark"><span>INDEPENDENT</span><i /><span>EVIDENCE-LED</span><i /><span>ADVISORY</span></div></div>
    </section>

    <section className="cp-final">
      <div className="cp-final-art" aria-hidden="true"><i /><i /><i /></div>
      <div className="wrap cp-final-inner"><div><p className="eyebrow">A CLEARER NEXT STEP</p><h2>Bring one question.<br />Leave with a next step.</h2><p>In thirty minutes we find out whether Neeson is the right fit and what the next step would be.</p></div><div className="cp-final-actions"><a className="button button-gold" href="#booking">Book a 30-minute discovery call <ArrowRight size={15} /></a><a className="cp-text-link" href="#enquiry">Send an enquiry <ArrowRight size={14} /></a></div></div>
    </section>
  </div>;
}

export function PrivacyPageContent() {
  return <div className="neeson-contact-page"><section className="cp-privacy-page"><div className="wrap"><p className="eyebrow">PRIVACY NOTICE</p><h1>Privacy notice coming soon.</h1><p>This notice is being prepared. Please do not include confidential technical details at this stage.</p><Link href="/contact" className="button button-gold">Return to contact <ArrowRight size={15} /></Link></div></section></div>;
}
