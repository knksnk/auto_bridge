import { Link } from "react-router-dom";
import { AutoCard } from "../components/AutoCard";
import { catalogCars, collectionCards, quickScenarios } from "../data/mockCars";

const scenarioResults = [
  {
    title: "Geely Emgrand",
    price: "Цена в Китае от 730 000 ₽, под ключ от 1 290 000 ₽",
    meta: ["низкий расход топлива", "10 предложений"],
  },
  {
    title: "Changan Alsvin",
    price: "Цена в Китае от 850 000 ₽, под ключ от 1 100 000 ₽",
    meta: ["доступный сегмент", "6 предложений"],
  },
  {
    title: "BYD Qin Plus DM-i",
    price: "Цена в Китае от 1 100 000 ₽, под ключ от 1 670 000 ₽",
    meta: ["гибрид", "11 предложений"],
  },
];

export function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-main-card">
          <h1>
            Прямой путь к авто из
            <br />
            Китая с прозрачной
            <br />
            ценой и понятной
            <br />
            доставкой
          </h1>
          <p>
            Выбирайте автомобиль, сравнивайте продавцов и
            <br />
            перевозчиков, общайтесь в чате с переводом и
            <br />
            сразу понимайте итоговую стоимость под ключ.
          </p>
          <Link to="/catalog" className="hero-button">
            Подобрать авто
          </Link>
        </div>

        <div className="hero-side-card hero-side-dark">
          <h2>Что делает AutoBridge</h2>
          <p>
            Объединяем на одной площадке покупателей, профессиональных перевозчиков и продавцов из Китая
          </p>
          <p>Все этапы сделки в одном месте</p>
        </div>

        <div className="hero-side-card hero-side-light">
          <span>Экономия на реальных кейсах</span>
          <strong>До 1 000 000 ₽</strong>
          <p>
            Даже с учетом логистики и
            <br />
            таможенных сборов
          </p>
        </div>
      </section>

      <section className="section quick-start">
        <div className="section-header">
          <span className="section-label">Быстрый старт</span>
          <h2>Готовые сценарии поиска</h2>
        </div>

        <div className="chips quick-chips">
          {quickScenarios.map((scenario) => (
            <span key={scenario}>{scenario}</span>
          ))}
        </div>

        <div className="scenario-layout">
          <article className="card scenario-intro">
            <span className="card-kicker">ИИ-подбор</span>
            <h3>
              ИИ-помощник быстро
              <br />
              найдет подходящее авто
            </h3>
            <p>
              Опишите бюджет, тип кузова, приоритеты, ценовой
              <br />
              сегмент и все, что для вас важно в будущей машине.
              <br />
              Система предложит подходящие модели, покажет
              <br />
              примерную цену и планы перемещения каждого
              <br />
              из вариантов.
            </p>
            <div className="scenario-input">Введите запрос или попробуйте готовые сценарии</div>
            <div className="chips chips-small">
              <span>Для семьи</span>
              <span>Для города</span>
              <span>До 2 млн ₽</span>
              <span className="chip-dark">Экономичный</span>
              <span>Электро</span>
            </div>
          </article>

          <article className="card scenario-results">
            <div className="request-box">
              <span className="card-kicker">Запрос</span>
              <p>Нужно авто с хорошей экономией при покупке и разумными затратами на обслуживание</p>
            </div>

            {scenarioResults.map((item) => (
              <div className="result-item" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.price}</p>
                <div className="result-meta">
                  {item.meta.map((meta) => (
                    <span key={meta}>{meta}</span>
                  ))}
                </div>
              </div>
            ))}

            <div className="result-actions">
              <Link className="chip-action chip-action-blue" to="/catalog">
                Открыть все результаты
              </Link>
              <button className="chip-action" type="button">
                Как считается цена
              </button>
            </div>
          </article>
        </div>
      </section>

      <section id="catalog" className="section picks">
        <div className="section-header">
          <span className="section-label">Подборки</span>
          <h2>Все в одном месте</h2>
        </div>

        <div className="pick-grid">
          {collectionCards.map((card) => (
            <article className={`pick-card pick-${card.tone}`} key={card.id}>
              <img src={card.image} alt={card.title} />
              <div className="pick-overlay">
                <h3>{card.title}</h3>
                <span>{card.meta}</span>
              </div>
            </article>
          ))}
          <Link className="catalog-link" to="/catalog">
            Смотреть каталог
          </Link>
        </div>
      </section>

      <section id="catalog-list" className="section listing-section">
        <div className="section-header">
          <span className="section-label">Объявления</span>
          <h2>
            Выбирай автомобиль
            <br />
            мечты
          </h2>
        </div>

        <div className="listing-layout">
          <aside className="card filter-card">
            <h3>Фильтры</h3>
            {["Цена в Китае", "Цена под ключ", "Год", "Мощность"].map((label) => (
              <div className="filter-group" key={label}>
                <label>{label}</label>
                <div className="field-row">
                  <span>от</span>
                  <span>до</span>
                </div>
              </div>
            ))}
            {["Тип кузова", "Марка", "Двигатель", "Привод"].map((label) => (
              <div className="select-pill" key={label}>
                {label}
              </div>
            ))}
            <button type="button">Применить</button>
          </aside>

          <div className="listing-grid">
            {catalogCars.slice(0, 2).map((car) => (
              <AutoCard car={car} key={car.id} compact />
            ))}
          </div>
        </div>

        <Link to="/catalog" className="more-button">
          Смотреть больше
        </Link>
      </section>

      <section id="how" className="section how-section">
        <span className="section-label">Как это работает</span>

        <div className="card benefit-strip">
          <div>
            <h3>Все этапы сделки в одном месте</h3>
            <p>От выбора авто до получения без цепочек посредников</p>
          </div>
          <div>
            <h3>Безопасная оплата</h3>
            <p>Платеж привязан к условиям сделки и статусу исполнения</p>
          </div>
          <div>
            <h3>Сравнение перевозчиков</h3>
            <p>Выбор перевозчика, условий логистики и цены или заказов прямо из Китая</p>
          </div>
        </div>

        <h2 className="big-copy">
          Покупатель проходит путь от выбора авто
          <br />
          до доставки с полной прозрачностью
          <br />
          процесса
        </h2>

        <div className="steps-grid">
          {[
            ["01", "Выбор автомобиля", "Каталог, подбор, фильтры или помощь ИИ помогают быстро сузить поиск и найти себе то, что будет по душе"],
            ["02", "Расчет цены", "Платформа показывает цену в Китае, логистику, сборы и итог под ключ"],
            ["03", "Выбор доставки", "Можно сравнить перевозчиков или забрать автомобиль своими силами"],
            ["04", "Чат и сделка", "Чат с продавцом или перевозчиком работает со встроенным переводом и статусами"],
          ].map(([number, title, description]) => (
            <article className="card step-card" key={number}>
              <span className="step-no">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="partners" className="section roles-section">
        <span className="section-label">Три стороны платформы</span>
        <h2 className="big-copy">
          Интерфейс понятен покупателю и
          <br />
          одновременно создает ценность
          <br />
          для партнеров
        </h2>

        <div className="roles-grid">
          <article className="card role-card role-light">
            <h3>Покупатель</h3>
            <strong>Экономия, контроль и удобный сценарий выбора</strong>
            <p>Каталог, сравнение вариантов, понятная итоговая цена и безопасная сделка.</p>
          </article>
          <article className="card role-card role-dark">
            <h3>Перевозчик</h3>
            <strong>Стабильный поток заказов и прозрачные условия сделки</strong>
            <p>Профиль, верификация, карточка услуг и прямой доступ к горячим заказам.</p>
          </article>
          <article className="card role-card role-blue">
            <h3>Продавец</h3>
            <strong>Выход на рынок РФ без лишней цепочки посредников</strong>
            <p>Размещение объявлений, прямой контакт с покупателем и быстрые доверия к лоту.</p>
          </article>
        </div>

        <div className="bridge-card">
          <div className="bridge-copy">
            <span className="bridge-label">Почему это работает</span>
            <h3>Мост между китайским рынком и покупателем в РФ</h3>
            <p>AutoBridge объединяет в одном интерфейсе каталог, расчет финальной стоимости, логистику, чат и контроль сделки</p>
          </div>
          <div className="bridge-stat">
            <strong>3 роли</strong>
            <span>1 платформа</span>
          </div>
        </div>
      </section>

      <footer id="about" className="footer">Тут будет подвал, пока об этом не думаем</footer>
    </main>
  );
}
