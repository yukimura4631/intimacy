// src/pages/admin/AdminDashboard.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { checkAdminSession } from '../../utils/checkAuth';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("not logged in");
        return res.json();
      })
      .catch(() => {
        navigate("/admin/login"); // 未ログインならログインページへ
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/admin/login");
      }
    } catch (err) {
      console.error("ログアウトエラー:", err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">管理者ダッシュボード</h1>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => navigate("/admin/news")}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            お知らせ管理
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/admin/reservations")}
            className="block w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            予約一覧
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            ログアウト
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/admin/users")}
            className="block w-full bg-black hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            管理者管理
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
