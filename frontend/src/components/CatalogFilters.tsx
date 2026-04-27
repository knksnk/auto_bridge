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
        <input
          key={field}
          className="select-pill"
          value={filters[field]}
          onChange={(event) => update(field, event.target.value)}
          placeholder={selectLabels[field]}
        />
      ))}
      <div className="filter-group filter-range filter-year">
        <label>Год</label>
        <div className="field-row">
          <input value={filters.yearFrom} onChange={(event) => update("yearFrom", event.target.value)} placeholder="от" />
          <input value={filters.yearTo} onChange={(event) => update("yearTo", event.target.value)} placeholder="до" />
        </div>
      </div>
      <input
        className="select-pill"
        value={filters.drive}
        onChange={(event) => update("drive", event.target.value)}
        placeholder={selectLabels.drive}
      />
      <button className="catalog-apply" type="button" onClick={onApply}>
        Применить
      </button>
    </div>
  );
}
