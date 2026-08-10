import { NakshatraInfo } from '../types';
export declare const NAKSHATRA_DATA: {
    marathi: string;
    english: string;
    lordMarathi: string;
    lordEnglish: string;
}[];
export declare function calculateNakshatraInfo(year: number, month: number, day: number, sunriseUTCHours: number, tzOffsetHours: number): NakshatraInfo;
