"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KARANA_NAMES = void 0;
exports.calculateKaranaInfo = calculateKaranaInfo;
const ayanamsha_1 = require("../astronomy/ayanamsha");
const ephemeris_1 = require("../astronomy/ephemeris");
exports.KARANA_NAMES = [
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
function calculateKaranaInfo(year, month, day, tzOffsetHours) {
    const jdNoon = (0, ayanamsha_1.getJulianDay)(year, month, day, 12 - tzOffsetHours);
    const pos = (0, ephemeris_1.getPlanetaryPositions)(jdNoon);
    const diffLong = (pos.moonNirayanaDeg - pos.sunNirayanaDeg + 360.0) % 360.0;
    const halfTithiIndex = Math.floor(diffLong / 6.0) + 1; // 1 to 60
    let karanaObj = exports.KARANA_NAMES[0];
    if (halfTithiIndex === 1) {
        karanaObj = exports.KARANA_NAMES[0]; // Kintughna
    }
    else if (halfTithiIndex >= 58) {
        if (halfTithiIndex === 58)
            karanaObj = exports.KARANA_NAMES[8]; // Shakuni
        else if (halfTithiIndex === 59)
            karanaObj = exports.KARANA_NAMES[9]; // Chatuspada
        else
            karanaObj = exports.KARANA_NAMES[10]; // Naga
    }
    else {
        // Repeating 7 moving Karanas: Bava(1), Balava(2), Kaulava(3), Taitila(4), Gara(5), Vanija(6), Vishti(7)
        const movingIndex = ((halfTithiIndex - 2) % 7) + 1;
        karanaObj = exports.KARANA_NAMES[movingIndex];
    }
    const nextTargetDeg = Math.ceil(diffLong / 6.0) * 6.0;
    const prevTargetDeg = Math.floor(diffLong / 6.0) * 6.0;
    const hoursToEnd = (nextTargetDeg - diffLong) / 0.508;
    const hoursFromStart = (diffLong - prevTargetDeg) / 0.508;
    const formatTime = (offsetH) => {
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
