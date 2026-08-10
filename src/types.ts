export interface GeoLocation {
  latitude: number;
  longitude: number;
  timezoneOffsetHours: number; // e.g. 5.5 for IST
  cityName?: string;
}

export interface TithiInfo {
  index: number; // 1 to 30
  nameMarathi: string; // e.g. "प्रथमा", "एकादशी", "अमावस्या", "पौर्णिमा"
  nameEnglish: string; // e.g. "Pratipada", "Ekadashi", "Amavasya", "Purnima"
  pakshaMarathi: string; // "शुक्ल पक्ष" or "कृष्ण पक्ष"
  pakshaEnglish: 'Shukla' | 'Krishna';
  udayaTithiMarathi: string; // Main tithi prevailing at sunrise
  udayaTithiEnglish: string;
  startTime: string; // ISO / HH:mm:ss format
  endTime: string;
}

export interface NakshatraInfo {
  index: number; // 1 to 27
  nameMarathi: string; // e.g. "अश्विनी", "रोहिणी", "पुनर्वसू"
  nameEnglish: string; // e.g. "Ashwini", "Rohini", "Punarvasu"
  pada: number; // 1 to 4 (charan)
  lordMarathi: string; // Ruling Planet e.g. "केतू", "शुक्र", "चंद्र"
  lordEnglish: string;
  rashiMarathi: string; // Moon Sign e.g. "मेष", "वृषभ"
  rashiEnglish: string;
  startTime: string;
  endTime: string;
}

export interface YogaInfo {
  index: number; // 1 to 27
  nameMarathi: string; // e.g. "विष्कंभ", "आयुष्मान", "सिद्धि"
  nameEnglish: string;
  isAuspicious: boolean;
  startTime: string;
  endTime: string;
}

export interface KaranaInfo {
  index: number; // 1 to 11
  nameMarathi: string; // e.g. "बव", "बालव", "विष्टी (भद्रा)"
  nameEnglish: string;
  isBhadra: boolean; // Special indicator for Vishti/Bhadra
  startTime: string;
  endTime: string;
}

export interface VaraInfo {
  index: number; // 0 to 6 (Sun=0 to Sat=6)
  nameMarathi: string; // "रविवार", "सोमवार", etc.
  nameSanskrit: string; // "रविवासरः"
  nameEnglish: string; // "Sunday"
  rulerPlanet: string;
}

export interface MarathiMonthInfo {
  index: number; // 1 to 12
  nameMarathi: string; // "चैत्र", "वैशाख", etc.
  nameEnglish: string;
  isAdhikMasa: boolean; // true if Adhik Masa (अधिक मास)
  fullMonthNameMarathi: string; // e.g. "अधिक श्रावण" or "निज श्रावण"
  system: 'Amanta'; // Maharashtrian standard
}

export interface SamvatInfo {
  shakaSamvat: number; // e.g. 1948
  shakaSamvatsaraName: string; // 60-year Jovian cycle e.g. "क्रोधिन" / "Krodhi"
  vikramSamvat: number; // e.g. 2083
}

export interface SunMoonAstronomicalDetails {
  sunrise: string;
  sunset: string;
  solarNoon: string;
  dayLength: string;
  moonrise: string;
  moonset: string;
  sunRashiMarathi: string;
  sunRashiEnglish: string;
  moonRashiMarathi: string;
  moonRashiEnglish: string;
  lahiriAyanamshaDegrees: number;
}

export interface MuhurtaTimings {
  rahuKaal: { start: string; end: string };
  yamagandaKaal: { start: string; end: string };
  gulikaKaal: { start: string; end: string };
  abhijitMuhurta: { start: string; end: string };
  brahmaMuhurta: { start: string; end: string };
  amritKaal: { start: string; end: string };
}

export interface MarathiFestivalInfo {
  id: string;
  nameMarathi: string;
  nameEnglish: string;
  category: 'Major Festival' | 'Vrat' | 'Jayanti' | 'Purnima/Amavasya';
  descriptionMarathi: string;
  descriptionEnglish: string;
  sankashtiMoonriseTime?: string; // Specific for Sankashti Chaturthi
}

export interface CompleteMarathiPanchang {
  date: string; // YYYY-MM-DD
  dayOfWeek: VaraInfo;
  location: GeoLocation;
  samvat: SamvatInfo;
  month: MarathiMonthInfo;
  tithi: TithiInfo;
  nakshatra: NakshatraInfo;
  yoga: YogaInfo;
  karana: KaranaInfo;
  astronomy: SunMoonAstronomicalDetails;
  muhurta: MuhurtaTimings;
  festivals: MarathiFestivalInfo[];
}
