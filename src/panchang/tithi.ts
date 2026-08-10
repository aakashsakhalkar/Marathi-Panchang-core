import { TithiInfo } from '../types';
import { getJulianDay } from '../astronomy/ayanamsha';
import { getPlanetaryPositions } from '../astronomy/ephemeris';

export const TITHI_NAMES: { marathi: string; english: string }[] = [
  { marathi: 'प्रथमा', english: 'Pratipada' },
  { marathi: 'द्वितीया', english: 'Dwitiya' },
  { marathi: 'तृतीया', english: 'Tritiya' },
  { marathi: 'चतुर्थी', english: 'Chaturthi' },
  { marathi: 'पंचमी', english: 'Panchami' },
  { marathi: 'षष्ठी', english: 'Shashthi' },
  { marathi: 'सप्तमी', english: 'Saptami' },
  { marathi: 'अष्टमी', english: 'Ashtami' },
  { marathi: 'नवमी', english: 'Navami' },
  { marathi: 'दशमी', english: 'Dashami' },
  { marathi: 'एकादशी', english: 'Ekadashi' },
  { marathi: 'द्वादशी', english: 'Dwadashi' },
  { marathi: 'त्रयोदशी', english: 'Trayodashi' },
  { marathi: 'चतुर्दशी', english: 'Chaturdashi' },
  { marathi: 'पौर्णिमा', english: 'Purnima' }, // 15
  { marathi: 'प्रथमा', english: 'Pratipada' },
  { marathi: 'द्वितीया', english: 'Dwitiya' },
  { marathi: 'तृतीया', english: 'Tritiya' },
  { marathi: 'चतुर्थी', english: 'Chaturthi' },
  { marathi: 'पंचमी', english: 'Panchami' },
  { marathi: 'षष्ठी', english: 'Shashthi' },
  { marathi: 'सप्तमी', english: 'Saptami' },
  { marathi: 'अष्टमी', english: 'Ashtami' },
  { marathi: 'नवमी', english: 'Navami' },
  { marathi: 'दशमी', english: 'Dashami' },
  { marathi: 'एकादशी', english: 'Ekadashi' },
  { marathi: 'द्वादशी', english: 'Dwadashi' },
  { marathi: 'त्रयोदशी', english: 'Trayodashi' },
  { marathi: 'चतुर्दशी', english: 'Chaturdashi' },
  { marathi: 'अमावस्या', english: 'Amavasya' }, // 30
];

export function calculateTithiForJD(julianDay: number): { index: number; nameMarathi: string; nameEnglish: string; pakshaMarathi: string; pakshaEnglish: 'Shukla' | 'Krishna' } {
  const pos = getPlanetaryPositions(julianDay);
  const diffLong = (pos.moonNirayanaDeg - pos.sunNirayanaDeg + 360.0) % 360.0;
  const tithiIndex = Math.floor(diffLong / 12.0) + 1; // 1 to 30

  const nameObj = TITHI_NAMES[tithiIndex - 1];
  const isShukla = tithiIndex <= 15;

  return {
    index: tithiIndex,
    nameMarathi: nameObj.marathi,
    nameEnglish: nameObj.english,
    pakshaMarathi: isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
    pakshaEnglish: isShukla ? 'Shukla' : 'Krishna',
  };
}

/**
 * Calculates complete Tithi information including Udayatithi and transition times
 */
export function calculateTithiInfo(
  year: number,
  month: number,
  day: number,
  sunriseUTCHours: number,
  tzOffsetHours: number
): TithiInfo {
  // Sunrise Julian Day
  const jdSunrise = getJulianDay(year, month, day, sunriseUTCHours);
  const udaya = calculateTithiForJD(jdSunrise);

  // Current time Julian Day (Noon)
  const jdNoon = getJulianDay(year, month, day, 12 - tzOffsetHours);
  const currentTithi = calculateTithiForJD(jdNoon);

  // Estimate start and end times by binary searching the 12° phase boundaries
  const posSunrise = getPlanetaryPositions(jdSunrise);
  const diffDeg = (posSunrise.moonNirayanaDeg - posSunrise.sunNirayanaDeg + 360.0) % 360.0;
  const nextTargetDeg = Math.ceil(diffDeg / 12.0) * 12.0;
  const prevTargetDeg = Math.floor(diffDeg / 12.0) * 12.0;

  // Approx hourly moon-sun relative speed is ~0.508 degrees/hour
  const hoursToEnd = (nextTargetDeg - diffDeg) / 0.508;
  const hoursFromStart = (diffDeg - prevTargetDeg) / 0.508;

  const endMs = jdSunrise * 86400000 - 210866760000000 + hoursToEnd * 3600000;
  const startMs = jdSunrise * 86400000 - 210866760000000 - hoursFromStart * 3600000;

  const formatTime = (hoursFromSunrise: number) => {
    const totalHoursLocal = (sunriseUTCHours + tzOffsetHours + hoursFromSunrise + 24) % 24;
    const h = Math.floor(totalHoursLocal).toString().padStart(2, '0');
    const m = Math.floor((totalHoursLocal % 1) * 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  return {
    index: currentTithi.index,
    nameMarathi: currentTithi.nameMarathi,
    nameEnglish: currentTithi.nameEnglish,
    pakshaMarathi: currentTithi.pakshaMarathi,
    pakshaEnglish: currentTithi.pakshaEnglish,
    udayaTithiMarathi: `${udaya.pakshaMarathi} ${udaya.nameMarathi}`,
    udayaTithiEnglish: `${udaya.pakshaEnglish} ${udaya.nameEnglish}`,
    startTime: formatTime(-hoursFromStart),
    endTime: formatTime(hoursToEnd),
  };
}
