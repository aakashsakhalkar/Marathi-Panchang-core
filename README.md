# marathi-panchang-core 🚩

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/aakashsakhalkar/Marathi-Panchang-core?style=social)](https://github.com/aakashsakhalkar/Marathi-Panchang-core)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Android%20%7C%20Node.js%20%7C%20Flutter-blue)](https://github.com/aakashsakhalkar/Marathi-Panchang-core)
[![Offline](https://img.shields.io/badge/Calculation-100%25%20Offline%20%26%20Free-success)](#)

> **Ultra-Accurate, Zero-Dependency, Offline Marathi Panchang & Hindu Calendar Engine** for Web, Android, Node.js, and Cross-Platform Applications.

`marathi-panchang-core` calculates complete, traditional Marathi Panchang details on-device using high-precision astronomical algorithms (**Lahiri Ayanamsha / Chitrapaksha** and **Amanta Month System** used in Maharashtra by Kalnirnay & Drik Panchang) with **zero external server calls, zero API keys, and zero cost**.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [📦 Installation & Setup Guides](#-installation--setup-guides)
  - [1. Web / React / Next.js / Vue / Node.js](#1-web--react--nextjs--vue--nodejs)
  - [2. Plain HTML / CDN (No install required)](#2-plain-html--cdn-no-install-required)
  - [3. Native Android App (Kotlin & Java via JitPack)](#3-native-android-app-kotlin--java-via-jitpack)
  - [4. Flutter / Cross-Platform](#4-flutter--cross-platform)
- [📖 Code Examples & Usage](#-code-examples--usage)
- [🗺️ Custom Location & Cities](#️-custom-location--cities)
- [📊 JSON API Data Structure](#-json-api-data-structure)
- [🎉 Supported Maharashtrian Festivals & Vrats](#-supported-maharashtrian-festivals--vrats)
- [📄 License & Author](#-license--author)

---

## ✨ Features

* 🛕 **5 Panchang Pillars (पंचांग घटक):**
  * **Tithi (तिथि):** 1 to 30 with Marathi/English names, Paksha (Shukla/Krishna), Udayatithi (सूर्योदय तिथि), and transition end-times.
  * **Nakshatra (नक्षत्र):** 27 Nakshatras with Pada/Charan (1 to 4), Lord planet (स्वामी), and Moon Sign (राशी).
  * **Yoga (योग):** 27 Yogas with auspicious/inauspicious indicators.
  * **Karana (करण):** 11 Karanas with Bhadra (विष्टी/भद्रा) alert indicator.
  * **Vara (वार):** Day of week in Marathi & Sanskrit (रविवाः to शनिवार).
* 🚩 **Marathi Calendar System:** Amanta Month system (Month ends on Amavasya), Adhik Masa (अधिक मास) detection, and Shaka Samvat (शके) with 60-year Jovian Samvatsara names.
* ☀️ **Astronomical Calculations:** Sunrise, Sunset, Solar Noon, Day Length, Moonrise (for Sankashti Chaturthi fast break), and Lahiri Ayanamsha degrees.
* ⏳ **Auspicious Timings & Muhurtas:** Rahu Kaal (राहू काळ), Yamaganda, Gulika, Abhijit Muhurta (अभिजित मुहूर्त), Brahma Muhurta, and Amrit Kaal.
* 🎉 **Maharashtrian Festivals & Vrats:** Gudi Padwa, Ashadhi Ekadashi (Pandharpur Wari), Ganesh Chaturthi, Anant Chaturdashi, Navratri, Kojagiri Purnima, Diwali Chain, Ekadashi Vrats, and **Sankashti Chaturthi with exact Moonrise timing**.

---

## 📦 Installation & Setup Guides

### 1. Web / React / Next.js / Vue / Node.js

Install directly via NPM:

```bash
npm install marathi-panchang-core
```

---

### 2. Plain HTML / CDN (No install required)

Include this single script tag in any HTML file to load the library directly in the browser:

```html
<!DOCTYPE html>
<html lang="mr">
<head>
  <meta charset="UTF-8">
  <title>मराठी पंचांग टेस्ट</title>

  <!-- 🌐 Live CDN Import (v1.0.2) -->
  <script src="https://cdn.jsdelivr.net/gh/aakashsakhalkar/Marathi-Panchang-core@v1.0.2/dist/marathi-panchang.min.js"></script>
</head>
<body>

  <h2>🚩 मराठी पंचांग</h2>
  <div id="panchang-box"></div>

  <script>
    // Access MarathiPanchang directly in browser
    const panchang = MarathiPanchang.getMarathiPanchang('2026-08-10');

    document.getElementById('panchang-box').innerHTML = `
      <p><b>महिना व तिथि:</b> ${panchang.month.fullMonthNameMarathi} ${panchang.tithi.pakshaMarathi} ${panchang.tithi.nameMarathi}</p>
      <p><b>शके:</b> ${panchang.samvat.shakaSamvat} (${panchang.samvat.shakaSamvatsaraName})</p>
      <p><b>नक्षत्र:</b> ${panchang.nakshatra.nameMarathi} (पद ${panchang.nakshatra.pada})</p>
      <p><b>सूर्योदय:</b> ☀️ ${panchang.astronomy.sunrise} | <b>सूर्यास्त:</b> 🌆 ${panchang.astronomy.sunset}</p>
      <p><b>चंद्रोदय (Sankashti):</b> 🌙 ${panchang.astronomy.moonrise}</p>
      <p><b>राहू काळ:</b> ⏳ ${panchang.muhurta.rahuKaal.start} ते ${panchang.muhurta.rahuKaal.end}</p>
    `;
  </script>
</body>
</html>
```

---

### 3. Native Android App (Kotlin & Java via JitPack)

Android developers can fetch this repository automatically using **JitPack.io**!

#### Step 1: Add JitPack repository in `settings.gradle`
```groovy
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

#### Step 2: Add dependency in `build.gradle` (app module)
```groovy
dependencies {
    implementation 'com.github.aakashsakhalkar:Marathi-Panchang-core:v1.0.2'
}
```

#### Step 3: Use in Kotlin code:
```kotlin
val bridge = MarathiPanchangBridge(context)

bridge.getPanchang("2026-08-10") { json ->
    val monthName = json?.getJSONObject("month")?.getString("fullMonthNameMarathi")
    val tithiName = json?.getJSONObject("tithi")?.getString("nameMarathi")
    val sunrise = json?.getJSONObject("astronomy")?.getString("sunrise")
    
    println("Marathi Date: $monthName $tithiName, Sunrise: $sunrise")
}
```

---

### 4. Flutter / Cross-Platform

Add directly to your `pubspec.yaml`:

```yaml
dependencies:
  marathi_panchang:
    git:
      url: https://github.com/aakashsakhalkar/Marathi-Panchang-core.git
```

---

## 📖 Code Examples & Usage

### Basic Usage (Today's Date in Pune / Mumbai):

```javascript
const { getMarathiPanchang } = require('marathi-panchang-core');

// Get today's Panchang
const panchang = getMarathiPanchang();

console.log(panchang.date); // '2026-08-10'
console.log(panchang.month.fullMonthNameMarathi); // 'निज श्रावण'
console.log(panchang.tithi.nameMarathi); // 'त्रयोदशी'
console.log(panchang.nakshatra.nameMarathi); // 'आर्द्र'
```

---

## 🗺️ Custom Location & Cities

Panchang elements (especially Sunrise, Sunset, and Tithi transition times) depend on geographical coordinates. You can pass any custom latitude & longitude:

```javascript
const { getMarathiPanchang } = require('marathi-panchang-core');

// Example: Get Panchang for Nagpur on Gudi Padwa 2026
const nagpurLocation = {
  latitude: 21.1458,
  longitude: 79.0882,
  timezoneOffsetHours: 5.5, // IST UTC+5:30
  cityName: 'नागपूर (Nagpur)'
};

const panchang = getMarathiPanchang('2026-03-19', nagpurLocation);

console.log(panchang.month.fullMonthNameMarathi); // 'निज चैत्र'
console.log(panchang.tithi.nameMarathi); // 'प्रथमा'
console.log(panchang.festivals[0].nameMarathi); // 'गुढीपाडवा (मराठी नववर्ष)'
```

### Pre-defined Coordinate Guide for Maharashtra Cities:
| City | Latitude | Longitude |
| :--- | :--- | :--- |
| **Pune** *(Default)* | `18.5204` | `73.8567` |
| **Mumbai** | `18.9388` | `72.8353` |
| **Nagpur** | `21.1458` | `79.0882` |
| **Nashik** | `19.9975` | `73.7898` |
| **Kolhapur** | `16.7050` | `74.2433` |
| **Chhatrapati Sambhajinagar** | `19.8762` | `75.3433` |
| **Thane** | `19.2183` | `72.9781` |
| **Solapur** | `17.6599` | `75.9064` |

---

## 📊 JSON API Data Structure

`getMarathiPanchang()` returns a comprehensive JSON object:

```json
{
  "date": "2026-08-10",
  "dayOfWeek": {
    "index": 1,
    "nameMarathi": "सोमवार",
    "nameSanskrit": "सोमवासरः",
    "nameEnglish": "Monday",
    "rulerPlanet": "चंद्र (Moon)"
  },
  "samvat": {
    "shakaSamvat": 1948,
    "shakaSamvatsaraName": "पराभव (Parabhava)",
    "vikramSamvat": 2083
  },
  "month": {
    "index": 5,
    "nameMarathi": "श्रावण",
    "nameEnglish": "Shravana",
    "isAdhikMasa": false,
    "fullMonthNameMarathi": "निज श्रावण",
    "system": "Amanta"
  },
  "tithi": {
    "index": 28,
    "nameMarathi": "त्रयोदशी",
    "nameEnglish": "Trayodashi",
    "pakshaMarathi": "कृष्ण पक्ष",
    "pakshaEnglish": "Krishna",
    "udayaTithiMarathi": "कृष्ण पक्ष द्वादशी",
    "udayaTithiEnglish": "Krishna Dwadashi",
    "startTime": "08:39",
    "endTime": "08:17"
  },
  "nakshatra": {
    "index": 6,
    "nameMarathi": "आर्द्र",
    "nameEnglish": "Ardra",
    "pada": 4,
    "lordMarathi": "राहू",
    "rashiMarathi": "मिथुन"
  },
  "yoga": {
    "index": 15,
    "nameMarathi": "वज्र",
    "isAuspicious": false
  },
  "karana": {
    "index": 55,
    "nameMarathi": "गर",
    "isBhadra": false
  },
  "astronomy": {
    "sunrise": "06:14:41",
    "sunset": "19:05:00",
    "solarNoon": "12:39:50",
    "dayLength": "12 hrs 50 mins",
    "moonrise": "11:18:51",
    "moonset": "23:18:51",
    "moonRashiMarathi": "मिथुन",
    "lahiriAyanamshaDegrees": 24.228
  },
  "muhurta": {
    "rahuKaal": { "start": "07:50", "end": "09:27" },
    "yamagandaKaal": { "start": "11:03", "end": "12:39" },
    "gulikaKaal": { "start": "14:16", "end": "15:52" },
    "abhijitMuhurta": { "start": "12:14", "end": "13:05" },
    "brahmaMuhurta": { "start": "04:38", "end": "05:26" },
    "amritKaal": { "start": "09:27", "end": "10:57" }
  },
  "festivals": []
}
```

---

## 🎉 Supported Maharashtrian Festivals & Vrats

The engine automatically detects and lists all major Maharashtrian festivals and fasts:

* 🚩 **Gudi Padwa (गुढीपाडवा)** - Marathi New Year
* 🚩 **Ram Navami & Hanuman Jayanti (राम नवमी व हनुमान जयंती)**
* 🚩 **Vat Purnima (वटपौर्णिमा)**
* 🚩 **Ashadhi Ekadashi (आषाढी एकादशी - देवशयनी एकादशी व पंढरपूर वारी)**
* 🚩 **Nag Panchami & Narali Purnima (नागपंचमी व नारळी पौर्णिमा / रक्षाबंधन)**
* 🚩 **Gokulashtami & Dahi Handi (गोकुळाष्टमी / दहीहंडी)**
* 🚩 **Ganesh Chaturthi (श्री गणेश चतुर्थी)** - 10-day festival arrival
* 🚩 **Rishi Panchami & Gauri Avahan (ऋषीपंचमी व गौरी पूजन)**
* 🚩 **Anant Chaturdashi (अनंत चतुर्दशी - गणपती विसर्जन)**
* 🚩 **Navratri & Dasara (नवरात्रारंभ व दसरा / विजयादशमी - सोने वाटप)**
* 🚩 **Kojagiri Purnima (कोजागिरी पौर्णिमा)**
* 🚩 **Diwali Chain (दिवाळी सण):** Vasubaras (वसुबारस), Dhanteras (धनत्रयोदशी), Narak Chaturdashi & Lakshmi Pujan (लक्ष्मीपूजन), Bali Pratipada Padwa (दिवाळी पाडवा), Bhaubeej (भाऊबीज).
* 🚩 **Kartiki Ekadashi (कार्तिकी एकादशी)**
* 🚩 **Makar Sankranti (मकर संक्रांती - तिळगुळ घ्या, गोड गोड बोला)**
* 🚩 **Mahashivratri & Holi (महाशिवरात्री व होळी/धुलिवंदण)**
* 🌙 **Sankashti Chaturthi (संकष्टी चतुर्थी)** with exact **Moonrise time (चंद्रोदय वेळ)** for breaking fast.

---

## 📝 Changelog & Bug Fixes

### 🌟 v1.0.3 (August 19, 2026)
* **🐛 [CRITICAL FIX] Amanta Lunar Month Alignment (अमांत चांद्र मास अचूकता):**
  * **Issue Identified:** In earlier versions (`v1.0.2` and below), the lunar month was determined by checking the Sun's Nirayana Rashi on the *current day* (`sunNirayanaNoon`). When the Sun entered Simha (Leo) on August 16/17 during Simha Sankranti, the engine mistakenly flipped the lunar month to **Bhadrapada**, prematurely triggering Ganesh Chaturthi and Rishi Panchami in August instead of September.
  * **Astronomical Correction:** Implemented `findPreviousNewMoonJD(jd)` and `findNextNewMoonJD(jd)`. Under authentic Amanta Siddhanta (Drik Panchang / Kalnirnay standard), the lunar month is strictly governed by the Sun's Nirayana sign at the exact moment of the **preceding New Moon (अमावास्या conjunction)**.
  * **Result:** August 13 to September 11, 2026 is properly recognized as **निज श्रावण (Shravana)**, and **भाद्रपद (Bhadrapada)** begins only on September 12, 2026. Ganesh Chaturthi correctly triggers on **September 14, 2026** and Rishi Panchami on **September 15, 2026**.
* **✨ [FEATURE] Additional Traditional Maharashtrian Festivals:**
  * Added **ज्येष्ठा गौरी आवाहन व पूजन** (Gauri Avahan & Pujan - Bhadrapada Shukla 7/8).
  * Added **पिठोरी अमावास्या (बैल पोळा)** (Shravana Krishna 30 / Amavasya).
* **⚡ [IMPROVEMENT] Solar Longitude Precision:**
  * Enhanced `rashiIndex` extraction directly from continuous Nirayana solar longitude degrees.

### 🌟 v1.0.2 (August 10, 2026)
* Added standalone browser IIFE distribution bundle (`dist/marathi-panchang.min.js`).
* Added Android Kotlin / Java bridge integration (`MarathiPanchangBridge.kt`).
* Added 60-year Jovian Samvatsara names (Shaka Samvat 1948 - Parabhava).

### 🌟 v1.0.0 (August 1, 2026)
* Initial release of 5-limbed Vedic astronomical calculation engine with zero dependencies.

---

## 🛠 Building & Testing Locally

```bash
# Clone the repository
git clone https://github.com/aakashsakhalkar/Marathi-Panchang-core.git
cd Marathi-Panchang-core

# Install dependencies
npm install

# Build project (TypeScript + Minified Browser IIFE Bundle)
npm run build

# Run test suite
node tests/test-runner.js
```

---

## 📄 License & Author

Created with ❤️ by **[Aakash Sakhalkar](https://github.com/aakashsakhalkar)**.

Released under the **[MIT License](LICENSE)**. Feel free to use in commercial, non-commercial, and open-source projects!
