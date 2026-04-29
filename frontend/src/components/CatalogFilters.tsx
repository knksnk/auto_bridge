import { catalogCars } from "../data/mockCars";
import type { CatalogFilters as CatalogFiltersState } from "../types/catalog";

interface CatalogFiltersProps {
  filters: CatalogFiltersState;
  onChange: (filters: CatalogFiltersState) => void;
  onApply: () => void;
}

const selectFields = ["bodyType", "brand", "engine", "drive"] as const;
type SelectField = (typeof selectFields)[number];

const selectLabels: Record<SelectField, string> = {
  bodyType: "Тип кузова",
  brand: "Марка",
  engine: "Двигатель",
  drive: "Привод",
};

const unique = (values: string[]) => Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, "ru"));

const selectOptions: Record<SelectField, string[]> = {
  bodyType: unique(catalogCars.map((car) => car.body)),
  brand: unique(catalogCars.map((car) => car.brand)),
  engine: ["Бензин", "Гибрид", "Электро"],
  drive: unique(catalogCars.map((car) => car.drive)),
};

export function CatalogFilters({ filters, onChange, onApply }: CatalogFiltersProps) {
  const update = (key: keyof CatalogFiltersState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="catalog-filters-horizontal">
      <div className="filter-group filter-range">
        <label>Цена в Китае</label>
        <div className="field-row">
          <input value={filters.chinaPriceFrom} onChange={(event) => update("chinaPriceFrom", event.target.value)} placeholder="от" />
          <input value={filters.chinaPriceTo} onChange={(event) => update("chinaPriceTo", event.target.value)} placeholder="до" />
        </div>
      </div>
      <div className="filter-group filter-range">
        <label>Цена под ключ</label>
        <div className="field-row">
          <input value={filters.turnkeyPriceFrom} onChange={(event) => update("turnkeyPriceFrom", event.target.value)} placeholder="от" />
          <input value={filters.turnkeyPriceTo} onChange={(event) => update("turnkeyPriceTo", event.target.value)} placeholder="до" />
        </div>
      </div>
      {selectFields.slice(0, 3).map((field) => (
        <select
          key={field}
          className="select-pill"
          value={filters[field]}
          onChange={(event) => update(field, event.target.value)}
        >
          <option value="">{selectLabels[field]}</option>
          {selectOptions[field].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ))}
      <div className="filter-group filter-range filter-year">
        <label>Год</label>
        <div className="field-row">
          <input value={filters.yearFrom} onChange={(event) => update("yearFrom", event.target.value)} placeholder="от" />
          <input value={filters.yearTo} onChange={(event) => update("yearTo", event.target.value)} placeholder="до" />
        </div>
      </div>
      <select
        className="select-pill"
        value={filters.drive}
        onChange={(event) => update("drive", event.target.value)}
      >
        <option value="">{selectLabels.drive}</option>
        {selectOptions.drive.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button className="catalog-apply" type="button" onClick={onApply}>
        Применить
      </button>
    </div>
  );
}
