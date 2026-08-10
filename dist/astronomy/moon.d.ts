export interface MoonTimes {
    moonriseStr: string;
    moonsetStr: string;
    moonRashiMarathi: string;
    moonRashiEnglish: string;
}
export declare function getMoonRashi(moonNirayanaDeg: number): {
    marathi: string;
    english: string;
    index: number;
};
/**
 * Calculates Moonrise and Moonset for given location and date
 */
export declare function calculateMoonTimes(year: number, month: number, day: number, latitude: number, longitude: number, tzOffsetHours: number): MoonTimes;
