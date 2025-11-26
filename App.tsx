import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import TodayInfo from './components/TodayInfo';
import StudentInfo from './components/StudentInfo';
import ActivityCard from './components/ActivityCard';
import { RAW_ACTIVITY_DATA } from './constants';
import { processRawData, getUniqueClasses, getDefaultDay } from './utils';
import { ProcessedStudent } from './types';

function App() {
    // Data State
    const [allStudents, setAllStudents] = useState<ProcessedStudent[]>([]);
    
    // Selection State
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedStudentId, setSelectedStudentId] = useState<string>('');
    const [selectedDay, setSelectedDay] = useState<string>(getDefaultDay());

    // Search Result State
    const [searchResult, setSearchResult] = useState<{ student: ProcessedStudent | null; hasSearched: boolean }>({ 
        student: null, 
        hasSearched: false 
    });

    // Dark Mode Initialization
    useEffect(() => {
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        }
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Load Data
    useEffect(() => {
        const data = processRawData(RAW_ACTIVITY_DATA);
        setAllStudents(data);
    }, []);

    // Derived State
    const classes = useMemo(() => getUniqueClasses(allStudents), [allStudents]);
    
    const studentsInClass = useMemo(() => {
        if (!selectedClass) return [];
        return allStudents.filter(s => s.className === selectedClass);
    }, [allStudents, selectedClass]);

    // Handlers
    const handleClassChange = useCallback((cls: string) => {
        setSelectedClass(cls);
        setSelectedStudentId(''); // Reset student when class changes
        setSearchResult({ student: null, hasSearched: false }); // Clear results
    }, []);

    const handleStudentChange = useCallback((id: string) => {
        setSelectedStudentId(id);
        setSearchResult({ student: null, hasSearched: false }); // Clear results
    }, []);

    const handleDayChange = useCallback((day: string) => {
        setSelectedDay(day);
        setSearchResult({ student: null, hasSearched: false }); // Clear results
    }, []);

    const handleSearch = useCallback(() => {
        const student = studentsInClass.find(s => s.studentId === selectedStudentId);
        if (student) {
            setSearchResult({ student, hasSearched: true });
        }
    }, [studentsInClass, selectedStudentId]);

    // Pre-select first class if available and not selected (Optional, but mimics original JS somewhat)
    useEffect(() => {
        if (classes.length > 0 && !selectedClass) {
            // Uncomment if you want to auto-select the first class on load
            // setSelectedClass(classes[0]);
        }
    }, [classes, selectedClass]);

    const currentActivities = searchResult.student?.activities[selectedDay] || [];

    return (
        <div className="container mx-auto max-w-4xl py-8 px-4">
            <Header />
            
            <SearchForm 
                classes={classes}
                selectedClass={selectedClass}
                onClassChange={handleClassChange}
                studentsInClass={studentsInClass}
                selectedStudentId={selectedStudentId}
                onStudentChange={handleStudentChange}
                selectedDay={selectedDay}
                onDayChange={handleDayChange}
                onSearch={handleSearch}
            />

            <TodayInfo />

            {/* Results Section */}
            {searchResult.hasSearched && searchResult.student && (
                <div id="resultsContainer" className="animate-fade-in">
                    <StudentInfo 
                        student={searchResult.student} 
                        searchDay={selectedDay} 
                    />

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">
                            課後活動安排
                        </h2>
                        
                        <div className="space-y-4">
                            {currentActivities.length > 0 ? (
                                currentActivities.map((activity, index) => (
                                    <ActivityCard key={`${activity.name}-${index}`} activity={activity} />
                                ))
                            ) : (
                                <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-400 p-4 rounded">
                                    <p className="text-yellow-700 dark:text-yellow-200 font-semibold">
                                        該學生在選定的日期沒有課後活動安排。
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;