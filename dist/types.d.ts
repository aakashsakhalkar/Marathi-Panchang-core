export interface GeoLocation {
    latitude: number;
    longitude: number;
    timezoneOffsetHours: number;
    cityName?: string;
}
export interface TithiInfo {
    index: number;
    nameMarathi: string;
    nameEnglish: string;
    pakshaMarathi: string;
    pakshaEnglish: 'Shukla' | 'Krishna';
    udayaTithiMarathi: string;
    udayaTithiEnglish: string;
    startTime: string;
    endTime: string;
}
export interface NakshatraInfo {
    index: number;
    nameMarathi: string;
    nameEnglish: string;
    pada: number;
    lordMarathi: string;
    lordEnglish: string;
    rashiMarathi: string;
    rashiEnglish: string;
    startTime: string;
    endTime: string;
}
export interface YogaInfo {
    index: number;
    nameMarathi: string;
    nameEnglish: string;
    isAuspicious: boolean;
    startTime: string;
    endTime: string;
}
export interface KaranaInfo {
    index: number;
    nameMarathi: string;
    nameEnglish: string;
    isBhadra: boolean;
    startTime: string;
    endTime: string;
}
export interface VaraInfo {
    index: number;
    nameMarathi: string;
    nameSanskrit: string;
    nameEnglish: string;
    rulerPlanet: string;
}
export interface MarathiMonthInfo {
    index: number;
    nameMarathi: string;
    nameEnglish: string;
    isAdhikMasa: boolean;
    fullMonthNameMarathi: string;
    system: 'Amanta';
}
export interface SamvatInfo {
    shakaSamvat: number;
    shakaSamvatsaraName: string;
    vikramSamvat: number;
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
    rahuKaal: {
        start: string;
        end: string;
    };
    yamagandaKaal: {
        start: string;
        end: string;
    };
    gulikaKaal: {
        start: string;
        end: string;
    };
    abhijitMuhurta: {
        start: string;
        end: string;
    };
    brahmaMuhurta: {
        start: string;
        end: string;
    };
    amritKaal: {
        start: string;
        end: string;
    };
}
export interface MarathiFestivalInfo {
    id: string;
    nameMarathi: string;
    nameEnglish: string;
    category: 'Major Festival' | 'Vrat' | 'Jayanti' | 'Purnima/Amavasya';
    descriptionMarathi: string;
    descriptionEnglish: string;
    sankashtiMoonriseTime?: string;
}
export interface CompleteMarathiPanchang {
    date: string;
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
