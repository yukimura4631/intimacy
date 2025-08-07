import React, { useEffect, useState } from 'react';

const UserNews = () => {
  const [news, setNews] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/news`, {credentials: 'include'
        });
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error('お知らせ取得エラー:', err);
      }
    };

    fetchNews();
  }, []);

    return (
        <div className="p-6 bg-white rounded shadow max-h-96 overflow-y-auto">
            <ul className="space-y-4">
            {news.map((item) => (
                <li
                    key={item.id}
                    className="cursor-pointer border-b pb-4 flex gap-4 items-start"
                    onClick={() => setSelected(item)}
                >
                    {/* 左側（テキスト） */}
                    <div className="flex-1">
                        <p className="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                        </p>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{item.content}</p>
                    </div>

                    {/* 右側（画像） */}
                    {item.image_url && (
                        <img
                            src={item.image_url}
                            alt="お知らせサムネイル"
                            className="max-w-xs object-cover rounded"
                        />
                    )}
                </li>
            ))}
            </ul>

        {/* モーダル */}
            {selected && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-11/12 max-w-md shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setSelected(null)}
                >
                    ✕
                </button>
                <p className="text-sm text-gray-500">
                    {new Date(selected.created_at).toLocaleDateString()}
                </p>
                <h3 className="text-lg font-bold mb-2">{selected.title}</h3>
                {/* 画像表示 */}
                {selected.image_url && (
                    <img
                    src={selected.image_url}
                    alt="お知らせ画像"
                    className="w-full h-full object-contain mb-4 rounded"
                    />
                )}
                <p className="text-gray-700 whitespace-pre-line">{selected.content}</p>
                </div>
            </div>
            )}
        </div>
    );
};

export default UserNews;
