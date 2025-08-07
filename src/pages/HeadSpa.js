// src/pages/HeadSpa.js
import React from 'react';
import './MenuDetail.css';
import { useNavigate } from 'react-router-dom';
import HeadUp from '../assets/headUp .png'

function HeadSpa() {
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate('/reservation', { state: { menu: 'ドライヘッドスパ' } });
  };

  return (
    <div className="menu-detail">
      <h2>ドライヘッドスパ</h2>
      <img src= {HeadUp} alt="ドライヘッドスパ" className="menu-image" />

      <div className="menu-info">
        <h3>コース時間・料金</h3>
        <ul>
          <li>40分：5,000円</li>
          <li>60分：7,000円</li>
          <li>80分：9,000円</li>
        </ul>

        <h3>特徴</h3>
        <p>
          頭部から肩回り、ふくらはぎから足先までを包み込むようにほぐし、深いリラックスと血行促進をもたらします。
          張りに直接アプローチし、施術後の爽快感と解放感を体感できます。
        </p>
      </div>

      <button className="reserve-button" onClick={handleReserve}>
        予約する
      </button>
    </div>
  );
}

export default HeadSpa;