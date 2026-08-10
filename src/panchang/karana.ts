import { KaranaInfo } from '../types';
import { getJulianDay } from '../astronomy/ayanamsha';
import { getPlanetaryPositions } from '../astronomy/ephemeris';

export const KARANA_NAMES: { marathi: string; english: string; isBhadra: boolean }[] = [
  { marathi: 'किंस्तुघ्न', english: 'Kintughna', isBhadra: false }, // 1
  { marathi: 'बव', english: 'Bava', isBhadra: false }, // 2
  { marathi: 'बालव', english: 'Balava', isBhadra: false }, // 3
  { marathi: 'कौलव', english: 'Kaulava', isBhadra: false }, // 4
  { marathi: 'तैतिल', english: 'Taitila', isBhadra: false }, // 5
  { marathi: 'गर', english: 'Gara', isBhadra: false }, // 6
  { marathi: 'वणिज', english: 'Vanija', isBhadra: false }, // 7
  { marathi: 'विष्टी (भद्रा)', english: 'Vishti (Bhadra)', isBhadra: true }, // 8 (Bhadra!)
  { marathi: 'शकुनि', english: 'Shakuni', isBhadra: false }, // 58
  { marathi: 'चतुष्पाद', english: 'Chatuspada', isBhadra: false }, // 59
  { marathi: 'नाग', english: 'Naga', isBhadra: false }, // 60
];

export function calculateKaranaInfo(
  year: number,
  month: number,
  day: number,
  tzOffsetHours: number
): KaranaInfo {
  const jdNoon = getJulianDay(year, month, day, 12 - tzOffsetHours);
  const pos = getPlanetaryPositions(jdNoon);

  const diffLong = (pos.moonNirayanaDeg - pos.sunNirayanaDeg + 360.0) % 360.0;
  const halfTithiIndex = Math.floor(diffLong / 6.0) + 1; // 1 to 60

  let karanaObj = KARANA_NAMES[0];

  if (halfTithiIndex === 1) {
    karanaObj = KARANA_NAMES[0]; // Kintughna
  } else if (halfTithiIndex >= 58) {
    if (halfTithiIndex === 58) karanaObj = KARANA_NAMES[8]; // Shakuni
    else if (halfTithiIndex === 59) karanaObj = KARANA_NAMES[9]; // Chatuspada
    else karanaObj = KARANA_NAMES[10]; // Naga
  } else {
    // Repeating 7 moving Karanas: Bava(1), Balava(2), Kaulava(3), Taitila(4), Gara(5), Vanija(6), Vishti(7)
    const movingIndex = ((halfTithiIndex - 2) % 7) + 1;
    karanaObj = KARANA_NAMES[movingIndex];
  }

  const nextTargetDeg = Math.ceil(diffLong / 6.0) * 6.0;
  const prevTargetDeg = Math.floor(diffLong / 6.0) * 6.0;

  const hoursToEnd = (nextTargetDeg - diffLong) / 0.508;
  const hoursFromStart = (diffLong - prevTargetDeg) / 0.508;

  const formatTime = (offsetH: number) => {
    const totalH = (12 + offsetH + 24) % 24;
    const h = Math.floor(totalH).toString().padStart(2, '0');
    const m = Math.floor((totalH % 1) * 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  return {
    index: halfTithiIndex,
    nameMarathi: karanaObj.marathi,
    nameEnglish: karanaObj.english,
    isBhadra: karanaObj.isBhadra,
    startTime: formatTime(-hoursFromStart),
    endTime: formatTime(hoursToEnd),
  };
}
