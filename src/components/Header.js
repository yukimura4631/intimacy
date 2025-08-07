import React, { useState } from "react";
import "../components/common/Header.css"; // スタイル用（あとで作る）

import logo from "../assets/onlyLOGO.png";
import TitleLogo from "../assets/TitleLOGO.png"; // タイトルロゴの画像

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-area">
          <a href="/" className="logo-link">
            <img src={logo} alt="ロゴ" className="logo" />
          </a>
          <a href="/" className="title-logo-link">
            <img src={TitleLogo} alt="タイトルロゴ" className="title-logo" />
          </a>
        </div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a href="/">トップ</a>
            </li>
            <li>
              <a href="/news">おしらせ</a>
            </li>
            <li>
              <a href="/therapist">セラピスト</a>
            </li>
            <li>
              <a href="/service">利用方法</a>
            </li>
            <li>
              <a href="/menu">メニュー</a>
            </li>
            <li>
              <a href="/acceses">アクセス</a>
            </li>
          </ul>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
