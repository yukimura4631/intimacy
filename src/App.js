import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/public/Home";
import HeadSpa from "./pages/HeadSpa";
import FootCare from "./pages/FootCare";
import AromaTreatment from "./pages/AromaTreatment";
import ReservationPage from "./pages/public/ReservationPage";
import ReservationThanks from "./pages/public/ReservationThanks";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ReservationList from "./pages/admin/AdminReservationList";
import AdminNews from "./pages/admin/AdminNews";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminUserList from "./pages/admin/AdminUserList";

function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <div className="bg-main-body bg-cover">
        <Routes>
          {/* 一般ユーザー向け */}
          <Route path="/" element={<Home />} />
          <Route path="/menu/headspa" element={<HeadSpa />} />
          <Route path="/menu/footcare" element={<FootCare />} />
          <Route path="/menu/aroma" element={<AromaTreatment />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/reservation/thanks" element={<ReservationThanks />} />

          {/* 管理者ページ */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminUserList />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/reservations" element={<ReservationList />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/users" element={<AdminUserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
