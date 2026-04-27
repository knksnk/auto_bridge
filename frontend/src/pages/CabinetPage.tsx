import { Link } from "react-router-dom";

export function CabinetPage() {
  return (
    <main>
      <section className="cabinet-hero">
        <div>
          <span className="section-label">Кабинет</span>
          <h1>Анастасия, добро пожаловать</h1>
          <p>Здесь будут заявки, избранные автомобили и профиль. Пока это аккуратный фронтенд-макет будущего кабинета.</p>
        </div>
        <Link className="primary-link" to="/catalog">
          Вернуться в каталог
        </Link>
      </section>

      <section className="account-grid">
        <article className="card account-panel account-panel-dark">
          <span>Активная заявка</span>
          <h2>Подбор семейного кроссовера до 2 млн ₽</h2>
          <p>ИИ-подбор подготовил 3 модели и ожидает уточнения бюджета.</p>
        </article>
        <article className="card account-panel">
          <span>Избранное</span>
          <h2>2 автомобиля</h2>
          <p>Haval Jolion и Geely Monjaro сохранены для сравнения.</p>
        </article>
        <article className="card account-panel">
          <span>Профиль</span>
          <h2>Контакты не заполнены</h2>
          <p>Позже здесь появятся телефон, город и настройки уведомлений.</p>
        </article>
      </section>

      <section className="section-lite">
        <div className="section-header">
          <span className="section-label">Быстрые действия</span>
          <h2>Продолжить выбор</h2>
        </div>
        <div className="action-grid">
          <Link className="card action-card" to="/catalog">
            Открыть каталог
          </Link>
          <Link className="card action-card" to="/favorites">
            Посмотреть избранное
          </Link>
          <Link className="card action-card" to="/partners">
            Стать партнером
          </Link>
        </div>
      </section>
    </main>
  );
}
