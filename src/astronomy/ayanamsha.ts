/**
 * Calculates Lahiri Ayanamsha (Chitrapaksha Ayanamsha)
 * Official standard Ayanamsha for Indian Rashtriya Panchang & Marathi Calendars.
 */

export function getJulianCenturies(julianDay: number): number {
  return (julianDay - 2451545.0) / 36525.0;
}

export function getJulianDay(year: number, month: number, day: number, hours: number = 0): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5 + (hours / 24.0);
}

/**
 * Returns Lahiri Ayanamsha in degrees for a given Julian Day
 */
export function getLahiriAyanamsha(julianDay: number): number {
  const T = getJulianCenturies(julianDay);
  // Precise polynomial approximation for Lahiri Ayanamsha
  // Reference value at J2000.0 is ~23.856583 degrees (23° 51' 23.7")
  const ayanamsha = 23.856583 + 1.39604166667 * T + 0.0003086 * T * T;
  return ayanamsha;
}
