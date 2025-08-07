// src/pages/ReservationList.js
import React from 'react';

const ReservationList = () => {
  // 仮のダミーデータ（将来はログインユーザーの予約に絞る）
  const customerReservations = [
    {
      id: 1,
      menu: 'ヘッドスパ',
      date: '2025-06-10',
      time: '14:00',
      therapist: 'ゆかり',
    },
    {
      id: 2,
      menu: 'アロマトリートメント',
      date: '2025-06-11',
      time: '10:30',
      therapist: 'みさき',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">あなたの予約一覧</h2>

      {customerReservations.length === 0 ? (
        <p className="text-gray-600">現在、予約はありません。</p>
      ) : (
        <ul className="space-y-4">
          {customerReservations.map((res) => (
            <li key={res.id} className="p-4 border rounded">
              <p><strong>メニュー：</strong>{res.menu}</p>
              <p><strong>日付：</strong>{res.date}</p>
              <p><strong>時間：</strong>{res.time}</p>
              <p><strong>セラピスト：</strong>{res.therapist}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservationList;
