export interface RawActivityData {
    className: string;
    studentId: string;
    studentName: string;
    activityName: string;
    days: string;
    time: string;
    teacher: string;
    location: string;
}

export interface ActivityDetail {
    name: string;
    time: string;
    teacher: string;
    location: string;
}

export interface ProcessedStudent {
    className: string;
    studentId: string;
    name: string;
    // Map of Day string (e.g., "星期一") to list of activities
    activities: Record<string, ActivityDetail[]>;
}

export type DayOfWeek = '星期一' | '星期二' | '星期三' | '星期四' | '星期五' | '星期六' | '星期日';

export const DAYS_OF_WEEK: DayOfWeek[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
export const WORK_DAYS: DayOfWeek[] = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];