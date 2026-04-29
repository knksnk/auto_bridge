import { useState } from "react";
import { Link } from "react-router-dom";
import { AutoCard } from "../components/AutoCard";
import { catalogCars, collectionCards } from "../data/mockCars";

const scenarioPresets = [
  {
    key: "family",
    label: "Для семьи",
    request: "Нужен семейный кроссовер с безопасностью, просторным салоном и понятной ценой под ключ",
    results: [
      { title: "Geely Monjaro", price: "Цена в Китае от 1 920 000 ₽, под ключ от 2 640 000 ₽", meta: ["полный привод", "8 предложений"] },
      { title: "Haval Jolion", price: "Цена в Китае от 1 010 300 ₽, под ключ от 1 536 852 ₽", meta: ["семейный", "12 предложений"] },
      { title: "Chery Tiggo 7 Pro", price: "Цена в Китае от 1 240 000 ₽, под ключ от 1 890 000 ₽", meta: ["кроссовер", "9 предложений"] },
    ],
  },
  {
    key: "city",
    label: "Для города",
    request: "Нужно компактное авто для города с небольшим расходом, легкой парковкой и доступным обслуживанием",
    results: [
      { title: "Changan Alsvin", price: "Цена в Китае от 650 000 ₽, под ключ от 1 180 000 ₽", meta: ["городской", "6 предложений"] },
      { title: "BYD Qin Plus DM-i", price: "Цена в Китае от 1 100 000 ₽, под ключ от 1 670 000 ₽", meta: ["гибрид", "11 предложений"] },
      { title: "Geely Emgrand", price: "Цена в Китае от 730 000 ₽, под ключ от 1 290 000 ₽", meta: ["седан", "10 предложений"] },
    ],
  },
  {
    key: "budget",
    label: "До 2 млн ₽",
    request: "Подберите авто до 2 млн ₽ под ключ с проверенным лотом и без сюрпризов по логистике",
    results: [
      { title: "Haval Jolion", price: "Цена в Китае от 1 010 300 ₽, под ключ от 1 536 852 ₽", meta: ["до 2 млн ₽", "проверен"] },
      { title: "Chery Tiggo 7 Pro", price: "Цена в Китае от 1 240 000 ₽, под ключ от 1 890 000 ₽", meta: ["кроссовер", "7 предложений"] },
      { title: "Changan Alsvin", price: "Цена в Китае от 650 000 ₽, под ключ от 1 180 000 ₽", meta: ["доступный сегмент", "6 предложений"] },
    ],
  },
  {
    key: "economy",
    label: "Экономичный",
    request: "Нужно авто с хорошей экономией при покупке и разумными затратами на обслуживание",
    results: [
      { title: "Geely Emgrand", price: "Цена в Китае от 730 000 ₽, под ключ от 1 290 000 ₽", meta: ["низкий расход топлива", "10 предложений"] },
      { title: "Changan Alsvin", price: "Цена в Китае от 850 000 ₽, под ключ от 1 100 000 ₽", meta: ["доступный сегмент", "6 предложений"] },
      { title: "BYD Qin Plus DM-i", price: "Цена в Китае от 1 100 000 ₽, под ключ от 1 670 000 ₽", meta: ["гибрид", "11 предложений"] },
    ],
  },
  {
    key: "electric",
    label: "Электро",
    request: "Интересует электромобиль с проверенной батареей, понятной доставкой и запасом хода для города",
    results: [
      { title: "Zeekr X", price: "Цена в Китае от 2 780 000 ₽, под ключ от 3 450 000 ₽", meta: ["электро", "новое"] },
      { title: "BYD Dolphin", price: "Цена в Китае от 1 340 000 ₽, под ключ от 2 020 000 ₽", meta: ["городской EV", "5 предложений"] },
      { title: "Geely Geometry C", price: "Цена в Китае от 1 560 000 ₽, под ключ от 2 240 000 ₽", meta: ["проверка батареи", "4 предложения"] },
    ],
  },
];

const quickScenarioRows = [
  ["Авто до 1.5 млн ₽", "Семейные кроссоверы", "Седаны до 3 лет", "Электромобили", "Популярно в РФ", "Недавно на сайте"],
  ["Проверенные продавцы", "С минимальным пробегом", "Гибриды до 2 млн ₽", "Полный привод", "Для города", "Свежие лоты"],
];

const trustFlow = [
  ["Цена", "Как считается цена", "Отдельно показываем цену в Китае, логистику, таможенные сборы и итог под ключ."],
  ["Оплата", "Безопасность оплаты", "Платеж привязан к этапам сделки, статусам перевозки и подтверждению документов."],
  ["Лот", "Проверка продавца", "У лота есть статус, рейтинг продавца, фотоотчет и отметка проверки."],
  ["Маршрут", "Логистика и таможня", "Покупатель заранее видит маршрут, срок доставки и примерную стоимость перемещения."],
];

export function HomePage() {
  const [activeScenarioKey, setActiveScenarioKey] = useState("economy");
  const activeScenario = scenarioPresets.find((scenario) => scenario.key === activeScenarioKey) ?? scenarioPresets[0];

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
          <div className="hero-trust-row">
            <span>Проверенные продавцы</span>
            <span>Прозрачная цена</span>
            <span>Чат с переводом</span>
          </div>
        </div>

        <div className="hero-route-widget" aria-label="Маршрут доставки">
          <span>Маршрут сделки</span>
          <div>
            <strong>Китай</strong>
            <i />
            <strong>Россия</strong>
          </div>
          <p>Расчет цены, логистика и статусы в одном сценарии</p>
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

        <div className="quick-marquee" aria-label="Готовые сценарии поиска">
          {quickScenarioRows.map((row, rowIndex) => (
            <div className={`quick-marquee-row quick-marquee-row-${rowIndex + 1}`} key={row.join("-")}>
              <div className="quick-marquee-track">
                {[...row, ...row].map((scenario, index) => (
                  <Link key={`${scenario}-${index}`} to={`/catalog?scenario=${encodeURIComponent(scenario)}`}>
                    {scenario}
                  </Link>
                ))}
              </div>
            </div>
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
            <div className="chips chips-small scenario-options" role="list" aria-label="Сценарии ИИ-подбора">
              {scenarioPresets.map((scenario) => (
                <button
                  className={`scenario-option ${scenario.key === activeScenarioKey ? "is-active chip-dark" : ""}`}
                  type="button"
                  key={scenario.key}
                  onClick={() => setActiveScenarioKey(scenario.key)}
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </article>

          <article className="card scenario-results">
            <div className="request-box">
              <span className="card-kicker">Запрос</span>
              <p>{activeScenario.request}</p>
            </div>

            {activeScenario.results.map((item) => (
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
              <Link className="chip-action" to="/#how">
                Как считается цена
              </Link>
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
          <Link className="catalog-link" to="/catalog" aria-label="Смотреть каталог">
            <span>Смотреть каталог</span>
            <span className="catalog-link-arrow" aria-hidden="true" />
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

      <section className="section trust-section">
        <div className="section-header">
          <span className="section-label">Доверие к сделке</span>
          <h2>
            Покупка выглядит
            <br />
            предсказуемой
          </h2>
        </div>
        <div className="deal-flow">
          {trustFlow.map(([label, title, description]) => (
            <article className="deal-flow-step" key={label}>
              <span className="deal-flow-mark">{label}</span>
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
