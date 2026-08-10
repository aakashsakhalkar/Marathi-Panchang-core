"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMuhurtas = calculateMuhurtas;
function calculateMuhurtas(sunriseDate, sunsetDate, dayOfWeekIndex, // 0=Sun, 6=Sat
tzOffsetHours) {
    const sunriseMs = sunriseDate.getTime();
    const sunsetMs = sunsetDate.getTime();
    const daytimeMs = sunsetMs - sunriseMs;
    const praharMs = daytimeMs / 8.0; // 1/8th of daytime
    // Rahu Kaal part indices (1-indexed) for Sun(0) to Sat(6)
    const rahuIndices = [8, 2, 7, 5, 6, 4, 3];
    const yamaIndices = [5, 4, 3, 2, 1, 7, 6];
    const guliIndices = [7, 6, 5, 4, 3, 2, 1];
    const formatLocalTime = (ms) => {
        const d = new Date(ms + tzOffsetHours * 3600 * 1000);
        const h = d.getUTCHours().toString().padStart(2, '0');
        const m = d.getUTCMinutes().toString().padStart(2, '0');
        return `${h}:${m}`;
    };
    const getKaalSpan = (partIndex) => {
        const startMs = sunriseMs + (partIndex - 1) * praharMs;
        const endMs = startMs + praharMs;
        return { start: formatLocalTime(startMs), end: formatLocalTime(endMs) };
    };
    // Abhijit Muhurta (8th Muhurta out of 15 daytime muhurtas, around noon)
    const muhurta15Ms = daytimeMs / 15.0;
    const abhijitStartMs = sunriseMs + 7 * muhurta15Ms;
    const abhijitEndMs = abhijitStartMs + muhurta15Ms;
    // Brahma Muhurta (96 mins before Sunrise)
    const brahmaStartMs = sunriseMs - 96 * 60 * 1000;
    const brahmaEndMs = sunriseMs - 48 * 60 * 1000;
    // Amrit Kaal (approx 1.5 hour window during favorable daytime)
    const amritStartMs = sunriseMs + 2 * praharMs;
    const amritEndMs = amritStartMs + 90 * 60 * 1000;
    return {
        rahuKaal: getKaalSpan(rahuIndices[dayOfWeekIndex]),
        yamagandaKaal: getKaalSpan(yamaIndices[dayOfWeekIndex]),
        gulikaKaal: getKaalSpan(guliIndices[dayOfWeekIndex]),
        abhijitMuhurta: { start: formatLocalTime(abhijitStartMs), end: formatLocalTime(abhijitEndMs) },
        brahmaMuhurta: { start: formatLocalTime(brahmaStartMs), end: formatLocalTime(brahmaEndMs) },
        amritKaal: { start: formatLocalTime(amritStartMs), end: formatLocalTime(amritEndMs) },
    };
}
