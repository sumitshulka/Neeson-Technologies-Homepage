import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import './pages/how-we-help.css';
import { ExpertisePageContent } from '@/pages/expertise-page';
import { ExpertsPageContent } from '@/pages/experts-page';
import { ContactPageContent, PrivacyPageContent } from '@/pages/contact-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowRight,
  Atom,
  Beaker,
  Cable,
  Check,
  ClipboardCheck,
  ClipboardCopy,
  FileText,
  Factory,
  MessagesSquare,
  Boxes,
  Workflow,
  Settings2,
  ShieldAlert,
  ClipboardList,
  Layers3,
  Menu,
  Microscope,
  Network,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  UsersRound,
  X,
  Zap,
} from 'lucide-react';
import NotFound from '@/pages/not-found';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();
const logo = `${import.meta.env.BASE_URL}neeson-logo-reference.png`;
const heroVisual = `${import.meta.env.BASE_URL}materials-hero.png`;

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'How We Help', href: '/how-we-help' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Our Experts', href: '/our-experts' },
  { label: 'Technical Heritage', href: '/technical-heritage' },
  { label: 'Contact', href: '/contact' },
];

const seo: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Neeson Technologies | Independent E-Beam & Materials Advisory',
    description: 'Independent advisory on e-beam processing, materials behaviour and evidence-led decisions for cable and polymer businesses.',
  },
  '/how-we-help': {
    title: 'How We Help | Neeson Technologies',
    description: 'Explore Discovery Calls, Decision Diagnostics and Feasibility / Materials Reviews with Neeson Technologies.',
  },
  '/expertise': {
    title: 'Expertise | Neeson Technologies',
    description: 'Materials science, radiation processing, characterisation and evidence-led product decisions.',
  },
  '/our-experts': {
    title: 'Our Experts | Neeson Technologies',
    description: 'Meet Dr Sonia Tikku Suresh, Principal of Neeson Technologies and lead for client conversations and advisory reviews.',
  },
  '/technical-heritage': {
    title: 'Technical Heritage | Neeson Technologies',
    description: 'An evidence-led approach to radiation processing, materials science and industrial decision-making.',
  },
  '/contact': {
    title: 'Contact & Booking | Neeson Technologies',
    description: 'Book a 30-minute discovery call or send an enquiry to establish whether Neeson Technologies is the right fit for your question.',
  },
  '/privacy': {
    title: 'Privacy Notice | Neeson Technologies',
    description: 'Neeson Technologies privacy notice.',
  },
};

