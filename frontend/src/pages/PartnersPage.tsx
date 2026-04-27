import { Link } from "react-router-dom";

export function PartnersPage() {
  return (
    <main>
      <section className="inner-hero partner-hero">
        <span className="section-label">Для партнеров</span>
        <h1>Подключайтесь к сделке там, где покупатель выбирает авто</h1>
        <p>AutoBridge дает продавцам и перевозчикам понятный поток заявок, прозрачную цену и коммуникацию в одном месте.</p>
      </section>

      <section className="partner-choice-grid">
        <Link className="partner-choice partner-choice-seller" to="/seller">
          <span>Продавцам</span>
          <h2>Размещайте автомобили и получайте заявки от покупателей из РФ</h2>
          <strong>Открыть страницу</strong>
        </Link>
        <Link className="partner-choice partner-choice-carrier" to="/carrier">
          <span>Перевозчикам</span>
          <h2>Показывайте маршруты, сроки и цену доставки в момент выбора</h2>
          <strong>Открыть страницу</strong>
        </Link>
      </section>
    </main>
  );
}
