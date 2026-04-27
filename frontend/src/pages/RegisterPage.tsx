import { useState, type FormEvent } from "react";
import { useOutletContext } from "react-router-dom";
import { authService } from "../services/authService";
import { useMarketplace } from "../state/MarketplaceState";
import type { RegisterPayload } from "../types/auth";

interface LayoutContext {
  openLogin: () => void;
}

const initialForm: RegisterPayload = {
  name: "",
  email: "",
  phone: "",
  city: "",
  password: "",
};

export function RegisterPage() {
  const { openLogin } = useOutletContext<LayoutContext>();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setSubmitting] = useState(false);
  const { showToast } = useMarketplace();

  const update = (key: keyof RegisterPayload, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    await authService.register(form);
    setSubmitting(false);
    setForm(initialForm);
    showToast("Аккаунт создан. Дальше можно подключать backend-авторизацию.");
  };

  return (
    <main>
      <section className="register-layout">
        <div className="register-copy">
          <span className="section-label">Регистрация</span>
          <h1>Создайте аккаунт для подбора и сохранения автомобилей</h1>
          <p>Личный кабинет соберет избранное, заявки и историю общения с продавцами в одном спокойном интерфейсе.</p>
          <div className="register-benefits">
            <span>Избранное</span>
            <span>Заявки</span>
            <span>История подбора</span>
          </div>
        </div>

        <form className="card register-form" onSubmit={submit}>
          <span className="card-kicker">Новый аккаунт</span>
          <h2>Зарегистрироваться</h2>
          <input type="text" placeholder="Имя" value={form.name} onChange={(event) => update("name", event.target.value)} />
          <input type="email" placeholder="Email" value={form.email} onChange={(event) => update("email", event.target.value)} />
          <input type="tel" placeholder="Телефон" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
          <input type="text" placeholder="Город" value={form.city} onChange={(event) => update("city", event.target.value)} />
          <input type="password" placeholder="Пароль" value={form.password} onChange={(event) => update("password", event.target.value)} />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Создаем..." : "Создать аккаунт"}
          </button>
          <p>
            Уже есть аккаунт?{" "}
            <button className="inline-button" type="button" onClick={openLogin}>
              Войти
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}
