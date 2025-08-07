// src/pages/admin/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "ログインに失敗しました");
        return;
      }

      // 成功 → 管理ページに遷移
      navigate("/admin");
    } catch (err) {
      console.error("ログインエラー:", err);
      setError("通信エラーが発生しました");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">管理者ログイン</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleLogin}>
        <label className="block mb-2">
          ユーザー名
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          パスワード
          <input
            type="password"
            className="w-full border p-2 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          ログイン
        </button>
        {/* <p className="mt-4 text-sm text-gray-500">
          初めての方は{" "}
          <a href="/admin/register" className="text-blue-600 hover:underline">
            こちらから登録
          </a>
        </p> */}
      </form>
    </div>
  );
};

export default AdminLogin;
