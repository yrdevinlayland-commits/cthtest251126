import React from 'react';

const Header: React.FC = () => {
    return (
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                課後活動查詢系統
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
                請選擇班別、學號和星期查詢您的課後活動安排
            </p>
        </div>
    );
};

export default Header;