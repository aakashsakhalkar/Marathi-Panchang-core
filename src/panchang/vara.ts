import { VaraInfo } from '../types';

export const VARA_DATA: VaraInfo[] = [
  { index: 0, nameMarathi: 'रविवार', nameSanskrit: 'रविवासरः', nameEnglish: 'Sunday', rulerPlanet: 'सूर्य (Sun)' },
  { index: 1, nameMarathi: 'सोमवार', nameSanskrit: 'सोमवासरः', nameEnglish: 'Monday', rulerPlanet: 'चंद्र (Moon)' },
  { index: 2, nameMarathi: 'मंगळवार', nameSanskrit: 'भौमवासरः', nameEnglish: 'Tuesday', rulerPlanet: 'मंगळ (Mars)' },
  { index: 3, nameMarathi: 'बुधवार', nameSanskrit: 'सौम्यवासरः', nameEnglish: 'Wednesday', rulerPlanet: 'बुध (Mercury)' },
  { index: 4, nameMarathi: 'गुरुवार', nameSanskrit: 'गुरुवासरः', nameEnglish: 'Thursday', rulerPlanet: 'गुरू (Jupiter)' },
  { index: 5, nameMarathi: 'शुक्रवार', nameSanskrit: 'भृगुवासरः', nameEnglish: 'Friday', rulerPlanet: 'शुक्र (Venus)' },
  { index: 6, nameMarathi: 'शनिवार', nameSanskrit: 'स्थिरवासरः', nameEnglish: 'Saturday', rulerPlanet: 'शनि (Saturn)' },
];

export function calculateVaraInfo(year: number, month: number, day: number): VaraInfo {
  const date = new Date(year, month - 1, day);
  const dayIndex = date.getDay(); // 0 = Sunday, 6 = Saturday
  return VARA_DATA[dayIndex];
}
