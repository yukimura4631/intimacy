// src/components/StepCustomerInfo.js
import React, { useState } from 'react';

const StepCustomerInfo = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errorMessage, setErrorMessage] = useState(""); // ← ここに移動！

  const handleChange = (e) => {
    updateFormData(e.target.name, e.target.value);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      setErrorMessage("お名前を入力してください");
      return;
    }

    if (!/^\d{10,11}$/.test(formData.phoneNumber)) {
      setErrorMessage("電話番号を10桁または11桁の数字で入力してください");
      return;
    }

    setErrorMessage(""); // エラー解除
    console.log("保存するデータ:", formData);

    nextStep(); // 保存成功時に次へ進める
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">お客様情報の入力</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">お名前</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="例：山田花子"
          />
        </div>
        <div>
          <label className="block font-medium">電話番号</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="例：09012345678"
          />
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-600 mt-2">{errorMessage}</p>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded"
        >
          戻る
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default StepCustomerInfo;
