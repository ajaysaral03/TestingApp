package com.testingapp.invoice

import android.content.ContentValues
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream

class InvoicePdfModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "InvoicePdfSaver"

  @ReactMethod
  fun saveToDownloads(sourcePath: String, fileName: String, promise: Promise) {
    try {
      val source = File(sourcePath.removePrefix("file://"))
      if (!source.exists()) {
        promise.reject("SOURCE_NOT_FOUND", "The generated invoice PDF was not found.")
        return
      }

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        val values = ContentValues().apply {
          put(MediaStore.Downloads.DISPLAY_NAME, fileName)
          put(MediaStore.Downloads.MIME_TYPE, "application/pdf")
          put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
          put(MediaStore.Downloads.IS_PENDING, 1)
        }
        val resolver = reactContext.contentResolver
        val uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
          ?: throw IllegalStateException("Could not create a Downloads file.")
        resolver.openOutputStream(uri)?.use { output ->
          FileInputStream(source).use { input -> input.copyTo(output) }
        } ?: throw IllegalStateException("Could not open the Downloads file.")
        values.clear()
        values.put(MediaStore.Downloads.IS_PENDING, 0)
        resolver.update(uri, values, null, null)
      } else {
        val downloads = Environment.getExternalStoragePublicDirectory(
          Environment.DIRECTORY_DOWNLOADS,
        )
        if (!downloads.exists()) {
          downloads.mkdirs()
        }
        val destination = File(downloads, fileName)
        FileInputStream(source).use { input ->
          FileOutputStream(destination).use { output -> input.copyTo(output) }
        }
      }

      promise.resolve(true)
    } catch (error: Exception) {
      promise.reject("DOWNLOAD_FAILED", error.message, error)
    }
  }
}
