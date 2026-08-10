import { KaranaInfo } from '../types';
export declare const KARANA_NAMES: {
    marathi: string;
    english: string;
    isBhadra: boolean;
}[];
export declare function calculateKaranaInfo(year: number, month: number, day: number, tzOffsetHours: number): KaranaInfo;
