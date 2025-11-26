import React from 'react';
import { ActivityDetail } from '../types';

interface ActivityCardProps {
    activity: ActivityDetail;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    return (
        <div className="group bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
            <p className="text-green-800 dark:text-green-100 font-bold text-lg mb-2">
                {activity.name}
            </p>
            <div className="text-sm text-green-700 dark:text-green-300 space-y-1 md:space-y-0 md:flex md:flex-wrap md:gap-x-4">
                <span className="flex items-center">
                   <svg className="w-4 h-4 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <strong>時間:</strong>&nbsp;{activity.time}
                </span>
                <span className="hidden md:inline text-green-400">|</span>
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <strong>老師:</strong>&nbsp;{activity.teacher}
                </span>
                <span className="hidden md:inline text-green-400">|</span>
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <strong>場地:</strong>&nbsp;{activity.location}
                </span>
            </div>
        </div>
    );
};

export default ActivityCard;