// src/pages/AdminNews.js
import React, { useState } from 'react';
import NewsForm from '../../components/admin/NewsForm.js';
import NewsList from '../../components/admin/NewsList.js';

const AdminNews = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [editItem, setEditItem] = useState(null);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-6">管理者：お知らせ管理</h1>
            <NewsForm 
            onSubmitted={handleRefresh}
            editItem={editItem} clearEdit={() => setEditItem(null)}/>
            <NewsList
            refreshKey={refreshKey}
            onDelete={handleRefresh}
            onEdit={(item) => setEditItem(item)} // ← これが無いと編集できない！
            />
        </div>
    );
};

export default AdminNews;
