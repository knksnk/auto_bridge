import { useEffect, useState } from "react";
import { AutoCard } from "../components/AutoCard";
import { CatalogFilters } from "../components/CatalogFilters";
import { SortDropdown } from "../components/SortDropdown";
import { sortOptions } from "../data/mockCars";
import { carsService } from "../services/carsService";
import type { CarListing, CatalogFilters as CatalogFiltersState, SortOption } from "../types/catalog";

const initialFilters: CatalogFiltersState = {
  chinaPriceFrom: "",
  chinaPriceTo: "",
  turnkeyPriceFrom: "",
  turnkeyPriceTo: "",
  bodyType: "",
  brand: "",
  engine: "",
  yearFrom: "",
  yearTo: "",
  drive: "",
};

export function CatalogPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
  const [cars, setCars] = useState<CarListing[]>([]);

  useEffect(() => {
    void carsService.getCatalogCars(filters, selectedSort).then(setCars);
  }, [filters, selectedSort]);

  return (
    <main>
      <section className="catalog-toolbar" aria-label="Поиск и фильтры">
        <div className="catalog-toolbar-top">
          <input className="catalog-search-field" placeholder="Поиск авто, бренд, кузов..." />
          <SortDropdown options={sortOptions} selected={selectedSort} onSelect={setSelectedSort} />
        </div>
        <CatalogFilters filters={filters} onChange={setFilters} onApply={() => undefined} />
      </section>

      <section className="catalog-results">
        <div className="auto-feed catalog-auto-feed">
          {cars.map((car) => (
            <AutoCard car={car} key={car.id} />
          ))}
        </div>
        <button className="load-more-button" type="button">
          Показать больше
        </button>
      </section>
    </main>
  );
}
