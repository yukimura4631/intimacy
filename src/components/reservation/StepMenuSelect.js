// StepMenuSelect.js
import React from 'react';

const StepMenuSelect = ({ nextStep, updateFormData, formData }) => {
  const handleSelect = (menuName) => {
    updateFormData('menu', menuName);
    nextStep(); // 自動的に次に進む
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">メニューを選択してください</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          className={`border rounded-xl p-4 hover:bg-green-100 ${
            formData.menu === 'ヘッドスパ' ? 'bg-green-200' : ''
          }`}
          onClick={() => handleSelect('ヘッドスパ')}
        >
          ヘッドスパ
        </button>
        <button
          className={`border rounded-xl p-4 hover:bg-green-100 ${
            formData.menu === 'ボディケア' ? 'bg-green-200' : ''
          }`}
          onClick={() => handleSelect('ボディケア')}
        >
          ボディケア
        </button>
        <button
          className={`border rounded-xl p-4 hover:bg-green-100 ${
            formData.menu === 'アロマトリートメント' ? 'bg-green-200' : ''
          }`}
          onClick={() => handleSelect('アロマトリートメント')}
        >
          アロマトリートメント
        </button>
      </div>
    </div>
  );
};

export default StepMenuSelect;
