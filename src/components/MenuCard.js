// src/components/MenuCard.js
import React from "react";

const MenuCard = ({ title, description, image }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 duration-300">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
        </div>
    );
};

export default MenuCard;
