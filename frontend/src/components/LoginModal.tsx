import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService";
import { useMarketplace } from "../state/MarketplaceState";
import type { LoginPayload } from "../types/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [isSubmitting, setSubmitting] = useState(false);
  const { showToast } = useMarketplace();

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    await authService.login(form);
    setSubmitting(false);
    showToast("Вход выполнен. Кабинет готов к будущему backend.");
    onClose();
  };

  return (
    <div className={`login-modal ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
      <button className="login-modal-backdrop" type="button" aria-label="Закрыть вход" onClick={onClose} />
      <div className="login-dialog" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="login-close" type="button" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>
        <span className="card-kicker">Личный кабинет</span>
        <h2 id="login-title">Войти в AutoBridge</h2>
        <p>Сохраняйте избранное, заявки и историю подбора в одном месте.</p>
        <form className="modal-login-form" onSubmit={submitLogin}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Проверяем..." : "Войти"}
          </button>
        </form>
        <Link className="modal-register-link" to="/auth" onClick={onClose}>
          Создать аккаунт
        </Link>
      </div>
    </div>
  );
}
