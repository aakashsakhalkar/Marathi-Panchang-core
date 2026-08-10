export interface PlanetaryPositions {
    sunSayanaDeg: number;
    sunNirayanaDeg: number;
    moonSayanaDeg: number;
    moonNirayanaDeg: number;
    ayanamshaDeg: number;
}
/**
 * High-precision calculation of Solar Sayana Longitude (Meeus Ch. 25)
 */
export declare function getSunSayanaLongitude(julianDay: number): number;
/**
 * High-precision calculation of Lunar Sayana Longitude (Meeus Ch. 47 truncated series)
 */
export declare function getMoonSayanaLongitude(julianDay: number): number;
/**
 * Returns complete Planetary Positions (Sayana and Lahiri Nirayana)
 */
export declare function getPlanetaryPositions(julianDay: number): PlanetaryPositions;
