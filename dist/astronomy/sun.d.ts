export interface SunTimes {
    sunrise: Date;
    sunset: Date;
    solarNoon: Date;
    dayLengthMinutes: number;
}
/**
 * Calculates Sunrise, Sunset, Solar Noon, and Day Length for a given location and date
 */
export declare function calculateSunTimes(year: number, month: number, day: number, latitude: number, longitude: number, tzOffsetHours: number): {
    sunriseStr: string;
    sunsetStr: string;
    solarNoonStr: string;
    dayLengthStr: string;
    sunriseDate: Date;
    sunsetDate: Date;
    solarNoonDate: Date;
};
