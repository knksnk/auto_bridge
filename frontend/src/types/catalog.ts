export type CoverTone = "blue" | "dark" | "soft";

export interface CarListing {
  id: string;
  slug?: string;
  title: string;
  brand: string;
  model?: string;
  year: number;
  mileageKm?: number;
  mileage: string;
  trim: string;
  color?: string;
  engine: string;
  power?: string;
  fuel?: string;
  body: string;
  doors?: number;
  drive: string;
  transmission: string;
  chinaPriceValue?: number;
  turnkeyPriceValue?: number;
  logisticsPriceValue?: number;
  chinaPrice: string;
  turnkeyPrice: string;
  logisticsPrice: string;
  deliveryTime: string;
  route?: string;
  city: string;
  seller: string;
  sellerId?: string;
  sellerCity?: string;
  sellerRating: string;
  inspection: string;
  price: string;
  verified: boolean;
  isVerified?: boolean;
  coverTone: CoverTone;
  tags: string[];
  status?: string;
  images?: Array<{
    id: string;
    url: string;
    alt: string;
    sortOrder: number;
  }>;
  createdAt?: string;
  updatedAt?: string;
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
  page?: number;
}

export interface CatalogResponse {
  items: CarListing[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  comment?: string;
  carId?: string;
  type?: "CAR" | "PARTNER" | "GENERAL";
}

export interface AdminStats {
  cars: number;
  publishedCars: number;
  leads: number;
  partnerApplications: number;
  sellers: number;
  users: number;
}

export interface AdminCarPayload {
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  trim: string;
  color: string;
  engine: string;
  power: string;
  fuel: string;
  body: string;
  doors: number;
  drive: string;
  transmission: string;
  chinaPrice: number;
  turnkeyPrice: number;
  logisticsPrice: number;
  deliveryTime: string;
  route: string;
  inspection: string;
  coverTone: CoverTone;
  tags: string[];
  isVerified: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sellerId: string;
  images: Array<{ url: string; alt: string; sortOrder?: number }>;
}

export interface CollectionCard {
  id: string;
  title: string;
  meta: string;
  image: string;
  tone: "light" | "dark" | "blue";
}
