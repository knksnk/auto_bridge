import type { Car, CarImage, Seller } from "@prisma/client";
import { formatMoney } from "../common/money";

export type CarWithRelations = Car & {
  seller: Seller;
  images: CarImage[];
};

export const mapCar = (car: CarWithRelations) => ({
  id: car.id,
  slug: car.slug,
  title: car.title,
  brand: car.brand,
  model: car.model,
  year: car.year,
  mileageKm: car.mileageKm,
  mileage: `${new Intl.NumberFormat("ru-RU").format(car.mileageKm)} км`,
  trim: `${car.trim} • ${car.color}`,
  color: car.color,
  engine: car.engine,
  power: car.power,
  fuel: car.fuel,
  body: car.body,
  doors: car.doors,
  drive: car.drive,
  transmission: car.transmission,
  chinaPriceValue: car.chinaPrice,
  turnkeyPriceValue: car.turnkeyPrice,
  logisticsPriceValue: car.logisticsPrice,
  chinaPrice: `Цена в Китае от ${formatMoney(car.chinaPrice)}`,
  turnkeyPrice: `Под ключ от ${formatMoney(car.turnkeyPrice)}`,
  logisticsPrice: `Логистика и сборы от ${formatMoney(car.logisticsPrice)}`,
  deliveryTime: car.deliveryTime,
  route: car.route,
  city: car.route,
  seller: car.seller.name,
  sellerId: car.sellerId,
  sellerRating: car.seller.rating.toFixed(1),
  sellerCity: car.seller.city,
  inspection: car.inspection,
  price: formatMoney(car.chinaPrice),
  verified: car.isVerified,
  isVerified: car.isVerified,
  coverTone: car.coverTone,
  tags: car.tags,
  status: car.status.toLowerCase(),
  images: car.images
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((image) => ({ id: image.id, url: image.url, alt: image.alt, sortOrder: image.sortOrder })),
  createdAt: car.createdAt,
  updatedAt: car.updatedAt,
});
