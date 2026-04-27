import { Link, NavLink } from "react-router-dom";

interface HeaderProps {
  onLoginClick: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className="topbar">
      <Link className="logo-link" to="/" aria-label="AutoBridge">
        <img className="logo" src="/assets/logo.png" alt="AutoBridge" />
      </Link>
      <nav className="topnav">
        <NavLink to="/catalog">Каталог</NavLink>
        <Link to="/#how">Как это работает</Link>
        <details className="nav-dropdown">
          <summary>Для партнеров</summary>
          <div className="nav-dropdown-menu">
            <Link to="/seller">Продавцам</Link>
            <Link to="/carrier">Перевозчикам</Link>
          </div>
        </details>
        <Link to="/">О нас</Link>
      </nav>
      <div className="topbar-search">Поиск авто, бренд, кузова...</div>
      <Link className="favorite-link" to="/favorites">
        Избранное
      </Link>
      <details className="profile-dropdown">
        <summary className="icon profile-icon" aria-label="Личный кабинет" />
        <div className="profile-dropdown-menu">
          <button className="menu-button" type="button" onClick={onLoginClick}>
            Войти
          </button>
          <Link to="/auth">Регистрация</Link>
        </div>
      </details>
    </header>
  );
}
