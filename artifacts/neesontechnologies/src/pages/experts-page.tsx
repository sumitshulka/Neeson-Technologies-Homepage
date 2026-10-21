import type { ComponentType, ReactNode } from 'react';
import { Link } from 'wouter';
import {
  Activity,
  ArrowRight,
  Atom,
  BookOpen,
  Layers3,
  Microscope,
  Network,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import './experts.css';

const capabilities = [
  { icon: Atom, title: 'Nanoparticle synthesis & colloids', phrase: 'Nanoparticle systems and colloids.' },
  { icon: Layers3, title: 'Surface modification & coatings', phrase: 'Surface modification, coatings and interfaces.' },
  { icon: Sparkles, title: 'Polymer nanocomposites & compounding', phrase: 'Polymer nanocomposites and compounding.' },
  { icon: Microscope, title: 'Hands-on characterisation', phrase: 'Characterisation in support of materials questions.' },
  { icon: Zap, title: 'Radiation processing', phrase: 'Radiation processing questions.' },
  { icon: Activity, title: 'Polymer radiation chemistry', phrase: 'Polymer behaviour after irradiation.' },
];

const focusAreas = [
  'Cable and polymer businesses',
  'Radiation processing questions',
  'Materials behaviour',
  'Product and qualification evidence',
  'Advanced materials questions',
  'Evidence-led technical decisions',
];

const processSteps = ['MATERIAL', 'PROCESS', 'RESPONSE', 'CHARACTERISATION', 'DECISION'];
const independenceSteps = ['CLIENT QUESTION', 'INDEPENDENT REVIEW', 'EVIDENCE', 'OPTIONS', 'DECISION'];

function PortraitPlaceholder() {
  return (
    <div className="ep-portrait" role="img" aria-label="Abstract, replaceable portrait placeholder for Dr Sonia Tikku Suresh">
      <div className="ep-portrait-grid" />
      <div className="ep-portrait-orbit ep-orbit-a" />
      <div className="ep-portrait-orbit ep-orbit-b" />
      <div className="ep-portrait-contour"><span /><span /><span /><span /><span /></div>
      <div className="ep-portrait-core"><i /><i /><i /></div>
      <span className="ep-portrait-tag">PORTRAIT SLOT / REPLACE WITH APPROVED IMAGE</span>
      <span className="ep-portrait-coordinate">MATERIALS<br />PERSPECTIVE</span>
    </div>
  );
}

function HeritageGraphic() {
  return (
    <div className="ep-heritage-graphic" role="img" aria-label="Abstract technical graphic showing cable layers, electron-beam processing and a path to current advisory">
      <div className="ep-heritage-grid" />
      <span className="ep-graphic-label">TECHNICAL LINEAGE / MATERIALS</span>
      <div className="ep-cable-cross"><i /><i /><i /><i /></div>
      <div className="ep-beam-trace"><span /><span /><span /><span /></div>
      <div className="ep-heritage-caption">CABLE CROSS-SECTION / PROCESSING ABSTRACTION</div>
    </div>
  );
}

export function ExpertsPageContent({ BookLink }: { BookLink: ComponentType<{ children?: ReactNode; className?: string }> }) {
  return (
    <div className="neeson-extract">
      <div className="ep-page">
        <section className="ep-hero">
          <div className="wrap ep-hero-grid">
            <div className="ep-hero-copy">
              <p className="eyebrow">OUR EXPERTS</p>
              <h1>Deep technical expertise.<br /><span>Directly accountable.</span></h1>
              <p className="ep-hero-lede">Neeson Technologies is built around specialist knowledge in materials science, radiation processing and industrial applications, led by Dr Sonia Tikku Suresh.</p>
              <p className="ep-hero-sub">Every current client conversation and advisory review is led by the principal.</p>
              <BookLink className="ep-hero-cta">Book a 30-minute discovery call</BookLink>
            </div>
            <div className="ep-hero-art" role="img" aria-label="Abstract molecular structures and technical lines">
              <div className="ep-hero-art-grid" />
              <div className="ep-hero-ring ring-one" /><div className="ep-hero-ring ring-two" />
              <div className="ep-molecular-map">
                <i /><i /><i /><i /><i /><i /><i />
                <span /><span /><span /><span /><span />
              </div>
              <div className="ep-art-caption"><span>STRUCTURE</span><b>→</b><span>PROCESS</span><b>→</b><span>DECISION</span></div>
            </div>
          </div>
          <div className="ep-hero-rule" />
        </section>

        <section className="ep-principal section" aria-labelledby="ep-principal-title">
          <div className="wrap">
            <div className="ep-profile-grid">
              <PortraitPlaceholder />
              <div className="ep-profile-copy">
                <p className="eyebrow">CURRENT PRINCIPAL</p>
                <h2 id="ep-principal-title">Dr Sonia Tikku Suresh</h2>
                <p className="ep-role">Principal, Neeson Technologies</p>
                <span className="ep-status"><span />CURRENT PRINCIPAL</span>
                <p className="ep-positioning">Dr Sonia Tikku Suresh leads every current client conversation and advisory review.</p>
                <p className="ep-bio">Her work centres on specialist knowledge in materials science, radiation processing and industrial applications, with hands-on materials and characterisation experience informing the advice.</p>

                <div className="ep-education">
                  <div className="ep-subheading"><BookOpen size={17} /><h3>Education</h3></div>
                  <div className="ep-education-grid">
                    <article className="ep-education-card" data-testid="tile-education-phd">
                      <span className="ep-degree">PhD</span><div><h4>PhD in Chemical Engineering</h4><p>Indian Institute of Technology Bombay</p></div>
                    </article>
                    <article className="ep-education-card" data-testid="tile-education-masters">
                      <span className="ep-degree">MA</span><div><h4>Master's Degree</h4><p>Drexel University</p></div>
                    </article>
                  </div>
                </div>
              </div>
            </div>

            <div className="ep-capabilities">
              <div className="ep-capabilities-heading">
                <p className="eyebrow">PRINCIPAL PROFILE</p>
                <h3>Technical expertise</h3>
              </div>
              <div className="ep-capability-grid">
                {capabilities.map(({ icon: Icon, title, phrase }, index) => (
                  <article className="ep-capability" key={title} data-testid={`tile-expertise-${index + 1}`}>
                    <span className="ep-capability-number">0{index + 1}</span>
                    <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                    <h4>{title}</h4>
                    <p>{phrase}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="ep-materials section">
          <div className="wrap ep-materials-grid">
            <div>
              <p className="eyebrow">MATERIALS EXPERIENCE</p>
              <h2>Materials science<br />behind the advice.</h2>
              <p>Dr Sonia Tikku Suresh brings hands-on materials and characterisation experience to every engagement.</p>
              <p className="ep-strong-statement">That is why Neeson asks what your compound does after dose, not only what the machine can deliver.</p>
            </div>
            <div className="ep-material-flow" aria-label="Material to process to response to characterisation to decision">
              {processSteps.map((step, index) => (
                <div className="ep-material-step" key={step} data-testid={`tile-material-process-${index + 1}`}>
                  <span>0{index + 1}</span><strong>{step}</strong>{index < processSteps.length - 1 && <i />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ep-current-role section">
          <div className="wrap ep-role-grid">
            <div className="ep-role-card">
              <p className="eyebrow">CURRENT ROLE</p>
              <span className="ep-role-label">PRINCIPAL</span>
              <h2>Neeson Technologies</h2>
              <p>Leads current client conversations and advisory reviews.</p>
            </div>
            <div className="ep-focus">
              <p className="eyebrow">ADVISORY FOCUS</p>
              <ul>{focusAreas.map((area, index) => <li key={area} data-testid={`tile-advisory-focus-${index + 1}`}><span>0{index + 1}</span>{area}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="ep-accountability section">
          <div className="wrap">
            <div className="ep-accountability-head">
              <p className="eyebrow">PERSONAL ACCOUNTABILITY</p>
              <h2>One accountable technical lead.</h2>
              <p>Every engagement starts with a defined question. The principal establishes the scope, interprets the available evidence and sets out what the evidence supports, what remains uncertain and what should happen next.</p>
            </div>
            <div className="ep-accountability-steps">
              {[['DEFINE', 'The decision'], ['INTERPRET', 'The evidence'], ['GUIDE', 'The next step']].map(([label, detail], index) => (
                <article key={label} data-testid={`tile-accountability-${label.toLowerCase()}`}>
                  <span>0{index + 1}</span><strong>{label}</strong><h3>{detail}</h3><i />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ep-heritage section">
          <div className="wrap">
            <div className="ep-heritage-heading">
              <p className="eyebrow">TECHNICAL HERITAGE</p>
              <h2>Built on a deeper<br />technical foundation.</h2>
              <p>Neeson Technologies draws on a technical heritage connected to the early development of electron-beam processing in the Indian cable industry.</p>
            </div>
            <div className="ep-heritage-grid">
              <HeritageGraphic />
              <div className="ep-heritage-profile">
                <span className="ep-heritage-badge">TECHNICAL HERITAGE<br /><b>NOT A CURRENT CLIENT ADVISOR</b></span>
                <h3>Dr V. K. Tikku</h3>
                <p className="ep-heritage-role">Technical Heritage</p>
                <p>Dr V. K. Tikku contributed to the early development of electron-beam processing in the Indian cable industry.</p>
                <p>His work forms part of the technical heritage from which Neeson's perspective has developed.</p>
                <div className="ep-heritage-disclaimer" role="note">
                  <ShieldCheck size={21} aria-hidden="true" />
                  <strong>Dr V. K. Tikku does not participate in current client engagements.</strong>
                </div>
              </div>
            </div>
            <div className="ep-lineage" aria-label="Early technical development leads to technical heritage and modern evidence-led advisory">
              <div><span>01</span><strong>EARLY E-BEAM PROCESSING</strong><small>Industrial processing / cable materials</small></div>
              <i />
              <div className="ep-lineage-middle"><span>02</span><strong>TECHNICAL HERITAGE</strong><small>Perspective carried forward</small></div>
              <i />
              <div><span>03</span><strong>CURRENT ADVISORY</strong><small>Materials / Evidence / Decision</small></div>
            </div>
          </div>
        </section>

        <section className="ep-compare section">
          <div className="wrap">
            <div className="ep-section-heading">
              <p className="eyebrow">A CLEAR DISTINCTION</p>
              <h2>Current expertise and technical heritage.</h2>
            </div>
            <div className="ep-compare-grid">
              <article className="ep-compare-card ep-compare-current" data-testid="tile-current-expert-sonia">
                <span className="ep-compare-label">CURRENT</span><h3>Dr Sonia Tikku Suresh</h3><p className="ep-compare-role">Principal<br />Neeson Technologies</p>
                <ul><li>Current client conversations</li><li>Current advisory reviews</li><li>Materials science</li><li>Radiation processing</li><li>Evidence-led decisions</li></ul>
              </article>
              <article className="ep-compare-card ep-compare-heritage" data-testid="tile-technical-heritage-vk-tikku">
                <span className="ep-compare-label">TECHNICAL HERITAGE</span><h3>Dr V. K. Tikku</h3><p className="ep-compare-role">Technical Heritage</p>
                <p>Historical contribution to electron-beam processing in the Indian cable industry.</p>
                <p className="ep-compare-notice">Does not participate in current engagements.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="ep-independence section">
          <div className="wrap ep-independence-grid">
            <div>
              <p className="eyebrow">INDEPENDENT BY DESIGN</p>
              <h2>Expertise without an equipment-sales agenda.</h2>
              <p>Neeson's advisory scope is agreed with the client. Relevant supplier or specialist relationships are disclosed in the proposal.</p>
              <p>Equipment suppliers, laboratories and qualified specialists retain their own responsibilities.</p>
            </div>
            <div className="ep-independence-flow">
              {independenceSteps.map((step, index) => (
                <div key={step} className="ep-independence-step" data-testid={`tile-independence-${index + 1}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>{index < independenceSteps.length - 1 && <ArrowRight size={16} aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ep-specialists section">
          <div className="wrap ep-specialists-grid">
            <div>
              <p className="eyebrow">DEFINED COLLABORATION</p>
              <h2>One expert does not need to answer every question.</h2>
              <p>Where a project needs additional expertise, Neeson proposes a named specialist with a defined role and responsibility, agreed with the client before work starts.</p>
            </div>
            <div className="ep-collaboration" aria-label="Neeson plus a named specialist plus defined responsibility leads to a clearer decision">
              <div className="ep-collab-node"><Network size={22} /><strong>NEESON</strong></div><span className="ep-collab-plus">+</span>
              <div className="ep-collab-node"><Atom size={22} /><strong>NAMED SPECIALIST</strong></div><span className="ep-collab-plus">+</span>
              <div className="ep-collab-node"><ScanSearch size={22} /><strong>DEFINED RESPONSIBILITY</strong></div>
              <div className="ep-collab-outcome"><i /><ArrowRight size={16} /><strong>CLEARER DECISION</strong></div>
            </div>
          </div>
        </section>

        <section className="ep-final section">
          <div className="wrap ep-final-grid">
            <div>
              <p className="eyebrow">START WITH A CONVERSATION</p>
              <h2>Bring your question<br />to the right expert.</h2>
              <p>In thirty minutes we find out whether Neeson is the right fit and what the next step would be.</p>
            </div>
            <div className="ep-final-actions">
              <BookLink className="ep-final-book">Book a 30-minute discovery call</BookLink>
              <Link href="/expertise" className="ep-expertise-link" data-testid="link-explore-expertise">Explore our expertise <ArrowRight size={15} /></Link>
            </div>
            <div className="ep-final-art" aria-hidden="true"><span /><span /><span /></div>
          </div>
        </section>
      </div>
    </div>
  );
}
