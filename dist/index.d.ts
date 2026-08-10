import { CompleteMarathiPanchang, GeoLocation } from './types';
export * from './types';
export declare const DEFAULT_LOCATION: GeoLocation;
/**
 * Main API function to get complete, ultra-accurate Marathi Panchang for any date and location
 *
 * @param date Target date object or YYYY-MM-DD string
 * @param location GeoLocation parameters (defaults to Maharashtra IST)
 */
export declare function getMarathiPanchang(date?: Date | string, location?: GeoLocation): CompleteMarathiPanchang;
