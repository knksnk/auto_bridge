import { Link } from "react-router-dom";
import { useMarketplace } from "../state/MarketplaceState";
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
  const { isFavorite, isCompared, toggleFavorite, toggleCompare } = useMarketplace();
  const favorite = isFavorite(car.id);
  const compared = isCompared(car.id);

  return (
    <article className={`auto-card catalog-auto-card ${compact ? "auto-card-compact" : ""}`.trim()}>
      <div className={coverClass[car.coverTone]}>
        <button
          className={`favorite-toggle ${favorite ? "is-active" : ""}`}
          type="button"
          aria-label={favorite ? "Убрать из избранного" : "Добавить в избранное"}
          onClick={() => toggleFavorite(car.id, car.title)}
        >
          ♥
        </button>
        {car.verified && <span className="verify-pill">Проверен</span>}
        <div className="cover-route">
          <span>{car.city}</span>
          <strong>{car.deliveryTime}</strong>
        </div>
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
        <div className="auto-trust-row">
          <span>{car.inspection}</span>
          <span>Рейтинг {car.sellerRating}</span>
        </div>
        <div className="auto-spec-grid">
          <span>{car.engine}</span>
          <span>{car.body}</span>
          <span>{car.drive}</span>
          <span>{car.transmission}</span>
        </div>
        <div className="auto-price-grid">
          <span>
            В Китае
            <strong>{car.chinaPrice.replace("Цена в Китае от ", "")}</strong>
          </span>
          <span>
            Под ключ
            <strong>{car.turnkeyPrice.replace("Под ключ от ", "")}</strong>
          </span>
        </div>
        <span className="turnkey-price">{car.logisticsPrice}</span>
        <div className="auto-actions">
          <Link className="auto-primary-action" to={`/catalog/${car.slug ?? car.id}`}>
            Смотреть
          </Link>
          <button
            className={`auto-secondary-action ${compared ? "is-active" : ""}`}
            type="button"
            onClick={() => toggleCompare(car.id, car.title)}
          >
            {compared ? "В сравнении" : "Сравнить"}
          </button>
        </div>
      </div>
    </article>
  );
}
