import React from 'react';
import { ProcessedStudent } from '../types';

interface StudentInfoProps {
    student: ProcessedStudent;
    searchDay: string;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ student, searchDay }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 border border-gray-100 dark:border-gray-700 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">
                查詢學生資訊
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <p className="text-gray-600 dark:text-gray-400 mb-1">姓名</p>
                    <p className="font-semibold text-gray-800 dark:text-white text-lg">{student.name}</p>
                </div>
                <div className="p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <p className="text-gray-600 dark:text-gray-400 mb-1">班別</p>
                    <p className="font-semibold text-gray-800 dark:text-white text-lg">{student.className}</p>
                </div>
                <div className="p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <p className="text-gray-600 dark:text-gray-400 mb-1">學號</p>
                    <p className="font-semibold text-gray-800 dark:text-white text-lg">{student.studentId}</p>
                </div>
                <div className="p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <p className="text-gray-600 dark:text-gray-400 mb-1">查詢日期</p>
                    <p className="font-semibold text-blue-600 dark:text-blue-400 text-lg">{searchDay}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;