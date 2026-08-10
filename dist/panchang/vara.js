"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VARA_DATA = void 0;
exports.calculateVaraInfo = calculateVaraInfo;
exports.VARA_DATA = [
    { index: 0, nameMarathi: 'रविवार', nameSanskrit: 'रविवासरः', nameEnglish: 'Sunday', rulerPlanet: 'सूर्य (Sun)' },
    { index: 1, nameMarathi: 'सोमवार', nameSanskrit: 'सोमवासरः', nameEnglish: 'Monday', rulerPlanet: 'चंद्र (Moon)' },
    { index: 2, nameMarathi: 'मंगळवार', nameSanskrit: 'भौमवासरः', nameEnglish: 'Tuesday', rulerPlanet: 'मंगळ (Mars)' },
    { index: 3, nameMarathi: 'बुधवार', nameSanskrit: 'सौम्यवासरः', nameEnglish: 'Wednesday', rulerPlanet: 'बुध (Mercury)' },
    { index: 4, nameMarathi: 'गुरुवार', nameSanskrit: 'गुरुवासरः', nameEnglish: 'Thursday', rulerPlanet: 'गुरू (Jupiter)' },
    { index: 5, nameMarathi: 'शुक्रवार', nameSanskrit: 'भृगुवासरः', nameEnglish: 'Friday', rulerPlanet: 'शुक्र (Venus)' },
    { index: 6, nameMarathi: 'शनिवार', nameSanskrit: 'स्थिरवासरः', nameEnglish: 'Saturday', rulerPlanet: 'शनि (Saturn)' },
];
function calculateVaraInfo(year, month, day) {
    const date = new Date(year, month - 1, day);
    const dayIndex = date.getDay(); // 0 = Sunday, 6 = Saturday
    return exports.VARA_DATA[dayIndex];
}
