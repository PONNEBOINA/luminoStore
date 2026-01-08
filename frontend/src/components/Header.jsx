import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="lumina-header">
      <div className="lumina-header__brand">
        <button
          type="button"
          className="lumina-header__menu-btn"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <span className="lumina-header__logo">
          <span className="lumina-header__logo-square" />
        </span>
        <span className="lumina-header__title">LuminaStore</span>
      </div>

      <div className={`lumina-header__right ${menuOpen ? 'is-open' : ''}`}>
        <nav className="lumina-header__nav" aria-label="Primary">
          <a href="#shop">Shop</a>
          <a href="#account">Account</a>
          <a href="#contact">Contact Us</a>
        </nav>

        <div className="lumina-header__actions">
          <button type="button" className="lumina-header__icon-btn" aria-label="Search">
            <svg viewBox="0 0 20 20" role="img" aria-hidden="true">
              <path
                d="M14 14l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9"
                cy="9"
                r="6"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </button>
          <button type="button" className="lumina-header__icon-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path
                d="M3 5h2l2.6 9.4a1 1 0 0 0 .96.73h8.78a1 1 0 0 0 .97-.76L19 7H6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="19" r="1.2" fill="currentColor" />
              <circle cx="17" cy="19" r="1.2" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
