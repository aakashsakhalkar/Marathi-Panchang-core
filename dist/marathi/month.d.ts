import { MarathiMonthInfo } from '../types';
export declare const MARATHI_MONTHS: {
    marathi: string;
    english: string;
}[];
/**
 * Calculates Marathi Month under Amanta system (Month starts at Amavasya, ends on next Amavasya)
 * The month name is strictly determined by the Sun's Nirayana Rashi at the preceding Amavasya.
 */
export declare function calculateMarathiMonth(year: number, month: number, day: number, tzOffsetHours: number): MarathiMonthInfo;
