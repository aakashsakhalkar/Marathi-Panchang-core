package com.marathipanchang.core

import android.content.Context
import android.webkit.ValueCallback
import android.webkit.WebView
import org.json.JSONObject

/**
 * Android Kotlin Helper Bridge for marathi-panchang-core
 * Allows Android apps to evaluate Marathi Panchang calculations natively and offline.
 */
class MarathiPanchangBridge(private val context: Context) {

    private val webView: WebView = WebView(context).apply {
        settings.javaScriptEnabled = true
    }

    init {
        // Load bundled JS engine into headless WebView
        val jsContent = context.assets.open("marathi-panchang-core.min.js").bufferedReader().use { it.readText() }
        webView.evaluateJavascript(jsContent, null)
    }

    /**
     * Get complete Marathi Panchang JSON for any date and location
     */
    fun getPanchang(dateStr: String, latitude: Double = 18.5204, longitude: Double = 73.8567, callback: (JSONObject?) -> Unit) {
        val script = "MarathiPanchang.getMarathiPanchang('$dateStr', { latitude: $latitude, longitude: $longitude, timezoneOffsetHours: 5.5 });"
        webView.evaluateJavascript(script) { resultJsonStr ->
            try {
                // Parse returned JSON string
                val cleanStr = resultJsonStr.replace("^\"|\"$".toRegex(), "").replace("\\\"", "\"")
                val json = JSONObject(cleanStr)
                callback(json)
            } catch (e: Exception) {
                e.printStackTrace()
                callback(null)
            }
        }
    }
}
