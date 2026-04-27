import { catalogCars, favoriteCarIds } from "../data/mockCars";
import type { CarListing, CatalogFilters, SortOption } from "../types/catalog";

const wait = <T,>(data: T) => new Promise<T>((resolve) => window.setTimeout(() => resolve(data), 180));

export const carsService = {
  getCatalogCars: (_filters?: CatalogFilters, _sort?: SortOption): Promise<CarListing[]> =>
    wait(catalogCars),

  getFavoriteCars: (): Promise<CarListing[]> =>
    wait(catalogCars.filter((car) => favoriteCarIds.includes(car.id))),

  getRelatedCars: (): Promise<CarListing[]> =>
    wait(catalogCars.filter((car) => !favoriteCarIds.includes(car.id)).slice(0, 3)),
};
