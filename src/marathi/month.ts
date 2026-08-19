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

function getElongationDeg(jd: number): number {
  const pos = getPlanetaryPositions(jd);
  let el = (pos.moonSayanaDeg - pos.sunSayanaDeg) % 360.0;
  if (el < 0) el += 360.0;
  return el;
}

/**
 * Finds the exact Julian Day of the preceding Amavasya (New Moon, elongation = 0)
 */
function findPreviousNewMoonJD(jdCurrent: number): number {
  const elCurrent = getElongationDeg(jdCurrent);
  // Average relative speed is ~12.190747 degrees per day
  let approxDaysBack = elCurrent / 12.190747;
  let jd = jdCurrent - approxDaysBack;

  // Refine using Newton-Raphson / secant method
  for (let i = 0; i < 6; i++) {
    let el = getElongationDeg(jd);
    if (el > 180) el -= 360.0;
    let deltaJD = el / 12.190747;
    jd -= deltaJD;
    if (Math.abs(deltaJD) < 0.0001) break;
  }
  return jd;
}

/**
 * Finds the exact Julian Day of the next Amavasya (New Moon, elongation = 0)
 */
function findNextNewMoonJD(jdCurrent: number): number {
  const elCurrent = getElongationDeg(jdCurrent);
  let approxDaysForward = (360.0 - elCurrent) / 12.190747;
  let jd = jdCurrent + approxDaysForward;

  for (let i = 0; i < 6; i++) {
    let el = getElongationDeg(jd);
    if (el > 180) el -= 360.0;
    let deltaJD = el / 12.190747;
    jd -= deltaJD;
    if (Math.abs(deltaJD) < 0.0001) break;
  }
  return jd;
}

/**
 * Calculates Marathi Month under Amanta system (Month starts at Amavasya, ends on next Amavasya)
 * The month name is strictly determined by the Sun's Nirayana Rashi at the preceding Amavasya.
 */
export function calculateMarathiMonth(
  year: number,
  month: number,
  day: number,
  tzOffsetHours: number
): MarathiMonthInfo {
  const jdNoon = getJulianDay(year, month, day, 12 - tzOffsetHours);

  // Find preceding Amavasya (New Moon)
  const prevNewMoonJD = findPreviousNewMoonJD(jdNoon);
  const posAtPrevNewMoon = getPlanetaryPositions(prevNewMoonJD + 0.005); // Just after conjunction

  // Sun Nirayana Rashi at preceding New Moon (0 = Mesha, ..., 11 = Meena)
  const sunRashiAtNewMoon = Math.floor(posAtPrevNewMoon.sunNirayanaDeg / 30.0);

  // In Amanta system:
  // Sun in Meena (11) at New Moon -> Chaitra (1)
  // Sun in Mesha (0) at New Moon -> Vaishakha (2)
  // Sun in Karka (3) at New Moon -> Shravana (5)
  // Sun in Simha (4) at New Moon -> Bhadrapada (6)
  const monthIndex = ((sunRashiAtNewMoon + 1) % 12) + 1; // 1 to 12
  const monthObj = MARATHI_MONTHS[monthIndex - 1];

  // Adhik Masa (Leap Month) check:
  // If Sun does not change Solar Rashi between preceding and next Amavasya (no Sankranti in this lunar month)
  const nextNewMoonJD = findNextNewMoonJD(jdNoon);
  const posAtNextNewMoon = getPlanetaryPositions(nextNewMoonJD - 0.005); // Just before next conjunction
  const sunRashiAtNextNewMoon = Math.floor(posAtNextNewMoon.sunNirayanaDeg / 30.0);

  const isAdhikMasa = sunRashiAtNewMoon === sunRashiAtNextNewMoon;

  return {
    index: monthIndex,
    nameMarathi: monthObj.marathi,
    nameEnglish: monthObj.english,
    isAdhikMasa,
    fullMonthNameMarathi: isAdhikMasa ? `अधिक ${monthObj.marathi}` : `निज ${monthObj.marathi}`,
    system: 'Amanta',
  };
}
