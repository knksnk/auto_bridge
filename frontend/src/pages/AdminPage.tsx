import { useEffect, useMemo, useState, type FormEvent } from "react";
import { adminService, type AdminLead, type AdminSeller } from "../services/adminService";
import { useMarketplace } from "../state/MarketplaceState";
import type { AdminCarPayload, AdminStats, CarListing, CoverTone } from "../types/catalog";

const initialCarForm: AdminCarPayload = {
  slug: "",
  title: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  mileageKm: 0,
  trim: "",
  color: "",
  engine: "",
  power: "",
  fuel: "Бензин",
  body: "Кроссовер",
  doors: 5,
  drive: "Передний привод",
  transmission: "Автомат",
  chinaPrice: 0,
  turnkeyPrice: 0,
  logisticsPrice: 0,
  deliveryTime: "28-35 дней",
  route: "Гуанчжоу → Москва",
  inspection: "Фотоотчет и проверка VIN",
  coverTone: "blue",
  tags: [],
  isVerified: true,
  status: "PUBLISHED",
  sellerId: "seller-autohub-china",
  images: [{ url: "/assets/hero-bg.png", alt: "Фото автомобиля", sortOrder: 0 }],
};

const money = (value: number) => new Intl.NumberFormat("ru-RU").format(value);

