// src/components/StepConfirm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StepConfirm = ({ formData, prevStep }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menu: formData.menu,
          date: formData.date,
          time: formData.time,
          therapist: formData.therapist,
          customerName: formData.name,
          phoneNumber: formData.phoneNumber,
          note: formData.note,
        }),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      console.log('✅ 送信成功！');
      navigate('/reservation/thanks');
    } catch (error) {
      console.error('❌ エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">予約内容の確認</h2>

      <div className="space-y-4 text-gray-800">
        <p><strong>メニュー：</strong> {formData.menu}</p>
        <p><strong>日付：</strong> {formData.date}</p>
        <p><strong>時間：</strong> {formData.time}</p>
        <p><strong>セラピスト：</strong> {formData.therapist}</p>
        <p><strong>お名前：</strong> {formData.name}</p>
        <p><strong>電話番号：</strong> {formData.phoneNumber}</p>
        <p><strong>備考：</strong> {formData.note || 'なし'}</p>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded"
        >
          戻る
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default StepConfirm;
