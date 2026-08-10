"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YOGA_DATA = void 0;
exports.calculateYogaInfo = calculateYogaInfo;
const ayanamsha_1 = require("../astronomy/ayanamsha");
const ephemeris_1 = require("../astronomy/ephemeris");
exports.YOGA_DATA = [
    { marathi: 'विष्कंभ', english: 'Vishkambha', isAuspicious: false },
    { marathi: 'प्रीति', english: 'Priti', isAuspicious: true },
    { marathi: 'आयुष्मान', english: 'Ayushman', isAuspicious: true },
    { marathi: 'सौभाग्य', english: 'Saubhagya', isAuspicious: true },
    { marathi: 'शोभन', english: 'Shobhana', isAuspicious: true },
    { marathi: 'अतिगंड', english: 'Atiganda', isAuspicious: false },
    { marathi: 'सुकर्मा', english: 'Sukarma', isAuspicious: true },
    { marathi: 'धृति', english: 'Dhriti', isAuspicious: true },
    { marathi: 'शूल', english: 'Shula', isAuspicious: false },
    { marathi: 'गंड', english: 'Ganda', isAuspicious: false },
    { marathi: 'वृद्धि', english: 'Vriddhi', isAuspicious: true },
    { marathi: 'ध्रुव', english: 'Dhruva', isAuspicious: true },
    { marathi: 'व्याघात', english: 'Vyaghata', isAuspicious: false },
    { marathi: 'हर्षण', english: 'Harshana', isAuspicious: true },
    { marathi: 'वज्र', english: 'Vajra', isAuspicious: false },
    { marathi: 'सिद्धि', english: 'Siddhi', isAuspicious: true },
    { marathi: 'व्यतीपात', english: 'Vyatipata', isAuspicious: false },
    { marathi: 'वरीयान', english: 'Variyan', isAuspicious: true },
    { marathi: 'परिघ', english: 'Parigha', isAuspicious: false },
    { marathi: 'शिव', english: 'Shiva', isAuspicious: true },
    { marathi: 'सिद्ध', english: 'Siddha', isAuspicious: true },
    { marathi: 'साध्य', english: 'Sadhya', isAuspicious: true },
    { marathi: 'शुभ', english: 'Shubha', isAuspicious: true },
    { marathi: 'शुक्ल', english: 'Shukla', isAuspicious: true },
    { marathi: 'ब्रह्म', english: 'Brahma', isAuspicious: true },
    { marathi: 'ऐंद्र', english: 'Aindra', isAuspicious: true },
    { marathi: 'वैधृति', english: 'Vaidhriti', isAuspicious: false },
];
function calculateYogaInfo(year, month, day, tzOffsetHours) {
    const jdNoon = (0, ayanamsha_1.getJulianDay)(year, month, day, 12 - tzOffsetHours);
    const pos = (0, ephemeris_1.getPlanetaryPositions)(jdNoon);
    const totalLong = (pos.sunNirayanaDeg + pos.moonNirayanaDeg) % 360.0;
    const yogaSpan = 360.0 / 27.0; // 13.3333 degrees
    const index = Math.floor(totalLong / yogaSpan) + 1; // 1 to 27
    const yoga = exports.YOGA_DATA[index - 1];
    const nextTargetDeg = Math.ceil(totalLong / yogaSpan) * yogaSpan;
    const prevTargetDeg = Math.floor(totalLong / yogaSpan) * yogaSpan;
    // Combined speed of sun + moon ~0.59 degrees/hour
    const hoursToEnd = (nextTargetDeg - totalLong) / 0.59;
    const hoursFromStart = (totalLong - prevTargetDeg) / 0.59;
    const formatTime = (offsetH) => {
        const totalH = (12 + offsetH + 24) % 24;
        const h = Math.floor(totalH).toString().padStart(2, '0');
        const m = Math.floor((totalH % 1) * 60).toString().padStart(2, '0');
        return `${h}:${m}`;
    };
    return {
        index,
        nameMarathi: yoga.marathi,
        nameEnglish: yoga.english,
        isAuspicious: yoga.isAuspicious,
        startTime: formatTime(-hoursFromStart),
        endTime: formatTime(hoursToEnd),
    };
}
