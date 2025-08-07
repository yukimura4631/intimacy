// src/admin/NewsList.js
import React, { useEffect, useState } from 'react';

const NewsList = ({refreshKey, onDelete, onEdit}) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/news')
      .then(res => res.json())
      .then(data => {
        console.log('取得したお知らせ一覧:', data);
        setNews(data);})
      .catch(err => console.error('取得エラー:', err));
  }, [refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm('本当に削除しますか？')) return;
    try {
      const res = await fetch(`http://localhost:4000/api/news/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        onDelete(); // 削除後にリストをリフレッシュ
      } else {
        alert('削除に失敗しました');
      }
    } catch (err) {
      console.error('削除エラー:', err);
    }
  };
  const handleEdit = (item) => {
    onEdit(item); // ← これが大事！
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">お知らせ一覧</h2>
      <ul className="space-y-4">
        {news.map(item => (
          <li key={item.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-700">{item.content}</p>

            {/* ⭐ 画像がある場合だけ表示する */}
              {item.image_path && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="mt-2 max-w-xs rounded"
                />
              )}


            <p className="text-xs text-gray-500 mt-2">
              投稿日: {new Date(item.created_at).toLocaleString()}
            </p>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 space-x-2 mr-2 text-sm"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default NewsList;
