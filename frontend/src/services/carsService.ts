import { catalogCars, favoriteCarIds } from "../data/mockCars";
import type { CarListing, CatalogQuery } from "../types/catalog";

const wait = <T,>(data: T) => new Promise<T>((resolve) => window.setTimeout(() => resolve(data), 420));

const priceNumber = (value: string) => Number(value.replace(/[^\d]/g, ""));

const matchesText = (car: CarListing, text: string) => {
  const query = text.trim().toLowerCase();

  if (!query) {
    return true;
  }

  return [car.title, car.brand, car.body, car.engine, car.trim, car.tags.join(" ")]
    .join(" ")
    .toLowerCase()
    .includes(query);
};

const matchesScenario = (car: CarListing, scenario?: string) => {
  if (!scenario) {
    return true;
  }

  const normalized = scenario.toLowerCase();

  if (normalized.includes("1.5")) {
    return priceNumber(car.turnkeyPrice) <= 1_500_000;
  }

  if (normalized.includes("кроссов")) {
    return car.body.toLowerCase().includes("кроссовер");
  }

  if (normalized.includes("седан")) {
    return car.body.toLowerCase().includes("седан");
  }

  if (normalized.includes("электро")) {
    return car.engine.toLowerCase().includes("электро");
  }

  if (normalized.includes("пробег")) {
    return priceNumber(car.mileage) <= 20_000;
  }

  if (normalized.includes("провер")) {
    return car.verified;
  }

  return car.tags.some((tag) => normalized.includes(tag.toLowerCase())) || true;
};

const sortCars = (cars: CarListing[], sortId?: string) => {
  const sorted = [...cars];

  switch (sortId) {
    case "price-asc":
      return sorted.sort((a, b) => priceNumber(a.turnkeyPrice) - priceNumber(b.turnkeyPrice));
    case "price-desc":
      return sorted.sort((a, b) => priceNumber(b.turnkeyPrice) - priceNumber(a.turnkeyPrice));
    case "year-new":
      return sorted.sort((a, b) => b.year - a.year);
    case "year-old":
      return sorted.sort((a, b) => a.year - b.year);
    case "mileage":
      return sorted.sort((a, b) => priceNumber(a.mileage) - priceNumber(b.mileage));
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    default:
      return sorted;
  }
};

export const carsService = {
  getCatalogCars: (query: CatalogQuery = {}): Promise<CarListing[]> => {
    const { filters, search = "", scenario, sort, limit } = query;
    const filtered = catalogCars.filter((car) => {
      const yearFrom = filters?.yearFrom ? Number(filters.yearFrom) : undefined;
      const yearTo = filters?.yearTo ? Number(filters.yearTo) : undefined;
      const chinaFrom = filters?.chinaPriceFrom ? Number(filters.chinaPriceFrom) : undefined;
      const chinaTo = filters?.chinaPriceTo ? Number(filters.chinaPriceTo) : undefined;
      const turnkeyFrom = filters?.turnkeyPriceFrom ? Number(filters.turnkeyPriceFrom) : undefined;
      const turnkeyTo = filters?.turnkeyPriceTo ? Number(filters.turnkeyPriceTo) : undefined;

      return (
        matchesText(car, search) &&
        matchesScenario(car, scenario) &&
        (!filters?.brand || car.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
        (!filters?.bodyType || car.body.toLowerCase().includes(filters.bodyType.toLowerCase())) &&
        (!filters?.engine || car.engine.toLowerCase().includes(filters.engine.toLowerCase())) &&
        (!filters?.drive || car.drive.toLowerCase().includes(filters.drive.toLowerCase())) &&
        (!yearFrom || car.year >= yearFrom) &&
        (!yearTo || car.year <= yearTo) &&
        (!chinaFrom || priceNumber(car.price) >= chinaFrom) &&
        (!chinaTo || priceNumber(car.price) <= chinaTo) &&
        (!turnkeyFrom || priceNumber(car.turnkeyPrice) >= turnkeyFrom) &&
        (!turnkeyTo || priceNumber(car.turnkeyPrice) <= turnkeyTo)
      );
    });

    const sorted = sortCars(filtered, sort?.id);
    return wait(typeof limit === "number" ? sorted.slice(0, limit) : sorted);
  },

  getFavoriteCars: (): Promise<CarListing[]> =>
    wait(catalogCars.filter((car) => favoriteCarIds.includes(car.id))),

  getRelatedCars: (): Promise<CarListing[]> =>
    wait(catalogCars.filter((car) => !favoriteCarIds.includes(car.id)).slice(0, 3)),
};
