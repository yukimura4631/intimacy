// src/components/StepDateTime.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const StepDateTime = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [selectedDate, setSelectedDate] = useState(formData.date ? new Date(formData.date) : null);
  const [selectedTime, setSelectedTime] = useState(formData.time || '');

  // 時間のリストを生成（例：10:00〜21:00 で30分刻み）
  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 10; hour <= 20; hour++) {
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    times.push(`21:00`);
    return times;
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      updateFormData('date', selectedDate.toISOString());
      updateFormData('time', selectedTime);
      nextStep();
    } else {
      alert("日付と時間を選択してください！");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-green-700">② ご希望の日時を選択</h2>

      <div className="mb-6">
        <label className="block font-semibold mb-2">📅 日付</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          dateFormat="yyyy年MM月dd日 (eee)"
          className="border p-2 rounded"
          placeholderText="日付を選んでください"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">⏰ 時間</label>
        <div className="grid grid-cols-4 gap-2">
          {generateTimeSlots().map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-2 border rounded ${
                selectedTime === time
                  ? 'bg-green-500 text-white'
                  : 'hover:bg-green-100'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          ← 戻る
        </button>
        <button
          onClick={handleNext}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          次へ →
        </button>
      </div>
    </div>
  );
};

export default StepDateTime;
