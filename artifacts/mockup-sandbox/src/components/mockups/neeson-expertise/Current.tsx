import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';
import {
  ArrowRight,
  Cable,
  ClipboardCheck,
  Layers3,
  Menu,
  Microscope,
  ScanSearch,
  X,
  Zap,
} from 'lucide-react';
import './_group.css';

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

function usePageMeta(path: string) {
  useEffect(() => {
    const content = path === '/expertise' ? {
      title: 'Expertise | Neeson Technologies',
      description: 'Materials behaviour after irradiation, e-beam processing, product qualification and advanced materials advisory.',
    } : {
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
  const location = '/expertise';
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
  usePageMeta('/expertise');
  return <div className="neeson-extract"><div className="site"><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></div></div>;
}

function BookLink({ children = 'Book a 30-minute discovery call', className = '' }: { children?: ReactNode; className?: string }) {
  return <Link href="/contact" className={`button button-gold ${className}`} data-testid="link-book-call">{children}<ArrowRight size={16} /></Link>;
}

function PageHero({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return <section className="inner-hero"><div className="wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-text">{description}</p></div></section>;
}

function PageCta({ text = 'Bring one live question and find out whether Neeson is the right fit.' }: { text?: string }) {
  return <div className="page-cta"><p>{text}</p><BookLink>Book a 30-minute call</BookLink></div>;
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

export function Current() {
  return <ExpertisePage />;
}
