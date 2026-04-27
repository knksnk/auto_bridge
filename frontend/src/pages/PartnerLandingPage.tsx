import { PartnerForm } from "../components/PartnerForm";
import { partnerPages } from "../data/mockPartners";
import type { PartnerKind } from "../types/partners";

interface PartnerLandingPageProps {
  kind: PartnerKind;
}

export function PartnerLandingPage({ kind }: PartnerLandingPageProps) {
  const page = partnerPages[kind];

  return (
    <main>
      <section className={`partner-landing ${kind === "carrier" ? "carrier-landing" : ""}`.trim()}>
        <div className="partner-copy">
          <span className="section-label">{page.label}</span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="mini-stats">
            {page.stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </div>
        <PartnerForm kind={page.kind} title={page.formTitle} />
      </section>

      <section className="benefit-grid">
        {page.benefits.map((benefit) => (
          <article className="card benefit-card" key={benefit.number}>
            <span>{benefit.number}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
