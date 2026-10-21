import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
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
    description: 'Materials behaviour after irradiation, e-beam processing, product qualification and advanced materials advisory.',
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
    title: 'Contact & Booking Preparation | Neeson Technologies',
    description: 'Prepare for a 30-minute discovery conversation with Neeson Technologies. No booking provider is linked here.',
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
  return <Shell>
    <PageHero eyebrow="HOW WE HELP" title={<>A clear question.<br />An agreed next step.</>} description="Neeson works with cable manufacturers, polymer compound suppliers and businesses assessing irradiation job work against their own capability." />
    <section className="inner-body"><div className="wrap">
      <div className="section-heading"><p className="eyebrow">A PRACTICAL ENGAGEMENT</p><h2 className="section-title">Start with the question—not the machine.</h2><p className="section-lede">The first conversation establishes fit and context. Any further work is scoped, priced and agreed before it starts.</p></div>
      <div className="content-grid">
        <article className="content-block"><h2>01 / Discovery Call</h2><p>A 30-minute conversation with Dr Sonia Tikku Suresh about one live question and the right next step. It is a fit conversation, not a document review.</p><ul className="item-list"><li><Check size={16} />Clarify the product or material question</li><li><Check size={16} />Understand the decision ahead</li><li><Check size={16} />Decide whether a defined review could help</li></ul></article>
        <article className="content-block"><h2>02 / Decision Diagnostic</h2><p>After the discovery call, Neeson may propose a paid review of one agreed question. You receive a written Decision Note explaining what the available evidence supports, remaining uncertainties, options and a practical next-action plan.</p><p>Scope, timing and fees are agreed before work starts. The work includes one review discussion.</p></article>
        <article className="content-block"><h2>03 / Feasibility / Materials Review</h2><p>For a defined feasibility or materials question, Neeson can review the available context and evidence and help identify the technical questions and next qualification steps to consider.</p><p>The review may include recommendations for tests or specialist assessments. Their work and responsibilities remain their own.</p></article>
        <article className="content-block"><h2>What stays with you</h2><p>Advice is intended to support a decision, not replace the responsibilities of operators, equipment suppliers, laboratories, qualified specialists or the client.</p><ul className="item-list"><li><ShieldCheck size={16} />Independent advisory scope agreed with the client</li><li><FileText size={16} />Written output on the agreed question</li><li><ArrowRight size={16} />Practical options and next-action plan</li></ul></article>
      </div>
      <PageCta />
    </div></section>
  </Shell>;
}

function ExpertisePage() {
  return <Shell>
    <PageHero eyebrow="EXPERTISE" title={<>Materials behaviour.<br />Evidence. Decisions.</>} description="Independent technical and strategic advisory for product, material and evidence questions around irradiation and materials performance." />
    <section className="inner-body"><div className="wrap">
      <div className="content-grid">
        <article className="content-block"><h2>Materials behaviour after irradiation</h2><p>Frame questions about how a material or compound behaves after dose, and what evidence is needed to understand or qualify that performance.</p><ul className="item-list"><li><Layers3 size={16} />Materials behaviour after irradiation</li><li><Microscope size={16} />Characterisation and testing context</li><li><ScanSearch size={16} />Interpretation of available evidence</li></ul></article>
        <article className="content-block"><h2>E-beam and process qualification</h2><p>Consider where e-beam may be relevant to a product or process question, and which qualification evidence or practical assessments could inform the next decision.</p><ul className="item-list"><li><Zap size={16} />E-beam processing questions</li><li><Cable size={16} />Cable and polymer product perspective</li><li><ClipboardCheck size={16} />Product qualification and evidence strategy</li></ul></article>
        <article className="content-block"><h2>Product and application perspective</h2><p>Support for cable manufacturers and polymer compound suppliers assessing product families, customer requirements or a new line.</p><p>Also relevant to businesses weighing irradiation job work against their own capability.</p></article>
        <article className="content-block"><h2>Advanced materials and nanoscience</h2><p>Defined advisory questions involving nanoparticles and dispersions, surface modification and coatings, formulation, and interpretation of characterisation data.</p><p>These may support e-beam applications or a separate materials project.</p></article>
      </div>
      <div className="callout" style={{ marginTop: 24 }}><strong>Scope matters.</strong> Neeson does not directly provide equipment supply, plant operation, radiation safety, regulatory submissions or formal technical sign-off.</div>
      <PageCta text="Have a product or evidence question? Start with a conversation about the decision ahead." />
    </div></section>
  </Shell>;
}

