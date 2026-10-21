import { useState, type ReactNode } from 'react';
import { Check, ClipboardCopy } from 'lucide-react';
import './_group.css';

function PageHero({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return <section className="inner-hero"><div className="wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-text">{description}</p></div></section>;
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
  return <div className="neeson-contact-extract">
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
  </div>;
}

export function Current() {
  return <ContactPage />;
}
