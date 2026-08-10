import { MarathiMonthInfo } from '../types';
export declare const MARATHI_MONTHS: {
    marathi: string;
    english: string;
}[];
/**
 * Calculates Marathi Month under Amanta system (Month ends on Amavasya)
 */
export declare function calculateMarathiMonth(year: number, month: number, day: number, tzOffsetHours: number): MarathiMonthInfo;
