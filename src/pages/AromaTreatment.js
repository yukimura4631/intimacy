// src/pages/AromaTreatment.js
import React from "react";
import "./MenuDetail.css";
import { useNavigate } from "react-router-dom";
import TitleLogo from "../assets/TitleLOGO.png"; // アロマの画像

function AromaTreatment() {
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate("/reservation", { state: { menu: "アロマセラピー" } }); // ✅ メニュー名統一
  };

  return (
    <div className="menu-detail">
      <h3>アロマセラピー</h3>
      <img src={TitleLogo} alt="アロマセラピー" className="menu-image" />

      <div className="menu-info">
        <h3>コース時間・料金</h3>
        <dl className="w-1/3 ml-4 space-y-2">
          <div className="flex justify-between">
            <dt className="font-medium">60分</dt>
            <dd className="text-right">9,000円</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium">80分</dt>
            <dd className="text-right">12,000円</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium">100分</dt>
            <dd className="text-right">15,000円</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium">120分</dt>
            <dd className="text-right">18,000円</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium">150分</dt>
            <dd className="text-right">21,000円</dd>
          </div>
        </dl>

        <h3>特徴</h3>
        <p>
          厳選されたアロマオイルで全身を優しく包み込み、リンパの流れを整えながら、心身のバランスを深く癒します。リラックスだけでなく、むくみや慢性的な疲れにもアプローチする、極上のセラピーコースです。
        </p>
      </div>

      <button className="reserve-button" onClick={handleReserve}>
        予約する
      </button>
    </div>
  );
}

export default AromaTreatment;