function usePageMeta(path: string) {
  useEffect(() => {
    const content = seo[path] ?? {
      title: 'Neeson Technologies',
      description: 'Independent advisory on radiation processing of materials.',
    };
    document.title = content.title;
    const setMeta = (selector: string, attribute: string, value: string) => {
      let node = document.head.querySelector<HTMLMetaElement>(selector);
      if (!node) {
        node = document.createElement('meta');
        if (selector.startsWith('meta[property=')) node.setAttribute('property', selector.match(/"([^"]+)"/)?.[1] ?? '');
        else node.setAttribute('name', selector.match(/"([^"]+)"/)?.[1] ?? '');
        document.head.appendChild(node);
      }
      node.setAttribute(attribute, value);
    };
    setMeta('meta[name="description"]', 'content', content.description);
    setMeta('meta[property="og:title"]', 'content', content.title);
    setMeta('meta[property="og:description"]', 'content', content.description);
    setMeta('meta[name="twitter:title"]', 'content', content.title);
    setMeta('meta[name="twitter:description"]', 'content', content.description);
  }, [path]);
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [location]);
  return (
    <header className="topbar">
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="Neeson Technologies home" data-testid="link-brand-home">
          <img src={logo} alt="Neeson Technologies" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${location === item.href ? 'active' : ''}`}
              aria-current={location === item.href ? 'page' : undefined}
              data-testid={`link-nav-${item.href === '/' ? 'home' : item.href.slice(1)}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="button button-gold nav-cta" data-testid="link-book-call-nav">
          Book a 30-minute call <ArrowRight size={15} />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={location === item.href ? 'active' : ''}
              aria-current={location === item.href ? 'page' : undefined}
              data-testid={`link-mobile-${item.href === '/' ? 'home' : item.href.slice(1)}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="button button-gold" data-testid="link-book-call-mobile">
            Book a 30-minute call <ArrowRight size={15} />
          </Link>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const focus = ['Materials Behaviour', 'Process Qualification', 'Evidence Strategy', 'Advanced Materials', 'Industrial Consulting'];
  return (
    <footer className="footer">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Neeson Technologies home" data-testid="link-footer-home">
            <img src={logo} alt="Neeson Technologies" />
          </Link>
          <p>Independent advisory on radiation processing of materials. Bengaluru, India.</p>
        </div>
        <div className="footer-col">
          <h3>QUICK LINKS</h3>
          <div className="footer-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-footer-${item.href.slice(1) || 'home'}`}>{item.label}</Link>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h3>FOCUS AREAS</h3>
          <div className="footer-links">
            {focus.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div>
          <p className="footer-statement">Independent advice<br />for better decisions.</p>
          <div className="footer-rule" />
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 Neeson Technologies. All rights reserved.</span>
        <div className="footer-policy"><Link href="/privacy">Privacy notice</Link><span>Terms of Use</span></div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  usePageMeta(location);
  return <div className="site"><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></div>;
}

function BookLink({ children = 'Book a 30-minute discovery call', className = '' }: { children?: ReactNode; className?: string }) {
  return <Link href="/contact" className={`button button-gold ${className}`} data-testid="link-book-call">{children}<ArrowRight size={16} /></Link>;
}

const situations = [
  {
    title: 'Planning a line or the next product family',
    text: 'You are considering e-beam investment, preparing a new line, or deciding what an operating line should process next. A scoped review can help clarify the product case, material questions and evidence needed before committing further.',
    icon: Cable,
    color: '#168cff',
  },
  {
    title: 'Understanding material behaviour after irradiation',
    text: 'A grade is being developed or qualified, or trial results are inconsistent or difficult to interpret. A scoped review can help organise the evidence and identify which material questions, tests or specialist assessments should come next.',
    icon: Microscope,
    color: '#a356cf',
  },
  {
    title: 'Responding to a new customer requirement',
    text: 'A customer, tender or application requires different product evidence. A scoped review can help map the evidence gaps and assess the next qualification steps, including whether e-beam is relevant.',
    icon: FileText,
    color: '#e69b25',
  },
];

const questions = [
  'Which next product families justify further trials or qualification on your line?',
  "Can a compound's performance after dose be confirmed, and repeated?",
  'What customer or qualification evidence is needed before the next commitment?',
  'Own a machine, or keep buying job work?',
  "When a grade's performance changes after dose, what evidence settles the question?",
];

function HomePage() {
  return (
    <Shell>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">E-BEAM&nbsp; | &nbsp;NANOSCIENCE&nbsp; | &nbsp;INDUSTRIAL CONSULTING</div>
            <h1>Independent <span className="accent">e-beam</span> advice for cable and <span className="accent-pink">polymer</span> businesses</h1>
            <p className="hero-text">Neeson Technologies helps you assess product, material and evidence questions before your next investment, trial or qualification decision.</p>
            <div className="hero-actions">
              <BookLink />
              <Link href="/how-we-help" className="button button-outline" data-testid="link-how-we-help-hero">See how we help <ArrowRight size={15} /></Link>
            </div>
            <p className="hero-small">Speak with Dr Sonia Tikku Suresh about one live question and the right next step.</p>
            <p className="hero-independent">Neeson does not supply equipment or accept commission linked to equipment sales.</p>
          </div>
          <div className="hero-art" aria-label="Scientific visualization of an irradiated polymer cable cross-section">
            <div className="hero-orbit" />
            <span className="hero-micro">MATERIAL RESPONSE / E-BEAM</span>
            <img src={heroVisual} alt="Layered polymer cable cross-section illuminated by a precise e-beam path" />
            <span className="hero-art-label">Materials behaviour<br />Process evidence<br />Qualification</span>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Advisory principles">
        <div className="wrap trust-grid">
          <div className="trust-item"><ShieldCheck className="trust-icon" size={25} /><div><strong>Independent advice.</strong><span>Evidence-led decisions, without an equipment sales agenda.</span></div></div>
          <div className="trust-item"><SlidersHorizontal className="trust-icon" size={24} /><div><strong>No equipment sales.</strong><span>No equipment supply or commission linked to sales.</span></div></div>
          <div className="trust-item"><UsersRound className="trust-icon" size={25} /><div><strong>Focused on your questions.</strong><span>A clear, practical and evidence-based next step.</span></div></div>
        </div>
      </section>

      <section className="section situations">
        <div className="wrap">
          <div className="section-heading"><p className="eyebrow">WHY CLIENTS COME TO US</p><h2 className="section-title">Three situations that start a conversation</h2><p className="section-lede">Most first conversations begin with one of these.</p></div>
          <div className="situation-grid">
            {situations.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.title} className="situation-card" style={{ '--card-accent': item.color } as CSSProperties} data-testid={`card-situation-${index + 1}`}>
                <span className="number">0{index + 1}</span><Icon className="card-icon" size={24} strokeWidth={1.6} /><h3>{item.title}</h3><p>{item.text}</p>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="diagnostic">
        <div className="wrap diagnostic-grid">
          <div>
            <p className="eyebrow">PAID, AFTER THE CALL</p>
            <h2 className="section-title">Start with a defined<br />Decision Diagnostic</h2>
            <p className="diagnostic-copy">After the discovery call, Neeson may propose a paid review of one agreed question.</p>
            <p className="diagnostic-note">You receive a written Decision Note explaining what the available evidence supports, the remaining uncertainties, the options and a practical next-action plan. Scope, timing and fees are agreed before work starts.</p>
          </div>
          <article className="report" aria-label="Decision Note example structure">
            <div className="report-head"><div><h3>DECISION NOTE</h3><p>A structured review of one agreed question</p></div><span className="report-mark">NEESON / ADVISORY</span></div>
            <ul className="report-list">
              <li><span className="report-symbol"><Check size={13} /></span>What the evidence supports</li>
              <li><span className="report-symbol">?</span>What remains uncertain</li>
              <li><span className="report-symbol"><ArrowRight size={12} /></span>Options</li>
              <li><span className="report-symbol"><ArrowRight size={12} /></span>Recommended next action</li>
              <li><span className="report-symbol"><Check size={13} /></span>Review discussion</li>
            </ul>
            <span className="report-stamp">ONE DEFINED QUESTION</span>
          </article>
        </div>
      </section>

      <section className="deliverables">
        <div className="wrap">
          <div className="deliverable-head"><h2 className="section-title">What you receive</h2><p className="section-lede">A practical, written output to help make the next decision clearer.</p></div>
          <div className="deliverable-grid">
            {[
              ['01', 'A written Decision Note on the agreed question', FileText],
              ['02', 'What the evidence supports, and what is still open', ScanSearch],
              ['03', 'A practical next-action plan, and one review call', ClipboardCheck],
            ].map(([number, text, Icon]) => {
              const DeliverIcon = Icon as typeof FileText;
              return <article className="deliverable" key={number as string}><div className="deliverable-top"><span className="deliverable-num">{number as string}</span><DeliverIcon className="deliverable-icon" size={19} /></div><p>{text as string}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="materials">
        <div className="wrap materials-grid">
          <div><p className="eyebrow">TECHNICAL PERSPECTIVE</p><h2 className="section-title">Materials science behind the advice</h2></div>
          <div>
            <p className="materials-copy">Dr Sonia Tikku Suresh brings hands-on materials and characterisation experience to every engagement. That is why Neeson asks what your compound does after dose, not only what the machine can deliver.</p>
            <div className="expertise-chips">
              <div className="expertise-chip"><Layers3 size={20} />Materials Behaviour<br />After Irradiation</div>
              <div className="expertise-chip"><Microscope size={20} />Characterisation<br />&amp; Testing</div>
              <div className="expertise-chip"><Zap size={20} />E-Beam<br />Processing</div>
              <div className="expertise-chip"><ScanSearch size={20} />Product &amp;<br />Application Perspective</div>
            </div>
            <Link href="/our-experts" className="text-link" data-testid="link-meet-principal">Meet the principal <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="independent">
        <div className="wrap independent-grid">
          <div><p className="eyebrow">INDEPENDENT BY DESIGN</p><h2 className="section-title">Independent of the equipment sale</h2><p className="independent-copy">Neeson's advisory scope is agreed with the client. Relevant supplier or specialist relationships are disclosed in the proposal. Equipment suppliers, laboratories and qualified specialists retain their own responsibilities.</p></div>
          <div className="flow" aria-label="Advisory process: client question, evidence, technical interpretation, options, next decision">
            {[
              ['CLIENT QUESTION', UsersRound],
              ['EVIDENCE', FileText],
              ['TECHNICAL INTERPRETATION', Microscope],
              ['OPTIONS', Network],
              ['NEXT DECISION', ArrowRight],
            ].map(([label, Icon]) => {
              const FlowIcon = Icon as typeof UsersRound;
              return <div className="flow-step" key={label as string}><span className="flow-icon"><FlowIcon size={17} /></span><span>{label as string}</span></div>;
            })}
          </div>
        </div>
      </section>

      <section className="advanced">
        <div className="wrap">
          <div className="advanced-head"><div><p className="eyebrow">BEYOND CABLE &amp; POLYMER</p><h2 className="section-title">Advanced Materials<br />&amp; Nanoscience</h2></div><p className="section-lede">Alongside the cable and polymer focus, Neeson considers defined advisory questions involving nanoparticles and dispersions, surface modification and coatings, formulation, and interpretation of characterisation data.</p></div>
          <div className="advanced-grid">
            <div className="advanced-item"><Atom size={21} /><h3>Nanoparticles<br />&amp; Dispersions</h3></div>
            <div className="advanced-item"><Layers3 size={21} /><h3>Surface Modification<br />&amp; Coatings</h3></div>
            <div className="advanced-item"><Beaker size={21} /><h3>Formulation</h3></div>
            <div className="advanced-item"><ScanSearch size={21} /><h3>Characterisation<br />Data Interpretation</h3></div>
          </div>
          <p className="disclaimer">These materials questions may support e-beam applications or a separate materials project. Neeson does not imply that it owns a testing laboratory or supplies a complete development and validation service.</p>
        </div>
      </section>

      <section className="questions">
        <div className="wrap questions-grid">
          <div className="questions-intro"><p className="eyebrow">A CLEARER NEXT STEP</p><h2 className="section-title">Questions we can help frame</h2><p className="section-lede" style={{ color: '#b9cbd8' }}>Bring a live question. We can help clarify what is known, what is still uncertain and what could come next.</p></div>
          <div className="questions-list">
            {questions.map((question, index) => <details className="question" key={question} data-testid={`accordion-question-${index + 1}`}><summary>{question}</summary><p>A scoped advisory review can help organise the available evidence, clarify remaining uncertainties and identify practical next steps. Scope is agreed before any review begins.</p></details>)}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap cta-grid">
          <div><h2>Bring one question.<br />Leave with a next step.</h2><p>In thirty minutes we find out whether Neeson is the right fit and what the next step would be. We do not review documents on the call.</p></div>
          <div className="cta-action"><BookLink>Book a 30-minute discovery call</BookLink></div>
        </div>
      </section>
    </Shell>
  );
}

function PageHero({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return <section className="inner-hero"><div className="wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-text">{description}</p></div></section>;
}

function PageCta({ text = 'Bring one live question and find out whether Neeson is the right fit.' }: { text?: string }) {
  return <div className="page-cta"><p>{text}</p><BookLink>Book a 30-minute call</BookLink></div>;
}

function HowWeHelpPage() {
  const audiences = [
    { number: '01', title: 'Cable makers', text: 'Producers planning a line, preparing the next product family, or in the early stages of running an electron-beam line.', icon: Factory, tone: 'blue' },
    { number: '02', title: 'Compound suppliers', text: 'Suppliers whose grades must perform after dose, and repeat the result batch after batch.', icon: Boxes, tone: 'violet' },
    { number: '03', title: 'Job-work users', text: 'Owners deciding whether to keep buying irradiation or install their own machine.', icon: Settings2, tone: 'orange' },
  ];
  const stages = [
    { number: '01', title: 'Discovery Call', badge: 'FREE', icon: MessagesSquare, description: 'We define the decision and who owns it, and confirm whether Neeson is the right fit.', outcome: 'Recommended next step' },
    { number: '02', title: 'Decision Diagnostic', badge: 'PAID · ONE DEFINED QUESTION', icon: ClipboardList, description: 'For a first machine, a failed grade or a moved specification.', outcome: 'You receive a written Decision Note covering:', note: 'Scope, timing and fee are agreed in writing before work starts.' },
    { number: '03', title: 'Feasibility or Materials Review', badge: 'PAID · SCOPE AGREED SEPARATELY', icon: Workflow, description: 'For a defined product-family or plant question where a broader view is justified.', outcome: 'Stakeholder input, evidence review and a written case for your board or internal decision team.', note: 'Scope, any site work and specialist responsibilities are agreed in writing before work starts.' },
  ];
  const flow = [
    ['YOUR QUESTION', MessagesSquare], ['AVAILABLE EVIDENCE', FileText], ['SUPPORTED CONCLUSIONS', Check],
    ['OPEN QUESTIONS', ScanSearch], ['OPTIONS', Network], ['NEXT WORK', ArrowRight], ['DECISION', ShieldCheck],
  ];
  const actions = [
    ['01', 'DEFINE', 'Define the decision and who owns it.', MessagesSquare],
    ['02', 'REVIEW', 'Review the available evidence.', FileText],
    ['03', 'DISTINGUISH', 'Separate supported conclusions from open questions.', ScanSearch],
    ['04', 'ACT', 'Set out the next work required.', ArrowRight],
  ];
  const questions = [
    'Which next product families justify further trials or qualification on your line?',
    "Can a compound's performance after dose be confirmed, and repeated?",
    'What customer or qualification evidence is needed before the next commitment?',
    'Own a machine, or keep buying job work?',
    "When a grade's performance changes after dose, what evidence settles the question?",
  ];
  const capabilities = [
    ['Nanoparticles', '& Dispersions', Atom], ['Surface Modification', '& Coatings', Layers3],
    ['Formulation', '', Beaker], ['Characterisation', 'Data Interpretation', Microscope],
  ];
  const boundaries = [
    ['01', 'Equipment supply', 'and plant operation', Settings2],
    ['02', 'Radiation safety', 'and regulatory submissions', ShieldAlert],
    ['03', 'Formal technical', 'sign-off', ClipboardCheck],
    ['04', 'Specialist work and responsibility', 'defined in the agreed proposal', UsersRound],
  ];
  return <Shell>
    <div className="hw-page">
      <section className="hw-hero">
        <div className="hw-hero-grid wrap">
          <div className="hw-hero-copy">
            <p className="eyebrow">HOW WE HELP</p>
            <h1>A clear question.<br /><span>An agreed written output.</span></h1>
            <p className="hw-hero-lede">We work with cable manufacturers, polymer compound suppliers and businesses assessing irradiation job work against their own capability.</p>
            <p className="hw-hero-sub">The starting point is a product, material, specification or investment decision that needs better evidence.</p>
            <div className="hw-hero-actions"><BookLink>Book a 30-minute discovery call</BookLink><span>Start with one live question.</span></div>
          </div>
          <div className="hw-hero-visual" role="img" aria-label="Scientific visualization of a layered cable and precise e-beam path">
            <img src={`${import.meta.env.BASE_URL}materials-hero.png`} alt="" />
            <div className="hw-visual-caption"><span>01 / QUESTION</span><span>02 / MATERIAL RESPONSE</span><span>03 / EVIDENCE</span></div>
            <div className="hw-visual-crosshair" />
          </div>
        </div>
        <div className="hw-hero-rule"><span /></div>
      </section>

      <section className="hw-audience section">
        <div className="wrap">
          <div className="hw-section-intro">
            <p className="eyebrow">WHO WE WORK WITH</p>
            <h2 className="section-title">Built around the decisions that matter.</h2>
            <p className="section-lede">Neeson's work is designed for businesses that need to make a technical, product or investment decision with greater confidence.</p>
          </div>
          <div className="hw-audience-grid">
            {audiences.map((item) => {
              const Icon = item.icon;
              return <article className={`hw-audience-card hw-${item.tone}`} key={item.number} data-testid={`card-audience-${item.number}`}>
                <div className="hw-card-top"><span className="hw-number">{item.number}</span><Icon size={31} strokeWidth={1.5} aria-hidden="true" /></div>
                <h3>{item.title}</h3><p>{item.text}</p><span className="hw-card-line" />
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="hw-process">
        <div className="wrap">
          <div className="hw-process-heading">
            <div><p className="eyebrow">HOW THE WORK RUNS</p><h2 className="section-title">From one question to a decision you can act on.</h2></div>
            <p>The discovery call establishes your question, timing and fit. A paid Decision Diagnostic reviews the agreed information and produces a Decision Note and review discussion. Where a larger feasibility or materials review is justified, its scope, site work and specialist responsibilities are agreed separately.</p>
          </div>
          <div className="hw-timeline">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return <article className="hw-stage" key={stage.number} data-testid={`stage-${stage.number}`}>
                <div className="hw-stage-marker"><span>{stage.number}</span><Icon size={22} aria-hidden="true" /></div>
                <div className="hw-stage-body">
                  <span className={`hw-badge hw-badge-${stage.number}`}>{stage.badge}</span>
                  <h3>{stage.title}</h3><p className="hw-stage-desc">{stage.description}</p>
                  {stage.number === '02' ? <>
                    <div className="hw-note-card"><strong>{stage.outcome}</strong><ul><li>What the available evidence supports</li><li>Open questions</li><li>Options</li><li>Next steps</li></ul><span>One review call is included.</span></div>
                    <p className="hw-stage-note">{stage.note}</p>
                  </> : <><p className="hw-outcome">{stage.outcome}</p>{stage.note && <p className="hw-stage-note">{stage.note}</p>}</>}
                </div>
              </article>;
            })}
          </div>
          <div className="hw-flow-wrap">
            <div className="hw-flow-head"><span>THE EVIDENCE PATH</span><span>QUESTION TO DECISION</span></div>
            <div className="hw-flow" aria-label="Process: your question, available evidence, supported conclusions, open questions, options, next work, decision">
              {flow.map(([label, Icon], index) => {
                const FlowIcon = Icon as typeof MessagesSquare;
                return <div className="hw-flow-node" key={label as string} style={{ '--node-index': index } as CSSProperties}><span className="hw-flow-icon"><FlowIcon size={17} aria-hidden="true" /></span><span>{label as string}</span>{index < flow.length - 1 && <ArrowRight className="hw-flow-arrow" size={15} aria-hidden="true" />}</div>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="hw-actual section">
        <div className="wrap">
          <div className="hw-section-intro">
            <p className="eyebrow">A DEFINED ADVISORY ROLE</p>
            <h2 className="section-title">We make the decision clearer.</h2>
            <p className="section-lede">We define the decision and who owns it, review the available evidence, distinguish supported conclusions from open questions, and set out the next work required.</p>
          </div>
          <div className="hw-actions-grid">
            {actions.map(([number, title, text, Icon]) => {
              const ActionIcon = Icon as typeof MessagesSquare;
              return <article className="hw-action-card" key={number as string}><div className="hw-action-meta"><span>{number as string}</span><ActionIcon size={22} aria-hidden="true" /></div><h3>{title as string}</h3><p>{text as string}</p></article>;
            })}
          </div>
          <p className="hw-scoping-note"><span />Tests, trials or formal qualification are separately scoped where needed.</p>
        </div>
      </section>

      <section className="hw-questions">
        <div className="wrap hw-questions-layout">
          <div className="hw-questions-intro"><p className="eyebrow">QUESTIONS WE CAN HELP FRAME</p><h2 className="section-title">Sometimes the right answer starts with a better question.</h2><p>Bring the decision ahead and the evidence you have. We can help clarify what is supported, what remains open and what should happen next.</p></div>
          <div className="hw-question-list">
            {questions.map((question, index) => <details className="hw-question" key={question} data-testid={`question-${index + 1}`}>
              <summary><span className="hw-question-num">0{index + 1}</span><span className="hw-question-title">{question}</span><span className="hw-question-toggle" aria-hidden="true">+</span></summary>
              <div className="hw-question-answer"><p>A scoped advisory review can help organise the available evidence, clarify remaining uncertainties and identify practical next steps. Scope is agreed before any review begins.</p></div>
            </details>)}
          </div>
        </div>
      </section>

      <section className="hw-advanced section">
        <div className="wrap hw-advanced-grid">
          <div className="hw-molecular" role="img" aria-label="Abstract scientific illustration of polymer chains and nanoparticles">
            <div className="hw-molecular-grid" /><div className="hw-molecule-orbit orbit-one" /><div className="hw-molecule-orbit orbit-two" />
            <div className="hw-molecule-core"><span /><span /><span /><span /><span /></div>
            <div className="hw-molecule-label label-a">MATERIAL / 01</div><div className="hw-molecule-label label-b">STRUCTURE · RESPONSE</div>
            <div className="hw-molecule-line line-a" /><div className="hw-molecule-line line-b" />
          </div>
          <div className="hw-advanced-copy">
            <p className="eyebrow">ADVANCED MATERIALS &amp; NANOSCIENCE</p>
            <h2 className="section-title">Beyond the cable and polymer question.</h2>
            <p className="hw-advanced-lede">Alongside the cable and polymer focus, Neeson considers defined advisory questions involving nanoparticles and dispersions, surface modification and coatings, formulation, and interpretation of characterisation data.</p>
            <div className="hw-capabilities">{capabilities.map(([title, sub, Icon]) => {
              const CapabilityIcon = Icon as typeof Atom;
              return <div className="hw-capability" key={title as string}><CapabilityIcon size={17} aria-hidden="true" /><span>{title as string}{sub && <small>{sub as string}</small>}</span></div>;
            })}</div>
            <p className="hw-scope-copy">The scope is agreed around Sonia's demonstrated experience and any required specialist or laboratory input.</p>
            <div className="hw-disclaimer"><strong>These materials questions may support e-beam applications or a separate materials project.</strong><span>Neeson does not imply that it owns a testing laboratory or supplies a complete development and validation service.</span></div>
          </div>
        </div>
      </section>

      <section className="hw-boundaries">
        <div className="wrap hw-boundary-grid">
          <div className="hw-boundary-intro"><p className="eyebrow">INDEPENDENT BY DESIGN</p><h2 className="section-title">What sits outside our advisory role</h2><p>Advice supports a decision; it does not replace the responsibilities of operators, suppliers, laboratories, qualified specialists or the client.</p></div>
          <div className="hw-boundary-content">
            <div className="hw-boundary-items">{boundaries.map(([number, title, sub, Icon]) => {
              const BoundaryIcon = Icon as typeof Settings2;
              return <article className="hw-boundary-item" key={number as string}><span className="hw-boundary-number">{number as string}</span><BoundaryIcon size={20} aria-hidden="true" /><h3>{title as string}<small>{sub as string}</small></h3></article>;
            })}</div>
            <p className="hw-boundary-note">Any specialist work and responsibility are defined in the agreed proposal.</p>
          </div>
        </div>
      </section>

      <section className="hw-final">
        <div className="hw-final-art" aria-hidden="true"><span /><span /><span /></div>
        <div className="wrap hw-final-grid">
          <div><p className="eyebrow">A CLEARER NEXT STEP</p><h2>Bring one question.<br />Leave with a next step.</h2><p>In thirty minutes we find out whether Neeson is the right fit and what the next step would be.</p><p className="hw-final-small">We do not review documents on the call.</p></div>
          <BookLink>Book a 30-minute discovery call</BookLink>
        </div>
      </section>
    </div>
  </Shell>;
}

function ExpertisePage() {
  return <Shell><ExpertisePageContent BookLink={BookLink} /></Shell>;
}

function ExpertsPage() {
  return <Shell><ExpertsPageContent BookLink={BookLink} /></Shell>;
}

function HeritagePage() {
  return <Shell>
    <PageHero eyebrow="TECHNICAL HERITAGE" title={<>Materials first.<br />Evidence before commitment.</>} description="Neeson's technical perspective brings materials behaviour, process context and evidence together to help clients make informed next decisions." />
    <section className="heritage-band"><div className="wrap heritage-band-grid"><div className="heritage-mark">Ask what the material does after dose.</div><p>Radiation processing is one part of a product question. The material, application, available evidence and qualification context all matter. Neeson's work starts by defining what needs to be understood.</p></div></section>
    <section className="inner-body"><div className="wrap">
      <div className="section-heading"><p className="eyebrow">AN EVIDENCE-LED APPROACH</p><h2 className="section-title">A decision framework, not an equipment pitch.</h2><p className="section-lede">Independent advisory on radiation processing of materials—grounded in the client's question and bounded by a clear scope.</p></div>
      <div className="content-grid">
        <article className="content-block"><h2>Materials behaviour</h2><p>Understand the material question after irradiation and identify what available evidence can and cannot establish.</p></article>
        <article className="content-block"><h2>Evidence and qualification</h2><p>Clarify the information needed to assess product requirements, qualification questions and remaining uncertainty.</p></article>
        <article className="content-block"><h2>Industrial context</h2><p>Consider cable and polymer products, line and product-family questions, and the choice between irradiation job work and own capability.</p></article>
        <article className="content-block"><h2>Independent scope</h2><p>Neeson does not supply equipment or accept commission linked to equipment sales. Relevant supplier or specialist relationships are disclosed in a proposal.</p></article>
      </div>
      <PageCta text="Bring the product question, the decision ahead and what you already know." />
    </div></section>
  </Shell>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={HomePage} />
    <Route path="/how-we-help" component={HowWeHelpPage} />
    <Route path="/expertise" component={ExpertisePage} />
    <Route path="/our-experts" component={ExpertsPage} />
    <Route path="/technical-heritage" component={HeritagePage} />
    <Route path="/contact">{() => <Shell><ContactPageContent /></Shell>}</Route>
    <Route path="/privacy">{() => <Shell><PrivacyPageContent /></Shell>}</Route>
    <Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
