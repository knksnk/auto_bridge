import { AutoCard } from "../components/AutoCard";
import { catalogCars } from "../data/mockCars";
import { useMarketplace } from "../state/MarketplaceState";

export function FavoritesPage() {
  const { favoriteIds, compareIds, clearCompare, compareMany } = useMarketplace();
  const favorites = catalogCars.filter((car) => favoriteIds.includes(car.id));
  const related = catalogCars.filter((car) => !favoriteIds.includes(car.id)).slice(0, 3);
  const compareCars = catalogCars.filter((car) => compareIds.includes(car.id));

  return (
    <main>
      <section className="inner-hero compact-hero">
        <span className="section-label">Избранное</span>
        <h1>Автомобили, которые понравились</h1>
        <p>Здесь собраны лайкнутые объявления. Ниже — похожие варианты, которые стоит сравнить.</p>
      </section>

      <section className="section-lite favorites-section">
        <div className="section-header">
          <span className="section-label">Лайкнутые объявления</span>
          {favorites.length > 1 && (
            <button
              className="compare-selected-button"
              type="button"
              onClick={() => compareMany(favorites.map((car) => car.id))}
            >
              Сравнить выбранные
            </button>
          )}
        </div>
        {favorites.length > 0 ? (
          <div className="auto-feed catalog-auto-feed">
            {favorites.map((car) => (
              <AutoCard car={car} key={car.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>Пока пусто</span>
            <h2>Сохраняйте автомобили сердечком</h2>
            <p>Здесь появятся объявления для сравнения цены, логистики и продавцов.</p>
          </div>
        )}
      </section>

      <section className="section-lite related-section favorites-related-section">
        <div className="section-header">
          <span className="section-label">Похожие объявления</span>
        </div>
        <div className="auto-feed catalog-auto-feed">
          {related.map((car) => (
            <AutoCard car={car} key={car.id} />
          ))}
        </div>
      </section>
      {compareCars.length > 0 && (
        <aside className="compare-bar" aria-label="Сравнение автомобилей">
          <div>
            <span>Сравнение</span>
            <strong>{compareCars.map((car) => car.title).join(" • ")}</strong>
          </div>
          <button type="button" onClick={clearCompare}>
            Очистить
          </button>
        </aside>
      )}
    </main>
  );
}