export function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [cars, setCars] = useState<CarListing[]>([]);
  const [sellers, setSellers] = useState<AdminSeller[]>([]);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [form, setForm] = useState<AdminCarPayload>(initialCarForm);
  const [isSaving, setSaving] = useState(false);
  const { showToast } = useMarketplace();

  const refresh = async () => {
    const [nextStats, nextCars, nextSellers, nextLeads] = await Promise.all([
      adminService.getDashboard(),
      adminService.getCars(),
      adminService.getSellers(),
      adminService.getLeads(),
    ]);
    setStats(nextStats);
    setCars(nextCars);
    setSellers(nextSellers);
    setLeads(nextLeads);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const tagsText = useMemo(() => form.tags.join(", "), [form.tags]);

  const updateForm = (key: keyof AdminCarPayload, value: string | number | boolean | string[] | CoverTone) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitCar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    await adminService.createCar(form);
    setSaving(false);
    setForm(initialCarForm);
    showToast("Автомобиль сохранен в админке");
    await refresh();
  };

  const updateStatus = async (car: CarListing, status: AdminCarPayload["status"]) => {
    await adminService.updateCar(car.id, { status });
    showToast(status === "PUBLISHED" ? "Автомобиль опубликован" : "Статус обновлен", "info");
    await refresh();
  };

  const removeCar = async (car: CarListing) => {
    if (!window.confirm(`Удалить ${car.title}?`)) {
      return;
    }

    await adminService.deleteCar(car.id);
    showToast("Автомобиль удален", "info");
    await refresh();
  };

  return (
    <main className="admin-page">
      <section className="admin-hero reveal">
        <div>
          <span className="section-label">Админка AutoBridge</span>
          <h1>Управление каталогом, заявками и продавцами</h1>
          <p>Интерфейс уже готов к реальной базе: добавляйте авто, обновляйте параметры и отслеживайте обращения.</p>
        </div>
        <a href="#admin-car-form">Добавить авто</a>
      </section>

      <section className="admin-stats reveal">
        <span>Всего авто<strong>{stats?.cars ?? "..."}</strong></span>
        <span>Опубликовано<strong>{stats?.publishedCars ?? "..."}</strong></span>
        <span>Заявки<strong>{stats?.leads ?? "..."}</strong></span>
        <span>Партнеры<strong>{stats?.partnerApplications ?? "..."}</strong></span>
      </section>

      <section className="admin-layout">
        <div className="admin-panel reveal">
          <div className="admin-panel-head">
            <span>Каталог</span>
            <strong>{cars.length} авто</strong>
          </div>
          <div className="admin-car-list">
            {cars.map((car) => (
              <article className="admin-car-row" key={car.id}>
                <div>
                  <strong>{car.title}</strong>
                  <span>{car.year} · {car.mileage} · {car.turnkeyPrice}</span>
                </div>
                <div className="admin-row-actions">
                  <button type="button" onClick={() => updateStatus(car, car.status === "published" ? "DRAFT" : "PUBLISHED")}>
                    {car.status === "published" ? "В черновик" : "Опубликовать"}
                  </button>
                  <button type="button" className="danger-action" onClick={() => removeCar(car)}>
                    Удалить
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <form className="admin-panel admin-form reveal" id="admin-car-form" onSubmit={submitCar}>
          <div className="admin-panel-head">
            <span>Новое объявление</span>
            <strong>CRUD</strong>
          </div>
          <div className="admin-form-grid">
            <input placeholder="Slug" value={form.slug} onChange={(event) => updateForm("slug", event.target.value)} required />
            <input placeholder="Название" value={form.title} onChange={(event) => updateForm("title", event.target.value)} required />
            <input placeholder="Марка" value={form.brand} onChange={(event) => updateForm("brand", event.target.value)} required />
            <input placeholder="Модель" value={form.model} onChange={(event) => updateForm("model", event.target.value)} required />
            <input type="number" placeholder="Год" value={form.year} onChange={(event) => updateForm("year", Number(event.target.value))} />
            <input type="number" placeholder="Пробег, км" value={form.mileageKm} onChange={(event) => updateForm("mileageKm", Number(event.target.value))} />
            <input placeholder="Комплектация" value={form.trim} onChange={(event) => updateForm("trim", event.target.value)} />
            <input placeholder="Цвет" value={form.color} onChange={(event) => updateForm("color", event.target.value)} />
            <input placeholder="Двигатель" value={form.engine} onChange={(event) => updateForm("engine", event.target.value)} />
            <input placeholder="Мощность" value={form.power} onChange={(event) => updateForm("power", event.target.value)} />
            <input placeholder="Топливо" value={form.fuel} onChange={(event) => updateForm("fuel", event.target.value)} />
            <input placeholder="Кузов" value={form.body} onChange={(event) => updateForm("body", event.target.value)} />
            <input type="number" placeholder="Дверей" value={form.doors} onChange={(event) => updateForm("doors", Number(event.target.value))} />
            <input placeholder="Привод" value={form.drive} onChange={(event) => updateForm("drive", event.target.value)} />
            <input placeholder="Коробка" value={form.transmission} onChange={(event) => updateForm("transmission", event.target.value)} />
            <select value={form.sellerId} onChange={(event) => updateForm("sellerId", event.target.value)}>
              {sellers.map((seller) => (
                <option value={seller.id} key={seller.id}>{seller.name}</option>
              ))}
            </select>
            <input type="number" placeholder="Цена в Китае" value={form.chinaPrice} onChange={(event) => updateForm("chinaPrice", Number(event.target.value))} />
            <input type="number" placeholder="Цена под ключ" value={form.turnkeyPrice} onChange={(event) => updateForm("turnkeyPrice", Number(event.target.value))} />
            <input type="number" placeholder="Логистика" value={form.logisticsPrice} onChange={(event) => updateForm("logisticsPrice", Number(event.target.value))} />
            <input placeholder="Срок доставки" value={form.deliveryTime} onChange={(event) => updateForm("deliveryTime", event.target.value)} />
            <input placeholder="Маршрут" value={form.route} onChange={(event) => updateForm("route", event.target.value)} />
            <input placeholder="Проверка" value={form.inspection} onChange={(event) => updateForm("inspection", event.target.value)} />
            <input placeholder="Теги через запятую" value={tagsText} onChange={(event) => updateForm("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} />
            <select value={form.status} onChange={(event) => updateForm("status", event.target.value as AdminCarPayload["status"])}>
              <option value="PUBLISHED">Опубликовано</option>
              <option value="DRAFT">Черновик</option>
              <option value="ARCHIVED">Архив</option>
            </select>
          </div>
          <div className="admin-form-preview">
            <span>Итог под ключ</span>
            <strong>{money(form.turnkeyPrice)} ₽</strong>
          </div>
          <button type="submit" disabled={isSaving}>{isSaving ? "Сохраняем..." : "Сохранить автомобиль"}</button>
        </form>
      </section>

      <section className="admin-panel admin-leads reveal">
        <div className="admin-panel-head">
          <span>Заявки</span>
          <strong>{leads.length}</strong>
        </div>
        <div className="admin-lead-grid">
          {leads.map((lead) => (
            <article key={lead.id}>
              <strong>{lead.name}</strong>
              <span>{lead.phone}</span>
              <p>{lead.car?.title ?? "Общий запрос"} · {lead.comment ?? "Без комментария"}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
