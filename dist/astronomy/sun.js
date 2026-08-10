"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSunTimes = calculateSunTimes;
function toRad(deg) {
    return (deg * Math.PI) / 180.0;
}
function toDeg(rad) {
    return (rad * 180.0) / Math.PI;
}
function formatTimeString(date, offsetHours) {
    // Convert UTC date to local target timezone
    const localTimeMs = date.getTime() + offsetHours * 3600 * 1000;
    const localDate = new Date(localTimeMs);
    const hours = localDate.getUTCHours().toString().padStart(2, '0');
    const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');
    const seconds = localDate.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
/**
 * Calculates Sunrise, Sunset, Solar Noon, and Day Length for a given location and date
 */
function calculateSunTimes(year, month, day, latitude, longitude, tzOffsetHours) {
    // Zenith for standard sunrise/sunset considering refraction (90° 50' = 90.8333°)
    const zenith = 90.8333;
    const latRad = toRad(latitude);
    // Day of year
    const N1 = Math.floor((275 * month) / 9);
    const N2 = Math.floor((month + 9) / 12);
    const N3 = 1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3);
    const N = N1 - N2 * N3 + day - 30;
    // Approximate sunrise & sunset time in days
    const lngHour = longitude / 15.0;
    const tSunrise = N + (6.0 - lngHour) / 24.0;
    const tSunset = N + (18.0 - lngHour) / 24.0;
    // Sun's mean anomaly
    const M_sunrise = 0.9856 * tSunrise - 3.289;
    const M_sunset = 0.9856 * tSunset - 3.289;
    // True longitude of Sun
    const L_sunrise = (M_sunrise + 1.916 * Math.sin(toRad(M_sunrise)) + 0.020 * Math.sin(toRad(2 * M_sunrise)) + 282.634) % 360;
    const L_sunset = (M_sunset + 1.916 * Math.sin(toRad(M_sunset)) + 0.020 * Math.sin(toRad(2 * M_sunset)) + 282.634) % 360;
    // Right ascension of Sun
    let RA_sunrise = toDeg(Math.atan(0.91764 * Math.tan(toRad(L_sunrise)))) % 360;
    let RA_sunset = toDeg(Math.atan(0.91764 * Math.tan(toRad(L_sunset)))) % 360;
    // RA quadrant adjustment
    const Lquad_sunrise = Math.floor(L_sunrise / 90.0) * 90.0;
    const RAquad_sunrise = Math.floor(RA_sunrise / 90.0) * 90.0;
    RA_sunrise = (RA_sunrise + (Lquad_sunrise - RAquad_sunrise)) / 15.0;
    const Lquad_sunset = Math.floor(L_sunset / 90.0) * 90.0;
    const RAquad_sunset = Math.floor(RA_sunset / 90.0) * 90.0;
    RA_sunset = (RA_sunset + (Lquad_sunset - RAquad_sunset)) / 15.0;
    // Sun's declination
    const sinDec_sunrise = 0.39782 * Math.sin(toRad(L_sunrise));
    const cosDec_sunrise = Math.cos(Math.asin(sinDec_sunrise));
    const sinDec_sunset = 0.39782 * Math.sin(toRad(L_sunset));
    const cosDec_sunset = Math.cos(Math.asin(sinDec_sunset));
    // Sun's local hour angle
    const cosH_sunrise = (Math.cos(toRad(zenith)) - sinDec_sunrise * Math.sin(latRad)) / (cosDec_sunrise * Math.cos(latRad));
    const cosH_sunset = (Math.cos(toRad(zenith)) - sinDec_sunset * Math.sin(latRad)) / (cosDec_sunset * Math.cos(latRad));
    // Clamped if polar day/night
    const clampedCosH_sunrise = Math.max(-1, Math.min(1, cosH_sunrise));
    const clampedCosH_sunset = Math.max(-1, Math.min(1, cosH_sunset));
    const H_sunrise = (360.0 - toDeg(Math.acos(clampedCosH_sunrise))) / 15.0;
    const H_sunset = toDeg(Math.acos(clampedCosH_sunset)) / 15.0;
    // Local mean time of sunrise/sunset
    const T_sunrise = H_sunrise + RA_sunrise - 0.06571 * tSunrise - 6.622;
    const T_sunset = H_sunset + RA_sunset - 0.06571 * tSunset - 6.622;
    // Convert to UTC hours
    let UT_sunrise = (T_sunrise - lngHour) % 24;
    if (UT_sunrise < 0)
        UT_sunrise += 24;
    let UT_sunset = (T_sunset - lngHour) % 24;
    if (UT_sunset < 0)
        UT_sunset += 24;
    let UT_noon = (UT_sunrise + UT_sunset) / 2.0;
    // Create Date objects in UTC
    const sunriseDate = new Date(Date.UTC(year, month - 1, day, Math.floor(UT_sunrise), Math.floor((UT_sunrise % 1) * 60), Math.floor((((UT_sunrise % 1) * 60) % 1) * 60)));
    const sunsetDate = new Date(Date.UTC(year, month - 1, day, Math.floor(UT_sunset), Math.floor((UT_sunset % 1) * 60), Math.floor((((UT_sunset % 1) * 60) % 1) * 60)));
    const solarNoonDate = new Date(Date.UTC(year, month - 1, day, Math.floor(UT_noon), Math.floor((UT_noon % 1) * 60), Math.floor((((UT_noon % 1) * 60) % 1) * 60)));
    const dayLengthMs = sunsetDate.getTime() - sunriseDate.getTime();
    const dayLengthMins = Math.floor(dayLengthMs / (1000 * 60));
    const dlHours = Math.floor(dayLengthMins / 60);
    const dlMins = dayLengthMins % 60;
    return {
        sunriseStr: formatTimeString(sunriseDate, tzOffsetHours),
        sunsetStr: formatTimeString(sunsetDate, tzOffsetHours),
        solarNoonStr: formatTimeString(solarNoonDate, tzOffsetHours),
        dayLengthStr: `${dlHours} hrs ${dlMins} mins`,
        sunriseDate,
        sunsetDate,
        solarNoonDate,
    };
}
