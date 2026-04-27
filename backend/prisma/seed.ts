import { PrismaClient, CarStatus, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const cars = [
  {
    slug: "haval-jolion",
    title: "Haval Jolion 2024",
    brand: "Haval",
    model: "Jolion",
    year: 2024,
    mileageKm: 9400,
    trim: "Supreme",
    color: "Белый",
    engine: "1.5T, 143 л.с., бензин",
    power: "143 л.с.",
    fuel: "Бензин",
    body: "Кроссовер",
    doors: 5,
    drive: "Передний привод",
    transmission: "Робот",
    chinaPrice: 1010300,
    turnkeyPrice: 1536852,
    logisticsPrice: 526552,
    deliveryTime: "28-35 дней",
    route: "Гуанчжоу → Москва",
    inspection: "Фотоотчет и проверка VIN",
    coverTone: "blue",
    tags: ["семейный", "экономичный", "проверен"],
  },
  {
    slug: "geely-monjaro",
    title: "Geely Monjaro",
    brand: "Geely",
    model: "Monjaro",
    year: 2023,
    mileageKm: 18200,
    trim: "Flagship",
    color: "Серый металлик",
    engine: "2.0T, 238 л.с., бензин",
    power: "238 л.с.",
    fuel: "Бензин",
    body: "Кроссовер",
    doors: 5,
    drive: "Полный привод",
    transmission: "Автомат",
    chinaPrice: 1920000,
    turnkeyPrice: 2640000,
    logisticsPrice: 720000,
    deliveryTime: "31-40 дней",
    route: "Шанхай → Санкт-Петербург",
    inspection: "Проверка продавца и истории",
    coverTone: "dark",
    tags: ["полный привод", "популярно", "семейный"],
  },
  {
    slug: "byd-qin-plus",
    title: "BYD Qin Plus DM-i",
    brand: "BYD",
    model: "Qin Plus DM-i",
    year: 2023,
    mileageKm: 12000,
    trim: "Champion Edition",
    color: "Синий",
    engine: "1.5 гибрид, 180 л.с.",
    power: "180 л.с.",
    fuel: "Гибрид",
    body: "Седан",
    doors: 4,
    drive: "Передний привод",
    transmission: "Автомат",
    chinaPrice: 1100000,
    turnkeyPrice: 1670000,
    logisticsPrice: 570000,
    deliveryTime: "25-34 дня",
    route: "Шэньчжэнь → Москва",
    inspection: "Батарея и кузов проверены",
    coverTone: "soft",
    tags: ["гибрид", "седан", "экономичный"],
  },
  {
    slug: "changan-alsvin",
    title: "Changan Alsvin",
    brand: "Changan",
    model: "Alsvin",
    year: 2024,
    mileageKm: 6800,
    trim: "Comfort",
    color: "Белый",
    engine: "1.5L, 107 л.с., бензин",
    power: "107 л.с.",
    fuel: "Бензин",
    body: "Седан",
    doors: 4,
    drive: "Передний привод",
    transmission: "Робот",
    chinaPrice: 650000,
    turnkeyPrice: 1180000,
    logisticsPrice: 530000,
    deliveryTime: "27-36 дней",
    route: "Пекин → Казань",
    inspection: "Проверенный лот",
    coverTone: "blue",
    tags: ["доступный сегмент", "седан"],
  },
  {
    slug: "zeekr-x",
    title: "Zeekr X",
    brand: "Zeekr",
    model: "X",
    year: 2024,
    mileageKm: 4100,
    trim: "Long Range",
    color: "Черный",
    engine: "Электро, 272 л.с.",
    power: "272 л.с.",
    fuel: "Электро",
    body: "Кроссовер",
    doors: 5,
    drive: "Задний привод",
    transmission: "Редуктор",
    chinaPrice: 2780000,
    turnkeyPrice: 3450000,
    logisticsPrice: 670000,
    deliveryTime: "30-42 дня",
    route: "Ханчжоу → Москва",
    inspection: "Проверка батареи и зарядки",
    coverTone: "dark",
    tags: ["электро", "новое"],
  },
  {
    slug: "chery-tiggo",
    title: "Chery Tiggo 7 Pro",
    brand: "Chery",
    model: "Tiggo 7 Pro",
    year: 2022,
    mileageKm: 15600,
    trim: "Elite",
    color: "Красный",
    engine: "1.6T, 186 л.с., бензин",
    power: "186 л.с.",
    fuel: "Бензин",
    body: "Кроссовер",
    doors: 5,
    drive: "Передний привод",
    transmission: "Робот",
    chinaPrice: 1240000,
    turnkeyPrice: 1890000,
    logisticsPrice: 650000,
    deliveryTime: "29-38 дней",
    route: "Чунцин → Москва",
    inspection: "Диагностика и фотоотчет",
    coverTone: "soft",
    tags: ["кроссовер", "проверен"],
  },
];

async function main() {
  const passwordHash = await bcrypt.hash("admin12345", 10);

  await prisma.user.upsert({
    where: { email: "admin@autobridge.local" },
    update: { role: Role.ADMIN },
    create: {
      email: "admin@autobridge.local",
      name: "Администратор AutoBridge",
      passwordHash,
      role: Role.ADMIN,
      city: "Москва",
    },
  });

  const seller = await prisma.seller.upsert({
    where: { id: "seller-autohub-china" },
    update: {},
    create: {
      id: "seller-autohub-china",
      name: "AutoHub China",
      city: "Гуанчжоу",
      rating: 4.9,
      verified: true,
      email: "seller@autobridge.local",
      phone: "+86 000 000 00 00",
    },
  });

  for (const [index, car] of cars.entries()) {
    const savedCar = await prisma.car.upsert({
      where: { slug: car.slug },
      update: {
        ...car,
        status: CarStatus.PUBLISHED,
        sellerId: seller.id,
      },
      create: {
        ...car,
        status: CarStatus.PUBLISHED,
        sellerId: seller.id,
      },
    });

    await prisma.carImage.deleteMany({ where: { carId: savedCar.id } });
    await prisma.carImage.createMany({
      data: [
        {
          carId: savedCar.id,
          url: `/assets/${index % 2 === 0 ? "crossovers" : "sedans"}.png`,
          alt: savedCar.title,
          sortOrder: 0,
        },
        {
          carId: savedCar.id,
          url: "/assets/hero-bg.png",
          alt: `${savedCar.title} в логистическом центре`,
          sortOrder: 1,
        },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
