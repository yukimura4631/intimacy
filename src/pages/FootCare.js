// src/pages/FootCare.js
import React from 'react';
import './MenuDetail.css';
import { useNavigate } from 'react-router-dom';
import FootUp from '../assets/footUp.png';

function FootCare() {
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate('/reservation', { state: { menu: 'フットケア' } });
  };

  return (
    <div className="menu-detail">
      <h2>フットケア</h2>
      <img src= {FootUp} alt="フットケア" className="menu-image " />

      <div className="menu-info">
        <h3>コース時間・料金</h3>
        <ul>
          <li>15分：1,500円</li>
          <li>30分：2,500円</li>
        </ul>

        <h3>特徴</h3>
        <p>
          足の角質を丁寧にケアし、清潔でなめらかな素足へ。短時間でもしっかり効果を実感できる人気コースです。
        </p>
      </div>

      <button className="reserve-button" onClick={handleReserve}>
        予約する
      </button>
    </div>
  );
}

export default FootCare;