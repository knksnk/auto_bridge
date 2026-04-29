import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { quickScenarios } from "../data/mockCars";
import { useMarketplace } from "../state/MarketplaceState";

interface HeaderProps {
  onLoginClick: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { favoriteIds, compareIds } = useMarketplace();
  const query = searchValue.trim();

  return (
    <>
      <header className="topbar">
        <Link className="logo-link" to="/" aria-label="AutoBridge">
          <img className="logo" src="/assets/logo.png" alt="AutoBridge" />
        </Link>
        <nav className="topnav">
          <NavLink to="/catalog">Каталог</NavLink>
          <Link to="/#how">Как это работает</Link>
          <div className="nav-dropdown">
            <button className="nav-dropdown-trigger" type="button">
              Для партнеров
            </button>
            <div className="nav-dropdown-menu">
              <Link to="/seller">Продавцам</Link>
              <Link to="/carrier">Перевозчикам</Link>
            </div>
          </div>
          <Link to="/">О нас</Link>
        </nav>
        <div className={`topbar-search ${isSearchOpen ? "is-search-open" : ""}`}>
          <span className="search-icon" aria-hidden="true" />
          <input
            aria-label="Поиск автомобиля"
            value={searchValue}
            placeholder="Поиск авто, бренд, кузова..."
            onBlur={() => window.setTimeout(() => setSearchOpen(false), 150)}
            onChange={(event) => setSearchValue(event.target.value)}
            onFocus={() => setSearchOpen(true)}
          />
          <Link
            className="search-submit"
            to={`/catalog${query ? `?search=${encodeURIComponent(query)}` : ""}`}
            onClick={() => setSearchOpen(false)}
          >
            Найти
          </Link>
          <div className="search-panel">
            <span>Быстрые запросы</span>
            <div className="search-suggestions">
              {quickScenarios.slice(0, 5).map((scenario) => (
                <Link
                  key={scenario}
                  to={`/catalog?scenario=${encodeURIComponent(scenario)}`}
                  onClick={() => setSearchOpen(false)}
                >
                  {scenario}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Link className="favorite-link" to="/favorites">
          Избранное
          <span>{favoriteIds.length}</span>
        </Link>
        <div className="profile-dropdown">
          <button className="icon profile-icon profile-trigger" type="button" aria-label="Личный кабинет" />
          <div className="profile-dropdown-menu">
            <button className="menu-button" type="button" onClick={onLoginClick}>
              Войти
            </button>
            <Link to="/auth">Регистрация</Link>
            <Link to="/admin">Админка</Link>
          </div>
        </div>
      </header>
      <nav className="mobile-bottom-nav" aria-label="Быстрая навигация">
        <NavLink to="/catalog">Каталог</NavLink>
        <NavLink to="/favorites">Избранное {favoriteIds.length}</NavLink>
        <NavLink to="/#how">Как работает</NavLink>
        <button type="button" onClick={onLoginClick}>
          Профиль
        </button>
        {compareIds.length > 0 && <span className="mobile-compare-count">{compareIds.length}</span>}
      </nav>
    </>
  );
}
