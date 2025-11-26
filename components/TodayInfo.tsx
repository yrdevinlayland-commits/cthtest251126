import React, { useEffect, useState } from 'react';
import { getFormattedDate } from '../utils';

const TodayInfo: React.FC = () => {
    const [info, setInfo] = useState({ dateString: '', dayName: '' });

    useEffect(() => {
        setInfo(getFormattedDate());
    }, []);

    return (
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-4 mb-6 rounded shadow-sm">
            <p className="text-blue-700 dark:text-blue-200 font-medium">
                今天是 {info.dateString} ({info.dayName})
            </p>
        </div>
    );
};

export default TodayInfo;