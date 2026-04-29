import { catalogCars } from "./mockCars";
import type { ChatThread } from "../types/chat";

const buildThread = (carId: string, status: string): ChatThread => {
  const car = catalogCars.find((item) => item.id === carId) ?? catalogCars[0];

  return {
    id: `chat-${car.id}`,
    carId: car.id,
    carTitle: car.title,
    sellerName: car.seller,
    status,
    lastMessage: "Можем прислать фотоотчет и расчет под ключ сегодня.",
    participants: [
      { id: "buyer", name: "Вы", role: "buyer" },
      { id: car.sellerId ?? car.seller, name: car.seller, role: "seller" },
      { id: "manager", name: "AutoBridge", role: "manager" },
    ],
    messages: [
      {
        id: `${car.id}-1`,
        authorId: "buyer",
        text: `Здравствуйте! Интересует ${car.title}. Авто еще доступно?`,
        time: "10:12",
      },
      {
        id: `${car.id}-2`,
        authorId: car.sellerId ?? car.seller,
        text: "Да, лот доступен. Можем подтвердить состояние, пробег и подготовить свежие фото.",
        time: "10:18",
      },
      {
        id: `${car.id}-3`,
        authorId: "manager",
        text: "Мы можем параллельно посчитать доставку, таможню и итоговую стоимость под ключ.",
        time: "10:21",
      },
      {
        id: `${car.id}-4`,
        authorId: car.sellerId ?? car.seller,
        text: "Можем прислать фотоотчет и расчет под ключ сегодня.",
        time: "10:24",
      },
    ],
  };
};

export const mockChats: ChatThread[] = [
  buildThread("haval-jolion", "Проверка лота"),
  buildThread("geely-monjaro", "Расчет доставки"),
  buildThread("byd-qin-plus", "Уточнение батареи"),
  buildThread("zeekr-x", "Новый ответ"),
];
