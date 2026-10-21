import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import './_group.css';

function PageHero({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return <section className="inner-hero"><div className="wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-text">{description}</p></div></section>;
}

function BookLink({ children = 'Book a 30-minute discovery call' }: { children?: ReactNode }) {
  return <a href="/contact" className="button button-gold" data-testid="link-book-call">{children}<ArrowRight size={16} /></a>;
}

function PageCta({ text = 'Bring one live question and find out whether Neeson is the right fit.' }: { text?: string }) {
  return <div className="page-cta"><p>{text}</p><BookLink>Book a 30-minute call</BookLink></div>;
}

export function Current() {
  return <main className="neeson-heritage-page">
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
  </main>;
}
