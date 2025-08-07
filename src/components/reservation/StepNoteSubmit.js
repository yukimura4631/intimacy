// src/components/StepNoteSubmit.js
import React from 'react';

const StepNoteSubmit = ({ formData, setFormData, onBack, onNext }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      note: e.target.value,
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">備考欄（任意）</h2>

      <textarea
        value={formData.note}
        onChange={handleChange}
        className="w-full h-32 p-2 border rounded"
        placeholder="ご要望や注意点があればご記入ください"
      />

      <div className="mt-6 flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded"
        >
          戻る
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default StepNoteSubmit;
