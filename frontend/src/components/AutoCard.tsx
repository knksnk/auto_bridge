import type { CarListing } from "../types/catalog";

interface AutoCardProps {
  car: CarListing;
  compact?: boolean;
}

const coverClass = {
  blue: "auto-cover",
  dark: "auto-cover auto-cover-dark",
  soft: "auto-cover auto-cover-soft",
};

export function AutoCard({ car, compact = false }: AutoCardProps) {
  return (
    <article className={`auto-card catalog-auto-card ${compact ? "auto-card-compact" : ""}`.trim()}>
      <div className={coverClass[car.coverTone]}>
        {car.verified && <span className="verify-pill">Проверен</span>}
      </div>
      <div className="auto-body">
        <div className="auto-head">
          <h3>{car.title}</h3>
          <div className="auto-meta">
            <strong>{car.year}</strong>
            <span>{car.mileage}</span>
          </div>
        </div>
        <p className="auto-trim">{car.trim}</p>
        <div className="auto-spec-grid">
          <span>{car.engine}</span>
          <span>{car.body}</span>
          <span>{car.drive}</span>
          <span>{car.transmission}</span>
        </div>
        <span className="turnkey-price">{car.turnkeyPrice}</span>
        <strong className="auto-price">{car.price}</strong>
      </div>
    </article>
  );
}
