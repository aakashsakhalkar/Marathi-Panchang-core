"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LOCATION = void 0;
exports.getMarathiPanchang = getMarathiPanchang;
const sun_1 = require("./astronomy/sun");
const moon_1 = require("./astronomy/moon");
const ayanamsha_1 = require("./astronomy/ayanamsha");
const ephemeris_1 = require("./astronomy/ephemeris");
const tithi_1 = require("./panchang/tithi");
const nakshatra_1 = require("./panchang/nakshatra");
const yoga_1 = require("./panchang/yoga");
const karana_1 = require("./panchang/karana");
const vara_1 = require("./panchang/vara");
const month_1 = require("./marathi/month");
const samvat_1 = require("./marathi/samvat");
const muhurta_1 = require("./marathi/muhurta");
const festivals_1 = require("./marathi/festivals");
__exportStar(require("./types"), exports);
// Default Maharashtra City Coordinates (Pune/Mumbai default)
exports.DEFAULT_LOCATION = {
    latitude: 18.5204, // Pune Latitude
    longitude: 73.8567, // Pune Longitude
    timezoneOffsetHours: 5.5, // IST UTC+05:30
    cityName: 'पुणे / मुंबई (Maharashtra)',
};
/**
 * Main API function to get complete, ultra-accurate Marathi Panchang for any date and location
 *
 * @param date Target date object or YYYY-MM-DD string
 * @param location GeoLocation parameters (defaults to Maharashtra IST)
 */
function getMarathiPanchang(date = new Date(), location = exports.DEFAULT_LOCATION) {
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();
    // 1. Calculate Sunrise & Sunset
    const sunTimes = (0, sun_1.calculateSunTimes)(year, month, day, location.latitude, location.longitude, location.timezoneOffsetHours);
    const sunriseUTCHours = sunTimes.sunriseDate.getUTCHours() + sunTimes.sunriseDate.getUTCMinutes() / 60.0;
    // 2. Calculate Moon Times & Rashi
    const moonTimes = (0, moon_1.calculateMoonTimes)(year, month, day, location.latitude, location.longitude, location.timezoneOffsetHours);
    // 3. Calculate Panchang Elements
    const vara = (0, vara_1.calculateVaraInfo)(year, month, day);
    const tithi = (0, tithi_1.calculateTithiInfo)(year, month, day, sunriseUTCHours, location.timezoneOffsetHours);
    const nakshatra = (0, nakshatra_1.calculateNakshatraInfo)(year, month, day, sunriseUTCHours, location.timezoneOffsetHours);
    const yoga = (0, yoga_1.calculateYogaInfo)(year, month, day, location.timezoneOffsetHours);
    const karana = (0, karana_1.calculateKaranaInfo)(year, month, day, location.timezoneOffsetHours);
    // 4. Calculate Marathi Calendar Elements
    const marathiMonth = (0, month_1.calculateMarathiMonth)(year, month, day, location.timezoneOffsetHours);
    const samvat = (0, samvat_1.calculateSamvatInfo)(year, month, day);
    // 5. Calculate Auspicious Timings & Muhurtas
    const muhurta = (0, muhurta_1.calculateMuhurtas)(sunTimes.sunriseDate, sunTimes.sunsetDate, vara.index, location.timezoneOffsetHours);
    // 6. Calculate Maharashtrian Festivals
    const festivals = (0, festivals_1.getFestivalsForDay)(marathiMonth, tithi, month, day, moonTimes.moonriseStr);
    const jdNoon = (0, ayanamsha_1.getJulianDay)(year, month, day, 12 - location.timezoneOffsetHours);
    const ayanamshaDeg = (0, ayanamsha_1.getLahiriAyanamsha)(jdNoon);
    const posPlanets = (0, ephemeris_1.getPlanetaryPositions)(jdNoon);
    const RASHIS = [
        { marathi: 'मेष', english: 'Aries' },
        { marathi: 'वृषभ', english: 'Taurus' },
        { marathi: 'मिथुन', english: 'Gemini' },
        { marathi: 'कर्क', english: 'Cancer' },
        { marathi: 'सिंह', english: 'Leo' },
        { marathi: 'कन्या', english: 'Virgo' },
        { marathi: 'तुला', english: 'Libra' },
        { marathi: 'वृश्चिक', english: 'Scorpio' },
        { marathi: 'धनु', english: 'Sagittarius' },
        { marathi: 'मकर', english: 'Capricorn' },
        { marathi: 'कुंभ', english: 'Aquarius' },
        { marathi: 'मीन', english: 'Pisces' },
    ];
    const sunRashiIdx = Math.floor(posPlanets.sunNirayanaDeg / 30.0) % 12;
    const sunRashiObj = RASHIS[sunRashiIdx];
    const dateFormatted = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return {
        date: dateFormatted,
        dayOfWeek: vara,
        location,
        samvat,
        month: marathiMonth,
        tithi,
        nakshatra,
        yoga,
        karana,
        astronomy: {
            sunrise: sunTimes.sunriseStr,
            sunset: sunTimes.sunsetStr,
            solarNoon: sunTimes.solarNoonStr,
            dayLength: sunTimes.dayLengthStr,
            moonrise: moonTimes.moonriseStr,
            moonset: moonTimes.moonsetStr,
            sunRashiMarathi: sunRashiObj.marathi,
            sunRashiEnglish: sunRashiObj.english,
            moonRashiMarathi: nakshatra.rashiMarathi,
            moonRashiEnglish: nakshatra.rashiEnglish,
            lahiriAyanamshaDegrees: parseFloat(ayanamshaDeg.toFixed(4)),
        },
        muhurta,
        festivals,
    };
}
if (typeof window !== 'undefined') {
    window.MarathiPanchang = {
        getMarathiPanchang,
        DEFAULT_LOCATION: exports.DEFAULT_LOCATION,
    };
}
