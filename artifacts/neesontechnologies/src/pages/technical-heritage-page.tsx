import { useEffect, useRef, type ComponentType, type ReactNode } from 'react';
import { Link } from 'wouter';
import {
  Activity, Atom, ArrowDown, ArrowRight, Cable, Check,
  CarFront, Crosshair, Factory, Gauge, Network, Orbit, Plane, Settings2, Shield, Sparkles, Sun, TrainFront, Zap,
} from 'lucide-react';
import './technical-heritage-page.css';

const base = import.meta.env.BASE_URL;
const asset = (name: string) => `${base}technical-heritage/${name}`;

const process = [
  ['ELECTRONS', 'Accelerated particles', Atom],
  ['ENERGY TRANSFER', 'Controlled beam energy', Zap],
  ['POLYMER STRUCTURE', 'Changes in polymer chains', Network],
  ['MATERIAL PROPERTIES', 'Modified behaviour', Orbit],
  ['PRODUCT PERFORMANCE', 'Better-performing materials', Settings2],
] as const;

const evolution = [
  ['ACCELERATOR TECHNOLOGY', 'Higher and more controllable electron-beam energy', Gauge],
  ['DOSE CONTROL', 'Understanding and controlling absorbed radiation dose', Activity],
  ['MATERIAL SCIENCE', 'Understanding how polymers respond differently to radiation', Atom],
  ['PRODUCT HANDLING', 'Reliable movement of products through the processing zone', Cable],
  ['PROCESS OPTIMISATION', 'Beam energy, dose, line speed, thickness and geometry', Crosshair],
] as const;

const evolStages = ['PHYSICS', 'MATERIALS SCIENCE', 'PROCESS ENGINEERING', 'INDUSTRIAL MANUFACTURING', 'PRODUCT QUALIFICATION'];
const industries = [
  ['RAILWAYS', TrainFront],
  ['AUTOMOTIVE', CarFront],
  ['DEFENCE', Shield],
  ['AEROSPACE', Plane],
  ['ENERGY', Zap],
  ['SOLAR', Sun],
  ['INDUSTRIAL', Factory],
] as const;
const properties = ['THERMAL RESISTANCE', 'MECHANICAL STRENGTH', 'ELECTRICAL PERFORMANCE', 'CHEMICAL RESISTANCE', 'ABRASION RESISTANCE', 'SERVICE LIFE'];
const journey = ['RESEARCH', 'RADIATION SCIENCE', 'MATERIAL DEVELOPMENT', 'PROCESS DEVELOPMENT', 'CABLE APPLICATION', 'INDUSTRIAL ADOPTION'];
const studyAreas = ['Accelerator Parameters', 'Dose Optimisation', 'Dose Uniformity', 'Cable Handling', 'Material Formulation', 'Product Performance'];
const platforms = [
  ['POLYMER', 'MODIFICATION', 'technical-heritage-polymer.jpg'],
  ['HEAT-SHRINKABLE', 'PRODUCTS', 'technical-heritage-heat-shrink.jpg'],
  ['MEDICAL', 'STERILISATION', 'technical-heritage-medical.jpg'],
  ['SURFACE TREATMENT', '& ADVANCED MATERIALS', 'technical-heritage-surface.jpg'],
];
const lineage = [
  ['ENERGY', 'What happens to the material?', Zap],
  ['MATERIALS', 'What changes after irradiation?', Atom],
  ['PROCESSING', 'How much change is desirable?', Settings2],
  ['EVIDENCE', 'How do we know?', Activity],
  ['PERFORMANCE', 'Can the result be repeated?', Gauge],
  ['DECISION', 'Does it improve the product enough to matter?', Crosshair],
] as const;
const systems = ['Technology', 'Materials', 'Manufacturing', 'Qualification', 'Economics', 'Customer Requirements'];

function useReveals() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const nodes = root.current?.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!nodes?.length) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return root;
}

function SectionIntro({ number, label, title, light = false }: { number: string; label: string; title: React.ReactNode; light?: boolean }) {
  return <div className={`th-intro${light ? ' th-intro-light' : ''}`} data-reveal>
    <p className="th-eyebrow">{number} — {label}</p><h2>{title}</h2>
  </div>;
}

