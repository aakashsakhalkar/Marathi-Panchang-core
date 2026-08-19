"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFestivalsForDay = getFestivalsForDay;
function getFestivalsForDay(month, tithi, gregorianMonth, gregorianDay, moonriseStr) {
    const festivals = [];
    const mName = month.nameEnglish;
    const tIndex = tithi.index;
    const isShukla = tithi.pakshaEnglish === 'Shukla';
    const isKrishna = tithi.pakshaEnglish === 'Krishna';
    // 1. Fixed Gregorian Date Festivals
    if (gregorianMonth === 5 && gregorianDay === 1) {
        festivals.push({
            id: 'maharashtra-day',
            nameMarathi: 'महाराष्ट्र दिन',
            nameEnglish: 'Maharashtra Day',
            category: 'Major Festival',
            descriptionMarathi: 'महाराष्ट्र राज्याची स्थापना व कामगार दिन.',
            descriptionEnglish: 'Statehood day of Maharashtra and International Workers\' Day.',
        });
    }
    if (gregorianMonth === 1 && (gregorianDay === 14 || gregorianDay === 15)) {
        festivals.push({
            id: 'makar-sankranti',
            nameMarathi: 'मकर संक्रांती (तिळगुळ घ्या, गोड गोड बोला)',
            nameEnglish: 'Makar Sankranti',
            category: 'Major Festival',
            descriptionMarathi: 'सूर्याचा मकर राशीत प्रवेश. तिळगुळ वाटप व पतंगोत्सव.',
            descriptionEnglish: 'Sun enters Capricorn. Distribution of Tilgul and sweet traditions.',
        });
    }
    // 2. Chaitra Month Festivals
    if (mName === 'Chaitra') {
        if (isShukla && tIndex === 1) {
            festivals.push({
                id: 'gudi-padwa',
                nameMarathi: 'गुढीपाडवा (मराठी नववर्ष)',
                nameEnglish: 'Gudi Padwa (Marathi New Year)',
                category: 'Major Festival',
                descriptionMarathi: 'महाराष्ट्र नव्या वर्षाचा पहिला दिवस. नवीन वर्षाचे स्वागत व गुढी उभारणे.',
                descriptionEnglish: 'Traditional Maharashtrian New Year celebration.',
            });
        }
        if (isShukla && tIndex === 9) {
            festivals.push({
                id: 'ram-navami',
                nameMarathi: 'श्रीराम नवमी',
                nameEnglish: 'Ram Navami',
                category: 'Jayanti',
                descriptionMarathi: 'प्रभू श्रीरामांचा जन्मोत्सव.',
                descriptionEnglish: 'Birth anniversary of Lord Rama.',
            });
        }
        if (isShukla && tIndex === 15) {
            festivals.push({
                id: 'hanuman-jayanti',
                nameMarathi: 'हनुमान जयंती',
                nameEnglish: 'Hanuman Jayanti',
                category: 'Jayanti',
                descriptionMarathi: 'श्री हनुमान जन्मोत्सव.',
                descriptionEnglish: 'Birth anniversary of Lord Hanuman.',
            });
        }
    }
    // 3. Ashadha Month Festivals
    if (mName === 'Ashadha') {
        if (isShukla && tIndex === 11) {
            festivals.push({
                id: 'ashadhi-ekadashi',
                nameMarathi: 'आषाढी एकादशी (देवशयनी एकादशी - पंढरपूर वारी)',
                nameEnglish: 'Ashadhi Ekadashi (Pandharpur Wari)',
                category: 'Major Festival',
                descriptionMarathi: 'पंढरपूर वारीचा मुख्य दिवस. महाविष्णु निद्राधीन होतात.',
                descriptionEnglish: 'Grand culmination of Pandharpur Wari pilgrimage.',
            });
        }
    }
    // 4. Shravana Month Festivals
    if (mName === 'Shravana') {
        if (isShukla && tIndex === 5) {
            festivals.push({
                id: 'nag-panchami',
                nameMarathi: 'नागपंचमी',
                nameEnglish: 'Nag Panchami',
                category: 'Major Festival',
                descriptionMarathi: 'नागपूजन व निसर्ग संवर्धन उत्सव.',
                descriptionEnglish: 'Worship of Nag Devta and nature reverence.',
            });
        }
        if (isShukla && tIndex === 15) {
            festivals.push({
                id: 'narali-purnima',
                nameMarathi: 'नारळी पौर्णिमा व रक्षाबंधन',
                nameEnglish: 'Narali Purnima & Raksha Bandhan',
                category: 'Major Festival',
                descriptionMarathi: 'कोकणातील समुद्र पूजन आणि बहीण-भावाचा पवित्र सण.',
                descriptionEnglish: 'Sea worship by Koli community and Raksha Bandhan festival.',
            });
        }
        if (isKrishna && tIndex === 23) { // 23 = Krishna Ashtami
            festivals.push({
                id: 'gokulashtami',
                nameMarathi: 'गोकुळाष्टमी / दहीहंडी',
                nameEnglish: 'Gokulashtami / Dahi Handi',
                category: 'Major Festival',
                descriptionMarathi: 'श्रीकृष्ण जन्मोत्सव आणि दहीहंडी सोहळा.',
                descriptionEnglish: 'Lord Krishna Jayanti and lively Dahi Handi celebrations.',
            });
        }
        if (isKrishna && tIndex === 30) { // 30 = Shravan Amavasya
            festivals.push({
                id: 'pithori-amavasya-pola',
                nameMarathi: 'पिठोरी अमावास्या (बैल पोळा)',
                nameEnglish: 'Pithori Amavasya (Bail Pola)',
                category: 'Major Festival',
                descriptionMarathi: 'श्रावण अमावास्या, मातृपूजन व बैलांचा कृतज्ञता सण.',
                descriptionEnglish: 'Shravana Amavasya and traditional agricultural cattle appreciation festival.',
            });
        }
    }
    // 5. Bhadrapada Month Festivals
    if (mName === 'Bhadrapada') {
        if (isShukla && tIndex === 4) {
            festivals.push({
                id: 'ganesh-chaturthi',
                nameMarathi: 'गणेश चतुर्थी (श्री गणेश प्रतिष्ठापना)',
                nameEnglish: 'Ganesh Chaturthi',
                category: 'Major Festival',
                descriptionMarathi: 'महाराष्ट्राचा सर्वात मोठा लोकउत्सव. श्री गणेशांचे घरोघरी आगमन.',
                descriptionEnglish: 'Grandest festival of Maharashtra. Installation of Lord Ganesha.',
            });
        }
        if (isShukla && tIndex === 5) {
            festivals.push({
                id: 'rishi-panchami',
                nameMarathi: 'ऋषीपंचमी',
                nameEnglish: 'Rishi Panchami',
                category: 'Vrat',
                descriptionMarathi: 'सप्तर्षींचे पूजन व व्रत.',
                descriptionEnglish: 'Honoring the Saptarshis.',
            });
        }
        if (isShukla && (tIndex === 7 || tIndex === 8)) {
            festivals.push({
                id: 'gauri-avahan',
                nameMarathi: 'ज्येष्ठा गौरी आवाहन व पूजन',
                nameEnglish: 'Gauri Avahan & Pujan',
                category: 'Major Festival',
                descriptionMarathi: 'महालक्ष्मी स्वरूप ज्येष्ठा व कनिष्ठा गौरींचे आगमन व मंगल पूजन.',
                descriptionEnglish: 'Arrival and sacred worship of Jyeshtha and Kanishtha Gauri.',
            });
        }
        if (isShukla && tIndex === 14) {
            festivals.push({
                id: 'anant-chaturdashi',
                nameMarathi: 'अनंत चतुर्दशी (गणपती विसर्जन)',
                nameEnglish: 'Anant Chaturdashi (Ganesh Visarjan)',
                category: 'Major Festival',
                descriptionMarathi: '१० दिवसांच्या गणेशोत्सवाची सांगता व भव्य विसर्जन मिरवणूक.',
                descriptionEnglish: 'Immersion of Lord Ganesha idols after 10 joyful days.',
            });
        }
    }
    // 6. Ashwin Month Festivals (Navratri & Diwali)
    if (mName === 'Ashwin') {
        if (isShukla && tIndex === 1) {
            festivals.push({
                id: 'ghatasthapana',
                nameMarathi: 'घटस्थापना (नवरात्रारंभ)',
                nameEnglish: 'Ghatasthapana (Navratri Begins)',
                category: 'Major Festival',
                descriptionMarathi: 'देवी नवरात्रोत्सवाचा पहिला दिवस व घटस्थापना.',
                descriptionEnglish: 'Beginning of the 9-day Navratri festival.',
            });
        }
        if (isShukla && tIndex === 10) {
            festivals.push({
                id: 'dasara',
                nameMarathi: 'दसरा / विजयादशमी (आपट्याची पाने व सोने वाटप)',
                nameEnglish: 'Dasara / Vijayadashami',
                category: 'Major Festival',
                descriptionMarathi: 'साडेतीन मुहूर्तांपैकी एक. आपट्याची पाने (सोने) वाटून एकमेकांना शुभेच्छा देणे.',
                descriptionEnglish: 'Victory of Good over Evil. Exchange of Apta leaves symbolizing gold.',
            });
        }
        if (isShukla && tIndex === 15) {
            festivals.push({
                id: 'kojagiri-purnima',
                nameMarathi: 'कोजागिरी पौर्णिमा (नवान्न पौर्णिमा)',
                nameEnglish: 'Kojagiri Purnima',
                category: 'Major Festival',
                descriptionMarathi: 'आटीव मसाला दूध पिणे व लक्ष्मी मातेची प्रार्थना.',
                descriptionEnglish: 'Drinking Masala Milk under full moon and welcoming Goddess Lakshmi.',
            });
        }
        if (isKrishna && tIndex === 27) { // 27 = Krishna Dwadashi
            festivals.push({
                id: 'vasubaras',
                nameMarathi: 'वसुबारस (गोवत्स द्वादशी)',
                nameEnglish: 'Vasubaras (Govatsa Dwadashi)',
                category: 'Major Festival',
                descriptionMarathi: 'दिवाळी सणाची सुरुवात. सवत्स गायीचे पूजन.',
                descriptionEnglish: 'First day of Diwali. Worship of cows and calves.',
            });
        }
        if (isKrishna && tIndex === 28) {
            festivals.push({
                id: 'dhanteras',
                nameMarathi: 'धनत्रयोदशी (धन्वंतरी पूजन)',
                nameEnglish: 'Dhanteras',
                category: 'Major Festival',
                descriptionMarathi: 'लक्ष्मी व धन्वंतरी पूजन.',
                descriptionEnglish: 'Worship of wealth and Bhagwan Dhanvantari.',
            });
        }
        if (isKrishna && (tIndex === 29 || tIndex === 30)) {
            festivals.push({
                id: 'narak-chaturdashi-lakshmi-pujan',
                nameMarathi: 'नरक चतुर्दशी व लक्ष्मीपूजन (मुख्य दिवाळी)',
                nameEnglish: 'Narak Chaturdashi & Lakshmi Pujan',
                category: 'Major Festival',
                descriptionMarathi: 'अभ्यंगस्नान, फटाक्यांची आतषबाजी आणि श्री लक्ष्मी-कुबेर पूजन.',
                descriptionEnglish: 'Holy Abhyanga Bath and Lakshmi Pujan during Diwali night.',
            });
        }
    }
    // 7. Kartik Month Festivals
    if (mName === 'Kartik') {
        if (isShukla && tIndex === 1) {
            festivals.push({
                id: 'balipratipada-padwa',
                nameMarathi: 'बलिप्रतिपदा / दिवाळी पाडवा',
                nameEnglish: 'Bali Pratipada / Diwali Padwa',
                category: 'Major Festival',
                descriptionMarathi: 'पती-पत्नीच्या प्रेमाचा सण व पाडवा ओवाळणी.',
                descriptionEnglish: 'Diwali Padwa celebrating marital bond and devotion.',
            });
        }
        if (isShukla && tIndex === 2) {
            festivals.push({
                id: 'bhaubeej',
                nameMarathi: 'भाऊबीज',
                nameEnglish: 'Bhaubeej',
                category: 'Major Festival',
                descriptionMarathi: 'बहीण-भावाच्या नात्याचा आनंदोत्सव.',
                descriptionEnglish: 'Bhaubeej celebration honoring brother-sister affection.',
            });
        }
        if (isShukla && tIndex === 11) {
            festivals.push({
                id: 'kartiki-ekadashi',
                nameMarathi: 'कार्तिकी एकादशी (प्रबोधिनी एकादशी)',
                nameEnglish: 'Kartiki Ekadashi',
                category: 'Major Festival',
                descriptionMarathi: 'पंढरपूर यात्रा व तुळशी विवाह आरंभ.',
                descriptionEnglish: 'Kartiki Yatra and commencement of Tulsi Vivah season.',
            });
        }
    }
    // 8. Sankashti Chaturthi (Every Krishna Paksha Chaturthi - Index 19)
    if (isKrishna && (tIndex === 19 || tIndex === 4)) {
        festivals.push({
            id: 'sankashti-chaturthi',
            nameMarathi: `संकष्टी चतुर्थी (चंद्रोदय वेळ: ${moonriseStr})`,
            nameEnglish: `Sankashti Chaturthi (Moonrise: ${moonriseStr})`,
            category: 'Vrat',
            descriptionMarathi: 'श्री गणपती संकष्ट हरण व्रत. रात्री चंद्रोदयानंतर उपवास सोडणे.',
            descriptionEnglish: 'Monthly Sankashti Chaturthi fast for Lord Ganesha. Fast broken after Moonrise.',
            sankashtiMoonriseTime: moonriseStr,
        });
    }
    // 9. Regular Ekadashi Vrat Check (Index 11 and 26)
    if (tIndex === 11 || tIndex === 26) {
        festivals.push({
            id: 'ekadashi-vrat',
            nameMarathi: `स्मार्त / भागवत एकादशी (${tithi.nameMarathi})`,
            nameEnglish: `Ekadashi Vrat (${tithi.nameEnglish})`,
            category: 'Vrat',
            descriptionMarathi: 'भगवान श्रीविष्णूंचे पवित्र उपवास व्रत.',
            descriptionEnglish: 'Holy Ekadashi fast dedicated to Lord Vishnu.',
        });
    }
    return festivals;
}
