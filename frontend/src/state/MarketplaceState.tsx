import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { favoriteCarIds } from "../data/mockCars";

type ToastTone = "success" | "info";

interface ToastMessage {
  id: number;
  text: string;
  tone: ToastTone;
}

interface MarketplaceState {
  favoriteIds: string[];
  compareIds: string[];
  isFavorite: (id: string) => boolean;
  isCompared: (id: string) => boolean;
  toggleFavorite: (id: string, title?: string) => void;
  toggleCompare: (id: string, title?: string) => void;
  compareMany: (ids: string[]) => void;
  clearCompare: () => void;
  showToast: (text: string, tone?: ToastTone) => void;
}

const MarketplaceContext = createContext<MarketplaceState | null>(null);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [favoriteIdsState, setFavoriteIds] = useState<string[]>(favoriteCarIds);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, tone: ToastTone = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, text, tone }].slice(-3));
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  };

  const value = useMemo<MarketplaceState>(
    () => ({
      favoriteIds: favoriteIdsState,
      compareIds,
      isFavorite: (id) => favoriteIdsState.includes(id),
      isCompared: (id) => compareIds.includes(id),
      toggleFavorite: (id, title = "Авто") => {
        setFavoriteIds((current) => {
          const exists = current.includes(id);
          showToast(exists ? `${title} убран из избранного` : `${title} добавлен в избранное`, "info");
          return exists ? current.filter((item) => item !== id) : [...current, id];
        });
      },
      toggleCompare: (id, title = "Авто") => {
        setCompareIds((current) => {
          const exists = current.includes(id);

          if (exists) {
            showToast(`${title} убран из сравнения`, "info");
            return current.filter((item) => item !== id);
          }

          if (current.length >= 3) {
            showToast("Можно сравнить до 3 автомобилей", "info");
            return current;
          }

          showToast(`${title} добавлен в сравнение`);
          return [...current, id];
        });
      },
      compareMany: (ids) => {
        setCompareIds(ids.slice(0, 3));
        showToast("Добавили выбранные автомобили в сравнение");
      },
      clearCompare: () => {
        setCompareIds([]);
        showToast("Сравнение очищено", "info");
      },
      showToast,
    }),
    [compareIds, favoriteIdsState],
  );

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((toast) => (
          <div className={`toast toast-${toast.tone}`} key={toast.id}>
            {toast.text}
          </div>
        ))}
      </div>
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);

  if (!context) {
    throw new Error("useMarketplace must be used inside MarketplaceProvider");
  }

  return context;
}