function TechnicalHeritagePage({ BookLink }: { BookLink: ComponentType<{ children?: ReactNode; className?: string }> }) {
  const root = useReveals();
  return <div className="technical-heritage" ref={root}>
      <section className="th-hero">
        <div className="th-hero-image" aria-hidden="true"><img src={asset('technical-heritage-accelerator.jpg')} alt="" /></div>
        <div className="th-hero-beam" aria-hidden="true"><span /><i /><b /></div>
        <div className="wrap th-hero-content">
          <p className="th-eyebrow">TECHNICAL HERITAGE</p>
          <h1>From electron beams<br />to <span>better materials.</span></h1>
          <p className="th-hero-lede">The story of electron-beam processing is not simply a story about machines. It is a story about understanding how energy changes materials — and how those changes can create better-performing products.</p>
          <p className="th-hero-note">Neeson’s perspective is shaped by that technical lineage.</p>
          <a className="button button-gold" href="#science">Explore the journey <ArrowDown size={16} /></a>
          <div className="th-hero-index"><span>SCIENCE</span><i /> <span>MATERIALS</span><i /> <span>DECISIONS</span></div>
        </div>
        <span className="th-hero-caption">ELECTRON-BEAM PROCESSING / MATERIAL RESPONSE</span>
      </section>

      <section className="th-science th-light" id="science">
        <div className="wrap th-science-layout">
          <div>
            <SectionIntro number="01" label="THE SCIENCE" title={<>When electrons became a tool for materials science.</>} />
            <div className="th-copy" data-reveal>
              <p>Electron-beam technology emerged from the development of our understanding of electrons and accelerated particles.</p>
              <p>For polymers, one of the most important effects is the ability to induce crosslinking — changing the relationship between polymer chains and consequently the behaviour of the material.</p>
              <p>The process can alter material performance without relying on conventional chemistry, heat or pressure routes traditionally associated with conventional crosslinking processes.</p>
            </div>
          </div>
          <div className="th-process" aria-label="Process: electrons, energy transfer, polymer structure, material properties, product performance">
            {process.map(([label, detail, Icon], index) => <div className="th-process-step" key={label} data-reveal style={{ '--step': index } as React.CSSProperties}>
              <div className="th-process-icon"><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></div><div><span>{label}</span><small>{detail}</small></div>
              {index < process.length - 1 && <ArrowRight className="th-process-arrow" size={16} aria-hidden="true" />}
            </div>)}
          </div>
        </div>
      </section>

      <section
        className="th-evolution th-dark"
        style={{ '--th-evolution-image': `url("${asset('technical-heritage-accelerator.jpg')}")` } as React.CSSProperties}
      >
        <div className="wrap">
          <div className="th-evolution-top">
            <div>
              <SectionIntro number="02" label="THE EVOLUTION OF E-BEAM PROCESSING" title={<>From laboratory phenomenon<br />to industrial process.</>} light />
              <p className="th-dark-copy" data-reveal>Electron-beam processing did not become an industrial technology overnight. Its development required progress across several disciplines.</p>
            </div>
            <figure className="th-evolution-image" data-reveal><img src={asset('technical-heritage-accelerator.jpg')} alt="Industrial electron-beam accelerator equipment" /><figcaption>PROCESSING TECHNOLOGY / INDUSTRIAL CONTEXT</figcaption></figure>
          </div>
          <div className="th-evolution-timeline" aria-label={evolStages.join(' to ')}>
            {evolution.map(([title, text, Icon], index) => <article className="th-evolution-entry" key={title} data-reveal style={{ '--step': index } as React.CSSProperties}>
              <div className="th-evolution-entry-top"><span className="th-card-number">0{index + 1}</span><Icon size={17} strokeWidth={1.5} aria-hidden="true" /><span className="th-evolution-stage">{evolStages[index]}</span></div>
              <h3>{title}</h3><p>{text}</p>
              {index < evolution.length - 1 && <ArrowRight className="th-evolution-entry-arrow" size={16} aria-hidden="true" />}
            </article>)}
          </div>
        </div>
      </section>

      <section className="th-cable th-light">
        <div className="wrap">
          <div className="th-cable-grid">
            <figure className="th-cable-visual" data-reveal><img src={asset('technical-heritage-cable-industry.jpg')} alt="Cable constructions at an industrial processing line" /><figcaption><span>WIRE &amp; CABLE</span><span>MATERIAL / STRUCTURE / PERFORMANCE</span></figcaption></figure>
            <div className="th-cable-copy">
              <SectionIntro number="03" label="THE CABLE INDUSTRY CONNECTION" title={<>Why wire and cable became a natural application.</>} />
              <p className="th-copy" data-reveal>Cable insulation and jacketing must often deliver a combination of properties. Electron-beam crosslinking offered another route to enabling high-performing cable constructions, particularly for demanding environments.</p>
              <div className="th-industries" aria-label="Application areas">{industries.map(([item, Icon], index) => <div key={item} data-reveal style={{ '--step': index } as React.CSSProperties}><span className="th-industry-mark"><Icon size={15} strokeWidth={1.6} aria-hidden="true" /></span>{item}</div>)}</div>
            </div>
          </div>
          <div className="th-properties" data-reveal><span className="th-micro-label">MATERIAL / PERFORMANCE</span>{properties.map((item) => <span className="th-property-item" key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="th-india th-paper">
        <div className="wrap">
          <div className="th-india-head">
            <div>
              <SectionIntro number="04" label="THE INDIAN JOURNEY" title={<>From research capability<br />to industrial adoption.</>} />
              <div className="th-copy" data-reveal>
                <p>India’s radiation-processing journey developed alongside the country’s broader investment in nuclear science and applied radiation technology.</p>
                <p>Research and industrial programmes gradually explored radiation processing as a practical route for modifying materials and improving product performance.</p>
                <p>The cable industry became one of the important industrial contexts in which electron-beam processing could move from technical possibility toward application.</p>
              </div>
            </div>
            <figure className="th-research-image" data-reveal><img src={asset('technical-heritage-research.jpg')} alt="Research equipment and cable samples in an industrial science setting" /></figure>
          </div>
          <div className="th-india-notes">
            <div className="th-journey" aria-label="Journey: research, radiation science, material development, process development, cable application, industrial adoption">
              {journey.map((item, index) => <div className="th-journey-node" key={item} data-reveal><span className="th-journey-count">0{index + 1}</span><span>{item}</span>{index < journey.length - 1 && <ArrowDown size={15} aria-hidden="true" />}</div>)}
            </div>
            <article className="th-study-card" data-reveal>
              <p className="th-notebook-label">ENGINEERING NOTES / CABLE &amp; POLYMER</p>
              <h3>Areas explored in cable and polymer applications</h3>
              <div className="th-polymer-types">{['PE', 'EPDM', 'EVA', 'PVC'].map((type) => <span key={type}>{type}</span>)}</div>
              <div className="th-study-areas">{studyAreas.map((area) => <span key={area}><Check size={13} aria-hidden="true" />{area}</span>)}</div>
            </article>
          </div>
        </div>
      </section>

      <section className="th-platforms th-light">
        <div className="wrap">
          <div className="th-platform-heading">
            <SectionIntro number="05" label="THE TECHNOLOGY EVOLVES" title={<>From crosslinking to a<br />broader materials platform.</>} />
            <p className="th-copy" data-reveal>Electron-beam processing now extends beyond traditional wire and cable into polymer modification, heat-shrinkable products, medical sterilisation, surface treatment, grafting and advanced materials.</p>
          </div>
          <div className="th-platform-grid">
            {platforms.map(([line1, line2, image], index) => <article className="th-platform-card" key={line1} data-reveal style={{ '--step': index } as React.CSSProperties}>
              <img src={asset(image)} alt="" /><span className="th-platform-number">0{index + 1}</span><div><h3>{line1}<br />{line2}</h3><span className="th-image-rule" /></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="th-lineage th-dark">
        <div className="wrap">
          <SectionIntro number="06" label="THE TECHNICAL LINEAGE" title={<>What survives when<br />technology evolves?</>} light />
          <div className="th-lineage-intro" data-reveal><p>Machines change. Accelerators improve. Materials evolve.</p><p>But some technical questions remain remarkably consistent.</p></div>
          <div className="th-lineage-grid">
            {lineage.map(([label, question, Icon], index) => <article className="th-lineage-step" key={label} data-reveal style={{ '--step': index } as React.CSSProperties}>
              <div className="th-lineage-label"><span><Icon size={15} strokeWidth={1.6} aria-hidden="true" /></span><strong>{label}</strong></div><div className="th-lineage-question">{question}</div>
              {index < lineage.length - 1 && <ArrowRight className="th-lineage-arrow" size={17} aria-hidden="true" />}
            </article>)}
          </div>
          <div className="th-lineage-footer"><span>ENERGY</span><i /><span>MATERIALS</span><i /><span>PROCESSING</span><i /><span>EVIDENCE</span><i /><span>PERFORMANCE</span><i /><span>DECISION</span></div>
        </div>
      </section>

      <section className="th-systems th-dark">
        <div className="wrap th-systems-layout">
          <div>
            <SectionIntro number="07" label="WHY THIS MATTERS TODAY" title={<>Experience matters most<br />when the question is difficult.</>} light />
            <p className="th-dark-copy" data-reveal>Today’s technical questions are rarely isolated. The answer requires more than knowing how an electron beam works. It requires understanding the connection between technology, materials, manufacturing, qualification, economics and customer requirements.</p>
          </div>
          <div className="th-systems-graphic" aria-label="Technology, materials, manufacturing, qualification, economics and customer requirements connect to better decisions">
            <div className="th-system-ring ring-one" /><div className="th-system-ring ring-two" />
            <svg className="th-system-lines" viewBox="0 0 560 440" aria-hidden="true">
              <line x1="280" y1="220" x2="280" y2="42" /><line x1="280" y1="220" x2="466" y2="110" /><line x1="280" y1="220" x2="466" y2="330" /><line x1="280" y1="220" x2="280" y2="398" /><line x1="280" y1="220" x2="94" y2="330" /><line x1="280" y1="220" x2="94" y2="110" />
            </svg>
            <div className="th-decision-core"><span>BETTER</span><strong>DECISIONS</strong><Sparkles size={18} aria-hidden="true" /></div>
            {systems.map((item, index) => <span className={`th-system-label system-${index}`} key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="th-perspective th-paper">
        <div className="wrap th-perspective-grid">
          <figure className="th-perspective-visual" data-reveal><img src={asset('technical-heritage-accelerator.jpg')} alt="Electron-beam accelerator in an industrial setting" /><span className="th-visual-stamp">TECHNOLOGY<br />MATERIALS<br />EVIDENCE</span></figure>
          <div className="th-perspective-copy">
            <SectionIntro number="08" label="THE NEESON PERSPECTIVE" title={<>A technical heritage built around one principle:</>} />
            <div className="th-principles" data-reveal><strong>Understand the material.</strong><strong>Understand the evidence.</strong><strong>Then make the decision.</strong></div>
            <div className="th-copy" data-reveal>
              <p>Neeson’s advisory perspective is rooted in the evolution of radiation processing and its application to materials and industrial products.</p>
              <p>The objective is not to promote a particular machine, supplier or processing route, but to help answer a more useful question:</p>
              <p className="th-question">What does the evidence tell us, and what should happen next?</p>
            </div>
          </div>
        </div>
      </section>

      <section className="th-then-now" aria-label="From technical heritage to current advisory practice">
        <div className="wrap th-then-now-inner">
          <div className="th-bridge-part">
            <span>THEN</span>
            <p>Understanding radiation,<br />materials and processing.</p>
          </div>
          <ArrowDown className="th-bridge-arrow" size={18} aria-hidden="true" />
          <div className="th-bridge-part th-bridge-now">
            <span>NOW</span>
            <p>Using that technical understanding<br />to support better decisions.</p>
          </div>
        </div>
      </section>

      <section className="th-final">
        <div className="th-final-beam" aria-hidden="true"><span /><i /><b /></div>
        <div className="wrap th-final-content">
          <p className="th-eyebrow">TECHNICAL HERITAGE / CURRENT QUESTIONS</p>
          <h2>The technology has evolved.<br />The questions still matter.</h2>
          <p>Have a technical or investment question around radiation processing, polymers or materials?</p>
          <div className="th-final-actions"><BookLink>Book a 30-minute discovery call</BookLink><Link href="/expertise" className="button button-outline">Explore our expertise <ArrowRight size={15} /></Link></div>
        </div>
      </section>
  </div>;
}

export default TechnicalHeritagePage;
