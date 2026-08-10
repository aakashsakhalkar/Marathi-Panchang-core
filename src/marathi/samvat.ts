import { SamvatInfo } from '../types';

export const SAMVATSARA_NAMES: { marathi: string; english: string }[] = [
  { marathi: 'प्रभव', english: 'Prabhava' },
  { marathi: 'विभव', english: 'Vibhava' },
  { marathi: 'शुक्ल', english: 'Shukla' },
  { marathi: 'प्रमोद', english: 'Pramoda' },
  { marathi: 'प्रजापति', english: 'Prajapati' },
  { marathi: 'अंगिरा', english: 'Angira' },
  { marathi: 'श्रीमुख', english: 'Shrimukha' },
  { marathi: 'भाव', english: 'Bhava' },
  { marathi: 'युवा', english: 'Yuva' },
  { marathi: 'धाता', english: 'Dhata' },
  { marathi: 'ईश्वर', english: 'Ishvara' },
  { marathi: 'बहुधान्य', english: 'Bahudhanya' },
  { marathi: 'प्रमाथी', english: 'Pramathi' },
  { marathi: 'विक्रम', english: 'Vikrama' },
  { marathi: 'वृषप्रजा', english: 'Vrishapraja' },
  { marathi: 'चित्रभानु', english: 'Chitrabhanu' },
  { marathi: 'सुभानु', english: 'Subhanu' },
  { marathi: 'तारण', english: 'Tarana' },
  { marathi: 'पार्थिव', english: 'Parthiva' },
  { marathi: 'व्यय', english: 'Vyaya' },
  { marathi: 'सर्वजित', english: 'Sarvajit' },
  { marathi: 'सर्वधारी', english: 'Sarvadhari' },
  { marathi: 'विरोधी', english: 'Virodhi' },
  { marathi: 'विकृति', english: 'Vikriti' },
  { marathi: 'खर', english: 'Khara' },
  { marathi: 'नंदन', english: 'Nandana' },
  { marathi: 'विजय', english: 'Vijaya' },
  { marathi: 'जय', english: 'Jaya' },
  { marathi: 'मन्मथ', english: 'Manmatha' },
  { marathi: 'दुर्मुख', english: 'Durmukha' },
  { marathi: 'हेमलंब', english: 'Hemalamba' },
  { marathi: 'विलंब', english: 'Vilamba' },
  { marathi: 'विकारी', english: 'Vikari' },
  { marathi: 'शार्वरी', english: 'Sharvari' },
  { marathi: 'प्लव', english: 'Plava' },
  { marathi: 'शुभकृत', english: 'Shubhakrit' },
  { marathi: 'शोभन', english: 'Shobhana' },
  { marathi: 'क्रोधिन', english: 'Krodhin' }, // 38 (2024-2025)
  { marathi: 'विश्वावसु', english: 'Visvavasu' }, // 39 (2025-2026)
  { marathi: 'पराभव', english: 'Parabhava' }, // 40
  { marathi: 'प्लवंग', english: 'Plavanga' },
  { marathi: 'कीलक', english: 'Kilaka' },
  { marathi: 'सौम्य', english: 'Saumya' },
  { marathi: 'साधारण', english: 'Sadharana' },
  { marathi: 'विरोधिकृत', english: 'Virodhikrit' },
  { marathi: 'परिधावी', english: 'Paridhavi' },
  { marathi: 'प्रमादी', english: 'Pramadi' },
  { marathi: 'आनंद', english: 'Ananda' },
  { marathi: 'राक्षस', english: 'Rakshasa' },
  { marathi: 'नल', english: 'Nala' },
  { marathi: 'पिंगल', english: 'Pingala' },
  { marathi: 'कालयुक्त', english: 'Kalayukta' },
  { marathi: 'सिद्धार्थी', english: 'Siddharthi' },
  { marathi: 'रौद्र', english: 'Raudra' },
  { marathi: 'दुर्मति', english: 'Durmati' },
  { marathi: 'दुंदुभी', english: 'Dundubhi' },
  { marathi: 'रुधिरोद्गारी', english: 'Rudhirodgari' },
  { marathi: 'रक्ताक्षी', english: 'Raktakshi' },
  { marathi: 'क्रोधन', english: 'Krodhana' },
  { marathi: 'अक्षय', english: 'Akshaya' },
];

export function calculateSamvatInfo(year: number, month: number, day: number): SamvatInfo {
  // Gudi Padwa occurs in March/April
  const isAfterGudiPadwa = month > 3 || (month === 3 && day >= 20);

  // Shaka Samvat = Gregorian Year - 78 (after Gudi Padwa)
  const shakaSamvat = isAfterGudiPadwa ? year - 78 : year - 79;
  const vikramSamvat = shakaSamvat + 135;

  // 60-year Jovian Samvatsara index
  const samvatsaraIndex = (shakaSamvat + 11) % 60;
  const samvatsaraObj = SAMVATSARA_NAMES[samvatsaraIndex];

  return {
    shakaSamvat,
    shakaSamvatsaraName: `${samvatsaraObj.marathi} (${samvatsaraObj.english})`,
    vikramSamvat,
  };
}
