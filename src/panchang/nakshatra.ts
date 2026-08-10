import { NakshatraInfo } from '../types';
import { getJulianDay } from '../astronomy/ayanamsha';
import { getPlanetaryPositions } from '../astronomy/ephemeris';
import { getMoonRashi } from '../astronomy/moon';

export const NAKSHATRA_DATA: { marathi: string; english: string; lordMarathi: string; lordEnglish: string }[] = [
  { marathi: 'अश्विनी', english: 'Ashwini', lordMarathi: 'केतू', lordEnglish: 'Ketu' },
  { marathi: 'भरणी', english: 'Bharani', lordMarathi: 'शुक्र', lordEnglish: 'Venus' },
  { marathi: 'कृत्तिका', english: 'Krittika', lordMarathi: 'सूर्य', lordEnglish: 'Sun' },
  { marathi: 'रोहिणी', english: 'Rohini', lordMarathi: 'चंद्र', lordEnglish: 'Moon' },
  { marathi: 'मृगशिरा', english: 'Mrigashirsha', lordMarathi: 'मंगळ', lordEnglish: 'Mars' },
  { marathi: 'आर्द्र', english: 'Ardra', lordMarathi: 'राहू', lordEnglish: 'Rahu' },
  { marathi: 'पुनर्वसू', english: 'Punarvasu', lordMarathi: 'गुरू', lordEnglish: 'Jupiter' },
  { marathi: 'पुष्य', english: 'Pushya', lordMarathi: 'शनि', lordEnglish: 'Saturn' },
  { marathi: 'आश्लेषा', english: 'Ashlesha', lordMarathi: 'बुध', lordEnglish: 'Mercury' },
  { marathi: 'मघा', english: 'Magha', lordMarathi: 'केतू', lordEnglish: 'Ketu' },
  { marathi: 'पूर्वा फाल्गुनी', english: 'Purva Phalguni', lordMarathi: 'शुक्र', lordEnglish: 'Venus' },
  { marathi: 'उत्तरा फाल्गुनी', english: 'Uttara Phalguni', lordMarathi: 'सूर्य', lordEnglish: 'Sun' },
  { marathi: 'हस्त', english: 'Hasta', lordMarathi: 'चंद्र', lordEnglish: 'Moon' },
  { marathi: 'चित्रा', english: 'Chitra', lordMarathi: 'मंगळ', lordEnglish: 'Mars' },
  { marathi: 'स्वाती', english: 'Swati', lordMarathi: 'राहू', lordEnglish: 'Rahu' },
  { marathi: 'विशाखा', english: 'Vishakha', lordMarathi: 'गुरू', lordEnglish: 'Jupiter' },
  { marathi: 'अनुराधा', english: 'Anuradha', lordMarathi: 'शनि', lordEnglish: 'Saturn' },
  { marathi: 'ज्येष्ठा', english: 'Jyeshtha', lordMarathi: 'बुध', lordEnglish: 'Mercury' },
  { marathi: 'मूल', english: 'Mula', lordMarathi: 'केतू', lordEnglish: 'Ketu' },
  { marathi: 'पूर्वाषाढा', english: 'Purva Ashadha', lordMarathi: 'शुक्र', lordEnglish: 'Venus' },
  { marathi: 'उत्तराषाढा', english: 'Uttara Ashadha', lordMarathi: 'सूर्य', lordEnglish: 'Sun' },
  { marathi: 'श्रवण', english: 'Shravana', lordMarathi: 'चंद्र', lordEnglish: 'Moon' },
  { marathi: 'धनिष्ठा', english: 'Dhanishta', lordMarathi: 'मंगळ', lordEnglish: 'Mars' },
  { marathi: 'शतभिषा', english: 'Shatabhisha', lordMarathi: 'राहू', lordEnglish: 'Rahu' },
  { marathi: 'पूर्वा भाद्रपदा', english: 'Purva Bhadrapada', lordMarathi: 'गुरू', lordEnglish: 'Jupiter' },
  { marathi: 'उत्तरा भाद्रपदा', english: 'Uttara Bhadrapada', lordMarathi: 'शनि', lordEnglish: 'Saturn' },
  { marathi: 'रेवती', english: 'Revati', lordMarathi: 'बुध', lordEnglish: 'Mercury' },
];

export function calculateNakshatraInfo(
  year: number,
  month: number,
  day: number,
  sunriseUTCHours: number,
  tzOffsetHours: number
): NakshatraInfo {
  const jdNoon = getJulianDay(year, month, day, 12 - tzOffsetHours);
  const pos = getPlanetaryPositions(jdNoon);

  const nakshatraSpan = 360.0 / 27.0; // 13.3333 degrees
  const index = Math.floor(pos.moonNirayanaDeg / nakshatraSpan) + 1; // 1 to 27

  const nakData = NAKSHATRA_DATA[index - 1];
  const rashi = getMoonRashi(pos.moonNirayanaDeg);

  // Pada / Charan (1 to 4)
  const degInNakshatra = pos.moonNirayanaDeg % nakshatraSpan;
  const padaSpan = nakshatraSpan / 4.0; // 3.3333 degrees
  const pada = Math.floor(degInNakshatra / padaSpan) + 1;

  // Approx start & end transition times
  const nextTargetDeg = Math.ceil(pos.moonNirayanaDeg / nakshatraSpan) * nakshatraSpan;
  const prevTargetDeg = Math.floor(pos.moonNirayanaDeg / nakshatraSpan) * nakshatraSpan;

  // Moon speed ~0.549 degrees/hour
  const hoursToEnd = (nextTargetDeg - pos.moonNirayanaDeg) / 0.549;
  const hoursFromStart = (pos.moonNirayanaDeg - prevTargetDeg) / 0.549;

  const formatTime = (offsetH: number) => {
    const totalH = (12 + offsetH + 24) % 24;
    const h = Math.floor(totalH).toString().padStart(2, '0');
    const m = Math.floor((totalH % 1) * 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  return {
    index,
    nameMarathi: nakData.marathi,
    nameEnglish: nakData.english,
    pada,
    lordMarathi: nakData.lordMarathi,
    lordEnglish: nakData.lordEnglish,
    rashiMarathi: rashi.marathi,
    rashiEnglish: rashi.english,
    startTime: formatTime(-hoursFromStart),
    endTime: formatTime(hoursToEnd),
  };
}
