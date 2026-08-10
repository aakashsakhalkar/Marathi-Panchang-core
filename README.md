# marathi-panchang-core 🚩

> **Ultra-Accurate, Zero-Dependency, Offline Marathi Panchang Engine** for Web, Android, Node.js, and Cross-Platform Apps.

Calculates complete Marathi Panchang (Tithi, Nakshatra, Yoga, Karana, Amanta Marathi Month, Shaka Samvat, Auspicious Timings, Rahu Kaal, Maharashtrian Festivals, and Sankashti Moonrise) on-device with zero server costs or paid APIs.

---

## 🌟 Features

* 🛕 **5 Panchang Pillars:** Tithi (with Udayatithi & transition times), Nakshatra (with Pada & Lord planet), Yoga, Karana (with Bhadra indicator), and Vara (Day of week).
* 🚩 **Marathi Calendar System:** Amanta Month system (Month ends on Amavasya), Adhik Masa (अधिक मास) detection, and Shaka Samvat (शके) with 60-year Samvatsara names.
* ☀️ **Astronomical Calculations:** Uses Lahiri Ayanamsha (Chitrapaksha) & Meeus ephemeris to calculate Sunrise, Sunset, Solar Noon, Day Length, Moonrise (for Sankashti Chaturthi fast), and Moon Sign (Rashi).
* ⏳ **Auspicious Timings:** Rahu Kaal, Yamaganda Kaal, Gulika Kaal, Abhijit Muhurta, Brahma Muhurta, and Amrit Kaal.
* 🎉 **Maharashtrian Festivals:** Gudi Padwa, Ashadhi Ekadashi, Ganesh Chaturthi, Anant Chaturdashi, Kojagiri Purnima, Diwali chain, Sankashti Chaturthi, and Ekadashi Vrats.

---

## 🚀 Installation & Usage

### 1. Web & JavaScript / TypeScript / Node.js (NPM)

```bash
npm install marathi-panchang-core
```

#### TypeScript / ES6 Usage:
```typescript
import { getMarathiPanchang, DEFAULT_LOCATION } from 'marathi-panchang-core';

// Get today's Panchang for Pune / Mumbai
const panchang = getMarathiPanchang('2026-08-10', DEFAULT_LOCATION);

console.log(panchang.month.fullMonthNameMarathi); // निज श्रावण
console.log(panchang.tithi.nameMarathi);            // त्रयोदशी
console.log(panchang.astronomy.sunrise);            // 06:14:41
console.log(panchang.muhurta.rahuKaal);             // { start: '07:50', end: '09:27' }
```

#### Pure HTML `<script>` Usage (CDN / GitHub Releases):
```html
<script src="https://cdn.jsdelivr.net/gh/YourUsername/marathi-panchang-core@1.0.0/dist/index.js"></script>
<script>
  const panchang = MarathiPanchang.getMarathiPanchang('2026-03-19');
  console.log(panchang.tithi.nameMarathi); // प्रथमा (गुढीपाडवा)
</script>
```

---

### 2. Android (Kotlin / Java) via JitPack

Android developers can fetch this repository directly from GitHub using **JitPack.io**!

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
    implementation 'com.github.YourUsername:marathi-panchang-core:v1.0.0'
}
```

#### Step 3: Use in Kotlin:
```kotlin
val bridge = MarathiPanchangBridge(context)

bridge.getPanchang("2026-08-10") { json ->
    val tithiName = json?.getJSONObject("tithi")?.getString("nameMarathi")
    val sunrise = json?.getJSONObject("astronomy")?.getString("sunrise")
    println("Marathi Tithi: $tithiName, Sunrise: $sunrise")
}
```

---

## 🛠 Project Structure

```text
marathi-panchang-core/
├── src/
│   ├── astronomy/     # Ephemeris, Sun, Moon, Lahiri Ayanamsha
│   ├── panchang/      # Tithi, Nakshatra, Yoga, Karana, Vara
│   ├── marathi/       # Month (Amanta), Samvat, Muhurtas, Festivals
│   ├── android/       # Kotlin Android bridge helper
│   ├── types.ts       # TypeScript interfaces
│   └── index.ts       # Main library entry point
├── demo/              # Interactive HTML/CSS browser dashboard
├── dist/              # Compiled JS & d.ts distribution bundle
├── jitpack.yml        # JitPack config for Android builds
└── package.json
```

---

## 📄 License
MIT License. Free to use in commercial, non-commercial, and open-source projects.
