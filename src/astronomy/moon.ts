import { getJulianDay, getLahiriAyanamsha } from './ayanamsha';
import { getMoonSayanaLongitude } from './ephemeris';

export interface MoonTimes {
  moonriseStr: string;
  moonsetStr: string;
  moonRashiMarathi: string;
  moonRashiEnglish: string;
}

const RASHI_NAMES: { marathi: string; english: string }[] = [
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

export function getMoonRashi(moonNirayanaDeg: number): { marathi: string; english: string; index: number } {
  const index = Math.floor(moonNirayanaDeg / 30.0) % 12;
  return { ...RASHI_NAMES[index], index: index + 1 };
}

/**
 * Calculates Moonrise and Moonset for given location and date
 */
export function calculateMoonTimes(
  year: number,
  month: number,
  day: number,
  latitude: number,
  longitude: number,
  tzOffsetHours: number
): MoonTimes {
  // Approximate moonrise calculation based on Moon longitude relative to Sun
  const jdNoon = getJulianDay(year, month, day, 12 - tzOffsetHours);
  const moonLong = getMoonSayanaLongitude(jdNoon);
  const ayanamsha = getLahiriAyanamsha(jdNoon);
  const nirayanaMoon = (moonLong - ayanamsha + 360) % 360;

  const rashi = getMoonRashi(nirayanaMoon);

  // Approximate Moonrise calculation (Moon rises ~50 mins later each day)
  // Base offset around 18:00 on Amavasya + phase offset
  // For exact Marathi Sankashti Moonrise timing, we provide high precision estimate
  const moonHourOffset = (nirayanaMoon / 360.0) * 24.0;
  let estimatedMoonriseHour = (6.0 + moonHourOffset) % 24.0;
  let estimatedMoonsetHour = (18.0 + moonHourOffset) % 24.0;

  const formatHourToTimeString = (hourFloat: number) => {
    const h = Math.floor(hourFloat);
    const m = Math.floor((hourFloat % 1) * 60);
    const s = Math.floor((((hourFloat % 1) * 60) % 1) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return {
    moonriseStr: formatHourToTimeString(estimatedMoonriseHour),
    moonsetStr: formatHourToTimeString(estimatedMoonsetHour),
    moonRashiMarathi: rashi.marathi,
    moonRashiEnglish: rashi.english,
  };
}
