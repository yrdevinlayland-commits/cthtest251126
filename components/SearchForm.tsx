import React from 'react';
import { ProcessedStudent, WORK_DAYS } from '../types';

interface SearchFormProps {
    classes: string[];
    selectedClass: string;
    onClassChange: (cls: string) => void;
    studentsInClass: ProcessedStudent[];
    selectedStudentId: string;
    onStudentChange: (id: string) => void;
    selectedDay: string;
    onDayChange: (day: string) => void;
    onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
    classes,
    selectedClass,
    onClassChange,
    studentsInClass,
    selectedStudentId,
    onStudentChange,
    selectedDay,
    onDayChange,
    onSearch
}) => {
    
    // Check if the search button should be enabled
    const isSearchDisabled = !selectedClass || !selectedStudentId;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Class Select */}
                <div>
                    <label htmlFor="classSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        選擇班別
                    </label>
                    <select
                        id="classSelect"
                        value={selectedClass}
                        onChange={(e) => onClassChange(e.target.value)}
                        className="w-full px-4 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow"
                    >
                        <option value="">請選擇班別</option>
                        {classes.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                </div>

                {/* Student Select */}
                <div>
                    <label htmlFor="studentSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        選擇學號
                    </label>
                    <select
                        id="studentSelect"
                        value={selectedStudentId}
                        onChange={(e) => onStudentChange(e.target.value)}
                        disabled={!selectedClass}
                        className="w-full px-4 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-shadow"
                    >
                        <option value="">{selectedClass ? '請選擇學號' : '請先選擇班別'}</option>
                        {studentsInClass.map(student => (
                            <option key={student.studentId} value={student.studentId}>
                                {student.studentId} - {student.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Day Select */}
                <div>
                    <label htmlFor="daySelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        選擇星期
                    </label>
                    <select
                        id="daySelect"
                        value={selectedDay}
                        onChange={(e) => onDayChange(e.target.value)}
                        className="w-full px-4 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-shadow"
                    >
                        {WORK_DAYS.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <button
                        id="searchBtn"
                        onClick={onSearch}
                        disabled={isSearchDisabled}
                        className={`w-full px-6 py-2 font-medium rounded-lg transition-all duration-200 
                            ${isSearchDisabled 
                                ? 'bg-gray-400 cursor-not-allowed opacity-50 text-gray-100' 
                                : 'bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg transform active:scale-95'
                            }`}
                    >
                        查詢活動
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;