"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSunSayanaLongitude = getSunSayanaLongitude;
exports.getMoonSayanaLongitude = getMoonSayanaLongitude;
exports.getPlanetaryPositions = getPlanetaryPositions;
const ayanamsha_1 = require("./ayanamsha");
function toRad(deg) {
    return (deg * Math.PI) / 180.0;
}
function toDeg(rad) {
    return (rad * 180.0) / Math.PI;
}
function normalizeDeg(deg) {
    let result = deg % 360.0;
    if (result < 0)
        result += 360.0;
    return result;
}
/**
 * High-precision calculation of Solar Sayana Longitude (Meeus Ch. 25)
 */
function getSunSayanaLongitude(julianDay) {
    const T = (0, ayanamsha_1.getJulianCenturies)(julianDay);
    // Geometric mean longitude of the Sun
    const L0 = normalizeDeg(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
    // Mean anomaly of the Sun
    const M = normalizeDeg(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
    const Mrad = toRad(M);
    // Sun's Equation of Center
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
        + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
        + 0.000289 * Math.sin(3 * Mrad);
    // True Longitude
    const sunTrueLong = L0 + C;
    return normalizeDeg(sunTrueLong);
}
/**
 * High-precision calculation of Lunar Sayana Longitude (Meeus Ch. 47 truncated series)
 */
function getMoonSayanaLongitude(julianDay) {
    const T = (0, ayanamsha_1.getJulianCenturies)(julianDay);
    // Moon mean longitude
    const L_prime = normalizeDeg(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T);
    // Moon mean elongation
    const D = normalizeDeg(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T);
    // Sun mean anomaly
    const M = normalizeDeg(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T);
    // Moon mean anomaly
    const M_prime = normalizeDeg(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T);
    // Moon distance from ascending node (argument of latitude)
    const F = normalizeDeg(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T);
    // Periodic terms (degrees)
    const Drad = toRad(D);
    const Mrad = toRad(M);
    const M_primeRad = toRad(M_prime);
    const Frad = toRad(F);
    const periodicSum = +6.288774 * Math.sin(M_primeRad)
        + 1.274027 * Math.sin(2 * Drad - M_primeRad)
        + 0.658314 * Math.sin(2 * Drad)
        + 0.213618 * Math.sin(2 * M_primeRad)
        - 0.185116 * Math.sin(Mrad)
        - 0.114332 * Math.sin(2 * Frad)
        + 0.058793 * Math.sin(2 * Drad - 2 * M_primeRad)
        + 0.057066 * Math.sin(2 * Drad - Mrad - M_primeRad)
        + 0.053322 * Math.sin(2 * Drad + M_primeRad)
        + 0.045758 * Math.sin(2 * Drad - Mrad)
        - 0.040923 * Math.sin(Mrad - M_primeRad)
        - 0.034720 * Math.sin(Drad)
        - 0.030383 * Math.sin(Mrad + M_primeRad)
        + 0.015327 * Math.sin(2 * Drad - 2 * Frad)
        - 0.012528 * Math.sin(M_primeRad + 2 * Frad)
        + 0.010980 * Math.sin(M_primeRad - 2 * Frad);
    return normalizeDeg(L_prime + periodicSum);
}
/**
 * Returns complete Planetary Positions (Sayana and Lahiri Nirayana)
 */
function getPlanetaryPositions(julianDay) {
    const ayanamshaDeg = (0, ayanamsha_1.getLahiriAyanamsha)(julianDay);
    const sunSayanaDeg = getSunSayanaLongitude(julianDay);
    const moonSayanaDeg = getMoonSayanaLongitude(julianDay);
    const sunNirayanaDeg = normalizeDeg(sunSayanaDeg - ayanamshaDeg);
    const moonNirayanaDeg = normalizeDeg(moonSayanaDeg - ayanamshaDeg);
    return {
        sunSayanaDeg,
        sunNirayanaDeg,
        moonSayanaDeg,
        moonNirayanaDeg,
        ayanamshaDeg,
    };
}
