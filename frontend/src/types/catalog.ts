export type CoverTone = "blue" | "dark" | "soft";

export interface CarListing {
  id: string;
  title: string;
  brand: string;
  year: number;
  mileage: string;
  trim: string;
  engine: string;
  body: string;
  drive: string;
  transmission: string;
  chinaPrice: string;
  turnkeyPrice: string;
  logisticsPrice: string;
  deliveryTime: string;
  city: string;
  seller: string;
  sellerRating: string;
  inspection: string;
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

export interface CatalogQuery {
  filters?: CatalogFilters;
  sort?: SortOption;
  search?: string;
  scenario?: string;
  limit?: number;
}

export interface CollectionCard {
  id: string;
  title: string;
  meta: string;
  image: string;
  tone: "light" | "dark" | "blue";
}
