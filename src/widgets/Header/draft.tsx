import React, { useState } from 'react';
import styles from './Header.module.css'


// Основной wrappre 1200px
interface NavItem {
  id: string;
  label: string;
  href: string;
}

[{id: 123, label: sdfsdfas, href: sdfsdfad}, ]

interface HeaderProps {
  title?: string;
  logo?: string;
  navItems?: NavItem[];
  user?: {
    name: string;
    avatar?: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onNavItemClick?: (item: NavItem) => void;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Мое приложение',
  logo,
  navItems = [],
  user,
  onLogin,
  onLogout,
  onNavItemClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (item: NavItem) => {
    onNavItemClick?.(item);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Логотип и бренд */}
        <div className="header__brand">
          {logo && (
            <img src={logo} alt="Логотип" className="header__logo" />
          )}
          <h1 className="header__title">{title}</h1>
        </div>

        {/* Навигация для десктопа */}
        <nav className="header__nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="header__nav-item"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Пользовательская зона */}
        <div className="header__user">
          {user ? (
            <div className="header__user-info">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="header__user-avatar"
                />
              )}
              <span className="header__user-name">{user.name}</span>
              <button onClick={onLogout} className="header__logout-btn">
                Выйти
              </button>
            </div>
          ) : (
            <button onClick={onLogin} className="header__login-btn">
              Войти
            </button>
          )}
        </div>

        {/* Мобильное меню */}
        <button
          className="header__mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Мобильная навигация */}
      {isMobileMenuOpen && (
        <div className="header__mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="header__mobile-nav-item"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};


export default Header;