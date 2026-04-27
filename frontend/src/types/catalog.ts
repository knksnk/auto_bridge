export type CoverTone = "blue" | "dark" | "soft";

export interface CarListing {
  id: string;
  title: string;
  year: number;
  mileage: string;
  trim: string;
  engine: string;
  body: string;
  drive: string;
  transmission: string;
  turnkeyPrice: string;
  price: string;
  verified: boolean;
  coverTone: CoverTone;
  tags: string[];
}

export interface CatalogFilters {
  chinaPriceFrom: string;
  chinaPriceTo: string;
  turnkeyPriceFrom: string;
  turnkeyPriceTo: string;
  bodyType: string;
  brand: string;
  engine: string;
  yearFrom: string;
  yearTo: string;
  drive: string;
}

export interface SortOption {
  id: string;
  label: string;
}

export interface CollectionCard {
  id: string;
  title: string;
  meta: string;
  image: string;
  tone: "light" | "dark" | "blue";
}
