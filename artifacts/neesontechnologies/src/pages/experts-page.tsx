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
import vkTikkuPortrait from '@/assets/team/vk-tikku.png';
import vkTikkuHeritagePortrait from '@/assets/team/vk-tikku-heritage.png';
import parentsTikkuPortrait from '@/assets/team/parents-tikku.png';
import soniaPortrait from '@/assets/team/sonia-tikku.jpg';
import sureshPortrait from '@/assets/team/suresh-kumar.png';
import mittalPortrait from '@/assets/team/kc-mittal.jpg';
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
const independenceSteps = ['CLIENT QUESTION', 'ADVISORY REVIEW', 'EVIDENCE', 'OPTIONS', 'DECISION'];

function PrincipalPortrait() {
  return (
    <figure className="ep-portrait ep-photo-frame">
      <img src={soniaPortrait} alt="Dr Sonia Tikku Suresh" />
      <figcaption><span>NEESON TECHNOLOGIES</span><strong>Founder and Managing Director</strong></figcaption>
    </figure>
  );
}

function HeritagePortrait() {
  return (
    <figure className="ep-heritage-photo">
      <img src={vkTikkuHeritagePortrait} alt="Late Dr V. K. Tikku" />
    </figure>
  );
}

export function ExpertsPageContent({ BookLink }: { BookLink: ComponentType<{ children?: ReactNode; className?: string }> }) {
  return (
    <div className="neeson-extract">
      <div className="ep-page">
        <section className="ep-hero">
          <div className="wrap ep-hero-grid">
            <div className="ep-hero-copy">
              <p className="eyebrow">TEAM</p>
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

        <section className="ep-inspiration section" aria-labelledby="ep-inspiration-title">
          <div className="wrap">
            <div className="ep-inspiration-heading">
              <p className="eyebrow">PERSONAL AND TECHNICAL LINEAGE</p>
              <h2 id="ep-inspiration-title">Our Inspiration and Eternal Guides</h2>
              <p>A personal tribute, held apart from Neeson’s current advisory work.</p>
            </div>
            <div className="ep-inspiration-portraits">
              <figure className="ep-inspiration-portrait ep-inspiration-vk">
                <img src={vkTikkuPortrait} alt="Late Dr V. K. Tikku" />
                <figcaption><span>TECHNICAL HERITAGE</span><strong>Late Dr V. K. Tikku</strong></figcaption>
              </figure>
              <figure className="ep-inspiration-portrait ep-inspiration-parents">
                <img src={parentsTikkuPortrait} alt="Late Mrs Neelam and Dr V. K. Tikku" />
                <figcaption><span>INSPIRATION</span><strong>Late Mrs Neelam and Dr V. K. Tikku</strong></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="ep-principal section" aria-labelledby="ep-principal-title">
          <div className="wrap">
            <div className="ep-team-heading">
              <p className="eyebrow">THE PEOPLE BEHIND THE WORK</p>
              <h2>Our Team</h2>
            </div>
            <div className="ep-profile-grid">
              <PrincipalPortrait />
              <div className="ep-profile-copy">
                <p className="eyebrow">CURRENT PRINCIPAL</p>
                <h2 id="ep-principal-title">Dr Sonia Tikku Suresh</h2>
                <p className="ep-role">Founder and Managing Director</p>
                <span className="ep-status"><span />CURRENT PRINCIPAL</span>
                <p className="ep-positioning">Dr Sonia Tikku Suresh leads every current client conversation and advisory review.</p>
                <p className="ep-bio">Her work centres on specialist knowledge in materials science, radiation processing and industrial applications, with hands-on materials and characterisation experience informing the advice.</p>
                <p className="ep-bio ep-deck-bio">She has a bachelor's in chemical engineering from AC Tech, Anna University, Chennai, a master's from Drexel University, Philadelphia, and a PhD in chemical engineering from IIT Bombay. She received the DST Woman Scientist Fellowship in 2004 and completed her PhD while working as a scientist at IIT Bombay. After working with UBE Technical Centre (Asia) Limited in Rayong, Thailand, she returned to India and began consulting in advanced materials.</p>
                <p className="ep-bio ep-deck-bio">She has also conducted outreach programmes in nanoscience and nanotechnology for high school students. Her stated mission is to bridge the gap between academia and industry in India and around the world.</p>

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

            <div className="ep-team-roster" aria-label="Neeson Technologies team profiles">
              <article className="ep-roster-card">
                <figure className="ep-roster-photo"><img src={sureshPortrait} alt="Mr Suresh Kumar S" /></figure>
                <div className="ep-roster-copy">
                  <p className="eyebrow">CO-FOUNDER AND DIRECTOR</p>
                  <h3>Mr Suresh Kumar S</h3>
                  <p className="ep-roster-summary">Teaching, R&amp;D, training and development, and school management.</p>
                  <p>A seasoned professional with 20 years of experience across teaching, training and development, and school administration in the education sector.</p>
                  <p>His experience includes curriculum development for different learning styles, mentoring students through interactive discussion and hands-on learning, faculty appraisal and training, event management, and parent-pupil relations.</p>
                </div>
              </article>
              <article className="ep-roster-card ep-roster-advisor">
                <figure className="ep-roster-photo"><img src={mittalPortrait} alt="Dr K C Mittal" /></figure>
                <div className="ep-roster-copy">
                  <p className="eyebrow">ADVISOR</p>
                  <h3>Dr K C Mittal</h3>
                  <p className="ep-roster-summary">Electron-beam generation and applications.</p>
                  <p>He completed an M.Sc. (Hons) in Physics at Punjab University, Chandigarh, in 1974 and was selected for the BARC Training School that year. He joined the Plasma Physics Division of BARC as a Scientific Officer in 1975 and completed his Ph.D. at Bombay University in 1986. His thesis was on the generation of intense impulse gigawatt electron beams in vacuum and gas-filled diodes.</p>
                  <p>During 1989–1991 he worked as a postdoctoral fellow at Cornell University and the University of New Mexico, Albuquerque. He was an invited professor at University of Paris 6 in September 1991 and was invited again at Ecole Polytechnique in 2007.</p>
                  <p>His research field has included high-power DC, RF and impulse electron-beam generation and applications in research, industry and defence. His team developed DC and RF electron accelerators from 500 keV to 10 MeV and up to 30 kW beam power. Industrial applications such as cross-linking were demonstrated, and pulse-power systems were employed for HPM and flash X-ray applications.</p>
                </div>
              </article>
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
              <HeritagePortrait />
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
                <Link
                  href="/technical-heritage"
                  className="ep-expertise-link ep-heritage-page-link"
                  data-testid="link-technical-heritage-section"
                >
                  Explore Technical Heritage <ArrowRight size={15} aria-hidden="true" />
                </Link>
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
              <p className="eyebrow">COMMERCIAL RELATIONSHIPS</p>
              <h2>Transparent advice and commercial relationships</h2>
              <p>Our advisory scope and fees are agreed with the client. The client decides on equipment purchases and specialist appointments.</p>
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
              <Link href="/technical-heritage" className="ep-expertise-link" data-testid="link-technical-heritage-from-team">Technical Heritage <ArrowRight size={15} /></Link>
              <Link href="/expertise" className="ep-expertise-link" data-testid="link-explore-expertise">Explore our expertise <ArrowRight size={15} /></Link>
            </div>
            <div className="ep-final-art" aria-hidden="true"><span /><span /><span /></div>
          </div>
        </section>
      </div>
    </div>
  );
}
