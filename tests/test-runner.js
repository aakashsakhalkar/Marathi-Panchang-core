const { getMarathiPanchang } = require('../dist/index.js');

console.log('----------------------------------------------------');
console.log('Testing marathi-panchang-core Engine...');
console.log('----------------------------------------------------');

// Test 1: Today's Panchang (2026-08-10)
const panchangToday = getMarathiPanchang('2026-08-10');
console.log('\n📅 Date:', panchangToday.date);
console.log('🚩 Month & Tithi:', `${panchangToday.month.fullMonthNameMarathi} ${panchangToday.tithi.pakshaMarathi} ${panchangToday.tithi.nameMarathi}`);
console.log('👑 Shaka Samvat:', panchangToday.samvat.shakaSamvat, '(', panchangToday.samvat.shakaSamvatsaraName, ')');
console.log('🌟 Nakshatra:', panchangToday.nakshatra.nameMarathi, '(Pada:', panchangToday.nakshatra.pada, ')');
console.log('🧘 Yoga:', panchangToday.yoga.nameMarathi);
console.log('🐂 Karana:', panchangToday.karana.nameMarathi);
console.log('☀️ Sunrise / Sunset:', panchangToday.astronomy.sunrise, '/', panchangToday.astronomy.sunset);
console.log('🌙 Moonrise (Sankashti):', panchangToday.astronomy.moonrise);
console.log('⏳ Rahu Kaal:', panchangToday.muhurta.rahuKaal.start, 'to', panchangToday.muhurta.rahuKaal.end);
console.log('✨ Abhijit Muhurta:', panchangToday.muhurta.abhijitMuhurta.start, 'to', panchangToday.muhurta.abhijitMuhurta.end);
console.log('🎉 Festivals:', panchangToday.festivals.map(f => f.nameMarathi).join(', ') || 'None');

// Test 2: Gudi Padwa 2026 (March 19, 2026)
const gudiPadwa = getMarathiPanchang('2026-03-19');
console.log('\n----------------------------------------------------');
console.log('Testing Gudi Padwa (2026-03-19):');
console.log('Month & Tithi:', `${gudiPadwa.month.fullMonthNameMarathi} ${gudiPadwa.tithi.pakshaMarathi} ${gudiPadwa.tithi.nameMarathi}`);
console.log('Festivals:', gudiPadwa.festivals.map(f => f.nameMarathi).join(', '));

console.log('\n✅ All Panchang calculations completed successfully!');
