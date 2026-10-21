import { useEffect, useState, type AnchorHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Atom,
  Cable,
  Check,
  ClipboardCheck,
  CircleHelp,
  FlaskConical,
  Layers3,
  Menu,
  Microscope,
  Network,
  ScanSearch,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import './_group.css';
import './Refined.css';

const logo = '/__mockup/images/neeson-logo-reference.png';
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
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), []);
  return (
    <header className="topbar">
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="Neeson Technologies home">
          <img src={logo} alt="Neeson Technologies" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${item.href === '/expertise' ? 'active' : ''}`} aria-current={item.href === '/expertise' ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="button button-gold nav-cta">Book a 30-minute call <ArrowRight size={15} /></Link>
        <button type="button" className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="expertise-mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && <nav id="expertise-mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href} className={item.href === '/expertise' ? 'active' : ''} aria-current={item.href === '/expertise' ? 'page' : undefined}>{item.label}</Link>)}
        <Link href="/contact" className="button button-gold">Book a 30-minute call <ArrowRight size={15} /></Link>
      </nav>}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Neeson Technologies home"><img src={logo} alt="Neeson Technologies" /></Link>
          <p>Independent advisory on radiation processing of materials. Bengaluru, India.</p>
        </div>
        <div className="footer-col">
          <h3>QUICK LINKS</h3>
          <div className="footer-links">{[...navItems, { label: 'Contact and Booking', href: '/contact' }].map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        </div>
        <div className="footer-col">
          <h3>FOCUS AREAS</h3>
          <div className="footer-links">{['Materials Behaviour', 'Process Qualification', 'Evidence Strategy', 'Advanced Materials', 'Industrial Consulting'].map((item) => <span key={item}>{item}</span>)}</div>
        </div>
        <div className="refined-footer-statement">
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

function BookLink({ children = 'Book a 30-minute discovery call', className = '' }: { children?: ReactNode; className?: string }) {
  return <Link href="/contact" className={`button button-gold ${className}`}>{children}<ArrowRight size={16} /></Link>;
}

const expertiseTiles = [
  { number: '01', icon: Atom, title: 'Nanoparticle synthesis & colloids', detail: 'Nanoparticle systems and colloids.' },
  { number: '02', icon: Layers3, title: 'Surface modification & coatings', detail: 'Material surfaces, coatings and interfaces.' },
  { number: '03', icon: Sparkles, title: 'Polymer nanocomposites & compounding', detail: 'Polymer systems and their composition.' },
  { number: '04', icon: Microscope, title: 'Hands-on characterisation', detail: 'Characterisation in support of materials questions.' },
  { number: '05', icon: Zap, title: 'Radiation processing', detail: 'Processing conditions and material response.' },
  { number: '06', icon: Activity, title: 'Polymer radiation chemistry', detail: 'Polymer behaviour after irradiation.' },
];

const journey = [
  ['MATERIAL', Atom, '#168cff'],
  ['PROCESS', Zap, '#7548e8'],
  ['MATERIAL RESPONSE', Activity, '#f15bb5'],
  ['CHARACTERISATION', Microscope, '#ffb52e'],
  ['PRODUCT PERFORMANCE', Cable, '#168cff'],
  ['QUALIFICATION', Check, '#7548e8'],
  ['DECISION', ArrowRight, '#f15bb5'],
] as const;

function MolecularVisual() {
  return (
    <div className="ex-molecular" role="img" aria-label="Scientific illustration connecting a polymer molecular structure, electron-beam energy and layered cable material">
      <div className="ex-visual-grid" />
      <div className="ex-orbit ex-orbit-one" /><div className="ex-orbit ex-orbit-two" />
      <div className="ex-visual-label ex-label-top">MATERIAL RESPONSE <span>01 / 04</span></div>
      <svg className="ex-molecule" viewBox="0 0 540 380" aria-hidden="true">
        <defs>
          <linearGradient id="exBond" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#168cff" /><stop offset=".55" stopColor="#7548e8" /><stop offset="1" stopColor="#f15bb5" /></linearGradient>
          <radialGradient id="exCore"><stop stopColor="#fff" /><stop offset=".24" stopColor="#a8dfff" /><stop offset="1" stopColor="#168cff" stopOpacity=".12" /></radialGradient>
        </defs>
        <g fill="none" stroke="url(#exBond)" strokeWidth="2">
          <path d="M91 112 164 74l74 42 73-42 80 47 57-29M91 112l-6 87 78 42 75-42 78 40 77-41 74 42M164 74l-1 167m75-125 0 83m73-125 1 165m79-118-2 77" />
          <path d="m85 199 79-42 74 41 73-42 78 40 77-41" opacity=".48" />
        </g>
        <g fill="url(#exCore)" stroke="#9bdcff" strokeWidth="1.3">
          <circle cx="91" cy="112" r="12"/><circle cx="164" cy="74" r="10"/><circle cx="238" cy="116" r="14"/>
          <circle cx="311" cy="74" r="10"/><circle cx="391" cy="121" r="13"/><circle cx="448" cy="92" r="9"/>
          <circle cx="85" cy="199" r="10"/><circle cx="163" cy="241" r="13"/><circle cx="238" cy="199" r="10"/>
          <circle cx="312" cy="239" r="14"/><circle cx="389" cy="198" r="10"/><circle cx="463" cy="240" r="12"/>
        </g>
        <g fill="#f5bc4c"><circle cx="164" cy="157" r="3"/><circle cx="312" cy="156" r="3"/><circle cx="389" cy="121" r="3"/></g>
        <path d="M72 292h395M96 312h345M126 332h285" stroke="#78b5dd" strokeOpacity=".38" strokeWidth="1" />
        <path d="M93 285h355" stroke="#f1a9d8" strokeWidth="5" strokeLinecap="round" opacity=".72" />
        <path d="M112 273h317" stroke="#9ecaff" strokeWidth="9" strokeLinecap="round" opacity=".7" />
        <path d="M132 257h277" stroke="#275a91" strokeWidth="17" strokeLinecap="round" />
        <path d="M164 246h214" stroke="#168cff" strokeWidth="2" strokeDasharray="4 8" />
        <g fill="#ffc84a"><circle cx="140" cy="266" r="3"/><circle cx="205" cy="255" r="2"/><circle cx="355" cy="268" r="3"/><circle cx="412" cy="254" r="2"/></g>
      </svg>
      <div className="ex-beam"><span>E-BEAM ENERGY</span><i /><i /><i /></div>
      <div className="ex-visual-label ex-label-bottom">STRUCTURE <b>→</b> RESPONSE <b>→</b> PERFORMANCE</div>
      <span className="ex-cross ex-cross-one">+</span><span className="ex-cross ex-cross-two">+</span>
    </div>
  );
}

function ProcessDiagram() {
  return (
    <div className="ex-core-diagram">
      <article className="ex-core-side">
        <span className="ex-index">01 / INPUT</span><span className="ex-core-kicker">PROCESS</span><h3>E-BEAM</h3>
        <div className="ex-mini-steps"><span><Zap size={16} />Energy</span><span><Activity size={16} />Dose</span><span><ArrowRight size={16} />Processing</span></div>
      </article>
      <div className="ex-connection"><span className="ex-connection-caption">UNDERSTAND THE CONNECTION</span><div className="ex-particle-line"><i /><i /><i /><i /><i /></div><ArrowRight size={18} /></div>
      <article className="ex-core-side ex-core-material">
        <span className="ex-index">02 / RESPONSE</span><span className="ex-core-kicker">MATERIAL</span><h3>WHAT CHANGES?</h3>
        <div className="ex-mini-steps"><span><Layers3 size={16} />Structure</span><span><Sparkles size={16} />Properties</span><span><Cable size={16} />Performance</span><span><Check size={16} />Qualification evidence</span></div>
      </article>
      <div className="ex-core-outcome"><span>PROCESS</span><ArrowDown size={15} /><span>MATERIAL RESPONSE</span><ArrowDown size={15} /><span>PRODUCT PERFORMANCE</span><ArrowDown size={15} /><strong>DECISION</strong></div>
    </div>
  );
}

function MaterialsIllustration() {
  return <div className="ex-material-visual" aria-hidden="true">
    <div className="ex-material-measure"><span>CONDITIONS</span><span>RESPONSE</span><span>EVIDENCE</span></div>
    <div className="ex-material-plate">
      <div className="ex-plate-layer layer-a" /><div className="ex-plate-layer layer-b" /><div className="ex-plate-layer layer-c" />
      <div className="ex-plate-node node-a" /><div className="ex-plate-node node-b" /><div className="ex-plate-node node-c" />
      <div className="ex-plate-sweep" />
    </div>
    <div className="ex-material-note"><span>PROCESS</span><span>MATERIAL</span><span>PRODUCT</span></div>
    <div className="ex-material-corner">N / 01<br />MATERIALS<br />BEHAVIOUR</div>
  </div>;
}

const nanoCards = [
  { icon: Atom, title: 'Nanoparticles & Dispersions', description: 'Defined advisory questions involving nanoparticle systems and dispersions.', accent: 'blue', visual: 'nano' },
  { icon: Layers3, title: 'Surface Modification & Coatings', description: 'Questions involving surface modification, coatings and material interfaces.', accent: 'pink', visual: 'layers' },
  { icon: FlaskConical, title: 'Formulation', description: 'Defined formulation questions where material composition and performance need to be understood together.', accent: 'orange', visual: 'mix' },
  { icon: ScanSearch, title: 'Characterisation Data', description: 'Interpretation of characterisation data in support of a defined materials question.', accent: 'violet', visual: 'spectrum' },
];

function NanoGraphic({ kind }: { kind: string }) {
  if (kind === 'spectrum') return <div className="nano-graphic spectrum"><span /><span /><span /><span /><span /><span /><span /><i /></div>;
  if (kind === 'layers') return <div className="nano-graphic layers"><i /><i /><i /><b /><span /></div>;
  if (kind === 'mix') return <div className="nano-graphic mix"><i /><i /><i /><i /><b /><b /><b /></div>;
  return <div className="nano-graphic nano"><i /><i /><i /><i /><i /><i /><b /><b /><b /></div>;
}

function RefinedPage() {
  return (
    <div className="neeson-extract">
      <div className="site ex-site">
        <a className="skip-link" href="#expertise-content">Skip to content</a>
        <Header />
        <main id="expertise-content" className="ex-page">
          <section className="ex-hero">
            <div className="wrap ex-hero-grid">
              <div className="ex-hero-copy">
                <div className="ex-hero-intro">
                  <p className="eyebrow">EXPERTISE</p>
                  <h1>Materials science<br /><span>behind the decision.</span></h1>
                  <p className="ex-hero-lede">Neeson brings materials science, radiation-processing knowledge and hands-on characterisation experience to technical questions where product performance, material behaviour and evidence intersect.</p>
                </div>
                <div className="ex-hero-actions"><BookLink>Discuss a technical question</BookLink><Link href="/contact" className="ex-secondary-link">Book a 30-minute discovery call <ArrowRight size={15} /></Link></div>
                <div className="ex-hero-meta"><span>INDEPENDENT ADVISORY</span><i /> MATERIALS / RADIATION / EVIDENCE</div>
              </div>
              <MolecularVisual />
            </div>
            <div className="ex-hero-bottom"><div className="wrap"><span>01&nbsp; / &nbsp;MATERIALS</span><span>02&nbsp; / &nbsp;RADIATION</span><span>03&nbsp; / &nbsp;CHARACTERISATION</span><span>04&nbsp; / &nbsp;APPLICATION</span></div></div>
          </section>

          <section className="ex-trust-strip" aria-label="Expertise principles">
            <div className="wrap ex-trust-grid">
              <article><Atom size={23} /><div><h2>Applied materials science</h2><p>From material structure to end performance</p></div></article>
              <article><Microscope size={23} /><div><h2>Evidence-based analysis</h2><p>Using appropriate tests and characterisation methods.</p></div></article>
              <article><Cable size={23} /><div><h2>Practical, industry-focused</h2><p>Advice aligned to your product and business needs.</p></div></article>
            </div>
          </section>

          <section className="ex-areas">
            <div className="wrap">
              <div className="ex-areas-heading"><div><h2>Our areas of expertise</h2><p>Focused on the questions that matter in e-beam processing and polymer applications.</p></div></div>
              <div className="ex-area-grid">
                <article>
                  <div className="ex-area-visual visual-material"><Layers3 size={34} /><span /><i /></div>
                  <div className="ex-area-copy"><h3>Materials behaviour after irradiation</h3>
                    <p>Frame questions about how a material or compound behaves after dose, and what evidence is needed to understand or qualify that performance.</p>
                    <ul><li><Layers3 size={14} />Materials behaviour after irradiation</li><li><Microscope size={14} />Characterisation and testing context</li><li><ScanSearch size={14} />Interpretation of available evidence</li></ul>
                  </div>
                </article>
                <article>
                  <div className="ex-area-visual visual-qualification"><ClipboardCheck size={34} /><span /><i /></div>
                  <div className="ex-area-copy"><h3>E-beam and process qualification</h3>
                    <p>Consider where e-beam may be relevant to a product or process question, and which qualification evidence or practical assessments could inform the next decision.</p>
                    <ul><li><Zap size={14} />E-beam processing questions</li><li><Cable size={14} />Cable and polymer product perspective</li><li><ClipboardCheck size={14} />Product qualification and evidence strategy</li></ul>
                  </div>
                </article>
                <article>
                  <div className="ex-area-visual visual-product"><Cable size={34} /><span /><i /></div>
                  <div className="ex-area-copy"><h3>Product and application perspective</h3>
                    <p>Support for cable manufacturers and polymer compound suppliers assessing product families, customer requirements or a new line.</p>
                    <p>Also relevant to businesses weighing irradiation job work against their own capability.</p>
                  </div>
                </article>
                <article>
                  <div className="ex-area-visual visual-advanced"><Atom size={34} /><span /><i /></div>
                  <div className="ex-area-copy"><h3>Advanced materials and nanoscience</h3>
                    <p>Defined advisory questions involving nanoparticles and dispersions, surface modification and coatings, formulation, and interpretation of characterisation data.</p>
                    <p>These may support e-beam applications or a separate materials project.</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="ex-core-section">
            <div className="wrap">
              <div className="ex-section-head">
                <div><p className="eyebrow">THE NEESON APPROACH</p><h2>Don't stop at what<br />the machine can deliver.</h2></div>
                <p>Ask what the material does after dose.</p>
              </div>
              <ProcessDiagram />
            </div>
          </section>

          <section className="ex-radiation">
            <div className="wrap ex-radiation-grid">
              <MaterialsIllustration />
              <div className="ex-radiation-copy">
                <p className="eyebrow">01 — RADIATION PROCESSING</p>
                <h2>Radiation processing<br />&amp; polymer materials</h2>
                <p>Neeson considers product and material questions where irradiation can influence performance, qualification or product decisions.</p>
                <p>The advisory approach connects processing conditions with material behaviour and the evidence needed to make a sound business decision.</p>
                <div className="ex-capacity-chain">
                  <div><span>PROCESS</span><strong>Processing conditions</strong></div><i />
                  <div><span>MATERIAL</span><strong>Material behaviour</strong></div><i />
                  <div><span>EVIDENCE</span><strong>Qualification &amp; decision evidence</strong></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ex-nano-section">
            <div className="wrap">
              <div className="ex-nano-head">
                <div><p className="eyebrow">02 — ADVANCED MATERIALS &amp; NANOSCIENCE</p><h2>From nanoparticles<br />to polymer systems.</h2></div>
                <p>Alongside the cable and polymer focus, Neeson considers defined advisory questions involving advanced materials and nanoscience.</p>
              </div>
              <div className="ex-nano-grid">{nanoCards.map((card, index) => {
                const Icon = card.icon;
                return <article className={`ex-nano-card tone-${card.accent}`} key={card.title}>
                  <div className="ex-nano-card-top"><span>0{index + 1} / MATERIALS SCOPE</span><Icon size={22} strokeWidth={1.5} /></div>
                  <NanoGraphic kind={card.visual} />
                  <h3>{card.title}</h3><p>{card.description}</p><span className="ex-card-rule" />
                </article>;
              })}</div>
            </div>
          </section>

          <section className="ex-experience">
            <div className="wrap">
              <div className="ex-experience-head"><div><p className="eyebrow">MATERIALS EXPERIENCE</p><h2>Hands-on materials and<br />characterisation experience.</h2></div><span className="ex-section-code">FIELD NOTES&nbsp; / &nbsp;06 AREAS</span></div>
              <div className="ex-tiles">{expertiseTiles.map(({ number, icon: Icon, title, detail }) => <article className="ex-tile" key={number}>
                <span className="ex-tile-number">{number}</span><span className="ex-tile-icon"><Icon size={23} strokeWidth={1.5} /></span><h3>{title}</h3><p>{detail}</p><span className="ex-tile-mark">↗</span>
              </article>)}</div>
            </div>
          </section>

          <section className="ex-journey">
            <div className="wrap">
              <div className="ex-journey-head"><p className="eyebrow">FROM MATERIAL TO PRODUCT</p><h2>Where materials science<br />meets the product decision.</h2></div>
              <div className="ex-journey-line" aria-label="Material, process, material response, characterisation, product performance, qualification, decision">
                {journey.map(([label, Icon, color], index) => <div className="ex-journey-step" key={label} style={{ '--step-accent': color } as CSSProperties}>
                  <span className="ex-journey-icon"><Icon size={19} strokeWidth={1.6} /></span><span className="ex-journey-num">0{index + 1}</span><strong>{label}</strong>
                  {index < journey.length - 1 && <span className="ex-journey-connector" />}
                </div>)}
              </div>
            </div>
          </section>

          <section className="ex-evidence">
            <div className="wrap ex-evidence-grid">
              <div className="ex-evidence-intro"><p className="eyebrow">EVIDENCE-LED</p><h2>Separate what is known<br />from what still needs proof.</h2>
                <p>The objective is not to generate technical complexity for its own sake. Neeson helps distinguish supported conclusions from open questions, identify the evidence still required, and set out the next work required.</p>
              </div>
              <div className="ex-evidence-list">
                <article><span className="ex-evidence-symbol"><Check size={30} /></span><div><span>01 / ESTABLISHED</span><h3>SUPPORTED</h3><p>What does the available evidence actually support?</p></div></article>
                <article><span className="ex-evidence-symbol">?</span><div><span>02 / UNRESOLVED</span><h3>OPEN</h3><p>What remains uncertain?</p></div></article>
                <article><span className="ex-evidence-symbol"><ArrowRight size={29} /></span><div><span>03 / NEXT WORK</span><h3>NEXT</h3><p>What work would settle the question?</p></div></article>
              </div>
            </div>
          </section>

          <section className="ex-specialist">
            <div className="wrap ex-specialist-grid">
              <div><p className="eyebrow">DEFINED COLLABORATION</p><h2>Expertise should be added<br />when the question requires it.</h2>
                <p>Where a project needs additional expertise, Neeson proposes a named specialist with a defined role and responsibility, agreed with the client before work starts.</p>
                <p className="ex-specialist-note"><span />Specialists are named only once each has agreed in writing to a stated role.</p>
              </div>
              <div className="ex-network" aria-label="Client question flows through Neeson to materials science, e-beam history, and specialist expertise as needed">
                <div className="ex-network-node client-node"><span>01</span><strong>CLIENT QUESTION</strong></div>
                <div className="ex-network-stem" />
                <div className="ex-network-node neeson-node"><span>02</span><strong>NEESON</strong></div>
                <div className="ex-network-branch"><i /><i /><i /></div>
                <div className="ex-network-branches">
                  <div><Atom size={21} /><strong>Materials<br />Science</strong></div><div><Zap size={21} /><strong>E-Beam<br />History</strong></div><div><Network size={21} /><strong>Specialist<br />Expertise</strong></div>
                </div>
                <span className="ex-network-caption">ROLE &amp; RESPONSIBILITY AGREED FIRST</span>
              </div>
            </div>
          </section>

          <section className="ex-boundaries">
            <div className="wrap">
              <div className="ex-boundary-head"><div><p className="eyebrow">CLEAR SCOPE</p><h2>Technical expertise does not<br />mean we do everything.</h2></div><p>Neeson's role is independent advisory.</p></div>
              <div className="ex-boundary-grid">
                {[
                  ['01', 'Equipment supply'],
                  ['02', 'Plant operation'],
                  ['03', 'Radiation safety & regulatory submissions'],
                  ['04', 'Formal technical sign-off'],
                ].map(([number, label]) => <article key={number}><span>{number}</span><CircleHelp size={17} /><h3>{label}</h3><p>Outside direct advisory role.</p></article>)}
              </div>
              <div className="ex-boundary-foot"><p>Any specialist work and responsibility are defined in the agreed proposal.</p><p>Neeson does not imply that it owns a testing laboratory or supplies a complete development and validation service.</p></div>
            </div>
          </section>

          <section className="ex-independent">
            <div className="wrap ex-independent-grid">
              <div><p className="eyebrow">INDEPENDENT BY DESIGN</p><h2>Independent<br />by design.</h2><p>Neeson's advisory scope is agreed with the client. Relevant supplier or specialist relationships are disclosed in the proposal. Equipment suppliers, laboratories and qualified specialists retain their own responsibilities.</p></div>
              <div className="ex-advisory-flow" aria-label="Client, evidence, advisory interpretation, options, decision">
                {[
                  ['CLIENT', '01'], ['EVIDENCE', '02'], ['ADVISORY INTERPRETATION', '03'], ['OPTIONS', '04'], ['DECISION', '05'],
                ].map(([label, number], index) => <div key={number} className="ex-advisory-step"><span>{number}</span><strong>{label}</strong>{index < 4 && <ArrowRight size={16} />}</div>)}
              </div>
            </div>
          </section>

          <section className="ex-final-cta">
            <div className="wrap ex-final-grid">
              <div><p className="eyebrow">A TECHNICAL QUESTION, STARTING POINT</p><h2>Have a materials question?</h2><p>Bring one live question. We will establish whether Neeson is the right fit and what the next step could involve.</p></div>
              <div className="ex-final-actions"><BookLink /><Link href="/how-we-help" className="ex-final-secondary">How we help <ArrowRight size={15} /></Link></div>
            </div>
            <div className="ex-final-orbit" aria-hidden="true"><span /><span /><span /></div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export function Refined() {
  useEffect(() => {
    document.title = 'Expertise | Neeson Technologies';
    const description = 'Materials behaviour after irradiation, radiation processing, characterisation and evidence-led product decisions.';
    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = description;
  }, []);
  return <RefinedPage />;
}

export default Refined;
