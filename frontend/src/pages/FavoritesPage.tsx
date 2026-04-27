import { useEffect, useState } from "react";
import { AutoCard } from "../components/AutoCard";
import { carsService } from "../services/carsService";
import type { CarListing } from "../types/catalog";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<CarListing[]>([]);
  const [related, setRelated] = useState<CarListing[]>([]);

  useEffect(() => {
    void carsService.getFavoriteCars().then(setFavorites);
    void carsService.getRelatedCars().then(setRelated);
  }, []);

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
        </div>
        <div className="auto-feed catalog-auto-feed">
          {favorites.map((car) => (
            <AutoCard car={car} key={car.id} />
          ))}
        </div>
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
    </main>
  );
}
