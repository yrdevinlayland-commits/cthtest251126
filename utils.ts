import { ProcessedStudent, ActivityDetail, DAYS_OF_WEEK } from './types';

export const processRawData = (rawData: string[][]): ProcessedStudent[] => {
    const studentMap: Record<string, ProcessedStudent> = {};

    rawData.forEach(parts => {
        const [className, studentId, name, activityName, activityDays, time, teacher, location] = parts;
        const key = `${className}_${studentId}`;

        if (!studentMap[key]) {
            studentMap[key] = {
                className,
                studentId,
                name,
                activities: {}
            };
        }

        // Check if there is actual activity data
        if (!activityDays) return;

        const activityDetail: ActivityDetail = {
            name: activityName || '',
            time: time || '',
            teacher: teacher || '',
            location: location || ''
        };

        // Handle multi-day activities separated by '＆'
        const days = (activityDays || '').split('＆').map(d => d.trim());

        days.forEach(day => {
            // Only process valid days
            if (DAYS_OF_WEEK.includes(day as any)) {
                if (!studentMap[key].activities[day]) {
                    studentMap[key].activities[day] = [];
                }
                studentMap[key].activities[day].push(activityDetail);
            }
        });
    });

    // Convert map to array and sort
    return Object.values(studentMap).sort((a, b) => {
        // Sort by class first
        const numA = parseInt(a.className.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.className.match(/\d+/)?.[0] || '0');
        if (numA !== numB) return numA - numB;

        const charA = a.className.match(/[A-Z]/)?.[0] || '';
        const charB = b.className.match(/[A-Z]/)?.[0] || '';
        const classCompare = charA.localeCompare(charB);
        if (classCompare !== 0) return classCompare;

        // Then by student ID
        return parseInt(a.studentId) - parseInt(b.studentId);
    });
};

export const getUniqueClasses = (students: ProcessedStudent[]): string[] => {
    return Array.from(new Set(students.map(s => s.className))).sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        if (numA !== numB) return numA - numB;
        
        const charA = a.match(/[A-Z]/)?.[0] || '';
        const charB = b.match(/[A-Z]/)?.[0] || '';
        return charA.localeCompare(charB);
    });
};

export const getFormattedDate = (): { dateString: string; dayName: string } => {
    const today = new Date();
    const dayName = DAYS_OF_WEEK[today.getDay()];
    const dateString = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    return { dateString, dayName };
};

export const getDefaultDay = (): string => {
    const todayIndex = new Date().getDay();
    const dayName = DAYS_OF_WEEK[todayIndex];
    
    // If it's Sunday (0), default to Monday. Otherwise use today.
    if (todayIndex === 0) return '星期一';
    return dayName;
};