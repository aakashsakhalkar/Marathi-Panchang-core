import { TithiInfo } from '../types';
export declare const TITHI_NAMES: {
    marathi: string;
    english: string;
}[];
export declare function calculateTithiForJD(julianDay: number): {
    index: number;
    nameMarathi: string;
    nameEnglish: string;
    pakshaMarathi: string;
    pakshaEnglish: 'Shukla' | 'Krishna';
};
/**
 * Calculates complete Tithi information including Udayatithi and transition times
 */
export declare function calculateTithiInfo(year: number, month: number, day: number, sunriseUTCHours: number, tzOffsetHours: number): TithiInfo;
