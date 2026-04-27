import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AutoCard } from "../components/AutoCard";
import { CatalogFilters } from "../components/CatalogFilters";
import { SortDropdown } from "../components/SortDropdown";
import { catalogCars, sortOptions } from "../data/mockCars";
import { carsService } from "../services/carsService";
import { useMarketplace } from "../state/MarketplaceState";
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

const filterLabels: Partial<Record<keyof CatalogFiltersState, string>> = {
  chinaPriceFrom: "Цена в Китае от",
  chinaPriceTo: "Цена в Китае до",
  turnkeyPriceFrom: "Под ключ от",
  turnkeyPriceTo: "Под ключ до",
  bodyType: "Кузов",
  brand: "Марка",
  engine: "Двигатель",
  yearFrom: "Год от",
  yearTo: "Год до",
  drive: "Привод",
};

function CatalogSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <article className="auto-card catalog-auto-card skeleton-card" key={index}>
          <div className="auto-cover skeleton-line" />
          <div className="auto-body">
            <span className="skeleton-line skeleton-title" />
            <span className="skeleton-line" />
            <span className="skeleton-line skeleton-short" />
          </div>
        </article>
      ))}
    </>
  );
}

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
  const [cars, setCars] = useState<CarListing[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const { compareIds, clearCompare, showToast } = useMarketplace();
  const scenario = searchParams.get("scenario") ?? "";
  const activeFilters = Object.entries(filters).filter((entry): entry is [keyof CatalogFiltersState, string] => Boolean(entry[1]));

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    carsService
      .getCatalogCars({ filters, sort: selectedSort, search, scenario, limit: visibleCount })
      .then((result) => {
        if (active) {
          setCars(result);
        }
      })
      .catch(() => {
        if (active) {
          setError("Не получилось загрузить объявления. Попробуйте обновить страницу.");
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
  }, [filters, scenario, search, selectedSort, visibleCount]);

  const updateSearch = (value: string) => {
    setSearch(value);
    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("search", value.trim());
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const clearScenario = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("scenario");
    setSearchParams(nextParams, { replace: true });
  };

  const resetFilter = (key: keyof CatalogFiltersState) => {
    setFilters((current) => ({ ...current, [key]: "" }));
  };

  const compareCars = catalogCars.filter((car) => compareIds.includes(car.id));

  return (
    <main>
      <section className="catalog-toolbar" aria-label="Поиск и фильтры">
        <div className="catalog-toolbar-heading">
          <span className="section-label">Каталог</span>
          <h1>Подберите автомобиль с понятной итоговой ценой</h1>
          <p>Фильтры, проверенные продавцы и расчет под ключ собраны в одном интерфейсе.</p>
        </div>
        <div className="catalog-toolbar-top">
          <input
            className="catalog-search-field"
            placeholder="Поиск авто, бренд, кузов..."
            value={search}
            onChange={(event) => updateSearch(event.target.value)}
          />
          <SortDropdown options={sortOptions} selected={selectedSort} onSelect={setSelectedSort} />
        </div>
        <div className="desktop-filter-panel">
          <CatalogFilters filters={filters} onChange={setFilters} onApply={() => showToast("Фильтры применены", "info")} />
        </div>
        <details className="mobile-filter-sheet">
          <summary>Фильтры и сортировка</summary>
          <div className="mobile-filter-sheet-body">
            <SortDropdown options={sortOptions} selected={selectedSort} onSelect={setSelectedSort} />
            <CatalogFilters filters={filters} onChange={setFilters} onApply={() => showToast("Фильтры применены", "info")} />
          </div>
        </details>
        {(scenario || activeFilters.length > 0 || search) && (
          <div className="active-filter-row">
            {scenario && (
              <button type="button" onClick={clearScenario}>
                Сценарий: {scenario} ×
              </button>
            )}
            {search && (
              <button type="button" onClick={() => updateSearch("")}>
                Поиск: {search} ×
              </button>
            )}
            {activeFilters.map(([key, value]) => (
              <button type="button" key={key} onClick={() => resetFilter(key)}>
                {filterLabels[key]}: {value} ×
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="catalog-results">
        <div className="auto-feed catalog-auto-feed">
          {isLoading ? <CatalogSkeleton /> : cars.map((car) => <AutoCard car={car} key={car.id} />)}
        </div>
        {!isLoading && !error && cars.length === 0 && (
          <div className="empty-state">
            <span>Ничего не найдено</span>
            <h2>Попробуйте убрать часть фильтров</h2>
            <p>Каталог уже готов к backend: сейчас это моковые данные, но состояния работают как в настоящем сервисе.</p>
            <button type="button" onClick={() => setFilters(initialFilters)}>
              Сбросить фильтры
            </button>
          </div>
        )}
        {error && <div className="empty-state empty-state-error">{error}</div>}
        {!isLoading && !error && cars.length > 0 && cars.length < catalogCars.length && (
          <button className="load-more-button" type="button" onClick={() => setVisibleCount((current) => current + 3)}>
            Показать больше
          </button>
        )}
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
