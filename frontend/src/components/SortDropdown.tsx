import type { SortOption } from "../types/catalog";

interface SortDropdownProps {
  options: SortOption[];
  selected: SortOption;
  onSelect: (option: SortOption) => void;
}

export function SortDropdown({ options, selected, onSelect }: SortDropdownProps) {
  return (
    <details className="sort-dropdown">
      <summary>↕ {selected.label}</summary>
      <div className="sort-menu">
        {options.map((option) => (
          <button
            key={option.id}
            className={option.id === selected.id ? "is-active" : ""}
            type="button"
            onClick={(event) => {
              onSelect(option);
              event.currentTarget.closest("details")?.removeAttribute("open");
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </details>
  );
}
