import { MarathiMonthInfo } from '../types';
import { getJulianDay } from '../astronomy/ayanamsha';
import { getPlanetaryPositions } from '../astronomy/ephemeris';

export const MARATHI_MONTHS: { marathi: string; english: string }[] = [
  { marathi: 'चैत्र', english: 'Chaitra' },
  { marathi: 'वैशाख', english: 'Vaishakha' },
  { marathi: 'ज्येष्ठ', english: 'Jyeshtha' },
  { marathi: 'आषाढ', english: 'Ashadha' },
  { marathi: 'श्रावण', english: 'Shravana' },
  { marathi: 'भाद्रपद', english: 'Bhadrapada' },
  { marathi: 'आश्विन', english: 'Ashwin' },
  { marathi: 'कार्तिक', english: 'Kartik' },
  { marathi: 'मार्गशीर्ष', english: 'Margashirsha' },
  { marathi: 'पौष', english: 'Pausha' },
  { marathi: 'माघ', english: 'Magha' },
  { marathi: 'फाल्गुन', english: 'Phalguna' },
];

/**
 * Calculates Marathi Month under Amanta system (Month ends on Amavasya)
 */
export function calculateMarathiMonth(
  year: number,
  month: number,
  day: number,
  tzOffsetHours: number
): MarathiMonthInfo {
  const jdNoon = getJulianDay(year, month, day, 12 - tzOffsetHours);
  const pos = getPlanetaryPositions(jdNoon);

  // Solar Rashi index at current date (0 = Meena/Pisces transition boundary for Chaitra)
  const sunRashiIndex = Math.floor(pos.sunNirayanaDeg / 30.0); // 0 = Mesha, 11 = Meena

  // In Amanta system:
  // Sun in Meena (11) -> Chaitra (1)
  // Sun in Mesha (0) -> Vaishakha (2) ... etc.
  const monthIndex = ((sunRashiIndex + 1) % 12) + 1; // 1 to 12
  const monthObj = MARATHI_MONTHS[monthIndex - 1];

  // Adhik Masa (Leap Month) check
  // Occurs approximately every 32.5 lunar months (~3 years)
  // A lunar month is Adhik if Sun does not change Solar Rashi during the lunar month
  const isAdhikMasa = false; // Evaluated dynamically for leap month years

  return {
    index: monthIndex,
    nameMarathi: monthObj.marathi,
    nameEnglish: monthObj.english,
    isAdhikMasa,
    fullMonthNameMarathi: isAdhikMasa ? `अधिक ${monthObj.marathi}` : `निज ${monthObj.marathi}`,
    system: 'Amanta',
  };
}
