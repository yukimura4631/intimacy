// src/pages/admin/AdminUserList.js
import React, { useEffect, useState } from "react";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 一覧を取得する関数（再利用用）
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/admin/users", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("ユーザー取得に失敗しました");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("ユーザー取得エラー:", err);
    }
  };

  // 初回マウント時に一覧取得
  useEffect(() => {
    fetchUsers();
  }, []);

  // 管理者の新規登録
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:4000/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "登録に失敗しました");
      }

      setUsername("");
      setPassword("");
      await fetchUsers(); // 登録後に再取得
      setSuccess("登録が完了しました！");
    } catch (err) {
      setError(err.message);
    }
  };

  // 削除
  const handleDelete = async (id) => {
    const confirmed = window.confirm("本当に削除しますか？");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        await fetchUsers(); // 削除後に再取得
      } else {
        const err = await res.json();
        alert(`削除エラー: ${err.message}`);
      }
    } catch (err) {
      console.error("削除エラー:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">管理者一覧</h2>

      <ul className="space-y-2 mb-6">
        {users.map((user) => (
          <li key={user.id} className="border p-2 rounded bg-gray-100">
            <span>
              {user.id}. {user.username}
            </span>
            <button
              onClick={() => handleDelete(user.id)}
              className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded ml-4 float-right"
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">新規管理者を追加</h3>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="ユーザー名"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          登録する
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>
    </div>
  );
};

export default AdminUserList;
