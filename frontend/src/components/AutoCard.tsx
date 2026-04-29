import { Link, useNavigate } from "react-router-dom";
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

const getRouteOrigin = (car: CarListing) => {
  const route = car.route ?? car.city;
  return route.split("→")[0]?.trim() || route;
};

const formatCardPrice = (value: string, prefix: string) => {
  const cleanValue = value.replace(prefix, "").replace(/^от\s+/i, "").trim();
  return `от ${cleanValue}`;
};

export function AutoCard({ car, compact = false }: AutoCardProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMarketplace();
  const favorite = isFavorite(car.id);
  const productUrl = `/catalog/${car.slug ?? car.id}`;

  const openProduct = () => {
    navigate(productUrl);
  };

  return (
    <article
      className={`auto-card catalog-auto-card ${compact ? "auto-card-compact" : ""}`.trim()}
      onClick={openProduct}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProduct();
        }
      }}
      role="link"
      tabIndex={0}
    >
      <div className={coverClass[car.coverTone]}>
        <button
          className={`favorite-toggle ${favorite ? "is-active" : ""}`}
          type="button"
          aria-label={favorite ? "Убрать из избранного" : "Добавить в избранное"}
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(car.id, car.title);
          }}
        >
          ♥
        </button>
        {car.verified && <span className="verify-pill">Проверен</span>}
        <div className="cover-route">
          <span>Откуда:</span>
          <strong>{getRouteOrigin(car)}</strong>
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
            <strong>{formatCardPrice(car.chinaPrice, "Цена в Китае от ")}</strong>
          </span>
          <span>
            Под ключ
            <strong>{formatCardPrice(car.turnkeyPrice, "Под ключ от ")}</strong>
          </span>
        </div>
        <span className="turnkey-price">{car.logisticsPrice}</span>
        <div className="auto-actions">
          <Link
            className="auto-secondary-action auto-chat-action"
            to={`/chats?car=${encodeURIComponent(car.id)}`}
            onClick={(event) => event.stopPropagation()}
          >
            Чат с продавцом
          </Link>
        </div>
      </div>
    </article>
  );
}
