// src/pages/ReservationPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import StepMenuSelect from '../../components/reservation/StepMenuSelect';
import StepDateTime from '../../components/reservation/StepDateTime';
import StepTherapistSelect from '../../components/reservation/StepTherapistSelect';
import StepCustomerInfo from '../../components/reservation/StepCustomerInfo';
import StepNoteSubmit from '../../components/reservation/StepNoteSubmit';
import StepConfirm from '../../components/reservation/StepConfirm';



const ReservationPage = () => {
  const navigate = useNavigate(); // ✅これが必要！
  const [step, setStep] = useState(1);
  const location = useLocation();
  //const passedMenu = location.state?.menu || ''; // 🔥受け取ったメニュー名（なければ空）

  const [formData, setFormData] = useState({
    menu: '',
    date: null,
    time: '',
    therapist: '',
    name: '',
    phone: '',
    note: ''
  });

  // 🔥 初回読み込み時に、stateからmenuを渡されたらセットする
  useEffect(() => {
    if (location.state?.menu) {
      setFormData((prev) => ({
        ...prev,
        menu: location.state.menu
      }));
    }
  }, [location.state?.menu]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
  console.log("予約データ:", formData);
  alert("予約が送信されました！（今はまだダミー）");
  // TODO: API連携 or DB保存処理
    navigate('/thanks');
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12 px-4 md:px-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">ご予約フォーム</h1>

        {step === 1 && <StepMenuSelect nextStep={nextStep} updateFormData={updateFormData} formData={formData} />}
        {step === 2 && <StepDateTime nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
        {step === 3 && <StepTherapistSelect nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
        {step === 4 && <StepCustomerInfo nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
        {step === 5 && (
            <StepNoteSubmit
                formData={formData}
                setFormData={setFormData}
                onBack={prevStep}
                onNext={nextStep}
            />)}
        {step === 6 && (
          <StepConfirm
            formData={formData}
            prevStep={prevStep}
            handleSubmit={handleSubmit} // ← ここ！
          />)}


      </div>
    </div>
  );
};

export default ReservationPage;
