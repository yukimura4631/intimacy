// src/components/StepTherapistSelect.js
import React from 'react';

const mockTherapists = [
  { id: 1, name: 'セラピスト花子' },
  { id: 2, name: 'セラピスト美咲' },
  { id: 3, name: 'セラピスト優子' },
];

const StepTherapistSelect = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleSelect = (therapist) => {
    updateFormData('therapist', therapist);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">セラピストを選択</h2>

      <div className="space-y-2">
        {mockTherapists.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded border cursor-pointer ${
              formData.therapist === t.name ? 'border-green-500 bg-green-50' : 'border-gray-300'
            }`}
            onClick={() => handleSelect(t.name)}
          >
            {t.name}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded"
        >
          戻る
        </button>
        <button
          onClick={nextStep}
          disabled={!formData.therapist}
          className={`px-4 py-2 rounded ${
            formData.therapist
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default StepTherapistSelect;
