import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { AutoCard } from "../components/AutoCard";
import { carsService } from "../services/carsService";
import { useMarketplace } from "../state/MarketplaceState";
import type { CarListing, LeadPayload } from "../types/catalog";

const detailLabel = (value: string | number | undefined, fallback = "Уточняем") => value || fallback;

export function ProductPage() {
  const { slug = "" } = useParams();
  const [car, setCar] = useState<CarListing | null>(null);
  const [similarCars, setSimilarCars] = useState<CarListing[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [lead, setLead] = useState<LeadPayload>({ name: "", phone: "", email: "", comment: "" });
  const [isSubmitting, setSubmitting] = useState(false);
  const { toggleFavorite, isFavorite, toggleCompare, isCompared, showToast } = useMarketplace();

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all([carsService.getCarBySlug(slug), carsService.getSimilarCars(slug)])
      .then(([carResult, similarResult]) => {
        if (active) {
          setCar(carResult);
          setSimilarCars(similarResult);
        }
      })
      .catch(() => {
        if (active) {
          setCar(null);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const gallery = useMemo(() => {
    if (!car) {
      return [];
    }

    return car.images?.length
      ? car.images
      : [
          { id: "cover", url: "/assets/hero-bg.png", alt: car.title, sortOrder: 0 },
          { id: "alt", url: "/assets/crossovers.png", alt: `${car.title} вид сбоку`, sortOrder: 1 },
        ];
  }, [car]);

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!car) {
      return;
    }

    setSubmitting(true);
    await carsService.submitLead({
      ...lead,
      carId: car.id,
      type: "CAR",
      comment: lead.comment || `Интересует ${car.title}`,
    });
    setSubmitting(false);
    showToast("Заявка отправлена. Менеджер свяжется с вами.");
    setLead({ name: "", phone: "", email: "", comment: "" });
  };

  if (isLoading) {
    return (
      <main className="product-page">
        <section className="product-skeleton skeleton-card" />
      </main>
    );
  }

  if (!car) {
    return (
      <main className="product-page">
        <section className="empty-state">
          <span>Карточка автомобиля</span>
          <h1>Автомобиль не найден</h1>
          <p>Возможно, объявление снято с публикации или ссылка устарела.</p>
          <Link to="/catalog">Вернуться в каталог</Link>
        </section>
      </main>
    );
  }

  const favorite = isFavorite(car.id);
  const compared = isCompared(car.id);

  return (
    <main className="product-page">
      <section className="product-hero reveal">
        <div className="product-copy">
          <span className="section-label">Карточка автомобиля</span>
          <h1>{car.title}</h1>
          <p>{car.trim}</p>
          <div className="product-hero-tags">
            <span>{car.year}</span>
            <span>{car.mileage}</span>
            <span>{car.city}</span>
            <span>{car.inspection}</span>
          </div>
        </div>
        <aside className="product-price-panel">
          <span>Цена под ключ</span>
          <strong>{car.turnkeyPrice.replace("Под ключ от ", "")}</strong>
          <p>{car.logisticsPrice}</p>
          <a href="#lead-form">Оставить заявку</a>
        </aside>
      </section>

      <section className="product-grid">
        <div className="product-main">
          <div className="product-gallery reveal">
            <img src={gallery[0]?.url} alt={gallery[0]?.alt ?? car.title} />
            <div>
              {gallery.slice(1, 4).map((image) => (
                <img src={image.url} alt={image.alt} key={image.id} />
              ))}
            </div>
          </div>

          <div className="product-card reveal">
            <h2>Характеристики</h2>
            <div className="product-specs">
              <span>Марка<strong>{car.brand}</strong></span>
              <span>Модель<strong>{detailLabel(car.model)}</strong></span>
              <span>Кузов<strong>{car.body}</strong></span>
              <span>Дверей<strong>{detailLabel(car.doors)}</strong></span>
              <span>Двигатель<strong>{car.engine}</strong></span>
              <span>Мощность<strong>{detailLabel(car.power)}</strong></span>
              <span>Топливо<strong>{detailLabel(car.fuel)}</strong></span>
              <span>Привод<strong>{car.drive}</strong></span>
              <span>Коробка<strong>{car.transmission}</strong></span>
              <span>Цвет<strong>{detailLabel(car.color)}</strong></span>
            </div>
          </div>

          <div className="product-card product-timeline reveal">
            <h2>Как считается цена</h2>
            <div className="timeline-row">
              <span>01</span>
              <div><strong>Стоимость в Китае</strong><p>{car.chinaPrice}</p></div>
            </div>
            <div className="timeline-row">
              <span>02</span>
              <div><strong>Логистика, таможня и сборы</strong><p>{car.logisticsPrice}</p></div>
            </div>
            <div className="timeline-row">
              <span>03</span>
              <div><strong>Итог под ключ</strong><p>{car.turnkeyPrice}, срок {car.deliveryTime}</p></div>
            </div>
          </div>
        </div>

        <aside className="product-sidebar">
          <div className="product-card product-sticky-card reveal">
            <span className="verify-pill">Проверен</span>
            <h2>{car.turnkeyPrice.replace("Под ключ от ", "")}</h2>
            <p>{car.seller} · рейтинг {car.sellerRating}</p>
            <button type="button" onClick={() => toggleFavorite(car.id, car.title)}>
              {favorite ? "В избранном" : "Добавить в избранное"}
            </button>
            <button type="button" className="secondary-product-action" onClick={() => toggleCompare(car.id, car.title)}>
              {compared ? "В сравнении" : "Сравнить"}
            </button>
          </div>

          <form className="product-card product-lead-form reveal" id="lead-form" onSubmit={submitLead}>
            <h2>Получить расчет</h2>
            <p>Оставьте контакты, и мы уточним доступность лота, доставку и итоговую стоимость.</p>
            <input value={lead.name} onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))} placeholder="Имя" required />
            <input value={lead.phone} onChange={(event) => setLead((current) => ({ ...current, phone: event.target.value }))} placeholder="Телефон" required />
            <input value={lead.email} onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))} placeholder="Email" />
            <textarea value={lead.comment} onChange={(event) => setLead((current) => ({ ...current, comment: event.target.value }))} placeholder="Комментарий" />
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Отправляем..." : "Отправить заявку"}</button>
          </form>
        </aside>
      </section>

      <section className="product-related reveal">
        <div className="section-heading">
          <span>Похожие объявления</span>
          <h2>Можно сравнить рядом</h2>
        </div>
        <div className="auto-feed catalog-auto-feed">
          {similarCars.map((item) => (
            <AutoCard car={item} key={item.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
