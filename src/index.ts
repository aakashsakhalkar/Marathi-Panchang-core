import { CompleteMarathiPanchang, GeoLocation } from './types';
import { calculateSunTimes } from './astronomy/sun';
import { calculateMoonTimes } from './astronomy/moon';
import { getJulianDay, getLahiriAyanamsha } from './astronomy/ayanamsha';
import { getPlanetaryPositions } from './astronomy/ephemeris';
import { calculateTithiInfo } from './panchang/tithi';
import { calculateNakshatraInfo } from './panchang/nakshatra';
import { calculateYogaInfo } from './panchang/yoga';
import { calculateKaranaInfo } from './panchang/karana';
import { calculateVaraInfo } from './panchang/vara';
import { calculateMarathiMonth } from './marathi/month';
import { calculateSamvatInfo } from './marathi/samvat';
import { calculateMuhurtas } from './marathi/muhurta';
import { getFestivalsForDay } from './marathi/festivals';

export * from './types';

// Default Maharashtra City Coordinates (Pune/Mumbai default)
export const DEFAULT_LOCATION: GeoLocation = {
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
export function getMarathiPanchang(
  date: Date | string = new Date(),
  location: GeoLocation = DEFAULT_LOCATION
): CompleteMarathiPanchang {
  const targetDate = typeof date === 'string' ? new Date(date) : date;

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  // 1. Calculate Sunrise & Sunset
  const sunTimes = calculateSunTimes(
    year,
    month,
    day,
    location.latitude,
    location.longitude,
    location.timezoneOffsetHours
  );

  const sunriseUTCHours = sunTimes.sunriseDate.getUTCHours() + sunTimes.sunriseDate.getUTCMinutes() / 60.0;

  // 2. Calculate Moon Times & Rashi
  const moonTimes = calculateMoonTimes(
    year,
    month,
    day,
    location.latitude,
    location.longitude,
    location.timezoneOffsetHours
  );

  // 3. Calculate Panchang Elements
  const vara = calculateVaraInfo(year, month, day);
  const tithi = calculateTithiInfo(year, month, day, sunriseUTCHours, location.timezoneOffsetHours);
  const nakshatra = calculateNakshatraInfo(year, month, day, sunriseUTCHours, location.timezoneOffsetHours);
  const yoga = calculateYogaInfo(year, month, day, location.timezoneOffsetHours);
  const karana = calculateKaranaInfo(year, month, day, location.timezoneOffsetHours);

  // 4. Calculate Marathi Calendar Elements
  const marathiMonth = calculateMarathiMonth(year, month, day, location.timezoneOffsetHours);
  const samvat = calculateSamvatInfo(year, month, day);

  // 5. Calculate Auspicious Timings & Muhurtas
  const muhurta = calculateMuhurtas(
    sunTimes.sunriseDate,
    sunTimes.sunsetDate,
    vara.index,
    location.timezoneOffsetHours
  );

  // 6. Calculate Maharashtrian Festivals
  const festivals = getFestivalsForDay(
    marathiMonth,
    tithi,
    month,
    day,
    moonTimes.moonriseStr
  );

  const jdNoon = getJulianDay(year, month, day, 12 - location.timezoneOffsetHours);
  const ayanamshaDeg = getLahiriAyanamsha(jdNoon);
  const posPlanets = getPlanetaryPositions(jdNoon);
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
  (window as any).MarathiPanchang = {
    getMarathiPanchang,
    DEFAULT_LOCATION,
  };
}

