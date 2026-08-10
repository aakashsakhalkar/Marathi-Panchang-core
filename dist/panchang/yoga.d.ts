import { YogaInfo } from '../types';
export declare const YOGA_DATA: {
    marathi: string;
    english: string;
    isAuspicious: boolean;
}[];
export declare function calculateYogaInfo(year: number, month: number, day: number, tzOffsetHours: number): YogaInfo;