function ExpertsPage() {
  return <Shell>
    <PageHero eyebrow="OUR EXPERTS" title={<>One principal.<br />Direct technical dialogue.</>} description="Dr Sonia Tikku Suresh is the Principal and leads client conversations and advisory reviews." />
    <section className="inner-body"><div className="wrap">
      <div className="expert-profile">
        <div className="profile-monogram" role="img" aria-label="Abstract materials-science motif"><span>NEESON / MATERIALS PERSPECTIVE</span></div>
        <div className="profile-copy"><p className="eyebrow">PRINCIPAL</p><h2>Dr Sonia Tikku Suresh</h2><p>Dr Sonia Tikku Suresh leads client conversations and advisory reviews at Neeson Technologies. Her hands-on materials and characterisation experience informs a practical focus on what a compound does after dose—not only what a machine can deliver.</p><p>Engagements begin with a defined client question. The scope is agreed with the client, and advice is offered independently of equipment sales.</p><PageCta text="Speak with Dr Sonia about one live question and the right next step." /></div>
      </div>
      <div className="callout" style={{ marginTop: 34 }}>Neeson Technologies is an independent advisory practice. No additional experts are represented on this page; specialist support, where relevant, is discussed transparently as part of an agreed scope.</div>
    </div></section>
  </Shell>;
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

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const prepText = 'Neeson Technologies discovery call preparation\n\nProduct / material question:\nDecision ahead:\nWhat we know so far:\nWhat remains uncertain:';
  async function copyPrep() {
    try {
      await navigator.clipboard.writeText(prepText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2800);
    } catch {
      setCopied(false);
    }
  }
  return <Shell>
    <PageHero eyebrow="CONTACT & BOOKING" title={<>Bring one question.<br />Start with a conversation.</>} description="The 30-minute discovery call is a chance to discuss one live question, see whether Neeson is the right fit and identify what the next step could be." />
    <section className="inner-body"><div className="wrap contact-layout">
      <article className="contact-panel">
        <p className="eyebrow">PREPARE FOR THE CONVERSATION</p><h2>Keep it focused on the decision ahead.</h2>
        <p>You do not need to prepare a presentation or send documents for the call. A little context can help make the conversation useful.</p>
        <ul className="prep-list">
          <li><Check size={17} />The product, material or application in question</li>
          <li><Check size={17} />The decision you are approaching—investment, trial or qualification</li>
          <li><Check size={17} />What is known so far and what remains uncertain</li>
          <li><Check size={17} />The next step you are considering</li>
        </ul>
        <div className="callout"><strong>Call format:</strong> 30 minutes with Dr Sonia Tikku Suresh. We do not review documents on the call.</div>
        <div className="copy-box"><p>Copy a simple note to prepare your thoughts before a conversation.</p><button type="button" className="button button-light" onClick={copyPrep} data-testid="button-copy-preparation">{copied ? <><Check size={15} />Copied to clipboard</> : <><ClipboardCopy size={15} />Copy preparation prompts</>}</button><p className="status-text" role="status">{copied ? 'Preparation prompts copied.' : ''}</p></div>
      </article>
      <aside className="contact-panel">
        <p className="eyebrow">BOOKING INFORMATION</p><h2>Arranging a call</h2>
        <p>No external booking provider or direct contact details have been configured on this page. We will not send you to an unverified booking link or imply that a request has been submitted.</p>
        <p>When a direct booking or contact route is published, it can be added here. Until then, use the prompts to prepare the question and decision context for a 30-minute discovery conversation.</p>
        <div className="copy-box"><p><strong>What happens after the call?</strong></p><p>If a defined review could help, Neeson may propose a paid Decision Diagnostic. Scope, timing and fees are agreed before work starts.</p></div>
      </aside>
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
    <Route path="/contact" component={ContactPage} />
    <Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
