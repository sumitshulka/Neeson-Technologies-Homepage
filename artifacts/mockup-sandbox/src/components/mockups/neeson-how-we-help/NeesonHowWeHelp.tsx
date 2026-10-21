import { useEffect, useState, type AnchorHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowRight,
  Atom,
  Beaker,
  Boxes,
  Check,
  ClipboardCheck,
  ClipboardList,
  Factory,
  FileText,
  Layers3,
  Menu,
  MessagesSquare,
  Microscope,
  Network,
  ScanSearch,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  UsersRound,
  Workflow,
  X,
} from 'lucide-react';

const logo = '/__mockup/images/neeson-logo-reference.png';
const heroVisual = '/__mockup/images/materials-hero.png';
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'How We Help', href: '/how-we-help' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Our Experts', href: '/our-experts' },
  { label: 'Technical Heritage', href: '/technical-heritage' },
];

function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} />;
}

function Header() {
  const location = '/how-we-help';
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
            {[...navItems, { label: 'Contact and Booking', href: '/contact' }].map((item) => (
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
        <div className="footer-policy"><span>Privacy Policy</span><span>Terms of Use</span></div>
      </div>
    </footer>
  );
}

function Shell({ children, variant }: { children: ReactNode; variant: 'current' | 'refined' }) {
  return <div className={`neeson-extract ${variant}`}><div className="site"><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></div></div>;
}

function BookLink({ children = 'Book a 30-minute discovery call', className = '' }: { children?: ReactNode; className?: string }) {
  return <Link href="/contact" className={`button button-gold ${className}`} data-testid="link-book-call">{children}<ArrowRight size={16} /></Link>;
}

function HowWeHelpPage({ variant }: { variant: 'current' | 'refined' }) {
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
  return <Shell variant={variant}>
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
            <img src={heroVisual} alt="" />
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

export function NeesonHowWeHelp({ variant }: { variant: 'current' | 'refined' }) {
  return <HowWeHelpPage variant={variant} />;
}
