// src/pages/ReservationThanks.js
import React from 'react';
import { Link } from 'react-router-dom';

const ReservationThanks = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-green-800 mb-4">ご予約ありがとうございました！</h1>
      <p className="text-gray-700 mb-6">ご予約内容を確認の上、担当者よりご連絡いたします。</p>
      <Link to="/" className="bg-green-600 text-white px-6 py-2 rounded shadow">ホームに戻る</Link>
    </div>
  );
};

export default ReservationThanks;
