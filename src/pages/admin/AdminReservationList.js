// src/pages/AdminReservationList.js
import React, { useEffect, useState } from "react";

const AdminReservationList = () => {
const [reservations, setReservations] = useState([]);
const [loading, setLoading] = useState(true);
const [editingReservation, setEditingReservation] = useState(null);
const [editForm, setEditForm] = useState({});

  // 予約一覧の取得関数を分ける
const fetchReservations = () => {
  fetch(`${process.env.REACT_APP_API_URL}/api/reservations`, {
    method: "GET",
    credentials: "include"
  })
    .then((res) => res.json())
    .then((data) => {
      setReservations(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("エラー:", error);
      setLoading(false);
    });
};

useEffect(() => {
    fetchReservations();
}, []);

const handleEditClick = (rsv) => {
    setEditForm({
        menu: rsv.menu,
        date: rsv.date,
        time: rsv.time,
        therapist: rsv.therapist,
        customerName: rsv.customer_name,
        phoneNumber: rsv.phone_number,
        note: rsv.note,
        });
    console.log("編集対象のrsv:", rsv);
    setEditingReservation(Number(rsv.id)); // 明示的にnumberに変換
     // 明示的に date を整形（rsv.dateがnullじゃない前提）
    const formattedDate = rsv.date
        ? new Date(rsv.date).toISOString().split("T")[0]
        : "";
    setEditForm({
        ...rsv,
        date: formattedDate, 
    });
};

const handleChange = (e) => {
const { name, value } = e.target;
console.log("入力変更:", name, value);
    setEditForm((prev) => ({ ...prev, [name]: value }));
};

const handleUpdate = async () => {
    try {
        console.log("送信データ:", editForm);
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/api/reservations/${editingReservation}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(editForm),
            }
        );
        const data = await res.json();
        console.log("更新結果:", data);

        setReservations((prev) => {
            const updated = prev.map((r) =>
                r.id === editingReservation ? { ...r, ...editForm } : r
            );
            console.log("更新された予約一覧:", updated);
            return updated;
        });

        await fetchReservations(); // 保存後に最新データ取得

        setEditingReservation(null);
        alert("予約内容を更新しました！");
    } catch (err) {
        console.error("更新失敗:", err);
        alert("更新に失敗しました。");
    }
};

const handleDelete = async (id) => {
    if (!window.confirm("この予約を本当に削除しますか？")) return;

    try {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/api/reservations/${id}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );
        
        if (!res.ok) throw new Error("削除失敗");
        console.log('レスポンスステータス:', res.status);


        setReservations((prev) => prev.filter((r) => r.id !== id));
        alert("予約を削除しました！");
        } catch (err) {
        console.error("削除エラー:", err);
        alert("削除に失敗しました。");
    }
};

if (loading) return <p>読み込み中です...</p>;

return (
    <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">予約一覧</h2>

        {reservations.length === 0 ? (
        <p className="text-gray-500">現在、予約はありません。</p>
        ) : (
        <ul className="space-y-4">
            {reservations.map((rsv) => (
            <li key={rsv.id} className="p-4 border rounded shadow">
                {editingReservation === rsv.id ? (
                <div className="space-y-2">
                    <label className="block text-sm font-semibold">
                    メニュー
                    </label>
                    <input
                    type="text"
                    name="menu"
                    value={editForm.menu || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                    />

                    <label className="block text-sm font-semibold">日付</label>
                    <input
                    type="date"
                    name="date"
                    value={
                        editForm.date
                        ? new Date(editForm.date).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                    />

                    <label className="block text-sm font-semibold">時間</label>
                    <input
                    type="time"
                    name="time"
                    value={editForm.time || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                    />

                    <label className="block text-sm font-semibold">
                    セラピスト
                    </label>
                    <input
                    type="text"
                    name="therapist"
                    value={editForm.therapist || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                    />

                    <label className="block text-sm font-semibold">
                    お客様名
                    </label>
                    <input
                    type="text"
                    name="customerName"
                    value={editForm.customerName || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                    />

                    <label className="block text-sm font-semibold">
                    電話番号
                    </label>
                    <input
                    type="text"
                    name="phoneNumber"
                    value={editForm.phoneNumber || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                    />

                    <label className="block text-sm font-semibold">備考</label>
                    <textarea
                    name="note"
                    value={editForm.note || ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                    />

                    <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-2">
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                            保存
                            </button>
                            <button
                                onClick={() => setEditingReservation(null)}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                            >
                            キャンセル
                            </button>
                        </div>
                        <button
                            onClick={() => handleDelete(rsv.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                        削除
                        </button>
                    </div>
                </div>
                ) : (
                <div>
                    <p>
                    <strong>メニュー：</strong> {rsv.menu}
                    </p>
                    <p>
                    <strong>日時：</strong> {rsv.date} {rsv.time}
                    </p>
                    <p>
                    <strong>セラピスト：</strong> {rsv.therapist}
                    </p>
                    <p>
                    <strong>お客様：</strong> {rsv.customerName}
                    </p>
                    <p>
                    <strong>電話番号：</strong> {rsv.phoneNumber}
                    </p>
                    <p>
                    <strong>備考：</strong> {rsv.note || "なし"}
                    </p>
                    <div className="flex justify-between mt-2">
                        <button
                            onClick={() => handleEditClick(rsv)}
                            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                        編集
                        </button>
                        <button
                            onClick={() => handleDelete(rsv.id)}
                            className="mt-2 ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                        削除
                        </button>
                    </div>
                </div>
                )}
            </li>
            ))}
        </ul>
        )}
    </div>
);
};

export default AdminReservationList;
