import React, { useState, useEffect } from 'react';

const NewsForm = ({ onSubmitted, editItem, clearEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || '');
      setContent(editItem.content || '');
      setImage(null); // 編集時の画像は再アップを要求
    } else {
      setTitle('');
      setContent('');
      setImage(null);
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    const isEditing = !!editItem;
    const url = isEditing
      ? `http://localhost:4000/api/news/${editItem.id}`
      : 'http://localhost:4000/api/news';

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`送信失敗: ${res.status} ${errText}`);
      }

      const result = await res.json();
      onSubmitted(result);

      // フォーム初期化
      setTitle('');
      setContent('');
      setImage(null);
      clearEdit?.();
    } catch (err) {
      console.error('送信エラー:', err);
      alert('送信に失敗しました。内容をご確認ください。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label className="block font-semibold mb-1">タイトル</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">内容</label>
        <textarea
          className="w-full border rounded p-2"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">画像（任意）</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setImage(e.target.files[0]);
            } else {
              setImage(null);
            }
          }}
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded hover:brightness-110 ${
            editItem
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {editItem ? '更新する' : '登録する'}
        </button>
        {editItem && (
          <button
            type="button"
            onClick={clearEdit}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
};

export default NewsForm;
